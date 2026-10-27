import io

p = 'src/site.css'
s = io.open(p, encoding='utf-8').read()

old = '''@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; }
}'''
assert old in s
s = s.replace(old, '')

s += '''
/* ---------- Pré-carregador ---------- */
.preloader { display: none; }
.motion-ready .preloader {
  display: flex; position: fixed; inset: 0; z-index: 95;
  align-items: center; justify-content: center;
  background: var(--navy-deep); clip-path: inset(0% 0% 0% 0%);
}

/* ---------- Cursor ---------- */
.cursor, .cursor-dot { display: none; }
.has-cursor .cursor {
  display: flex; position: fixed; left: 0; top: 0; z-index: 100;
  width: 40px; height: 40px; margin: -20px 0 0 -20px;
  align-items: center; justify-content: center;
  border: 1px solid rgba(216,162,90,.7); border-radius: 50%;
  pointer-events: none; opacity: 0;
  transition: width .45s var(--ease-out), height .45s var(--ease-out), margin .45s var(--ease-out),
              background-color .45s var(--ease-out), border-color .45s, border-width .2s, opacity .3s;
}
.has-cursor .cursor.is-visible { opacity: 1; }
.has-cursor .cursor.is-hover { width: 64px; height: 64px; margin: -32px 0 0 -32px; background: rgba(216,162,90,.12); }
.has-cursor .cursor.has-label { width: 92px; height: 92px; margin: -46px 0 0 -46px; background: var(--amber); border-color: var(--amber); }
.has-cursor .cursor.is-down { border-width: 3px; }
.cursor-label { font-size: .7rem; font-weight: 500; letter-spacing: .14em; text-transform: uppercase; color: var(--navy-deep); opacity: 0; transition: opacity .3s; }
.cursor.has-label .cursor-label { opacity: 1; }
.has-cursor .cursor-dot {
  display: block; position: fixed; left: 0; top: 0; z-index: 101;
  width: 6px; height: 6px; margin: -3px 0 0 -3px; border-radius: 50%;
  background: var(--amber); pointer-events: none; opacity: 0; transition: opacity .3s;
}
.has-cursor .cursor-dot.is-visible { opacity: 1; }
.has-cursor, .has-cursor a, .has-cursor button, .has-cursor summary { cursor: none; }

/* ---------- Progresso de leitura ---------- */
.scroll-progress { position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: var(--amber); transform-origin: left center; transform: scaleX(0); }

/* ---------- Faixa corrida ---------- */
.marquee { overflow: hidden; }
.marquee-track { display: flex; width: max-content; }
.marquee-row { display: flex; flex: none; align-items: center; }
.marquee-item {
  font-family: "Bodoni Moda", Didot, Georgia, serif; font-style: italic; font-optical-sizing: auto;
  font-size: clamp(1.8rem, 4vw, 3.4rem); line-height: 1.1; white-space: nowrap;
  color: var(--ivory); padding: 0 2.2rem;
}
.marquee-sep { width: 1.5rem; height: 1.5rem; flex: none; color: var(--amber); }

/* ---------- Texto que acende ao rolar ---------- */
.scrub-word { display: inline; }

/* ---------- Inclinação 3D ---------- */
[data-tilt] { transform-style: preserve-3d; }
.tilt-glare {
  position: absolute; inset: 0; z-index: 2; pointer-events: none; opacity: 0;
  transition: opacity .5s var(--ease-out);
  background: radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255, 238, 210, .28), rgba(255, 238, 210, 0) 55%);
}

/* ---------- Linhas do bancário: varredura âmbar ---------- */
.clause::before {
  content: ""; position: absolute; inset: 0; z-index: 0;
  background: rgba(216,162,90,.09); transform: scaleX(0); transform-origin: left center;
  transition: transform .7s var(--ease-out);
}
.clause:hover, .clause:focus-visible { background: transparent; }
.clause:hover::before, .clause:focus-visible::before { transform: scaleX(1); }
.clause > span:not(.clause-rule), .clause > svg { position: relative; z-index: 1; }
.clause > span:first-child { transition: transform .6s var(--ease-out), color .4s; }
.clause:hover > span:first-child, .clause:focus-visible > span:first-child { transform: translateX(12px); color: var(--amber-soft); }

/* ---------- WhatsApp: pulso ---------- */
.wa-float::after {
  content: ""; position: absolute; inset: 0; border-radius: 50%;
  border: 1px solid var(--amber); animation: wa-pulse 2.8s var(--ease-out) infinite;
}
@keyframes wa-pulse { 0% { transform: scale(1); opacity: .8; } 100% { transform: scale(1.8); opacity: 0; } }
'''
io.open(p, 'w', encoding='utf-8').write(s)
print('css ok')
