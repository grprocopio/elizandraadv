# CLAUDE.md

Site de uma página da Elizandra Girardon Advocacia. HTML estático + Tailwind + GSAP/ScrollTrigger, com rolagem nativa.

## Fluidez (pedido da cliente, 2026-10-27)
Não reintroduzir: Lenis ou outra rolagem suave por JS, cursor personalizado, `mix-blend-mode` em elementos fixos,
efeitos que repintam a cada movimento do mouse (brilho com `background` variável), `scroll-behavior: smooth` no `html`.
Animar só `transform`, `opacity` e traço de SVG; ouvintes de mouse passivos; laços de animação que dormem fora da tela;
scrub numérico baixo (≤ 0,3).
Sem pré-carregador e sem animação de entrada na abertura (pedido da cliente, 2026-10-27): foto, nome, textos e botão
aparecem no primeiro quadro, sem depender das bibliotecas. O nome nunca é dividido em letras.
Sem `pin` do ScrollTrigger (nada de prender a rolagem) e sem parallax ligado à rolagem; revelações de fotos sem `clip-path`;
`will-change` só no que se move sempre (retrato, faixa corrida, header).
Fontes locais em `assets/fonts/` (não voltar ao Google Fonts).

## Fontes da verdade (nesta ordem)
1. `PRODUCT.md`: público, objetivo (abrir conversa no WhatsApp) e regras da OAB (Provimento 205/2021).
2. `DESIGN.md`: paleta, tipografia, layout e movimento já decididos.
3. As skills abaixo, como apoio.

Quando uma skill sugerir algo que contraria os dois arquivos acima, os arquivos vencem. Exemplos que NÃO se aplicam aqui:
depoimentos, cases, logos de clientes, preços, contadores de casos, tom de "vendas", e desligar a animação
quando o sistema pede movimento reduzido (decisão da cliente em 2026-10-25).

## Skills do projeto (`.claude/skills/`)
- **impeccable** (v4.8.0): direção de design, auditoria, polimento. O estado do projeto fica em `.impeccable/`.
  Rode `.claude/skills/impeccable/scripts/impeccable context` uma vez por sessão, a partir da raiz do repositório.
- **ui-ux-pro-max**: base consultável de regras de UX, paletas, fontes e presets GSAP. Use como checklist e consulta:
  `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<consulta>" --domain ux`
  `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<consulta>" --stack html-tailwind`
  (o SKILL.md dela usa `${CLAUDE_PLUGIN_ROOT}`; neste repositório o caminho é o acima).
- **landing-page-design** (elayadesign/ai-design-skills): estratégia de landing page, regras de copy, estados, itens de entrega.
  Vale aqui: uma única ação (WhatsApp), seção de frase que acende palavra por palavra, sem palavras soltas na última linha,
  estados de hover/clique/foco, dados estruturados de FAQ, 404 própria, metatags.
  NÃO vale aqui: depoimentos, logos, números de resultado, garantias e "reversão de risco" (OAB); a fonte única sem itálico,
  a paleta escura e a escala fixa de tamanhos (o DESIGN.md e a escolha da cliente prevalecem); trocar hífens da ortografia
  do português (ano-safra, boa-fé, recuperá-lo estão corretos).
- **design-to-motion** (elayadesign/ai-design-skills): animação de cards com visual e de mockups. O site não tem cards desse tipo;
  a abertura da hero é a da cliente (pré-carregador + nome), não a "hero appear" da skill.

## Build
`npm run build` gera `assets/css/site.css` e `assets/js/main.min.js`. Edite `src/site.css` e `assets/js/main.js`, nunca os gerados.
