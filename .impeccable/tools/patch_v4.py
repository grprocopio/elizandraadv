import io, re
from PIL import Image

# --- statue asset: crop to alpha bbox with margin ---
st = Image.open('.impeccable/src/stock/justica-cut.png')
bb = st.getchannel('A').getbbox()
m = 30
st = st.crop((max(0, bb[0] - m), max(0, bb[1] - m), min(st.width, bb[2] + m), st.height))
st.save('assets/estatua-justica.png', optimize=True)
print('statue', st.size)
SW, SH = st.size

p = 'index.html'
s = io.open(p, encoding='utf-8').read()


def rep(a, b):
    global s
    assert a in s, a[:90]
    s = s.replace(a, b)


rep('family=Bodoni+Moda:', 'family=Anton&family=Bodoni+Moda:')

start = s.index('      <!-- palco: halo, retrato e nome -->')
end = s.index('    </section>', start)
WA = 'https://wa.me/5555996098051?text=Olá,%20vim%20pelo%20site%20e%20gostaria%20de%20uma%20orientação'
hero = '''      <!-- palco: nome, halo e retrato -->
      <div class="relative h-[70svh] min-h-[30rem] lg:absolute lg:inset-0 lg:h-auto">
        <div class="absolute inset-x-0 bottom-[2%] z-20 lg:bottom-auto lg:top-[14svh] lg:z-0">
          <div class="container-page">
            <h1 class="hero-name text-center lg:text-left" aria-label="Elizandra Girardon" data-hero-name>
              <span class="word" aria-hidden="true">Elizandra</span><br><span class="word" aria-hidden="true">Girardon</span>
            </h1>
          </div>
        </div>
        <div class="hero-halo absolute left-1/2 top-[10%] aspect-square w-[120%] -translate-x-1/2 sm:w-[90%] lg:left-[68%] lg:top-[4%] lg:w-[min(56rem,58vw)]" data-halo aria-hidden="true"></div>
        <div class="hero-portrait-wrap absolute bottom-0 left-1/2 z-10 h-[90%] -translate-x-1/2 lg:left-[68%] lg:h-[92svh]" data-portrait>
          <div class="h-full" data-portrait-inner>
          <img class="hero-portrait h-full w-auto max-w-none object-contain object-bottom" src="assets/elizandra-hero-recorte.png" width="858" height="1680" alt="Dra. Elizandra Girardon, de blazer vermelho, olhando para a câmera com os braços cruzados" fetchpriority="high" decoding="async">
          </div>
        </div>
      </div>

      <!-- conteúdo -->
      <div class="container-page relative z-30 pb-16 pt-6 lg:absolute lg:inset-x-0 lg:bottom-0 lg:pb-[7svh] lg:pt-0">
        <div class="lg:max-w-[30rem]">
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

# --- Atuação intro with Lady Justice ---
rep('''      <div class="bg-navy-900 pb-20 lg:pb-28">
        <div class="container-page">
          <h2 id="atuacao-titulo" class="display max-w-[18ch] text-[clamp(2.4rem,5.6vw,5.5rem)] text-ivory" data-split>Duas especialidades e um mesmo olhar: o de quem conhece o banco por dentro.</h2>
        </div>
      </div>''', '''      <div class="justice relative overflow-hidden bg-navy-900" data-justice>
        <div class="justice-light pointer-events-none absolute -right-[20%] top-[10%] aspect-square w-[110%] lg:right-[-6%] lg:top-[-6%] lg:w-[min(60rem,62vw)]" aria-hidden="true" data-justice-light></div>
        <div class="container-page relative z-10 grid lg:min-h-[46rem] lg:grid-cols-12 lg:items-center">
          <div class="pt-4 lg:col-span-7 lg:py-24">
            <h2 id="atuacao-titulo" class="display max-w-[18ch] text-[clamp(2.4rem,5.2vw,5.25rem)] text-ivory" data-split>Duas especialidades e um mesmo olhar: o de quem conhece o banco por dentro.</h2>
            <p class="mt-8 max-w-[44ch] text-[1.06rem] leading-[1.75] text-ivory/80" data-reveal>A balança tem dois pratos. De um lado, o banco, que conhece cada cláusula do contrato. Do outro, quem produz e quem consome, que merece uma defesa à altura.</p>
          </div>
        </div>
        <img class="justice-statue relative z-0 ml-auto block w-[115%] max-w-none translate-x-[8%] lg:absolute lg:bottom-0 lg:right-[-3%] lg:w-auto lg:translate-x-0 lg:h-[100%]" src="assets/estatua-justica.png" width="''' + str(SW) + '''" height="''' + str(SH) + '''" loading="lazy" decoding="async" alt="Estátua de bronze da Justiça, de olhos vendados, erguendo a balança" data-justice-statue>
      </div>''')

io.open(p, 'w', encoding='utf-8').write(s)
print('html ok')
