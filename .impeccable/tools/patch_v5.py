import io

p = 'index.html'
s = io.open(p, encoding='utf-8').read()
start = s.index('      <!-- palco: nome, halo e retrato -->')
end = s.index('    </section>', start)
WA = 'https://wa.me/5555996098051?text=Olá,%20vim%20pelo%20site%20e%20gostaria%20de%20uma%20orientação'
hero = '''      <!-- palco: halo e retrato (não recebe cliques) -->
      <div class="pointer-events-none relative z-10 h-[64svh] min-h-[27rem] lg:absolute lg:inset-0 lg:h-auto">
        <div class="hero-halo absolute left-1/2 top-[10%] aspect-square w-[120%] -translate-x-1/2 sm:w-[90%] lg:left-[73%] lg:top-[4%] lg:w-[min(56rem,58vw)]" data-halo aria-hidden="true"></div>
        <div class="hero-portrait-wrap absolute bottom-0 left-1/2 h-[96%] -translate-x-1/2 lg:left-[73%] lg:h-[92svh]" data-portrait>
          <div class="h-full" data-portrait-inner>
          <img class="hero-portrait h-full w-auto max-w-none object-contain object-bottom" src="assets/elizandra-hero-recorte.webp" width="858" height="1680" alt="Dra. Elizandra Girardon, de blazer vermelho, olhando para a câmera com os braços cruzados" fetchpriority="high" decoding="async">
          </div>
        </div>
      </div>

      <!-- conteúdo: nome e texto em sequência, nunca sobrepostos -->
      <div class="container-page relative z-30 pb-16 lg:z-0 lg:flex lg:min-h-[100svh] lg:flex-col lg:pb-[6svh] lg:pt-[max(6.5rem,13svh)]">
        <h1 class="hero-name relative -mt-[4.6rem] text-center sm:-mt-[6rem] lg:mt-0 lg:text-left" aria-label="Elizandra Girardon" data-hero-name>
          <span class="word" aria-hidden="true">Elizandra</span><br><span class="word" aria-hidden="true">Girardon</span>
        </h1>
        <div class="mt-8 lg:mt-auto lg:max-w-[30rem] lg:pt-10">
          <p class="display text-[1.65rem] italic leading-tight text-amber-soft lg:text-[1.9rem]" data-hero-fade>Direito Bancário e Direito do Agronegócio</p>
          <p class="mt-4 text-[1.05rem] leading-relaxed text-ivory/85" data-hero-fade>Defesa técnica para quem produz, empreende e precisa proteger o próprio patrimônio diante dos bancos.</p>
          <div class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4" data-hero-fade>
            <a data-magnetic class="btn-primary" href="''' + WA + '''" target="_blank" rel="noopener">
              Conversar pelo WhatsApp
              <svg class="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5"/></svg>
            </a>
            <a class="link-underline text-[0.95rem] text-ivory/85 hover:text-ivory" href="#atuacao">Ver áreas de atuação</a>
          </div>
          <p class="tabular mt-7 flex flex-wrap gap-x-5 gap-y-1 border-t border-amber/30 pt-4 text-[0.92rem] text-ivory/75" data-hero-fade>
            <span>OAB/RS 100.183</span><span>OAB/SP 543.297</span><span>24 anos no sistema financeiro</span>
          </p>
        </div>
      </div>
'''
s = s[:start] + hero + s[end:]
s = s.replace('<section id="inicio" class="relative overflow-hidden bg-navy-900 lg:h-[100svh] lg:min-h-[44rem]" data-hero>',
              '<section id="inicio" class="relative overflow-hidden bg-navy-900" data-hero>')
assert 'class="relative overflow-hidden bg-navy-900" data-hero>' in s
io.open(p, 'w', encoding='utf-8').write(s)
print('ok')
