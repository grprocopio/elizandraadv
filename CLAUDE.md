# CLAUDE.md

Site de uma página da Elizandra Girardon Advocacia. HTML estático + Tailwind + GSAP/ScrollTrigger + Lenis.

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

## Build
`npm run build` gera `assets/css/site.css` e `assets/js/main.min.js`. Edite `src/site.css` e `assets/js/main.js`, nunca os gerados.
