import io, re

p = 'index.html'
s = io.open(p, encoding='utf-8').read()


def rep(a, b):
    global s
    assert a in s, a[:90]
    s = s.replace(a, b)


rep("""      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduce) {
        document.documentElement.classList.add('motion-ready');
        // Segurança: se as bibliotecas não carregarem, mostra tudo.
        setTimeout(function () {
          if (!window.__motionStarted) document.documentElement.classList.remove('motion-ready');
        }, 2500);
      }""", """      document.documentElement.classList.add('motion-ready');
      // Segurança: se as bibliotecas não carregarem, mostra tudo.
      setTimeout(function () {
        if (!window.__motionStarted) document.documentElement.classList.remove('motion-ready');
      }, 3000);""")
rep("// Ativa os estados iniciais da animação só quando há JS e o usuário aceita movimento.",
    "// Ativa os estados iniciais da animação quando há JavaScript.")

# placeholder header comment
s = re.sub(r'  - 55DDDNUMERO .*\n', '  - WhatsApp configurado como (55) 99609-8051: confirme que este número tem WhatsApp\n', s)
s = re.sub(r'  - \[ENDEREÇO\] .*\n', '', s)
s = re.sub(r'  - \[CIDADE\] .*\n', '', s)
s = re.sub(r'  - \[HORÁRIO\] .*\n', '', s)

s = s.replace('55DDDNUMERO', '5555996098051')
rep('"telephone": "+5555996098051"', '"telephone": "+55 55 99609-8051"')
rep('''      "streetAddress": "[ENDEREÇO]",
      "addressLocality": "[CIDADE]",
      "addressCountry": "BR"
    },''', '''      "streetAddress": "Av. Fernando Ferrari, 1161, Nossa Sra. de Lourdes",
      "addressLocality": "Santa Maria",
      "addressRegion": "RS",
      "postalCode": "97050-801",
      "addressCountry": "BR"
    },
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:30",
      "closes": "17:30"
    }],''')

rep('''              <!-- PREENCHER: endereço -->
              <dd class="mt-1 text-lg text-ivory">[ENDEREÇO], [CIDADE]</dd>''',
    '''              <dd class="mt-1 text-lg leading-snug text-ivory">Av. Fernando Ferrari, 1161<br>Nossa Sra. de Lourdes, Santa Maria, RS<br><span class="tabular text-ivory/70">CEP 97050-801</span></dd>''')
rep('''              <!-- PREENCHER: horário -->
              <dd class="mt-1 text-lg text-ivory">[HORÁRIO]</dd>
            </div>''', '''              <dd class="tabular mt-1 text-lg text-ivory">Segunda a sexta, das 8h30 às 17h30</dd>
            </div>
            <div>
              <dt class="text-sm text-ivory-muted">Telefone e WhatsApp</dt>
              <dd class="tabular mt-1 text-lg"><a class="link-underline text-ivory" href="tel:+5555996098051">(55) 99609-8051</a></dd>
            </div>''')
rep('''<a class="btn-line" href="https://wa.me/5555996098051?text=Olá,%20pode%20me%20enviar%20a%20localização%20do%20escritório?" target="_blank" rel="noopener">Pedir a localização</a>''',
    '''<a class="btn-line" href="https://www.google.com/maps/search/?api=1&amp;query=Av.+Fernando+Ferrari,+1161,+Santa+Maria,+RS,+97050-801" target="_blank" rel="noopener" data-cursor-text="Mapa">Ver no mapa</a>''')
rep('''        <p class="mt-2">[ENDEREÇO], [CIDADE]</p>''',
    '''        <p class="mt-2">Av. Fernando Ferrari, 1161, Nossa Sra. de Lourdes<br>Santa Maria, RS, CEP 97050-801</p>
        <p class="tabular mt-2"><a class="link-underline hover:text-ivory" href="tel:+5555996098051">(55) 99609-8051</a> · Seg. a sex., 8h30 às 17h30</p>''')

rep('width="572" height="1120"', 'width="858" height="1680"')
rep('width="484" height="484"', 'width="845" height="845"')
rep('width="840" height="1038"', 'width="1259" height="1555"')

MONO = '<line x1="47" y1="25.5" x2="68" y2="25.5"/><line x1="53.5" y1="34.5" x2="75" y2="34.5"/><line x1="53.5" y1="34.5" x2="53.5" y2="54"/><line x1="47" y1="43.7" x2="68" y2="43.7"/><line x1="76.5" y1="43" x2="76.5" y2="54"/><line x1="53.5" y1="53.8" x2="77" y2="53.8"/>'
MONO_PL = MONO.replace('<line ', '<line pathLength="1" ')

rep('''  <!-- ================= HEADER ================= -->''', '''  <!-- Pré-carregador (só aparece com JavaScript) -->
  <div class="preloader" data-preloader aria-hidden="true">
    <div class="flex flex-col items-center" data-preloader-inner>
      <svg class="mono h-20 w-20 text-amber" viewBox="45 23 34 33" fill="none" stroke-width="1.1">''' + MONO_PL + '''</svg>
      <span class="mt-7 block overflow-hidden"><span class="block text-[0.8rem] font-medium tracking-[0.34em] text-ivory" data-preloader-text>ELIZANDRA GIRARDON</span></span>
      <span class="mt-2 block overflow-hidden"><span class="block text-[0.7rem] tracking-[0.5em] text-ivory-muted" data-preloader-text>ADVOCACIA</span></span>
    </div>
    <span class="tabular display absolute bottom-8 right-8 text-5xl text-amber/70" data-preloader-count>0</span>
  </div>

  <!-- Cursor personalizado (desktop) -->
  <div class="cursor" data-cursor aria-hidden="true"><span class="cursor-label" data-cursor-label></span></div>
  <div class="cursor-dot" data-cursor-dot aria-hidden="true"></div>

  <!-- ================= HEADER ================= -->''')
rep('''  <header class="site-header fixed inset-x-0 top-0 z-50" data-header>''', '''  <header class="site-header fixed inset-x-0 top-0 z-50" data-header>
    <span class="scroll-progress" data-scroll-progress aria-hidden="true"></span>''')

items = ['Crédito rural', 'Prorrogação de dívidas', 'Superendividamento', 'Revisão de contratos', 'Execuções', 'Busca e apreensão', 'Fraudes bancárias', 'Proteção patrimonial']
row = ''.join('<span class="marquee-item">' + t + '</span><svg class="marquee-sep mono" viewBox="45 23 34 33" fill="none" stroke-width="2.4" aria-hidden="true">' + MONO + '</svg>' for t in items)
rep('''    <!-- ================= O ESCRITÓRIO ================= -->''', '''    <!-- ================= FAIXA DE ATUAÇÃO ================= -->
    <div class="marquee border-y border-amber/20 bg-navy-950 py-6 sm:py-8" data-marquee>
      <p class="sr-only">Áreas de atuação: ''' + ', '.join(items) + '''.</p>
      <div class="marquee-track" data-marquee-track aria-hidden="true"><div class="marquee-row">''' + row + '''</div><div class="marquee-row">''' + row + '''</div></div>
    </div>

    <!-- ================= O ESCRITÓRIO ================= -->''')

rep('''<h2 class="display text-[clamp(2.1rem,4.4vw,4.25rem)] text-ivory lg:col-span-10" data-split>''',
    '''<h2 class="display text-[clamp(2.1rem,4.4vw,4.25rem)] text-ivory lg:col-span-10" data-scrub-words>''')
rep('<ul aria-label="Quem o escritório defende" class="display', '<ul aria-label="Quem o escritório defende" data-audience class="display')

s = s.replace('<a class="btn-primary', '<a data-magnetic class="btn-primary')
rep('<a class="wa-float ', '<a data-magnetic class="wa-float ')
s = s.replace('<a data-magnetic class="btn-primary w-full justify-center"', '<a class="btn-primary w-full justify-center"')

fig = re.search(r'<figure class="portrait-frame[^"]*" data-reveal>', s)
assert fig, 'portrait figure'
s = s.replace(fig.group(0), fig.group(0).replace('data-reveal>', 'data-reveal data-tilt>'))
rep('<figure class="overflow-hidden lg:col-span-6" data-reveal>', '<figure class="relative overflow-hidden lg:col-span-6" data-reveal data-tilt>')

io.open(p, 'w', encoding='utf-8').write(s)
print('magnetic', s.count('data-magnetic'), 'placeholders left:', [x for x in ['[ENDEREÇO]', '[HORÁRIO]', '[CIDADE]', 'DDDNUMERO'] if x in s])
