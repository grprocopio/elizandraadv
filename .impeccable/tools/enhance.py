import sys
from PIL import Image, ImageFilter, ImageEnhance
def enhance(im, scale):
    im = im.filter(ImageFilter.SMOOTH)  # tame jpeg blocks
    w, h = im.size
    for _ in range(2):  # progressive upscale
        w2, h2 = int(w * scale ** 0.5), int(h * scale ** 0.5)
        im = im.resize((w2, h2), Image.LANCZOS); w, h = w2, h2
    im = im.filter(ImageFilter.UnsharpMask(radius=2.2, percent=70, threshold=2))
    im = im.filter(ImageFilter.UnsharpMask(radius=0.8, percent=60, threshold=1))
    im = ImageEnhance.Contrast(im).enhance(1.05)
    im = ImageEnhance.Color(im).enhance(1.04)
    return im
if __name__ == '__main__':
    src, out, scale = sys.argv[1], sys.argv[2], float(sys.argv[3])
    box = tuple(int(v) for v in sys.argv[4].split(',')) if len(sys.argv) > 4 else None
    im = Image.open(src).convert('RGB')
    if box: im = im.crop(box)
    r = enhance(im, scale)
    r.save(out, quality=90); print(out, r.size)
