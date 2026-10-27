import sys
import numpy as np
from PIL import Image, ImageFilter
from collections import deque
src, out, prev = sys.argv[1], sys.argv[2], sys.argv[3]
im = Image.open(src).convert('RGB')
im = im.resize((int(im.width * 1500 / im.height), 1500), Image.LANCZOS)
W, H = im.size
L = im.convert('L')
small = L.resize((W // 4, H // 4), Image.BILINEAR)
bgs = small.filter(ImageFilter.MaxFilter(31)).filter(ImageFilter.MinFilter(9)).filter(ImageFilter.GaussianBlur(8))
bgL = np.asarray(bgs.resize((W, H), Image.BILINEAR)).astype(np.float32)
l = np.asarray(L).astype(np.float32)
a = np.asarray(im).astype(np.float32)
chroma = a.max(2) - a.min(2)
score = (bgL - l)
m = score > float(sys.argv[4]) if len(sys.argv) > 4 else score > 34
def comps(mask, minsize):
    lab = np.zeros(mask.shape, np.int32); keep = np.zeros(mask.shape, bool); cur = 0
    Hh, Ww = mask.shape
    for sy in range(Hh):
        for sx in range(Ww):
            if mask[sy, sx] and lab[sy, sx] == 0:
                cur += 1; q = deque([(sy, sx)]); lab[sy, sx] = cur; pts = []
                while q:
                    y, x = q.popleft(); pts.append((y, x))
                    for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
                        yy, xx = y+dy, x+dx
                        if 0 <= yy < Hh and 0 <= xx < Ww and mask[yy, xx] and lab[yy, xx] == 0:
                            lab[yy, xx] = cur; q.append((yy, xx))
                yield pts
largest = max(comps(m, 0), key=len)
k = np.zeros((H, W), bool)
for y, x in largest: k[y, x] = True
ka = Image.fromarray((k * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(5))
k = np.asarray(ka) > 127
# fill small holes only
holes = ~k
reach = np.zeros((H, W), bool); q = deque()
for x in range(W):
    for y in (0, H - 1):
        if holes[y, x] and not reach[y, x]: reach[y, x] = True; q.append((y, x))
for y in range(H):
    for x in (0, W - 1):
        if holes[y, x] and not reach[y, x]: reach[y, x] = True; q.append((y, x))
while q:
    y, x = q.popleft()
    for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
        yy, xx = y+dy, x+dx
        if 0 <= yy < H and 0 <= xx < W and holes[yy, xx] and not reach[yy, xx]:
            reach[yy, xx] = True; q.append((yy, xx))
enclosed = holes & ~reach
fill = np.zeros((H, W), bool)
for pts in comps(enclosed, 0):
    if len(pts) < 3000:
        for y, x in pts: fill[y, x] = True
k = k | fill
alpha = Image.fromarray((k * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.9))
al = np.asarray(alpha).astype(np.float32) / 255
ar = a.copy(); edge = (al > 0) & (al < 0.98); ar[edge] *= 0.55
rgba = Image.fromarray(ar.clip(0, 255).astype(np.uint8)).convert('RGBA'); rgba.putalpha(alpha)
bb = alpha.getbbox(); mg = 20
rgba = rgba.crop((max(0, bb[0]-mg), max(0, bb[1]-mg), min(W, bb[2]+mg), min(H, bb[3]+mg)))
rgba.save(out)
pv = Image.new('RGBA', rgba.size, (12, 24, 48, 255)); pv.alpha_composite(rgba); pv = pv.convert('RGB'); pv.thumbnail((700, 900)); pv.save(prev)
print('ok', rgba.size)
