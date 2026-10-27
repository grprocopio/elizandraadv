import sys
import numpy as np
from PIL import Image, ImageFilter
from collections import deque
src, out, prev = sys.argv[1], sys.argv[2], sys.argv[3]
im = Image.open(src).convert('RGB'); a = np.asarray(im).astype(np.float32); H, W, _ = a.shape
top = a[:40]; bot = a[H-25:]
colT = np.median(top, axis=0); colB = np.median(bot, axis=0)
# where statue occupies top/bottom, fall back to neighbours: smooth with wide median
def smooth(c):
    out = c.copy()
    for ch in range(3):
        s = np.array([np.median(c[max(0,i-25):i+26, ch]) for i in range(W)]); out[:, ch] = s
    return out
colT = smooth(colT)
rowAdj = a[:, 2:22].mean(axis=1) - colT[2:22].mean(axis=0)
bg = colT[None] + rowAdj[:, None, :]
diff = np.abs(a - bg).max(axis=2); chroma = a.max(axis=2) - a.min(axis=2)
bgchroma = bg.max(axis=2) - bg.min(axis=2)
score = diff + 1.2 * np.maximum(chroma - bgchroma - 4, 0)
m = score > 22
# keep components larger than 400 px
lab = np.zeros((H, W), np.int32); cur = 0; keep = np.zeros((H, W), bool)
for sy in range(H):
    for sx in range(W):
        if m[sy, sx] and lab[sy, sx] == 0:
            cur += 1; q = deque([(sy, sx)]); lab[sy, sx] = cur; pts = []
            while q:
                y, x = q.popleft(); pts.append((y, x))
                for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
                    yy, xx = y+dy, x+dx
                    if 0 <= yy < H and 0 <= xx < W and m[yy, xx] and lab[yy, xx] == 0:
                        lab[yy, xx] = cur; q.append((yy, xx))
            if len(pts) > 400:
                for y, x in pts: keep[y, x] = True
alpha = Image.fromarray((keep * 255).astype(np.uint8))
alpha = alpha.filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.MinFilter(7))  # close small gaps
k = np.asarray(alpha) > 127
reach = np.zeros((H, W), bool); q = deque()
for x in range(W):
    for y in (0,):
        if not k[y, x]: reach[y, x] = True; q.append((y, x))
for y in range(H):
    for x in (0, W - 1):
        if not k[y, x] and not reach[y, x]: reach[y, x] = True; q.append((y, x))
while q:
    y, x = q.popleft()
    for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
        yy, xx = y+dy, x+dx
        if 0 <= yy < H and 0 <= xx < W and not k[yy, xx] and not reach[yy, xx]:
            reach[yy, xx] = True; q.append((yy, xx))
holes = (~reach) & (~k)
hl = np.zeros((H, W), np.int32); fill = np.zeros((H, W), bool); cid = 0
for sy in range(H):
    for sx in range(W):
        if holes[sy, sx] and hl[sy, sx] == 0:
            cid += 1; q = deque([(sy, sx)]); hl[sy, sx] = cid; pts = []
            while q:
                y, x = q.popleft(); pts.append((y, x))
                for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
                    yy, xx = y+dy, x+dx
                    if 0 <= yy < H and 0 <= xx < W and holes[yy, xx] and hl[yy, xx] == 0:
                        hl[yy, xx] = cid; q.append((yy, xx))
            if len(pts) < 2500:
                for y, x in pts: fill[y, x] = True
alpha = Image.fromarray(((k | fill) * 255).astype(np.uint8))
alpha = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.9))
al = np.asarray(alpha).astype(np.float32) / 255
ar = a.copy(); edge = (al > 0) & (al < 0.98); ar[edge] *= 0.55
rgba = Image.fromarray(ar.clip(0, 255).astype(np.uint8)).convert('RGBA'); rgba.putalpha(alpha); rgba.save(out)
pv = Image.new('RGBA', rgba.size, (12, 24, 48, 255)); pv.alpha_composite(rgba); pv = pv.convert('RGB'); pv.thumbnail((900, 700)); pv.save(prev)
print('ok')
