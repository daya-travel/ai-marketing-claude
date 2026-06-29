---
name: viral-carousel
description: >-
  DAYA / her.solotrip carousel construction rules. Use whenever building or
  reviewing an Instagram carousel (SOLO & SAFE or any narrative carousel).
  Covers size, safe zone, font minimums, slide-by-slide anatomy, and how they
  map onto DAYA's own design system. Enforced by daya/studio/build-carousel.mjs
  and checked by daya-brand-guardian.
---

# Viral Carousel — build rules for @her.solotrip

> Source: distilled from the educational post "Bad vs Viral Instagram Carousels"
> (@m1ervin, saved by Lesya 2026-06). We adopt the **mechanics and structure**.
> We do NOT copy that post's visual style (yellow/navy, heavy condensed display
> fonts) — DAYA keeps its own look (`daya/brand/DESIGN-SYSTEM.md`:
> emerald/cream/marigold, Cormorant Garamond, grain).

## 1. Mechanics (universal — non-negotiable)

| Rule | Value | Why |
|---|---|---|
| **Size** | **3:4 = 1080 x 1440** | Best carousel size. 1:1 wastes space (don't). 4:5 only "if you'll boost". 3:4 wins screen real estate. |
| **Safe zone** | keep key text **180px bottom, ~130px right, 90px left, 150px top** | Instagram UI (caption, like/comment/share icons, username) overlays the edges. |
| **Headline** | >= 50pt (large) | Smaller and people stop reading. |
| **Body copy** | >= 14pt (we use much larger) | Same. |
| **Music** | always add a track | Carousels with music also appear in the **Reels tab** = extra reach. |

`daya/studio/build-carousel.mjs` already enforces size (1080x1440) and safe-zone
padding. Higgsfield photos generate at 3:4 (1536x2048) so they fill with no crop.

## 2. Anatomy (the slide-by-slide story)

| Slide(s) | Role | Job |
|---|---|---|
| **1** | **THE HOOK** | Stop the scroll. Curiosity, never fear (DAYA rule). |
| **2** | **THE TRANSITION** | What the user gains / avoids, or what makes us qualified. |
| **3-7** | **THE TEASE** | Reveal info bit by bit. Examples, stats, captivating visuals. Keep them swiping. |
| **8-9** | **THE CLIMAX** | The "aha". The big reveal: lesson, quotable moment, practical insight. |
| **10** | **THE ACTION** | Make the next step obvious (save / comment / DM / waitlist). |

Length is flexible (8-11 slides). Not every carousel needs all 11; keep the order.

## 3. Mapping onto SOLO & SAFE (our 8-slide destination format)

| Our slide | Anatomy role |
|---|---|
| 1 Cover (surprise hook) | HOOK |
| 2 City + safety credential | TRANSITION (what you gain: a safe-enough first trip) |
| 3-6 Tips (walkable, view, secret, etc.) | TEASE (reveal the proof bit by bit) |
| 7 Best tip / day trip | CLIMAX (the strongest reason) |
| 8 Endcard (save / @handle / tagline) | ACTION |

For **narrative** carousels (mindset, build-in-public, "5 green flags") follow the
full Hook -> Transition -> Tease -> Climax -> Action 1:1.

## 4. DAYA overrides (these always win over the source post)
- Hook = **curiosity, never fear** (`PLAYBOOK.md`).
- Faceless-friendly photography, real-travelling-women feel, no men, no repeats (`DESIGN-SYSTEM.md`).
- Hyphens only, no em-dashes. Max 5 hashtags, split by platform (`DESIGN-SYSTEM.md` §9).
- Visual style is DAYA's (emerald/cream/marigold + Cormorant + grain), NOT the source's.

## 4b. Layout convention (from her.solotrip's real carousels in Drive)
- **Top-left:** handle `→ her.solotrip`. **Top-right:** slide counter `02 / 05` (position in the
  set, NOT a series episode number). The series name ("SOLO & SAFE") is an eyebrow, never numbered.
- **Eyebrow** (kicker) sits **top**, **headline** sits **bottom-left** - never cluster everything
  at the bottom. Per `DESIGN-SYSTEM.md` §5: kicker top-left, counter top-right, headline bottom-left.
- Closing slide: `SOLO, MINUS THE FEAR` + `@HER.SOLOTRIP` + save / save-it / send-to-a-friend lines.
- Photo full-bleed with a top+bottom emerald dusk scrim so text is readable at both ends.

## 5. How to build one
1. Write/extend a JSON spec in `daya/studio/posts/<slug>.json` (types: cover, credential, tip, endcard).
2. Generate faceless photos (Higgsfield, 3:4) into `daya/studio/photos/<slug>/`.
3. `node daya/studio/build-carousel.mjs posts/<slug>.json` -> 8 PNGs in `out/<slug>/`.
4. `daya-brand-guardian` checks size, safe zone, anatomy, hooks, hashtags before posting.
5. Add a music track when posting (Reels-tab reach).
