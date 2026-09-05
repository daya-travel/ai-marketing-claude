# DAYA - Design Language

The single source of truth for how DAYA looks and feels, everywhere: the app, the
website, the @her.solotrip teaser content, decks, ads. Bundles two registers into one
coherent system - a **cinematic dark core** (the app, premium moments) and a **warm
editorial layer** (social, marketing, anything that needs to feel human and inviting).

> DAYA is a travel app for solo-travelling women worldwide. Inspired by Hekate (keys,
> crossroads, the light-bringer) and Diana (the moon, the bow, untamed freedom).
> Mood: deep, safe, calm, rich. Spiritual without being preachy. Protective, never fearful.

House rules that override everything: **on-image text and captions use hyphens (-), never
em-dashes. Photography is travelling women only - real, candid, from behind, in nature or
cities. Never men, never studio/fashion models. Never repeat a photo.**

---

## 1. Visual Theme & Atmosphere

Two registers, one world. Both are "the page is dusk": deep emerald shadow with warm
light breaking through, like the last hour of sun before night. Atmospheric, never flat.

- **Cinematic Core (app + premium):** near-black emerald canvas, oversized serif, silver
  ink, a single warm glow. Quiet, mystical, safe. This is the DAYA app and any moment that
  should feel like the brand at rest. No bright UI.
- **Warm Editorial Layer (social + marketing):** the same emerald base, but cream and
  amber/marigold step forward. Paper, not plastic. Big confident type, a hand-written
  accent, photographic warmth. This is @her.solotrip, the landing page, the launch.

The shift between them is a dial, not a switch: both share the emerald base, the dusk
glow, the grain, and the serif. You move warm -> cinematic by trading cream for black and
amber for silver. Never run a pure-white SaaS canvas. Never run a cold neon-tech look.

Mood words: dusk, sanctuary, key, crossroads, moon, horizon, quiet confidence.

---

## 2. Color Palette & Roles

```
/* ---- Emerald spine (shared by both registers) ---- */
--emerald:        #0e3b2c   /* primary - buttons, accents, brand fills */
--emerald-rich:   #0b3527   /* rich mid surface */
--emerald-deep:   #06251b   /* deep cards, sections */
--emerald-ink:    #051f17   /* deepest shadow */
--emerald-mid:    #1d5240   /* lifted emerald, hover */
--emerald-glow:   rgba(14, 59, 44, 0.45)

/* ---- Night neutrals (cinematic core) ---- */
--bg:             #0b1014   /* app/page canvas, night-black */
--card:           #131a20   /* cards, modals */
--card-hi:        #1a2229   /* hover */
--ink:            #06090d   /* pure black, app base */
--silver:         #d4dae0   /* primary text + icons - NEVER pure white */
--silver-dim:     #8a8f96   /* secondary text */
--silver-faint:   #5b6168   /* hints, captions */
--line:           rgba(212, 218, 224, 0.10)   /* hairline */
--line-strong:    rgba(212, 218, 224, 0.20)   /* emphasis edge */

/* ---- Warm layer (editorial / social) ---- */
--cream:          #f4ecdb   /* warm light text on emerald, paper canvas */
--paper:          #f1e6d0   /* warm surface */
--paper-deep:     #e7d8bb   /* warm divider */
--sand:           #dccdb0
--sage-mist:      #bcd2c4   /* soft supporting text on dark */
--amber:          #e6a93d   /* warm accent */
--amber-deep:     #cf8a1d   /* deeper amber, hand text on light */
--marigold:       #efc05a   /* the warm signature - CTAs, sun, highlights */
--coral:          #dd7a4d   /* rare secondary warm accent */
--warm-ink:       #1a140b   /* ink on marigold/cream */
```

**Roles & discipline**
- **Emerald is the spine.** It appears in every artifact, both registers. It is the brand.
- **Pick ONE warm accent per surface.** Marigold is the signature (CTAs, sun, the one
  highlighted word). Amber/coral are support, used sparingly. Never three warm accents loud
  at once.
- **Silver is for the dark core only**, and is never pure white (#fff). Cream is its warm-
  layer counterpart.
- **The dusk glow** is always marigold->emerald, radial, low and warm (bottom or top-right).
- Semantic colors borrow from the warm family: success leans sage/emerald, warning amber,
  danger coral - keep them desaturated against the dark.

---

## 3. Typography

Four families, each with one job. Never substitute Inter/Roboto/Arial for the display or
serif roles.

- **Display (warm layer):** `Archivo` 800/900. Oversized, tight tracking (-0.02em). Used
  for big editorial headlines, post covers, landing heroes, numbers. Confident, modern.
- **Serif (brand voice, both registers):** `Cormorant Garamond` 500/600, italic for
  accents. The DAYA voice. Headlines in the app, mantras, taglines, the wordmark. On dark
  cinematic surfaces it carries the **silver shimmer**; on warm surfaces it sits in emerald
  or cream.
- **Hand (warm accent only):** `Caveat` 500-700. One human touch per layout - "swipe ->",
  a margin note, a personal aside. Never for body or anything load-bearing.
- **Body / UI:** `Inter` 400/500/600. All running text, labels, app UI, captions.
- **Mono (data):** `ui-monospace, 'SF Mono', Menlo` for IDs, coordinates, timestamps.

**Wordmark:** "DAYA" in Cormorant Garamond 600, uppercase, letter-spacing 0.18em. Optional
silver shimmer on dark, solid emerald on light.

**Scale (px):** 13 / 14 / 16 / 18 / 22 / 28 / 36 / 48 / 72 / 96 / 124 / 172. Go big on
covers and heroes (96+). App UI stays 13-28. On 1080-wide social art, never below 24px.

**Silver shimmer** (headlines/wordmark on dark): the `.daya-silver-shimmer` gradient
(`#8a929b -> #f4f6f8 -> #d4dae0 -> #aab2bb`), animated 9s ease-in-out, clipped to text.

---

## 4. Components

**Buttons**
- Primary (cinematic): emerald fill, silver text, pill radius (999), emerald glow shadow.
- Primary (warm): marigold fill, warm-ink text, pill radius. The launch/CTA button.
- Secondary: transparent, 1px `--line-strong` (dark) or emerald hairline (light), pill.
- Button-in-button: trailing icon (arrow) lives in its own circular wrapper flush right.

**Cards**
- Dark: `--card` fill, 14px radius, 1px `--line` border. Hover -> `--card-hi`. Depth from
  border + faint inner highlight, not heavy shadow.
- Warm: paper/cream fill on emerald, or emerald card on cream. Same radius scale.
- Mantra/quote cards: emerald or photo bg, Cormorant italic, marigold highlight on one word.

**Eyebrow / kicker:** Archivo 700-800, uppercase, letter-spacing 0.14-0.2em, marigold (warm)
or silver-dim (dark). Often paired with a 6px marigold tick or a thin rule.

**Pills / chips:** full-radius, small, uppercase Inter/Archivo. Used for tags, counters
("01 / 09"), badges ("SAVE FOR LATER").

**Icons:** the `icons/` set - 24x24 grid, stroke 1.6, round caps/joins, `currentColor`.
Includes the DAYA mythos marks (key, crossroads, torch, triple-moon, ward, constellation,
compass, shield). Give standalone icons a soft circular container.

**Inputs:** pill or 10px radius, `--card`/control bg, focus = 2px marigold (warm) or emerald
(dark) ring. Build custom selects/date pickers - never raw native form controls for styled UI.

**Progress dots** (carousels/onboarding): faint silver dots, active = elongated marigold bar.

---

## 5. Layout

- **App shell:** mobile-first, 390-430px content width, persistent bottom nav or quiet top
  bar. 44px minimum hit targets.
- **Marketing/web:** 1080-1200px max content, heavy vertical rhythm (py 96-160), full-bleed
  dusk hero above the fold.
- **Social art:** 1080x1350 carousels, 1080x1920 stories, 1080x1350 mantra cards. 80px side
  margins, headline anchored bottom-left or centered, kicker top-left, counter top-right.
- **Spacing:** 4px base. Scale 4 / 8 / 12 / 16 / 24 / 32 / 48 / 96. Symmetrical padding
  (TLBR match) unless content needs more horizontal room.
- **Radii:** sm 8 (inputs/buttons), md 14 (cards), lg 18 (modals/large), pill 999.
- Let the emerald and the glow do the section separation; resist boxing every group.

---

## 6. Depth & Elevation

Atmospheric, not heavy. The depth comes from **light and tone**, not hard drop shadows.

- **Cinematic core:** borders over shadows. Hairline `--line` defines regions. A single soft
  emerald glow lifts the active element. Modals: `0 8px 20px rgba(0,0,0,0.4)`. Vignette +
  grain on full-bleed scenes.
- **Warm layer:** soft warm glow (marigold->emerald radial) behind heroes and covers; gentle
  paper shadows on cards (`0 14px 34px rgba(13,40,30,.18)`). Photos get a cinematic grade:
  emerald multiply + soft-light glow + a dark bottom gradient for text legibility.
- **Grain everywhere:** the `.daya-texture-overlay` fractal-noise layer at ~20% opacity,
  `mix-blend-mode: overlay`, fixed and `pointer-events:none`. It keeps the black from going
  flat. This is a DAYA signature - use it on app, web, and social.
- GPU-safe: animate only `transform`/`opacity`. Blur only on fixed/sticky elements.

---

## 7. Do's & Don'ts

**Do**
- Keep emerald as the constant; shift warm<->cinematic by trading cream/amber for black/silver.
- Use one warm accent (marigold) as the signature highlight.
- Lay the grain over everything. Keep a dusk glow in hero/cover moments.
- Oversize the serif/display on covers and heroes; let it breathe.
- Use real travelling-women photos with the emerald grade; one hand-written accent max.
- Write tight, specific, human copy. Hyphens only.

**Don't**
- Pure-white or light-grey SaaS canvas. Cold neon/crypto gradients. Glassmorphism on data.
- Pure white text (#fff) - use silver or cream.
- Inter/Roboto/Arial for display or serif roles.
- Three loud accents at once, or rainbow color.
- Men or studio/fashion models in photography. Repeated photos. Em-dashes in on-image text.
- Heavy hard drop shadows; harsh 1px solid gray borders.

---

## 8. Responsive Behavior

- App is mobile-native; scale type 13-28, never collapse hit targets below 44px.
- Web heroes scale display 124 -> 44 on mobile; multi-column -> single column, `w-full`,
  16px side padding below 768px.
- Social art is fixed-size; export at full resolution (carousel 1080x1350, story 1080x1920).
- Tables/data -> stacked key-value cards on narrow screens; keep tabular numerals.

---

## 9. Agent Prompt Guide

**Bias toward:** emerald spine + dusk glow + grain on everything; Cormorant Garamond voice
with silver shimmer on dark / emerald on light; Archivo for oversized warm headlines; one
marigold accent; cream+amber for social/marketing, silver+night-black for app/premium;
pill buttons; soft atmospheric depth; the DAYA mythos icons (key, crossroads, moon,
compass, shield); real travelling-women photography with an emerald cinematic grade.

**Reject:** bright/white UI, cold neon tech, glassmorphism over data, pure-white text,
Inter/Arial headlines, multiple loud accents, men or models in photos, repeated photos,
em-dashes in on-image text or captions, heavy drop shadows, generic three-feature-card
marketing slop.

**Which register?**
- Building the **app, an onboarding, a premium moment** -> cinematic core (use
  `daya-export/daya-tokens.css` + `.claude/skills/interface-design`).
- Building **social posts, a landing page, the launch, an ad** -> warm editorial layer
  (use `cinematic-kit.jsx` look + taste-skill/soft-skill + human-tone for copy).
- Either way: emerald spine, dusk glow, grain, Cormorant voice. That is DAYA.
