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

  /* ---------- Fotos: decodifica com antecedência, no tempo ocioso ----------
     Evita que a decodificação aconteça no meio da rolagem (picos de ~30 ms por foto). */
  (function predecode() {
    var imgs = $$('img[loading="lazy"]');
    if (!imgs.length) return;
    var idle = window.requestIdleCallback || function (cb) { return setTimeout(cb, 200); };
    var next = function () {
      var img = imgs.shift();
      if (!img) return;
      img.loading = 'eager';
      var go = function () { (img.decode ? img.decode() : Promise.resolve()).catch(function () {}).then(function () { idle(next); }); };
      if (img.complete) go(); else img.addEventListener('load', go, { once: true });
    };
    window.addEventListener('load', function () { setTimeout(function () { idle(next); }, 2500); }, { once: true });
  })();

  /* ---------- Ano-safra: cada ilustração encena a sua etapa ----------
     Entrada ao aparecer (30% visível), depois a história em loop enquanto está na tela.
     Toda história começa e termina no desenho em repouso. Não depende do GSAP. */
  (function safraStories() {
    var arts = $$('[data-story]');
    if (!arts.length || !('IntersectionObserver' in window)) return;
    var io3 = function (k) { return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
    var tr = function (keys, t) {
      if (t <= keys[0][0]) return keys[0][1];
      for (var i = 1; i < keys.length; i++) {
        if (t <= keys[i][0]) {
          var k = io3((t - keys[i - 1][0]) / ((keys[i][0] - keys[i - 1][0]) || 1));
          return keys[i - 1][1] + (keys[i][1] - keys[i - 1][1]) * k;
        }
      }
      return keys[keys.length - 1][1];
    };
    var op = function (n, v) { if (n) n.style.opacity = v; };
    var tf = function (n, v) { if (n) n.style.transform = v; };
    var dash = function (n, v) { if (n) n.style.strokeDashoffset = v; };

    var stories = {
      contrato: { p: 6, u: function (r, t) {
        dash(r.sig, tr([[0, 0], [0.5, 1], [0.8, 1], [2.2, 0]], t));
        op(r.seal, tr([[0, 1], [0.4, 0], [2.4, 0], [2.6, 1]], t));
        tf(r.seal, 'scale(' + tr([[0, 1], [2.4, 1.35], [2.75, 1]], t) + ')');
        op(r.seal2, tr([[0, 0], [3.1, 0], [3.3, 1], [4.8, 1], [5.3, 0]], t));
        tf(r.seal2, 'scale(' + tr([[0, 1.35], [3.1, 1.35], [3.45, 1]], t) + ')');
      } },
      plantio: { p: 6, u: function (r, t) {
        for (var i = 0; i < 4; i++) {
          var d = i * 0.18;
          var sy = tr([[0, 1], [0.5, 0.02], [0.9 + d, 0.02], [1.8 + d, 1]], t);
          var rot = tr([[0, 0], [3.1, 0], [3.5, -14 + i * 2], [4.4, -14 + i * 2], [5.1, 0]], t);
          tf(r['s' + i], 'rotate(' + rot + 'deg) scaleY(' + sy + ')');
        }
        tf(r.coin, 'translateY(' + tr([[0, 0], [2.7, 0], [3.3, 19], [4.4, 19], [5.1, 0]], t) + 'px)');
      } },
      clima: { p: 6.5, u: function (r, t) {
        for (var i = 0; i < 5; i++) {
          var y = 0, o = 1;
          if (t < 3.2) {
            var f = ((t + 1 - i * 0.2) % 1 + 1) % 1;
            y = f * 16; o = f < 0.15 ? f / 0.15 : 1 - (f - 0.15) / 0.85;
          } else { o = Math.min(1, (t - 3.2) / 0.5); }
          tf(r['d' + i], 'translateY(' + y + 'px)'); op(r['d' + i], o);
        }
        dash(r.price, tr([[0, 0], [3.3, 0], [3.6, 1], [3.8, 1], [5.2, 0]], t));
        op(r.arrow, tr([[0, 1], [3.3, 1], [3.45, 0], [5.1, 0], [5.4, 1]], t));
      } },
      colheita: { p: 5.5, u: function (r, t) {
        tf(r.fill, 'scaleX(' + tr([[0, 1], [0.4, 0], [0.7, 0], [2.0, 1]], t) + ')');
        op(r.gap, tr([[0, 0], [2.2, 0], [2.5, 0.4], [2.9, 0], [3.2, 0.4], [3.6, 0]], t));
      } },
      vencimento: { p: 6.5, u: function (r, t) {
        var due = 10, step = 0.16, start = 0.5, arrive = start + due * step;
        var idx = Math.max(0, Math.min(due, Math.floor((t - start) / step)));
        var c = idx % 6, row = Math.floor(idx / 6);
        tf(r.hi, 'translate(' + ((c - 4) * 14) + 'px,' + ((row - 1) * 14) + 'px)');
        op(r.hi, tr([[0, 0], [start, 0], [start + 0.1, 1], [arrive + 1.2, 1], [arrive + 1.6, 0]], t));
        dash(r.ring, tr([[0, 0], [0.35, 1], [arrive + 0.15, 1], [arrive + 1.0, 0]], t));
      } },
      patrimonio: { p: 6.5, u: function (r, t) {
        tf(r.shackle, 'translateY(' + tr([[0, -7], [1.0, -7], [1.35, 0], [4.3, 0], [4.9, -7]], t) + 'px)');
        tf(r.body, 'scale(' + tr([[0, 1], [1.3, 1], [1.5, 1.08], [1.8, 1]], t) + ')');
        op(r.chain, tr([[0, 0], [1.6, 0], [1.9, 1], [4.0, 1], [4.4, 0]], t));
        if (r.chain) r.chain.style.strokeDashoffset = String(-(t * 14) % 6);
      } }
    };

    arts.forEach(function (a, i) {
      a._r = {};
      $$('[data-r]', a).forEach(function (n) { a._r[n.getAttribute('data-r')] = n; });
      a._acc = -(1.1 + (i % 3) * 0.6); // espera a entrada e desencontra as etapas
    });
    var last = 0, running = false;
    var frame = function (now) {
      var dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
      var any = false;
      last = now;
      arts.forEach(function (a) {
        if (!a._in || !a._vis) return; // fora da tela: o relógio para
        any = true;
        var s = stories[a.getAttribute('data-story')];
        a._acc += dt;
        if (s && a._acc > 0) s.u(a._r, a._acc % s.p);
      });
      if (any && !document.hidden) requestAnimationFrame(frame);
      else { running = false; last = 0; } // nada visível: o laço dorme
    };
    var wake = function () { if (!running) { running = true; requestAnimationFrame(frame); } };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var a = e.target;
        a._vis = e.isIntersecting;
        if (e.isIntersecting && !a._in) { a._in = true; a.classList.add('is-in'); }
      });
      wake();
    }, { threshold: 0.3 });
    arts.forEach(function (a) { io.observe(a); });
    document.addEventListener('visibilitychange', function () { if (!document.hidden) wake(); });
  })();

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

  /* ---------- Âncoras: rolagem nativa (sem Lenis), compensando o header fixo ---------- */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = id === '#inicio' ? 0 : target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: top, behavior: 'smooth' });
      if (history.replaceState) history.replaceState(null, '', id);
    });
  });

  /* ---------- Barra de progresso de leitura ---------- */
  var progressBar = $('[data-scroll-progress]');
  if (progressBar) {
    gsap.fromTo(progressBar, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });
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
  // Nome em 3 peças (Dra. / Elizandra / Girardon), não letra a letra: 3 camadas em vez de ~19.
  var nameWords = [];
  if (heroName) {
    $$('.word', heroName).forEach(function (word) {
      var inner = document.createElement('span');
      inner.className = 'word-in';
      inner.textContent = word.textContent;
      word.textContent = '';
      word.appendChild(inner);
      nameWords.push(inner);
    });
    heroName.classList.add('is-split');
    heroName.style.visibility = 'visible';
  }

  // Divide o título em palavras, preservando destaques internos (ex.: <em class="hl">).
  var splitWords = function (el, cls) {
    var parts = [];
    Array.prototype.forEach.call(el.childNodes, function (n) {
      var text = n.textContent.trim();
      if (!text) return;
      var wrap = n.nodeType === 1 ? { tag: n.tagName.toLowerCase(), cls: n.className } : null;
      text.split(/\s+/).forEach(function (w) { parts.push({ w: w, wrap: wrap }); });
    });
    el.setAttribute('aria-label', el.textContent.trim().replace(/\s+/g, ' '));
    el.innerHTML = parts.map(function (p) {
      var w = p.wrap ? '<' + p.wrap.tag + (p.wrap.cls ? ' class="' + p.wrap.cls + '"' : '') + '>' + p.w + '</' + p.wrap.tag + '>' : p.w;
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
    tl.fromTo(heroBg, { opacity: 0 }, { opacity: 1, duration: 1.6, ease: 'power2.out' }, 0)
      .to(halo, { opacity: 1, duration: 2.4, ease: 'power2.out' }, 0)
      .fromTo(fieldLines, { scaleX: 0, transformOrigin: '50% 50%' }, { scaleX: 1, duration: 1.8, stagger: { each: 0.05, from: 'end' } }, 0)
      .to(portraitWrap, { opacity: 1, duration: 1.4, ease: 'power2.out' }, 0.05)
      .fromTo(portraitInner, { y: 90, scale: 1.04 }, { y: 0, scale: 1, duration: 2.1 }, 0.05)
      .fromTo(nameWords, { yPercent: 112 }, { yPercent: 0, duration: 1.5, stagger: 0.12, onComplete: function () { heroName.classList.add('intro-done'); gsap.set(nameWords, { clearProps: 'transform' }); } }, 0.3)
      .to(monoLines, { strokeDashoffset: 0, duration: 1.1, stagger: 0.12, ease: 'power2.inOut' }, 0.2)
      .fromTo(fades, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.12 }, 0.8);
    return tl;
  };

  if (introAllowed && preloader) {
    document.documentElement.style.overflow = 'hidden';
    var pLines = $$('line', preloader);
    var pText = $$('[data-preloader-text]', preloader);
    var pCount = $('[data-preloader-count]', preloader);
    var counter = { v: 0 };
    var unlock = function () {
      preloader.style.display = 'none';
      document.documentElement.style.overflow = '';
    };
    var pre = gsap.timeline();
    setTimeout(unlock, 3000); // segurança: nunca prende a rolagem
    gsap.set(pLines, { strokeDasharray: 1, strokeDashoffset: 1 });
    pre.to(pLines, { strokeDashoffset: 0, duration: 0.5, stagger: 0.05, ease: 'power2.inOut' }, 0)
      .fromTo(pText, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: 'expo.out', stagger: 0.05 }, 0.12)
      .to(counter, { v: 100, duration: 0.7, ease: 'power2.inOut', onUpdate: function () { if (pCount) pCount.textContent = String(Math.round(counter.v)); } }, 0)
      .to($$('[data-preloader-inner]', preloader), { yPercent: -30, opacity: 0, duration: 0.35, ease: 'power3.in' }, 0.7)
      .to(preloader, { yPercent: -100, duration: 0.7, ease: 'expo.inOut', onComplete: unlock }, 0.8)
      .add(heroIntro(), 0.95);
  } else if (introAllowed) {
    heroIntro();
  } else {
    if (preloader) preloader.style.display = 'none';
    gsap.set([heroBg, halo, portraitWrap].concat(fades), { opacity: 1 });
    if (heroName) heroName.classList.add('intro-done');
    gsap.set(monoLines, { strokeDashoffset: 0 });
  }

  /* ---------- Hero: reage ao mouse ---------- */
  if (finePointer && hero && portraitImg) {
    gsap.set(portraitImg, { transformPerspective: 1200, transformOrigin: '50% 100%' });
    var pX = gsap.quickTo(portraitImg, 'x', { duration: 1.2, ease: 'power3.out' });
    var pR = gsap.quickTo(portraitImg, 'rotationY', { duration: 1.2, ease: 'power3.out' });
    var nX = gsap.quickTo(heroName, 'x', { duration: 1.4, ease: 'power3.out' });
    hero.addEventListener('mousemove', function (e) {
      var nx = e.clientX / window.innerWidth - 0.5;
      pX(nx * -22); pR(nx * 7);
      nX(nx * 34);
    }, { passive: true });
    hero.addEventListener('mouseleave', function () { pX(0); pR(0); nX(0); });
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
      gsap.fromTo(el, { opacity: 0, y: 48 }, {
        opacity: 1, y: 0, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
        onComplete: function () { gsap.set(el, { clearProps: 'opacity' }); }
      });
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
  }

  /* Retrato do CTA final */
  var ctaPortrait = $('[data-cta-portrait]');
  if (ctaPortrait) {
    gsap.fromTo(ctaPortrait, { yPercent: 14, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: '[data-cta]', start: 'top 65%' } });
  }

  /* ---------- Inclinação 3D (só transform, sem repintar a foto) ---------- */
  if (finePointer) {
    $$('[data-tilt]').forEach(function (el) {
      gsap.set(el, { transformPerspective: 1000 });
      var rx = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3.out' });
      var ry = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3.out' });
      var box = null;
      el.addEventListener('mouseenter', function () { box = el.getBoundingClientRect(); }, { passive: true });
      el.addEventListener('mousemove', function (e) {
        var r = box || el.getBoundingClientRect();
        rx(((e.clientY - r.top) / r.height - 0.5) * -9);
        ry(((e.clientX - r.left) / r.width - 0.5) * 11);
      }, { passive: true });
      el.addEventListener('mouseleave', function () { box = null; rx(0); ry(0); }, { passive: true });
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
      }, { passive: true });
      el.addEventListener('mouseleave', function () {
        gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.4)', overwrite: true });
      });
    });
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

  mm.add('all', function () {
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
