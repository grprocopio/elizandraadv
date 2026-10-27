import io, re, subprocess, sys

subprocess.run([sys.executable, '-I', '.impeccable/tools/patch_v5.py'], check=True)

# ---------- HTML ----------
p = 'index.html'
s = io.open(p, encoding='utf-8').read()


def rep(a, b, text=None):
    global s
    assert a in s, a[:100]
    s = s.replace(a, b)


m = re.search(r'<img class="justice-statue[^>]*>', s)
assert m
s = s.replace(m.group(0), '<img class="justice-statue relative z-0 mx-auto mt-4 block w-full max-w-[30rem] lg:absolute lg:bottom-0 lg:right-[5%] lg:mt-0 lg:h-[94%] lg:w-auto lg:max-w-none" src="assets/estatua-justica.webp" width="1268" height="1426" loading="lazy" decoding="async" alt="Estátua da Justiça em bronze, segurando a espada e a balança" data-justice-statue>')
rep('src="assets/elizandra-perfil.jpg"', 'src="assets/elizandra-perfil.webp"')
rep('src="assets/escritorio-fachada.jpg"', 'src="assets/escritorio-fachada.webp"')
rep('src="assets/hero-escritorio-fundo.jpg" width="2400" height="1339"', 'src="assets/hero-escritorio-fundo.webp" width="1920" height="1071"')
rep('src="assets/elizandra-branco-recorte.png"', 'src="assets/elizandra-branco-recorte.webp"')
rep('<link rel="preload" as="image" href="assets/elizandra-hero-recorte.png" fetchpriority="high">',
    '<link rel="preload" as="image" href="assets/elizandra-hero-recorte.webp" fetchpriority="high">')
io.open(p, 'w', encoding='utf-8').write(s)

# ---------- CSS ----------
c = 'src/site.css'
t = io.open(c, encoding='utf-8').read()


def crep(a, b):
    global t
    assert a in t, a[:100]
    t = t.replace(a, b)


crep('''.site-header.is-scrolled {
  background: rgba(6, 17, 42, .93);
  -webkit-backdrop-filter: blur(14px) saturate(1.2);
  backdrop-filter: blur(14px) saturate(1.2);
  border-color: rgba(216, 162, 90, .18);
}''', '''.site-header.is-scrolled {
  background: rgba(6, 17, 42, .96);
  border-color: rgba(216, 162, 90, .18);
}''')
t = re.sub(r'\.hero-portrait \{\n  -webkit-mask-image:[^}]*\}\n', '', t)
t = re.sub(r'\.cta-portrait \{\n  -webkit-mask-image:[^}]*\}\n', '', t)
t = re.sub(r'\.justice-statue \{\n[^}]*\}\n', '', t)
crep('.hero-bg-img { opacity: .24; filter: saturate(.75) brightness(.92); }', '.hero-bg-img { opacity: .26; }')
crep('@media (min-width: 1024px) { .hero-name { font-size: clamp(6rem, 11.8vw, 12.5rem); line-height: .88; } }',
     '@media (min-width: 1024px) { .hero-name { font-size: clamp(5rem, min(11.8vw, 20svh), 12.5rem); line-height: .88; } }')
t += '''
/* ---------- Desempenho: camadas próprias para o que se move ---------- */
[data-portrait-inner], .hero-halo, .hero-bg, .hero-bg-img, .justice-statue, .justice-light,
.marquee-track, .cursor, .cursor-dot, .safra-track, .cta-portrait, [data-parallax-img], .site-header {
  will-change: transform;
}
.hero-portrait, .justice-statue, .cta-portrait { backface-visibility: hidden; }
'''
io.open(c, 'w', encoding='utf-8').write(t)

# ---------- JS ----------
j = 'assets/js/main.js'
u = io.open(j, encoding='utf-8').read()


def jrep(a, b):
    global u
    assert a in u, a[:100]
    u = u.replace(a, b)


jrep("  gsap.registerPlugin(ScrollTrigger);\n", "  gsap.registerPlugin(ScrollTrigger);\n  ScrollTrigger.config({ ignoreMobileResize: true });\n  gsap.config({ force3D: true });\n")
jrep("lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true });", "lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });")
jrep('''  if (header) {
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: function (self) {
        if (menuOpen) return;
        var hide = self.direction === 1 && self.scroll() > 320;
        gsap.to(header, { yPercent: hide ? -100 : 0, duration: 0.6, ease: 'expo.out', overwrite: 'auto' });
      }
    });
  }''', '''  if (header) {
    var headerHidden = false;
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: function (self) {
        if (menuOpen) return;
        var hide = self.direction === 1 && self.scroll() > 320;
        if (hide === headerHidden) return;
        headerHidden = hide;
        gsap.to(header, { yPercent: hide ? -100 : 0, duration: 0.6, ease: 'expo.out', overwrite: true });
      }
    });
  }''')
jrep('''    var loop = gsap.to(track, { xPercent: -50, repeat: -1, duration: 38, ease: 'none' });
    var dir = 1;
    ScrollTrigger.create({
      trigger: mq, start: 'top bottom', end: 'bottom top',
      onUpdate: function (self) {
        dir = self.direction;
        var boost = Math.min(Math.abs(self.getVelocity()) / 300, 6);
        gsap.to(loop, { timeScale: dir * (1 + boost), duration: 0.3, overwrite: true });
        gsap.to(loop, { timeScale: dir, duration: 1.4, delay: 0.3, overwrite: false });
      }
    });''', '''    var loop = gsap.to(track, { xPercent: -50, repeat: -1, duration: 38, ease: 'none' });
    var target = 1, current = 1, dir = 1, visible = false;
    ScrollTrigger.create({
      trigger: mq, start: 'top bottom', end: 'bottom top',
      onToggle: function (self) { visible = self.isActive; if (visible) loop.play(); else loop.pause(); },
      onUpdate: function (self) {
        dir = self.direction;
        target = dir * (1 + Math.min(Math.abs(self.getVelocity()) / 300, 6));
      }
    });
    gsap.ticker.add(function () {
      if (!visible) return;
      target += (dir - target) * 0.04;
      current += (target - current) * 0.12;
      loop.timeScale(current);
    });''')
io.open(j, 'w', encoding='utf-8').write(u)
print('v6 ok')
