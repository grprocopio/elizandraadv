import sys
from PIL import Image, ImageFilter
import numpy as np
from collections import deque

src, out, preview = sys.argv[1], sys.argv[2], sys.argv[3]
im = Image.open(src).convert('RGB')
a = np.asarray(im).astype(np.float32)
H, W, _ = a.shape
# background model: per row, linear blend between left and right edge colours
L = a[:, 1:5, :].mean(axis=1)
R = a[:, W-5:W-1, :].mean(axis=1)
t = np.linspace(0, 1, W)[None, :, None]
bg = L[:, None, :] * (1 - t) + R[:, None, :] * t
diff = np.abs(a - bg).max(axis=2)
chroma = a.max(axis=2) - a.min(axis=2)
score = diff + 1.4 * np.maximum(chroma - 6, 0)
mask = score > 26
# keep largest component touching bottom
lab = np.zeros((H, W), np.int32); best = None; cur = 0
for sy in range(H):
    for sx in range(W):
        if mask[sy, sx] and lab[sy, sx] == 0:
            cur += 1; q = deque([(sy, sx)]); lab[sy, sx] = cur; n = 0
            while q:
                y, x = q.popleft(); n += 1
                for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
                    yy, xx = y+dy, x+dx
                    if 0 <= yy < H and 0 <= xx < W and mask[yy, xx] and lab[yy, xx] == 0:
                        lab[yy, xx] = cur; q.append((yy, xx))
            if best is None or n > best[1]: best = (cur, n)
m = (lab == best[0])
# fill holes: flood background from border over ~m
bgf = np.zeros((H, W), bool); q = deque()
for x in range(W):
    for y in (0,):
        if not m[y, x]: bgf[y, x] = True; q.append((y, x))
for y in range(H):
    for x in (0, W-1):
        if not m[y, x] and not bgf[y, x]: bgf[y, x] = True; q.append((y, x))
while q:
    y, x = q.popleft()
    for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
        yy, xx = y+dy, x+dx
        if 0 <= yy < H and 0 <= xx < W and not m[yy, xx] and not bgf[yy, xx]:
            bgf[yy, xx] = True; q.append((yy, xx))
m = ~bgf
alpha = Image.fromarray((m * 255).astype(np.uint8))
alpha = alpha.filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(1.0))
scale = int(sys.argv[4]) if len(sys.argv) > 4 else 3
import importlib.util, os
spec = importlib.util.spec_from_file_location('enh', os.path.join(os.path.dirname(__file__), 'enhance.py')); enh = importlib.util.module_from_spec(spec); spec.loader.exec_module(enh)
big = enh.enhance(im, scale).resize((W*scale, H*scale), Image.LANCZOS) if scale > 1 else im.copy()
alpha = alpha.resize((W*scale, H*scale), Image.LANCZOS)
rgba = big.convert('RGBA')
ar = np.asarray(big).astype(np.float32); al = np.asarray(alpha).astype(np.float32)/255.0
edge = (al > 0) & (al < 0.98)
dark = ar * 0.55
ar[edge] = dark[edge]
rgba = Image.fromarray(ar.clip(0,255).astype(np.uint8)).convert('RGBA'); rgba.putalpha(alpha)
rgba.save(out)
pv = Image.new('RGBA', rgba.size, (12, 24, 48, 255)); pv.alpha_composite(rgba); pv.convert('RGB').save(preview)
print('saved', rgba.size)
