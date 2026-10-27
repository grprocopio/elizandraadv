import io, re

p = 'index.html'
s = io.open(p, encoding='utf-8').read()
start = s.index('  <header class="site-header')
end = s.index('</header>', start) + len('</header>')
old = s[start:end]

WA = 'https://wa.me/5555996098051?text=Olá,%20vim%20pelo%20site%20e%20gostaria%20de%20uma%20orientação'
WA_SVG_SMALL = re.search(r'(<svg class="h-4 w-4 text-amber" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="[^"]+"/></svg>)', old).group(1)
contacts = re.search(r'<ul class="flex flex-wrap gap-3" aria-label="Contatos">.*?</ul>', s, re.S).group(0)
contacts_menu = contacts.replace('class="flex flex-wrap gap-3"', 'class="mt-6 flex justify-center gap-3"')
MONO_PL = '<line pathLength="1" x1="47" y1="25.5" x2="68" y2="25.5"/><line pathLength="1" x1="53.5" y1="34.5" x2="75" y2="34.5"/><line pathLength="1" x1="53.5" y1="34.5" x2="53.5" y2="54"/><line pathLength="1" x1="47" y1="43.7" x2="68" y2="43.7"/><line pathLength="1" x1="76.5" y1="43" x2="76.5" y2="54"/><line pathLength="1" x1="53.5" y1="53.8" x2="77" y2="53.8"/>'
ARROW = '<svg class="h-5 w-5 flex-none" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5"/></svg>'

items = [('#escritorio', 'Escritório'), ('#atuacao', 'Atuação'), ('#advogada', 'A Advogada'), ('#duvidas', 'Dúvidas'), ('#endereco', 'Contato')]
desk = '\n'.join('        <a class="nav-link" href="%s" data-spy><span class="nav-clip"><span class="nav-roll" data-text="%s">%s</span></span></a>' % (h, t, t) for h, t in items)
mob = '\n'.join('          <li><a class="m-link" href="%s" data-spy><span class="display">%s</span>%s</a></li>' % (h, t, ARROW) for h, t in items)

new = '''  <header class="site-header fixed inset-x-0 top-0 z-50" data-header>
    <span class="scroll-progress" data-scroll-progress aria-hidden="true"></span>
    <div class="header-inner container-page flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
      <a href="#inicio" class="logo-link flex items-center gap-3 text-ivory" aria-label="Elizandra Girardon Advocacia, voltar ao início" data-logo>
        <svg class="mono h-9 w-9 text-amber" viewBox="45 23 34 33" fill="none" stroke-width="1.6" aria-hidden="true">''' + MONO_PL + '''</svg>
        <span class="flex flex-col leading-none">
          <span class="logo-name text-[0.78rem] font-medium tracking-[0.28em]">ELIZANDRA GIRARDON</span>
          <span class="mt-1.5 text-[0.7rem] tracking-[0.4em] text-ivory-muted">ADVOCACIA</span>
        </span>
      </a>

      <nav class="nav-bar hidden lg:flex" aria-label="Principal" data-nav>
        <span class="nav-indicator" aria-hidden="true" data-nav-indicator></span>
''' + desk + '''
      </nav>

      <div class="flex items-center gap-3">
        <a data-magnetic class="btn-line header-cta hidden sm:inline-flex" href="''' + WA + '''" target="_blank" rel="noopener">
          ''' + WA_SVG_SMALL + '''
          <span>Fale no WhatsApp</span>
        </a>
        <button type="button" class="menu-btn inline-flex h-11 w-11 flex-col items-center justify-center gap-[6px] border border-ivory/25 lg:hidden" aria-expanded="false" aria-controls="menu-mobile" data-menu-btn>
          <span class="sr-only">Abrir menu</span>
          <span class="bar bar-1 block h-px w-5 bg-ivory"></span>
          <span class="bar bar-2 block h-px w-5 bg-ivory"></span>
        </button>
      </div>
    </div>

    <nav id="menu-mobile" class="mobile-nav is-closed fixed inset-x-0 top-[4.5rem] h-[calc(100svh-4.5rem)] overflow-y-auto bg-navy-950 lg:hidden" aria-label="Menu" data-menu>
      <svg class="mono pointer-events-none absolute -right-20 bottom-6 h-80 w-80 text-amber opacity-[.07]" viewBox="45 23 34 33" fill="none" stroke-width=".4" aria-hidden="true">''' + MONO_PL + '''</svg>
      <div class="container-page relative flex min-h-full flex-col justify-between gap-10 pb-10 pt-6">
        <ul>
''' + mob + '''
        </ul>
        <div>
          <a class="btn-primary w-full justify-center" href="''' + WA + '''" target="_blank" rel="noopener">Conversar pelo WhatsApp</a>
          ''' + contacts_menu + '''
          <p class="mt-5 text-center text-sm leading-relaxed text-ivory-muted">Av. Fernando Ferrari, 1161, Santa Maria, RS<br><span class="tabular">Seg. a sex., 8h30 às 17h30 · OAB/RS 100.183</span></p>
        </div>
      </div>
    </nav>
  </header>'''
s = s[:start] + new + s[end:]
io.open(p, 'w', encoding='utf-8').write(s)

c = 'src/site.css'
t = io.open(c, encoding='utf-8').read()
t += '''
/* ---------- Barra do menu ---------- */
.header-inner { transition: height .5s var(--ease-out); }
@media (min-width: 1024px) { .site-header.is-scrolled .header-inner { height: 4.25rem; } }

.nav-bar {
  position: relative; align-items: center; gap: .15rem; padding: .3rem;
  border: 1px solid rgba(216,162,90,.22); background: rgba(6,17,42,.45);
  transition: border-color .5s var(--ease-out), background-color .5s var(--ease-out);
}
.nav-bar:hover { border-color: rgba(216,162,90,.42); }
.nav-bar::before, .nav-bar::after {
  content: ""; position: absolute; width: 10px; height: 10px; pointer-events: none;
  border-color: var(--amber); border-style: solid;
}
.nav-bar::before { top: -1px; left: -1px; border-width: 1px 0 0 1px; }
.nav-bar::after { bottom: -1px; right: -1px; border-width: 0 1px 1px 0; }
.nav-indicator {
  position: absolute; left: 0; top: .3rem; bottom: .3rem; width: 0; opacity: 0; pointer-events: none;
  background: rgba(216,162,90,.12); border-bottom: 1px solid var(--amber);
}
.nav-link { position: relative; z-index: 1; display: block; padding: .55rem 1.05rem; font-size: .9rem; color: rgba(244,239,229,.8); transition: color .4s; }
.nav-link.is-active { color: var(--ivory); }
.nav-clip { display: block; overflow: hidden; height: 1.5em; line-height: 1.5; }
.nav-roll { display: block; transition: transform .55s var(--ease-out); }
.nav-roll::after { content: attr(data-text); display: block; color: var(--amber-soft); }
.nav-link:hover .nav-roll, .nav-link:focus-visible .nav-roll { transform: translateY(-50%); }

.logo-name { transition: letter-spacing .6s var(--ease-out), color .4s; }
.logo-link:hover .logo-name { letter-spacing: .34em; color: var(--amber-soft); }

.header-cta { position: relative; overflow: hidden; isolation: isolate; }
.header-cta::before {
  content: ""; position: absolute; inset: 0; z-index: -1; background: var(--amber);
  transform: scaleX(0); transform-origin: left center; transition: transform .55s var(--ease-out);
}
.header-cta:hover::before, .header-cta:focus-visible::before { transform: scaleX(1); }
.header-cta:hover, .header-cta:focus-visible { color: var(--navy-deep); border-color: var(--amber); }
.header-cta svg { transition: color .4s; }
.header-cta:hover svg, .header-cta:focus-visible svg { color: var(--navy-deep); }

/* menu do celular */
.m-link {
  position: relative; display: flex; align-items: center; justify-content: space-between; gap: 1rem;
  padding: 1.05rem 0; border-bottom: 1px solid rgba(244,239,229,.1); color: var(--ivory);
}
.m-link .display { font-size: clamp(2.1rem, 9vw, 2.75rem); transition: color .4s, transform .5s var(--ease-out); }
.m-link svg { color: var(--amber); opacity: .5; transition: opacity .4s, transform .5s var(--ease-out); }
.m-link::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: -1px; height: 1px; background: var(--amber);
  transform: scaleX(0); transform-origin: left center; transition: transform .7s var(--ease-out);
}
.m-link:hover::after, .m-link:focus-visible::after, .m-link.is-active::after { transform: scaleX(1); }
.m-link:hover .display, .m-link.is-active .display { color: var(--amber-soft); transform: translateX(8px); }
.m-link:hover svg, .m-link.is-active svg { opacity: 1; transform: translateX(-4px); }
'''
io.open(c, 'w', encoding='utf-8').write(t)

j = 'assets/js/main.js'
u = io.open(j, encoding='utf-8').read()
anchor = "  /* ---------- Divisão de textos ---------- */"
assert anchor in u
u = u.replace(anchor, '''  /* ---------- Menu: realce deslizante, seção ativa e logo ---------- */
  var nav = $('[data-nav]');
  var spyLinks = $$('[data-spy]');
  var activeHref = null;
  if (nav) {
    var ind = $('[data-nav-indicator]', nav);
    var navLinks = $$('.nav-link', nav);
    var hovering = false;
    var moveTo = function (el) {
      if (!el) { gsap.to(ind, { opacity: 0, duration: 0.35, ease: 'power2.out', overwrite: true }); return; }
      gsap.to(ind, { x: el.offsetLeft, width: el.offsetWidth, opacity: 1, duration: 0.6, ease: 'expo.out', overwrite: true });
    };
    var activeLink = function () { return navLinks.filter(function (l) { return l.getAttribute('href') === activeHref; })[0] || null; };
    navLinks.forEach(function (l) {
      l.addEventListener('pointerenter', function () { hovering = true; moveTo(l); });
      l.addEventListener('focus', function () { moveTo(l); });
      l.addEventListener('blur', function () { moveTo(activeLink()); });
    });
    nav.addEventListener('pointerleave', function () { hovering = false; moveTo(activeLink()); });
    window.__navSpy = function () { if (!hovering) moveTo(activeLink()); };
  }
  spyLinks.map(function (l) { return l.getAttribute('href'); }).filter(function (h, i, a) { return a.indexOf(h) === i; }).forEach(function (href) {
    var sec = document.querySelector(href);
    if (!sec) return;
    ScrollTrigger.create({
      trigger: sec, start: 'top 45%', end: 'bottom 45%',
      onToggle: function (self) {
        if (self.isActive) activeHref = href;
        else if (activeHref === href) activeHref = null;
        spyLinks.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === activeHref); });
        if (window.__navSpy) window.__navSpy();
      }
    });
  });
  var logo = $('[data-logo]');
  if (logo) {
    var logoLines = $$('line', logo);
    gsap.set(logoLines, { strokeDasharray: 1, strokeDashoffset: 0 });
    logo.addEventListener('pointerenter', function () {
      gsap.fromTo(logoLines, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.7, stagger: 0.06, ease: 'power2.inOut', overwrite: true });
    });
  }

''' + anchor)
# richer mobile menu open
old_open = "      window.gsap.fromTo($$('li', menu), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.07 });"
assert old_open in u
u = u.replace(old_open, """      window.gsap.fromTo($$('.m-link', menu), { yPercent: 70, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.07 });
      window.gsap.fromTo(menu.querySelector('.container-page > div'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.3 });""")
io.open(j, 'w', encoding='utf-8').write(u)
print('v7 ok')
