/* Diagnóstico de fluidez: só carrega com ?diag no endereço.
   Mostra quadros por segundo e permite desligar cada efeito para achar o que trava no aparelho real. */
(function () {
  'use strict';
  var css = document.createElement('style');
  css.textContent = [
    '#diag{position:fixed;left:8px;bottom:8px;z-index:9999;width:min(300px,calc(100vw - 16px));max-height:70vh;overflow:auto;',
    'background:rgba(20,6,10,.94);color:#EFE5D4;font:13px/1.35 system-ui,sans-serif;border:1px solid #D9C3A0;border-radius:10px;padding:10px 12px}',
    '#diag b{color:#D9C3A0}#diag label{display:flex;gap:8px;align-items:center;padding:5px 0;border-top:1px solid rgba(239,229,212,.12)}',
    '#diag input{width:18px;height:18px;accent-color:#D9C3A0}#diag .big{font-size:22px;font-weight:600}',
    '#diag button{background:none;border:1px solid #D9C3A0;color:#EFE5D4;border-radius:6px;padding:3px 8px;font:inherit}',
    '#diag.min .body{display:none}',
    'html.d-nobg .hero-bg,html.d-nobg .hero-halo,html.d-nobg .justice-light,html.d-nobg [data-field]{display:none!important}',
    'html.d-nomarquee .marquee-track{display:none!important}',
    'html.d-nopulse .wa-float::after{animation:none!important;display:none!important}',
    'html.d-nostories [data-story]{display:none!important}',
    'html.d-nometal .hero-name .word-in{background:none!important;-webkit-text-fill-color:#EFE5D4!important;color:#EFE5D4!important}',
    'html.d-noshadow *{box-shadow:none!important;filter:none!important;backdrop-filter:none!important}',
    'html.d-noimg img{visibility:hidden!important}'
  ].join('');
  document.head.appendChild(css);

  var opts = [
    ['gsap', 'Todas as animações (GSAP)'],
    ['nobg', 'Fundo da abertura e brilhos'],
    ['nometal', 'Degradê metálico do nome'],
    ['nomarquee', 'Faixa corrida'],
    ['nopulse', 'Pulso do botão do WhatsApp'],
    ['nostories', 'Ilustrações do Agronegócio'],
    ['noshadow', 'Sombras e desfoques'],
    ['noimg', 'Todas as fotos']
  ];
  var box = document.createElement('div');
  box.id = 'diag';
  box.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center"><span><b>Diagnóstico</b></span><button type="button" id="diag-min">minimizar</button></div>' +
    '<div class="body"><div style="margin:8px 0"><span class="big" id="diag-fps">--</span> quadros/s · pior quadro <b id="diag-worst">--</b> ms<br>' +
    'engasgos (quadros &gt; 50 ms) nos últimos 5 s: <b id="diag-jank">--</b></div>' +
    '<div style="opacity:.8;margin-bottom:6px">Marque para DESLIGAR um efeito, role a página e compare.</div>' +
    opts.map(function (o) { return '<label><input type="checkbox" data-opt="' + o[0] + '">' + o[1] + '</label>'; }).join('') +
    '<div style="opacity:.7;margin-top:8px" id="diag-dev"></div></div>';
  document.body.appendChild(box);
  document.getElementById('diag-min').addEventListener('click', function () {
    box.classList.toggle('min');
    this.textContent = box.classList.contains('min') ? 'abrir' : 'minimizar';
  });
  document.getElementById('diag-dev').textContent =
    'Tela ' + innerWidth + '×' + innerHeight + ' · densidade ' + (window.devicePixelRatio || 1) +
    ' · núcleos ' + (navigator.hardwareConcurrency || '?') + ' · ' + navigator.userAgent.replace(/^Mozilla\/5\.0 /, '').slice(0, 90);

  box.addEventListener('change', function (e) {
    var k = e.target.getAttribute('data-opt');
    if (!k) return;
    var on = e.target.checked;
    if (k === 'gsap') {
      if (window.gsap) { on ? window.gsap.globalTimeline.pause() : window.gsap.globalTimeline.resume(); }
      if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(function (t) { on ? t.disable(false) : t.enable(); });
    } else {
      document.documentElement.classList.toggle('d-' + k, on);
    }
  });

  var frames = [], last = performance.now();
  (function tick(now) {
    frames.push([now, now - last]);
    last = now;
    while (frames.length && now - frames[0][0] > 5000) frames.shift();
    requestAnimationFrame(tick);
  })(last);
  setInterval(function () {
    var now = performance.now();
    var lastSec = frames.filter(function (f) { return now - f[0] <= 1000; });
    var worst = 0, jank = 0;
    frames.forEach(function (f) { if (f[1] > worst) worst = f[1]; if (f[1] > 50) jank++; });
    document.getElementById('diag-fps').textContent = lastSec.length;
    document.getElementById('diag-worst').textContent = Math.round(worst);
    document.getElementById('diag-jank').textContent = jank;
  }, 500);
})();
