import io, re

p = 'DESIGN.md'
s = io.open(p, encoding='utf-8').read()
nav_new = '''### Navigation
The header is fixed and transparent over the hero. Once the page scrolls, it gains navy-950 at 0.985 alpha (no backdrop blur, for scroll performance) and an amber hairline at 0.18, and on desktop it compacts from 80px to 68px. A 2px amber reading-progress bar sits on its bottom edge and fills from the left across the whole page. Past 320px of scroll, the header slides away when you scroll down and returns when you scroll up (0.6s, expo.out). It stays put while the mobile menu is open.

The logo redraws its six monogram strokes on hover, and the wordmark opens its tracking to 0.34em in Pale Straw.

Desktop links (Escritório, Atuação, A Advogada, Dúvidas, Contato) sit inside a framed bar: 1px amber at 0.22, navy-950 at 0.45, with 10px amber corner brackets at top-left and bottom-right. A sliding indicator (amber at 0.12 with a 1px amber base line) glides to the hovered link (0.6s, expo.out) and rests on the section in view (scroll spy at 45% of the viewport). Each label rolls up on hover to reveal a Pale Straw copy of itself. The WhatsApp line button fills with amber from the left on hover, turning its text and icon navy-950, and is magnetic.

Below 1024px, a square hairline toggle opens a full-height navy-950 sheet with a faint oversized monogram. The sheet lists the five sections in Bodoni at clamp(2.1rem, 9vw, 2.75rem) with amber arrows, ruled at ivory 0.10. The rule draws in amber and the label shifts 8px in Pale Straw on hover and for the active section. The primary button, the contact buttons and the address with hours sit at the foot. Links rise in a stagger on open.'''
cur_new = '''### Custom Cursor (fine pointers only)
The native cursor is hidden. In its place, a 40px ring (1px amber at 0.7) trails the pointer (0.5s) and a 6px amber dot tracks it almost exactly. The ring keeps its size over links and buttons and never shows a label (owner request). Pressing thickens the ring to 3px. Touch devices never see it.'''
s, n1 = re.subn(r'### Navigation\n.*?(?=\n### Custom Cursor)', nav_new + '\n', s, flags=re.S)
s, n2 = re.subn(r'### Custom Cursor \(fine pointers only\)\n.*?(?=\n### )', cur_new + '\n', s, flags=re.S)
io.open(p, 'w', encoding='utf-8').write(s)
print(n1, n2)
