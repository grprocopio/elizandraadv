/* Elizandra Girardon Advocacia: interações e animações.
   Sem JavaScript a página continua completa; com JS tudo ganha movimento. */
(function () {
  'use strict';

  var root = document.documentElement;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Ano no rodapé ---------- */
  var year = $('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Header ---------- */
  var header = $('[data-header]');
  var onScrollHeader = function () { if (header) header.classList.toggle('is-scrolled', window.scrollY > 24); };
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- Menu mobile ---------- */
  var menuBtn = $('[data-menu-btn]');
  var menu = $('[data-menu]');
  var menuOpen = false;
  var setMenu = function (open) {
    if (!menuBtn || !menu) return;
    menuOpen = open;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.querySelector('.sr-only').textContent = open ? 'Fechar menu' : 'Abrir menu';
    menu.classList.toggle('is-closed', !open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (window.__lenis) { if (open) window.__lenis.stop(); else window.__lenis.start(); }
    if (open && window.gsap) {
      window.gsap.fromTo($$('.m-link', menu), { yPercent: 70, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.07 });
      window.gsap.fromTo(menu.querySelector('.container-page > div'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.3 });
    }
  };
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () { setMenu(!menuOpen); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menuOpen) { setMenu(false); menuBtn.focus(); } });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1024 && menuOpen) setMenu(false); });
  }

  /* ---------- FAQ com altura animada ---------- */
  $$('.faq-item').forEach(function (item) {
    var summary = item.querySelector('summary');
    var answer = item.querySelector('.faq-answer');
    if (!summary || !answer || !answer.animate) return;
    var running = null;
    summary.addEventListener('click', function (e) {
      e.preventDefault();
      if (running) running.cancel();
      var opts = { duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' };
      if (item.open) {
        running = answer.animate([{ height: answer.offsetHeight + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], opts);
        running.onfinish = function () { item.open = false; running = null; };
      } else {
        item.open = true;
        var h = answer.offsetHeight;
        running = answer.animate([{ height: '0px', opacity: 0, transform: 'translateY(-8px)' }, { height: h + 'px', opacity: 1, transform: 'translateY(0)' }], opts);
        running.onfinish = function () { running = null; };
      }
    });
  });

  var stages = $$('[data-stage]');
  var gsapReady = !!(window.gsap && window.ScrollTrigger);

  /* ====== Sem bibliotecas: mostra tudo e sai ====== */
  if (!gsapReady) {
    root.classList.remove('motion-ready');
    stages.forEach(function (s) { s.classList.add('is-active'); });
    return;
  }

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.config({ force3D: true });
  var introAllowed = root.classList.contains('motion-ready');
  window.__motionStarted = true;
  root.classList.add('motion-ready');

  /* ---------- Scroll suave ---------- */
  var lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: id === '#inicio' ? 0 : -72, duration: 1.6 });
      else target.scrollIntoView({ behavior: 'smooth' });
      if (history.replaceState) history.replaceState(null, '', id);
    });
  });

  /* ---------- Barra de progresso de leitura ---------- */
  var progressBar = $('[data-scroll-progress]');
  if (progressBar) {
    gsap.fromTo(progressBar, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
  }

  /* ---------- Header some ao descer e volta ao subir ---------- */
  if (header) {
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
  }

  /* ---------- Menu: realce deslizante, seção ativa e logo ---------- */
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

  /* ---------- Divisão de textos ---------- */
  var heroName = $('[data-hero-name]');
  var chars = [];
  if (heroName) {
    $$('.word', heroName).forEach(function (word) {
      var text = word.textContent;
      word.textContent = '';
      text.split('').forEach(function (ch) {
        var mask = document.createElement('span');
        mask.className = 'char-mask';
        var c = document.createElement('span');
        c.className = 'char';
        c.textContent = ch;
        mask.appendChild(c);
        word.appendChild(mask);
        chars.push(c);
      });
    });
    heroName.classList.add('is-split');
    heroName.style.visibility = 'visible';
  }

  var splitWords = function (el, cls) {
    var words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', el.textContent.trim());
    el.innerHTML = words.map(function (w) {
      return cls === 'split-word'
        ? '<span class="split-mask" aria-hidden="true"><span class="split-word">' + w + '</span></span>'
        : '<span class="' + cls + '" aria-hidden="true">' + w + '</span>';
    }).join(' ');
  };
  $$('[data-split]').forEach(function (el) { splitWords(el, 'split-word'); });
  $$('[data-scrub-words]').forEach(function (el) { splitWords(el, 'scrub-word'); });

  /* ---------- Pré-carregador + abertura do hero ---------- */
  var preloader = $('[data-preloader]');
  var portraitWrap = $('[data-portrait]');
  var portraitInner = $('[data-portrait-inner]');
  var portraitImg = portraitInner ? portraitInner.querySelector('img') : null;
  var halo = $('[data-halo]');
  var monoLines = $$('[data-mono-hero] line');
  var fades = $$('[data-hero-fade]');
  var fieldLines = $$('[data-field] line');
  var hero = $('[data-hero]');
  var heroBg = $('[data-hero-bg]');
  var heroBgImg = $('[data-hero-bg-img]');

  if (halo) gsap.set(halo, { xPercent: -50, x: 0 });

  var heroIntro = function () {
    var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.fromTo(heroBg, { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1, duration: 3, ease: 'power2.out' }, 0)
      .to(halo, { opacity: 1, duration: 2.4, ease: 'power2.out' }, 0)
      .fromTo(fieldLines, { scaleX: 0, transformOrigin: '50% 50%' }, { scaleX: 1, duration: 1.8, stagger: { each: 0.05, from: 'end' } }, 0)
      .to(portraitWrap, { opacity: 1, duration: 1.4, ease: 'power2.out' }, 0.05)
      .fromTo(portraitInner, { y: 90, scale: 1.04 }, { y: 0, scale: 1, duration: 2.1 }, 0.05)
      .fromTo(chars, { yPercent: 115, rotate: 6 }, { yPercent: 0, rotate: 0, duration: 1.4, stagger: 0.035, onComplete: function () { heroName.classList.add('intro-done'); } }, 0.3)
      .to(monoLines, { strokeDashoffset: 0, duration: 1.1, stagger: 0.12, ease: 'power2.inOut' }, 0.2)
      .fromTo(fades, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.12 }, 0.8);
    return tl;
  };

  if (introAllowed && preloader) {
    if (lenis) lenis.stop();
    var pLines = $$('line', preloader);
    var pText = $$('[data-preloader-text]', preloader);
    var pCount = $('[data-preloader-count]', preloader);
    var counter = { v: 0 };
    var pre = gsap.timeline({
      onComplete: function () {
        preloader.style.display = 'none';
        if (lenis) lenis.start();
      }
    });
    gsap.set(pLines, { strokeDasharray: 1, strokeDashoffset: 1 });
    pre.to(pLines, { strokeDashoffset: 0, duration: 0.7, stagger: 0.06, ease: 'power2.inOut' }, 0)
      .fromTo(pText, { yPercent: 110 }, { yPercent: 0, duration: 0.7, ease: 'expo.out', stagger: 0.06 }, 0.2)
      .to(counter, { v: 100, duration: 0.95, ease: 'power2.inOut', onUpdate: function () { if (pCount) pCount.textContent = String(Math.round(counter.v)); } }, 0)
      .to($$('[data-preloader-inner]', preloader), { yPercent: -30, opacity: 0, duration: 0.5, ease: 'power3.in' }, 1.0)
      .to(preloader, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'expo.inOut' }, 1.2)
      .add(heroIntro(), 1.4);
  } else if (introAllowed) {
    heroIntro();
  } else {
    if (preloader) preloader.style.display = 'none';
    gsap.set([heroBg, halo, portraitWrap].concat(fades), { opacity: 1 });
    if (heroName) heroName.classList.add('intro-done');
    gsap.set(monoLines, { strokeDashoffset: 0 });
  }

  /* ---------- Hero: parallax ao rolar ---------- */
  if (hero && portraitInner) {
    gsap.to(portraitInner, { yPercent: 9, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to(heroName, { yPercent: -45, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.fromTo(halo, { scale: 1 }, { scale: 1.25, ease: 'none', immediateRender: false, scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  }

  if (hero && heroBgImg) {
    gsap.fromTo(heroBgImg, { yPercent: 0, scale: 1.15 }, { yPercent: 12, scale: 1.15, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* ---------- Hero: reage ao mouse ---------- */
  if (finePointer && hero && portraitImg) {
    gsap.set(portraitImg, { transformPerspective: 1200, transformOrigin: '50% 100%' });
    var pX = gsap.quickTo(portraitImg, 'x', { duration: 1.2, ease: 'power3.out' });
    var pR = gsap.quickTo(portraitImg, 'rotationY', { duration: 1.2, ease: 'power3.out' });
    var hX = gsap.quickTo(halo, 'x', { duration: 1.8, ease: 'power3.out' });
    var hY = gsap.quickTo(halo, 'y', { duration: 1.8, ease: 'power3.out' });
    var nX = gsap.quickTo(heroName, 'x', { duration: 1.4, ease: 'power3.out' });
    var bX = heroBg ? gsap.quickTo(heroBg, 'x', { duration: 2, ease: 'power3.out' }) : function () {};
    hero.addEventListener('mousemove', function (e) {
      var nx = e.clientX / window.innerWidth - 0.5;
      var ny = e.clientY / window.innerHeight - 0.5;
      pX(nx * -22); pR(nx * 7);
      hX(nx * 90); hY(ny * 60); bX(nx * 26); nX(nx * 34);
    });
    hero.addEventListener('mouseleave', function () { pX(0); pR(0); hX(0); hY(0); bX(0); nX(0); });
  }

  /* Letras do nome: pulam ao passar o mouse e uma onda percorre o nome de tempos em tempos */
  /* um pulo por vez por letra: não reinicia no meio, sem tremer */
  var hop = function (c, delay) {
    if (c._hopping) return;
    c._hopping = true;
    gsap.to(c, {
      yPercent: -13, duration: 0.34, ease: 'power2.out', delay: delay || 0,
      yoyo: true, repeat: 1, overwrite: false,
      onComplete: function () { c._hopping = false; }
    });
  };
  if (finePointer) {
    chars.forEach(function (c) {
      c.parentElement.addEventListener('pointerenter', function () { if (heroName.classList.contains('intro-done')) hop(c); }, { passive: true });
    });
  }
  if (chars.length) {
    var wave = function () {
      if (window.scrollY > window.innerHeight * 0.8 || document.hidden || !heroName.classList.contains('intro-done')) return;
      chars.forEach(function (c, i) { hop(c, i * 0.045); });
    };
    gsap.delayedCall(introAllowed ? 4.6 : 1.5, function () {
      wave();
      setInterval(wave, 7000);
    });
  }

  /* ---------- Faixa corrida (marquee) ---------- */
  $$('[data-marquee]').forEach(function (mq) {
    var track = $('[data-marquee-track]', mq);
    if (!track) return;
    var loop = gsap.to(track, { xPercent: -50, repeat: -1, duration: 38, ease: 'none' });
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
    });
  });

  /* ---------- Revelações ---------- */
  $$('[data-split]').forEach(function (el) {
    gsap.fromTo($$('.split-word', el), { yPercent: 110 }, {
      yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.04,
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  $$('[data-scrub-words]').forEach(function (el) {
    gsap.fromTo($$('.scrub-word', el), { opacity: 0.16 }, {
      opacity: 1, ease: 'none', stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 40%', scrub: true }
    });
  });

  $$('[data-reveal]').forEach(function (el) {
    if (el.tagName === 'FIGURE') {
      var img = el.querySelector('img');
      gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut',
        scrollTrigger: { trigger: el, start: 'top 82%' },
        onComplete: function () { gsap.set(el, { clearProps: 'clipPath' }); }
      });
      if (img && !img.hasAttribute('data-parallax-img')) gsap.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 2.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 82%' } });
    } else {
      var kids = el.children.length ? Array.prototype.slice.call(el.children) : [el];
      gsap.fromTo(kids, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.12,
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    }
  });

  $$('[data-rule]').forEach(function (el) {
    gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.8, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 90%' } });
  });

  var audience = $$('[data-audience] li');
  if (audience.length) {
    gsap.fromTo(audience, { opacity: 0, y: 30, rotate: 2 }, {
      opacity: 1, y: 0, rotate: 0, duration: 1.1, ease: 'expo.out', stagger: 0.06,
      scrollTrigger: { trigger: '[data-audience]', start: 'top 88%' }
    });
  }

  var clauses = $$('[data-clauses] .clause');
  if (clauses.length) {
    gsap.fromTo(clauses, { opacity: 0, x: -40 }, {
      opacity: 1, x: 0, duration: 1.2, ease: 'expo.out', stagger: 0.09,
      scrollTrigger: { trigger: '[data-clauses]', start: 'top 82%' }
    });
  }

  var specs = $$('[data-specs] li');
  if (specs.length) {
    gsap.fromTo(specs, { opacity: 0, x: -20 }, {
      opacity: 1, x: 0, duration: 1, ease: 'expo.out', stagger: 0.07,
      scrollTrigger: { trigger: '[data-specs]', start: 'top 88%' }
    });
  }

  var faqItems = $$('[data-faq] .faq-item');
  if (faqItems.length) {
    gsap.fromTo(faqItems, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.07,
      scrollTrigger: { trigger: '[data-faq]', start: 'top 85%' }
    });
  }

  /* Contadores */
  var stats = $('[data-stats]');
  if (stats) {
    $$('[data-count]', stats).forEach(function (el) { el.textContent = '0'; });
    gsap.fromTo($$('dd', stats), { yPercent: 40, opacity: 0 }, {
      yPercent: 0, opacity: 1, duration: 1.2, ease: 'expo.out', stagger: 0.12,
      scrollTrigger: { trigger: stats, start: 'top 85%' }
    });
    ScrollTrigger.create({
      trigger: stats, start: 'top 85%', once: true,
      onEnter: function () {
        $$('[data-count]', stats).forEach(function (el, i) {
          var target = parseInt(el.getAttribute('data-count'), 10) || 0;
          var obj = { v: 0 };
          gsap.to(obj, { v: target, duration: target > 9 ? 2.2 : 1.4, delay: i * 0.12, ease: 'power3.out', onUpdate: function () { el.textContent = String(Math.round(obj.v)); } });
        });
      }
    });
  }

  /* Monograma do CTA final */
  var ctaLines = $$('[data-mono-cta] line');
  if (ctaLines.length) {
    gsap.set(ctaLines, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.to(ctaLines, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', stagger: 0.15, scrollTrigger: { trigger: '[data-cta]', start: 'top 70%' } });
  }

  /* Estátua da Justiça */
  var statue = $('[data-justice-statue]');
  var justice = $('[data-justice]');
  if (statue && justice) {
    gsap.fromTo(statue, { opacity: 0, yPercent: 12, scale: 1.08 }, { opacity: 1, yPercent: 0, scale: 1, duration: 2, ease: 'expo.out', scrollTrigger: { trigger: justice, start: 'top 75%' } });
    gsap.fromTo('[data-justice-light]', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 2.6, ease: 'power2.out', scrollTrigger: { trigger: justice, start: 'top 75%' } });
    gsap.to(statue, { y: -60, rotate: -1.5, ease: 'none', scrollTrigger: { trigger: justice, start: 'top bottom', end: 'bottom top', scrub: true } });
    if (finePointer) {
      gsap.set(statue, { transformPerspective: 1400, transformOrigin: '60% 100%' });
      var sR = gsap.quickTo(statue, 'rotationY', { duration: 1.4, ease: 'power3.out' });
      var sX = gsap.quickTo(statue, 'x', { duration: 1.4, ease: 'power3.out' });
      justice.addEventListener('mousemove', function (e) {
        var nx = e.clientX / window.innerWidth - 0.5;
        sR(nx * -10); sX(nx * -30);
      });
      justice.addEventListener('mouseleave', function () { sR(0); sX(0); });
    }
  }

  /* Retrato do CTA final */
  var ctaPortrait = $('[data-cta-portrait]');
  if (ctaPortrait) {
    gsap.fromTo(ctaPortrait, { yPercent: 14, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: '[data-cta]', start: 'top 65%' } });
  }

  /* Fachada com parallax */
  var facade = $('[data-parallax-img]');
  if (facade) {
    gsap.fromTo(facade, { yPercent: -6, scale: 1.16 }, { yPercent: 6, scale: 1.16, ease: 'none', scrollTrigger: { trigger: facade.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* ---------- Inclinação 3D com brilho ---------- */
  if (finePointer) {
    $$('[data-tilt]').forEach(function (el) {
      var glare = document.createElement('span');
      glare.className = 'tilt-glare';
      glare.setAttribute('aria-hidden', 'true');
      el.appendChild(glare);
      gsap.set(el, { transformPerspective: 1000 });
      var rx = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3.out' });
      var ry = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3.out' });
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var nx = (e.clientX - r.left) / r.width - 0.5;
        var ny = (e.clientY - r.top) / r.height - 0.5;
        rx(ny * -9); ry(nx * 11);
        glare.style.setProperty('--gx', ((nx + 0.5) * 100) + '%');
        glare.style.setProperty('--gy', ((ny + 0.5) * 100) + '%');
        glare.style.opacity = '1';
      });
      el.addEventListener('mouseleave', function () { rx(0); ry(0); glare.style.opacity = '0'; });
    });
  }

  /* ---------- Botões magnéticos ---------- */
  if (finePointer) {
    $$('[data-magnetic]').forEach(function (el) {
      var mx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
      var my = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        mx((e.clientX - (r.left + r.width / 2)) * 0.32);
        my((e.clientY - (r.top + r.height / 2)) * 0.4);
      });
      el.addEventListener('mouseleave', function () {
        gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.4)', overwrite: true });
      });
    });
  }

  /* ---------- Cursor personalizado ---------- */
  var cursor = $('[data-cursor]');
  var dot = $('[data-cursor-dot]');
  if (finePointer && cursor && dot) {
    root.classList.add('has-cursor');
    var cx = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3.out' });
    var cy = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3.out' });
    var dx = gsap.quickTo(dot, 'x', { duration: 0.08 });
    var dy = gsap.quickTo(dot, 'y', { duration: 0.08 });
    window.addEventListener('mousemove', function (e) {
      cx(e.clientX); cy(e.clientY); dx(e.clientX); dy(e.clientY);
      cursor.classList.add('is-visible'); dot.classList.add('is-visible');
    });
    document.addEventListener('mouseleave', function () { cursor.classList.remove('is-visible'); dot.classList.remove('is-visible'); });
    document.addEventListener('mousedown', function () { cursor.classList.add('is-down'); });
    document.addEventListener('mouseup', function () { cursor.classList.remove('is-down'); });
  }

  /* ---------- Botão flutuante ---------- */
  var waFloat = $('[data-wa-float]');
  if (waFloat && hero && window.innerWidth >= 1024) {
    waFloat.classList.add('is-hidden');
    ScrollTrigger.create({
      trigger: hero, start: 'bottom 75%',
      onEnter: function () { waFloat.classList.remove('is-hidden'); },
      onLeaveBack: function () { waFloat.classList.add('is-hidden'); }
    });
  }

  /* ---------- Ano-safra ---------- */
  var safra = $('[data-safra]');
  var mm = gsap.matchMedia();

  mm.add('(min-width: 1024px)', function () {
    if (!safra) return;
    safra.classList.add('is-horizontal');
    var pinEl = $('[data-safra-pin]', safra);
    var track = $('[data-safra-track]', safra);
    var progress = $('[data-safra-progress]', safra);
    var box = track.parentElement;
    var distance = function () {
      var cs = getComputedStyle(box);
      var inner = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      return Math.max(0, track.scrollWidth - inner);
    };
    var tween;
    var mark = function () {
      var done = tween && tween.progress() > 0.97;
      var line = window.innerWidth * 0.7;
      stages.forEach(function (s) { s.classList.toggle('is-active', done || s.getBoundingClientRect().left < line); });
    };
    tween = gsap.to(track, {
      x: function () { return -distance(); },
      ease: 'none',
      onUpdate: mark,
      scrollTrigger: {
        trigger: pinEl, start: 'top top',
        end: function () { return '+=' + Math.max(distance() * 1.2, window.innerHeight * 0.8); },
        pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1, onRefresh: mark
      }
    });
    var prog = gsap.fromTo(progress, { scaleX: 0.08 }, {
      scaleX: 1, ease: 'none',
      scrollTrigger: {
        trigger: pinEl, start: 'top top',
        end: function () { return '+=' + Math.max(distance() * 1.2, window.innerHeight * 0.8); },
        scrub: 0.8, invalidateOnRefresh: true
      }
    });
    var titleTweens = stages.map(function (s) {
      return gsap.fromTo($('h4', s), { xPercent: 18, opacity: 0.3 }, {
        xPercent: 0, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: s, containerAnimation: tween, start: 'left 95%', end: 'left 55%', scrub: true }
      });
    });
    mark();
    return function () {
      safra.classList.remove('is-horizontal');
      titleTweens.forEach(function (t) { if (t.scrollTrigger) t.scrollTrigger.kill(); t.kill(); });
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      if (prog.scrollTrigger) prog.scrollTrigger.kill();
      gsap.set(track, { clearProps: 'transform' });
      stages.forEach(function (s) { s.classList.remove('is-active'); gsap.set($('h4', s), { clearProps: 'all' }); });
    };
  });

  mm.add('(max-width: 1023px)', function () {
    var triggers = stages.map(function (s) {
      return ScrollTrigger.create({
        trigger: s, start: 'top 70%', once: true,
        onEnter: function () {
          s.classList.add('is-active');
          gsap.fromTo(s.querySelector('.stage-body'), { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 1, ease: 'expo.out' });
        }
      });
    });
    return function () { triggers.forEach(function (t) { t.kill(); }); };
  });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
})();
