import io, re

p = 'index.html'
s = io.open(p, encoding='utf-8').read()


def rep(a, b):
    global s
    assert a in s, a[:90]
    s = s.replace(a, b)


IG_URL = 'https://www.instagram.com/adv.elizandragirardon/'
WA_URL = 'https://wa.me/5555996098051?text=Olá,%20vim%20pelo%20site%20e%20gostaria%20de%20uma%20orientação'
WA_PATH = re.search(r'<path d="(M17\.47[^"]+)"', s).group(1)
WA_SVG = '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="' + WA_PATH + '"/></svg>'
IG_SVG = ('<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">'
          '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>')
PIN_SVG = ('<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">'
           '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/></svg>')
TEL_SVG = ('<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">'
           '<path d="M5 3.5h3.2l1.6 4.2-2.1 1.4a11 11 0 0 0 5.2 5.2l1.4-2.1 4.2 1.6V17a2.5 2.5 0 0 1-2.7 2.5C9.6 19 5 14.4 4.5 8.2A2.5 2.5 0 0 1 5 3.5z"/></svg>')
MAPS = 'https://www.google.com/maps/search/?api=1&amp;query=Av.+Fernando+Ferrari,+1161,+Santa+Maria,+RS,+97050-801'


def icon(href, label, svg, ext=True):
    tgt = ' target="_blank" rel="noopener"' if ext else ''
    return ('<a data-magnetic class="social-btn" href="' + href + '"' + tgt + ' aria-label="' + label + '" data-cursor-text="' + label.split(' ')[0] + '">' + svg + '</a>')


# Instagram
s = re.sub(r'  - \[@PERFIL\] .*\n', '', s)
rep('"sameAs": ["https://www.instagram.com/[@PERFIL]"]', '"sameAs": ["' + IG_URL + '"]')

# Footer contacts: logos instead of names
rep('''        <ul class="space-y-3">
          <li><a class="link-underline hover:text-ivory" href="''' + WA_URL + '''" target="_blank" rel="noopener">WhatsApp</a></li>
          <!-- PREENCHER: Instagram -->
          <li><a class="link-underline hover:text-ivory" href="https://www.instagram.com/[@PERFIL]" target="_blank" rel="noopener">Instagram</a></li>
        </ul>''', '''        <ul class="flex flex-wrap gap-3" aria-label="Contatos">
          <li>''' + icon(WA_URL, 'WhatsApp', WA_SVG) + '''</li>
          <li>''' + icon(IG_URL, 'Instagram', IG_SVG) + '''</li>
          <li>''' + icon('tel:+5555996098051', 'Telefone (55) 99609-8051', TEL_SVG, False) + '''</li>
          <li>''' + icon(MAPS, 'Mapa do escritório', PIN_SVG) + '''</li>
        </ul>''')

# Endereço: icon row under the buttons
rep('''                        <a class="btn-line" href="''' + MAPS + '''" target="_blank" rel="noopener" data-cursor-text="Mapa">Ver no mapa</a>
          </div>''', '''            <a class="btn-line" href="''' + MAPS + '''" target="_blank" rel="noopener" data-cursor-text="Mapa">Ver no mapa</a>
          </div>
          <ul class="mt-8 flex flex-wrap gap-3" aria-label="Contatos">
            <li>''' + icon(WA_URL, 'WhatsApp', WA_SVG) + '''</li>
            <li>''' + icon(IG_URL, 'Instagram', IG_SVG) + '''</li>
            <li>''' + icon('tel:+5555996098051', 'Telefone (55) 99609-8051', TEL_SVG, False) + '''</li>
          </ul>''')

# Hero background: office at dusk, low exposure
rep('''    <section id="inicio" class="relative overflow-hidden bg-navy-900 lg:h-[100svh] lg:min-h-[44rem]" data-hero>
''', '''    <section id="inicio" class="relative overflow-hidden bg-navy-900 lg:h-[100svh] lg:min-h-[44rem]" data-hero>
      <!-- fundo: fachada do escritório com exposição baixa -->
      <div class="hero-bg pointer-events-none absolute inset-0" aria-hidden="true" data-hero-bg>
        <img class="hero-bg-img h-full w-full object-cover object-[64%_45%]" src="assets/hero-escritorio-fundo.jpg" width="2400" height="1339" alt="" decoding="async" data-hero-bg-img>
        <div class="hero-bg-shade absolute inset-0"></div>
      </div>
''')

# Advogada: new high-quality portrait
rep('''<img class="aspect-square w-full object-cover" src="assets/elizandra-perfil.jpg" width="845" height="845" loading="lazy" decoding="async" alt="Retrato da Dra. Elizandra Girardon, de blazer branco, sorrindo, em ambiente com luz âmbar">''',
    '''<img class="aspect-[4/5] w-full object-cover object-[50%_32%]" src="assets/elizandra-perfil.jpg" width="1067" height="1600" loading="lazy" decoding="async" alt="Dra. Elizandra Girardon sentada à mesa do escritório, de blazer branco, sorrindo, com estantes de livros ao fundo">''')

# Endereço: new facade photo
rep('''src="assets/escritorio-fachada.jpg" width="1259" height="1555" loading="lazy" decoding="async" data-parallax-img alt="Fachada branca do escritório Elizandra Girardon Advocacia, com o monograma EG em destaque e janelas de vidro">''',
    '''src="assets/escritorio-fachada.jpg" width="1229" height="1536" loading="lazy" decoding="async" data-parallax-img alt="Fachada do escritório Elizandra Girardon Advocacia ao entardecer, com o monograma EG na torre branca">''')

# CTA: white-suit cut-out
rep('''        <a data-magnetic class="btn-primary mt-10" href="''' + WA_URL + '''" target="_blank" rel="noopener">
          Conversar pelo WhatsApp
          <svg class="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5"/></svg>
        </a>
      </div>
    </section>''', '''        <a data-magnetic class="btn-primary mt-10" href="''' + WA_URL + '''" target="_blank" rel="noopener">
          Conversar pelo WhatsApp
          <svg class="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5"/></svg>
        </a>
      </div>
      <img class="cta-portrait relative z-10 mx-auto -mb-28 mt-14 block h-[30rem] w-auto sm:-mb-36 lg:absolute lg:bottom-0 lg:right-[4%] lg:mb-0 lg:mt-0 lg:h-[84%]" src="assets/elizandra-branco-recorte.png" width="1100" height="1374" loading="lazy" decoding="async" alt="Dra. Elizandra Girardon de terno branco, sorrindo, com os braços cruzados" data-cta-portrait>
    </section>''')

io.open(p, 'w', encoding='utf-8').write(s)
print('ok', '[@PERFIL]' in s, s.count('social-btn'))
