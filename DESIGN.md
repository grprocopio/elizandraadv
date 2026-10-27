---
name: Elizandra Girardon Advocacia
description: Wine and sand bands that alternate dark and light, where each section speaks in its own type voice and every path ends in a WhatsApp conversation.
colors:
  wine: "#4A1220"
  wine-deep: "#2E0B13"
  bordo: "#7A1E2E"
  sand: "#EFE5D4"
  sand-deep: "#E4D6C0"
  dune: "#D9C3A0"
  ink: "#1F1215"
typography:
  display-name:
    fontFamily: "Anton, Bebas Neue, Impact, sans-serif"
    fontSize: "clamp(5rem, min(11.8vw, 20svh), 12.5rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "0.004em"
  display-name-sm:
    fontFamily: "Anton, Bebas Neue, Impact, sans-serif"
    fontSize: "clamp(3.8rem, 18.5vw, 7.6rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "0.004em"
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(3rem, 7vw, 6.5rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(2.4rem, 4.6vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  marquee:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(1.8rem, 4vw, 3.4rem)"
    fontWeight: 400
    lineHeight: 1.1
  title:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(1.45rem, 2.4vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.375
    letterSpacing: "-0.02em"
  subtitle:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "1.65rem"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  subtitle-lg:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "1.9rem"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  figure:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(3.5rem, 6vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 1
    fontFeature: "\"tnum\", \"lnum\""
  body:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  body-long:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "1.06rem"
    fontWeight: 400
    lineHeight: 1.75
  caption:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "0.98rem"
    fontWeight: 400
    lineHeight: 1.65
  action:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.025em"
  nav:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "0.025em"
  wordmark:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.28em"
  wordmark-sub:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.4em"
rounded:
  none: "0px"
  focus: "2px"
  scrollbar: "10px"
  circle: "50%"
  float: "9999px"
spacing:
  gutter-sm: "1.25rem"
  gutter-md: "2rem"
  gutter-lg: "3rem"
  section-sm: "6rem"
  section-md: "8rem"
  section-lg: "11rem"
  page-max: "84rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ground-deep}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.ground-deep}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  button-line-hover:
    textColor: "{colors.accent-soft}"
  social-btn:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    size: "48px"
  social-btn-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ground-deep}"
  hero-credentials:
    textColor: "{colors.ink}"
    typography: "{typography.nav}"
  clause-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    padding: "28px 16px"
  clause-row-hover:
    backgroundColor: "rgba(216, 162, 90, 0.09)"
    textColor: "{colors.accent-soft}"
  marquee-item:
    textColor: "{colors.ink}"
    typography: "{typography.marquee}"
    padding: "0 2.2rem"
  scroll-progress:
    backgroundColor: "{colors.accent}"
    height: "2px"
  preloader:
    backgroundColor: "{colors.ground-deep}"
    textColor: "{colors.ink}"
  whatsapp-float:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ground-deep}"
    rounded: "{rounded.float}"
    size: "56px"
---

# Design System: Elizandra Girardon Advocacia

## Overview

**Creative North Star: "Wine Cellar, Sand Ledger"** (redesign 2026-10-27, owner request: leave the ground-and-gold look every law firm uses, stop the page from repeating itself.)

The page is a sequence of full-width bands that alternate dark and light: wine, bordô, sand, wine, wine-deep, sand, wine, sand, wine, sand, wine-deep. No two neighbouring sections share a ground, so the eye always registers a new chapter. Structure inside each band is still drawn, not built: hairlines in the band's accent divide, underline and track progress, and the EG monogram's six strokes draw themselves.

Type changes voice from section to section instead of repeating one large serif. Her name stands in Anton capitals with a cast-metal finish. Instrument Serif carries statements and the client's own phrasing (roman, and italic for the closing line). Outfit at weight 500, tightly tracked, carries the plain-spoken headings. Anton returns for the two specialties and the contact heading, paired with an outlined letter (A, B). Every section opens with a numbered marker ("01 — O escritório").

Photography: the white-suit portrait (waist-up) on wine in the hero, the bronze Lady Justice on wine, and the red-blazer cut-out on sand in the closing band.

**Key Characteristics:**
- Bands alternate dark (wine family) and light (sand); the marquee is the single bordô strip.
- One accent per band: dune on dark grounds, bordô on light grounds.
- Three heading voices (Instrument Serif, Outfit 500, Anton) rotate; numbered section markers give rhythm.
- Hairline rules, never boxes; square corners, with circles reserved for the WhatsApp float, the contact buttons.
- Drawn, masked, expo-out motion plus a fine-pointer interaction layer, with a full no-JS fallback.

## Colors

Colours are theme variables (RGB channels) set per band in `src/site.css`: `:root`/`.theme-dark`, `.theme-bordo`, `.theme-light`. Tailwind tokens read them: `ground`, `ground-deep`, `ink`, `ink-muted`, `accent`, `accent-soft`, `cta`, `cta-ink`.

| Token | Dark (wine) | Bordô strip | Light (sand) |
|---|---|---|---|
| ground | wine #4A1220 | bordô #7A1E2E | sand #EFE5D4 |
| ground-deep | wine-deep #2E0B13 | #621624 | sand-deep #E4D6C0 |
| ink | sand #EFE5D4 | sand | ink #1F1215 |
| ink-muted | #CDB6AC | #E2C8BE | #6B5458 |
| accent | dune #D9C3A0 | dune | bordô #7A1E2E |
| accent-soft | #ECDEC4 | #ECDEC4 | #96283A |
| cta / cta-ink | sand / wine | sand / bordô | bordô / sand |

Fixed exceptions: the floating WhatsApp button is bordô with a sand ring so it reads over both grounds.

Some values sit outside the palette and are never reused as colours:
- **Hero name metal:** the gradient stops (#FFFFFF, #EFE8DB, #A8A296, #D9C29A) belong to that finish only. See Typography.
- **Scrollbar thumb:** bordô (#7A1E2E) on the wine-deep track, in browser chrome only.

### Named Rules
**The Alternating Band Rule.** Neighbouring sections never share a ground. Dark bands use the wine family, light bands use sand; the marquee is the only bordô band.

**The One Accent per Band Rule.** Each band has exactly one accent: dune on dark, bordô on light. Hierarchy within it comes from alpha and the accent / accent-soft pair.

**The One Red Rule.** The red blazer in the closing-band photograph is the only true red. Bordô is a wine tone, used for accents and actions on sand, never as a large fill except the marquee strip and the WhatsApp float.

## Typography

**Name Font:** Anton (with Bebas Neue, Impact, sans-serif), weight 400, uppercase: the hero name, the specialty headings (Agronegócio, Bancário), the contact heading, statistic figures and the outlined specialty letters.
**Display Font:** Instrument Serif (with Georgia, serif), weight 400, roman and italic.
**Body Font:** Outfit (with system-ui, sans-serif), weights 400 and 500; weight 500 at -0.035em is the "plain voice" heading (`h-sans`).

**Character:** three voices take turns so no two neighbouring sections open the same way: a cast condensed grotesque for names and specialties, a contemporary high-contrast serif for statements and the client's phrasing, and a tight geometric sans for direct, plain-spoken headings.

**Section markers** (`.kicker`): Outfit 500, 0.78rem, 0.26em tracking, uppercase, in the band accent, a tabular number then the label, followed by a 3.5rem rule.

### Hierarchy
- **Display name** (Anton 400, uppercase, line-height 0.88, 0.004em): the hero name, broken onto two lines, "ELIZANDRA / GIRARDON", preceded by a small "DRA." at 0.27em, top-aligned before the E, with the same metal fill. Since 2026-10-27 the name is animated as three pieces (Dra. / Elizandra / Girardon) rising out of masks, 0.12s apart; the per-letter split, letter hops and the periodic wave were removed for performance. It uses `display-name-sm` below 1024px and `display-name` from 1024px. Its fill is a vertical metallic gradient clipped to the letters: #FFFFFF at 0%, #EFE8DB at 34%, #A8A296 at 68% and #D9C29A at 100%.
- **Display** (400, line-height 1): the two practice-area section titles, "Agronegócio" and "Bancário". Larger statement headings use the same face at clamp(2.4rem, 5.2vw, 5.25rem) beside the statue and at clamp(2.6rem, 6vw, 5.75rem) in the closing band, held to 16 to 18ch. The office statement that lights word by word runs at clamp(2.1rem, 4.4vw, 4.25rem).
- **Headline** (400, line-height 1.02): standard section headings.
- **Marquee** (400 italic, line-height 1.1): the running band of practice areas, in ink with monogram separators.
- **Title** (400, line-height 1.375): clause rows. FAQ questions sit one step down at clamp(1.3rem, 2vw, 1.7rem), and timeline stage names are 2.4rem at line-height 1.
- **Subtitle** (400 italic, accent-soft): the hero's practice line, `subtitle` on mobile and `subtitle-lg` from 1024px.
- **Figure** (400, tabular lining numerals, accent): statistics. The preloader counter uses the same treatment at 3rem, accent at 0.7.
- **Body** (400, line-height 1.65): the default. Long prose runs at `body-long`, capped at 44 to 62ch.
- **Caption** (400): secondary single lines in Outfit, such as practice-area labels in clause rows, statistic labels and the hero credential line.
- **Action** (500, 0.025em): primary button labels and the drawn-underline text link. Timeline remedy lines share the size at weight 400.
- **Nav** (400): desktop header links and the hero credentials row (tabular, ink at 0.75).
- **Label** (400, 0.025em): data labels and registration lines, in ink-muted or accent-soft.
- **Wordmark** (500, set in capitals): the logotype beside the monogram only. `wordmark-sub` sets the "ADVOCACIA" line. The cursor's "WhatsApp" / "Mapa" label uses the same 0.7rem size at weight 500 and 0.14em, in capitals.

### Named Rules
**The Cast Name Rule.** The hero name is the only Anton and the only gradient-filled text in the system. The owner chose the finish from a reference image. It is sanctioned for the hero name alone and does not license gradient text anywhere else.

**The Italic Voice Rule.** Instrument Serif italic marks the client-facing voice: the hero subtitle, the marquee of practice areas and the list of who the office defends, separated by upright accent slashes.

**The Tabular Registration Rule.** OAB numbers, figures and counters always use tabular lining numerals.

## Layout

The page sits in a centred container (max 84rem) on a 12-column grid at desktop. Side gutters are 1.25rem, 2rem from 640px and 3rem from 1024px. Text columns are offset (col-start 3, 8 or 10) rather than centred, so headings and prose sit asymmetrically. Section bands use vertical padding of 6rem, 8rem from 640px, and 10 to 11rem from 1024px; the closing band runs to 12rem. The header is 4.5rem tall, 5rem at desktop. The marquee band is a thin full-bleed strip between the hero and the office statement, with 1.5rem of vertical padding (2rem from 640px).

From 1024px the hero is a full-viewport stage (100svh, min 44rem) layered in depth. At the back is the dimmed facade photograph. Next comes the name, left-aligned in the container 14svh from the top and sitting behind the portrait. The halo and cut-out portrait are centred at 73% across, and the portrait (92svh tall) overlaps the end of the letters. The copy sits bottom-left, at most 30rem wide and 7svh off the floor: subtitle, lead, primary action with a text link, then the credentials row under a 1px accent rule at 0.3. Below 1024px the stage is 70svh (min 30rem). The portrait stands centred and the name sits in front of it, centred at the foot of the stage, with the copy stacked beneath.

The Lady Justice intro opens the practice areas. From 1024px the heading and lead take the left seven columns (min 46rem tall) and the statue fills the band's height at the right edge. Below 1024px the statue follows the text, oversized (115% wide) and pushed off the right edge.

The ano-safra timeline is the signature layout. On mobile and without JS, it is a vertical list with a left accent spine. At 1024px with motion on, it pins during scroll and becomes a horizontal track of stages, each min(26rem, 33vw) wide, with a hairline progress bar that fills as you scroll.

The closing band sets its heading and action at left, with the white-suit cut-out standing on the band's floor at the right (84% of its height, 4% in). On mobile the cut-out is 30rem tall below the action and runs into the bottom edge.

## Elevation & Depth

Surfaces are flat by default. Depth comes from several sources:
- the tonal ground bands
- the dimmed facade behind the hero
- the radial accent light behind the hero portrait and the statue
- gradient masks that feather every cut-out into the field
- faint ruled field lines (accent at 0.07 to 0.09 opacity) in the hero and timeline
- perspective, on a mouse

Only two elements cast shadows, and both are soft, downward drops, never offset.

The hero background is the office facade at low exposure: opacity 0.24, saturate 0.75 and brightness 0.92, with two ground shades over it. A radial vignette runs from 0.15 at the centre to 0.72. A vertical wash goes from 0.65 at the top, clear at 28%, 0.35 at 68% and solid ground at the foot, so the band joins the page.

Cut-out masks are alpha masks, not colours. Their stops set coverage only and never paint: #000 means fully shown, rgba(0,0,0,.35) partly shown, and transparent hidden.
- **Hero portrait:** a bottom fade (transparent to #000 at 22%) intersects a left fade (transparent, then .35 at 12% and #000 at 30%).
- **Statue:** a bottom fade to #000 at 26% intersects a left fade to #000 at 14%. The statue also carries saturate 1.1 and contrast 1.06 to hold its bronze.
- **CTA cut-out:** a bottom fade only, to #000 at 22%.

Perspective is the interaction layer's depth. The profile photo and the facade tilt in 3D toward the pointer, up to 9 degrees on X and 11 on Y at a 1000px perspective. A warm glare follows the pointer across them: a radial gradient from rgba(255,238,210,.28) to transparent at 55%. The hero portrait turns on rotationY (up to 3.5 degrees, perspective 1200px), the halo, name and background drift at their own rates, and the statue turns up to 5 degrees (perspective 1400px). The glare is light, not a colour token.

### Shadow Vocabulary
- **Slab lift** (`box-shadow: 0 12px 28px -14px rgba(2, 6, 16, .8)`, hover `0 18px 32px -16px rgba(2, 6, 16, .9)`): the primary button, paired with a 2px rise on hover.
- **Float** (`box-shadow: 0 14px 30px -10px rgba(3, 8, 20, .75)`): the floating WhatsApp button.

### Named Rules
**The Drawn Not Built Rule.** Structure is a 1px line, not a container. If a block needs separating, rule it; do not box it.

**The Feathered Cut-out Rule.** Every cut-out figure stands on the field, not in a frame. Its foot fades out through an alpha mask, and a radial accent light, never a box, sits behind it.

## Shapes

Corners are square (0px) everywhere: buttons, images, the menu toggle and rows. Circles are reserved for three families:
- the floating WhatsApp button with its pulse ring
- the 48px contact buttons

Focus rings round to 2px, and the scrollbar thumb, which is browser chrome, rounds to 10px. The recurring geometry is the straight stroke:
- the EG monogram's six horizontal and vertical lines, with square caps, which also serve as the marquee's separators
- 1px hairline rules that draw in from the left, and the 2px reading-progress bar that fills the same way
- the 20px accent dash before each specialisation
- the two-bar menu toggle that crosses into an X
- the FAQ plus-to-minus marker, built from two accent lines
- the timeline markers, squares rotated 45 degrees: hollow at rest, filled accent with an offset outline when active
- the preloader's exit, a straight clip-path wipe that lifts the screen off from the bottom edge

## Components

### Preloader
A ground-deep screen, shown only when JS motion runs. The monogram draws stroke by stroke (0.9s, stagger 0.09) and the wordmark rises out of masks. A Instrument Serif counter in the bottom-right corner runs from 0 to 100 over 1.3s. The content then lifts away and the screen wipes upward (clip-path inset to 100% from the bottom, 1.1s, expo.inOut), handing straight into the hero entrance.

### Buttons
Tactile but sober: a solid metal slab and a drawn frame.
- **Shape:** square (0px).
- **Primary:** an accent slab with ground-deep ink in the action style, padded 16px by 24px, followed by a thin drawn arrow. Every WhatsApp action uses it.
- **Hover / Focus:** the background moves to accent-soft, the button rises 2px with a deeper shadow, and the arrow slides 4px right, all over 0.4s on the expo-out curve. Focus shows the global 2px accent outline at a 4px offset.
- **Magnetic:** on a fine pointer, primary buttons, contact buttons and the WhatsApp float lean toward the cursor. They follow 0.32 of the horizontal offset and 0.4 of the vertical (0.6s, power3.out), then spring back on leave (1s, elastic.out(1, 0.4)).
- **Line (secondary):** transparent with a 1px ink frame at 0.30 alpha and ink text at 0.9rem, padded 12px by 20px. On hover the frame turns accent and the text accent-soft.
- **Contact:** a 48px hairline circle (accent at 0.45) holding a 20px ink line icon for WhatsApp, Instagram, phone or map. On hover and focus it fills accent with ground-deep ink over 0.4s, and the cursor names the destination. Contact buttons appear as a row in the address band and the footer.
- **Text link:** ink or accent-soft, with an underline that draws from 0 to 100% width on hover and focus.

### Navigation
The header is fixed and transparent over the hero. Once the page scrolls, it gains ground-deep at 0.985 alpha (no backdrop blur, for scroll performance) and an accent hairline at 0.18, and on desktop it compacts from 80px to 68px. A 2px accent reading-progress bar sits on its bottom edge and fills from the left across the whole page. Past 320px of scroll, the header slides away when you scroll down and returns when you scroll up (0.6s, expo.out). It stays put while the mobile menu is open.

The logo redraws its six monogram strokes on hover, and the wordmark opens its tracking to 0.34em in accent-soft.

Desktop links (Escritório, Atuação, A Advogada, Dúvidas, Contato) sit inside a framed bar: 1px accent at 0.22, ground-deep at 0.45, with 10px accent corner brackets at top-left and bottom-right. A sliding indicator (accent at 0.12 with a 1px accent base line) glides to the hovered link (0.6s, expo.out) and rests on the section in view (scroll spy at 45% of the viewport). Each label rolls up on hover to reveal a accent-soft copy of itself. The WhatsApp line button fills with accent from the left on hover, turning its text and icon ground-deep, and is magnetic.

Below 1024px, a square hairline toggle opens a full-height ground-deep sheet with a faint oversized monogram. The sheet lists the five sections in Instrument Serif at the headline size (2.4rem on phones) with accent arrows, ruled at ink 0.10. The rule draws in accent and the label shifts 8px in accent-soft on hover and for the active section. The primary button, the contact buttons and the address with hours sit at the foot. Links rise in a stagger on open.

### Cursor
The native system cursor is used. The custom ring-and-dot cursor was removed on 2026-10-27 (owner found the site laggy; a trailing cursor reads as lag and its blend mode forced a full-page compositing layer).

### Hero (signature)
The stage layers back to front: dimmed facade, field lines, metallic name, accent halo, cut-out portrait, copy. On entrance the facade settles from 1.12 scale over 3s, the name's letters rise out of masks, the portrait lifts into place and the copy fades up. On scroll, the facade drifts down 12%, the portrait sinks, the name rises and the halo swells. On a mouse, each layer drifts at its own rate:
- **portrait:** slides up to 11px and turns up to 3.5 degrees on rotationY (1.2s)
- **name:** up to 17px (1.4s)
- **halo:** up to 45px by 30px (1.8s)
- **facade:** up to 13px (2s)

The credentials row (OAB/RS, OAB/SP, 24 years in the financial system) sits under a 1px accent rule at 0.3, in tabular nav type.

### Lady Justice
A bronze Lady Justice, blindfolded and raising the scales, cut out from an Unsplash photograph. She stands at the right of the practice-areas intro on ground, with an accent glow behind her and her foot and left edge feathered into the field. She rises in on entrance (2s, expo.out) as the glow blooms (2.6s). On scroll she lifts 60px and leans -1.5 degrees. On a fine pointer she turns up to 5 degrees on rotationY and shifts up to 15px against the mouse (1.4s). She is used once; the copy beside her reads her two pans as the bank and the client.

### Marquee
A full-bleed ground-deep strip ruled top and bottom in accent at 0.20. Practice areas run across it in Instrument Serif italic, separated by 1.5rem accent monograms. One loop takes 38s at rest. Scroll velocity speeds it up to seven times, and the scroll direction sets which way it runs. It eases back to rest speed over 1.4s. Screen readers get the list as a single sentence.

### Clause Rows (signature)
The banking problems are a ruled list of WhatsApp links. Each row sets the client's phrasing in the title style across six columns, the practice area in accent-soft caption type across five, and a thin arrow in the last column. Rows divide on ink hairlines at 0.15. On hover or focus, an accent wash at 0.09 sweeps in from the left (0.7s). The phrase indents 12px and turns accent-soft, the arrow slides 6px and turns accent, and an accent rule draws across the bottom.

### Ano-safra Timeline (signature)
Six stages run from contract to asset risk. Each has a Instrument Serif stage name, an ink description, and a accent-soft remedy line set off by an ink 0.10 hairline. Markers are rotated hollow accent squares. In the horizontal desktop variant, inactive stages dim to 0.42 opacity, stage names slide in as they enter, and the active stage fills its marker.


**Stage illustrations (design-to-motion, website context, 2026-10-27).** Each stage opens with a 160×96 line drawing in the band accent (1.5px strokes, square caps, faint parts at 0.38), drawn in the monogram's straight-stroke vocabulary. It rises in from 10px with a 4px blur when 30% visible, then acts out its stage on a loop while on screen, and stops when it leaves the viewport. Every story starts and ends on the drawing at rest; stages are offset so they never move in unison. Stories show the problem, never a result (OAB): Contratação, the signature is written and a second guarantee seal lands; Plantio, sprouts grow and a "%" coin bears down on them; Clima e mercado, rain falls and the price line redraws downward; Colheita, the harvest bar fills but stops short of the installment line, and the gap pulses; Vencimento, a marker walks the calendar until the due date is circled; Patrimônio, the padlock closes and a chain runs to the house and silo. Driven by a requestAnimationFrame clock in `main.js` (independent of GSAP); only transform, opacity and stroke offsets animate.
### Scroll-lit Statement
The office statement is split into words that start at 0.16 opacity and light to full ink one by one, scrubbed directly to scroll as the heading passes through the viewport. Without JS it is a full-strength heading.

### Tilt Images
The profile photo and the facade are square frames revealed by a clip-path wipe. On a fine pointer they tilt in 3D under the warm glare described in Elevation & Depth, and return flat on leave.

### FAQ
Native disclosure rows, ruled at ink 0.10. Questions are set in Instrument Serif at the FAQ title size with an accent plus that rotates into a minus, and they turn accent-soft on hover. Answers open and close with an animated height (0.6s, expo-out).

### Statistics
A three-column band ruled top and bottom at ink 0.10, with vertical hairline dividers. Accent Instrument Serif figures count up from zero above small ink labels.

### Closing Band
Ground-950, with the Instrument Serif heading, a short lead and the primary button at left. The lawyer stands at right in a red blazer, cut out and feathered at the foot, and rises in (14%, 1.8s, expo.out) as the band arrives. Behind her, at desktop, the monogram watermark draws itself.

### Monogram
The EG mark is six accent SVG lines with square caps. It uses a 1.6 stroke in the header and footer and 1.1 in the preloader, where it draws itself stroke by stroke. In the marquee it shrinks to a 1.5rem separator at a 2.4 stroke. In the closing band it becomes a large static watermark, a near-invisible 0.09 stroke at 0.32 opacity, that draws itself once as the band arrives.

### Floating WhatsApp
A 56px accent circle with the ground WhatsApp mark, fixed bottom right. A 1px accent ring pulses out from it continuously, scaling from 1 to 1.8 and fading from 0.8 to 0 over 2.8s. It is magnetic on a fine pointer and lifts 3px on hover. At desktop it stays hidden while the hero is in view.

### Named Rules
**The Pointer Layer Rule.** Magnetism, tilt and figure follow exist only on a fine, hovering pointer. Touch users get the same page with scroll-driven motion alone, and nothing they need is hidden behind a hover.

## Do's and Don'ts

### Do:
- **Do** separate sections by stepping the ground ground (950, 900, 850, 800) and separate content with 1px hairlines.
- **Do** keep accent as the only accent and vary its strength by alpha; put accent-soft (`accent-soft`) beside text.
- **Do** set the hero name in Anton capitals with its metallic finish. Set titles and the client's own words in Instrument Serif at weight 400 with negative tracking. Set running prose in Outfit at 1.06rem or larger. Single secondary lines step down to 0.92 to 0.98rem, and only the wordmark capitals and the cursor label go to 0.7rem.
- **Do** stand cut-out figures on the field, with a feathered alpha-mask foot and a radial accent light behind them.
- **Do** keep photographs behind type at low exposure (the hero facade at 0.24 opacity under ground shades).
- **Do** route every action to WhatsApp through the accent slab, the line button, a clause row, a contact button or a drawn-underline link.
- **Do** animate with the expo-out curve `cubic-bezier(0.16, 1, 0.3, 1)`: masked word reveals, rules drawn from the left, monogram strokes drawn in sequence. Use elastic.out(1, 0.4) only for the magnetic return.
- **Do** ship the final, fully visible state in the markup. Hidden start states apply only under the `motion-ready` class, which is removed if GSAP and ScrollTrigger have not started within 3s. At the owner's request, motion runs whether or not the visitor's system asks for reduced motion.
- **Do** gate every pointer effect behind `(hover: hover) and (pointer: fine)`.
- **Do** set OAB registrations, figures and counters with tabular lining numerals.

### Don't:
- **Don't** introduce red anywhere outside the hero photograph.
- **Don't** use gavel imagery, and don't repeat the Lady Justice statue; she appears once, in the practice-areas intro.
- **Don't** set services as a row of equal boxed cards; use ruled rows or the timeline.
- **Don't** clip gradients to text anywhere except the hero name.
- **Don't** round corners on content. Circles belong only to the WhatsApp float and its pulse ring, the contact buttons. The 2px focus ring and the 10px scrollbar thumb are the only other exceptions.
- **Don't** add hard, offset or coloured shadows; the two soft drop shadows are the whole vocabulary.
- **Don't** add a second accent hue or a light page ground.
- **Don't** treat mask stops, the hero name's metal stops or the tilt glare as palette colours.


## Performance Rules (2026-10-27)

Native scrolling only (no Lenis); no custom cursor; no `mix-blend-mode` on fixed elements; tilt animates transform only (the glare was removed because it repainted the photo on every mouse move); the hero name animates as 3 words, never per letter (was ~19 GPU layers with gradient text); mouse listeners are passive; the ano-safra story clock sleeps when no illustration is on screen; pinned and scrubbed scenes use scrub 0.3 or `true`; scroll unlocks when the preloader curtain lifts (~2s), not at the end of the hero intro.
