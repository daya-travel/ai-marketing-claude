# DAYA — Design-System (kanonische Design-Quelle)

> Aus dem "DAYA — Design Handoff for Claude Code" (von Lesya bereitgestellt, 2026-06).
> **Oberste Wahrheit für alles Visuelle + die harten Marken-Regeln.** Bei Konflikt mit
> älteren Notizen gewinnt dieses Dokument. Original-Source-of-Truth-Dateien (in Claude
> Designs Workspace, NICHT in diesem Repo): `DAYA-DESIGN.md`, `daya-export/daya-tokens.css`,
> `cinematic-kit.jsx`, `her.solotrip - *.html`.

## Was DAYA ist (geschärft)
Reise-App für **solo reisende Frauen weltweit**. Inspiriert von **Hekate** (Schlüssel,
Wegkreuzungen, Lichtbringerin) und **Diana** (Mond, Bogen, ungezähmte Freiheit).
Mood: tief, sicher, ruhig, reich. Spirituell ohne belehrend. **Schützend, nie ängstlich.**
**Positionierung:** ein Assistent / eine Stimme, die *mit dir* denkt. **Anti-Life360** —
trackt nur, wenn du willst, beim Reisen, nicht 24/7. **KEINE** Community-App, **KEINE** Überwachung.
Founders: **Alesya & Diana, Nürnberg.** Sign-off-Energie: "Made with rage and love in Nürnberg."

**Roadmap (laut Handoff):** Founder-Beta Web-App Q1 2026, native iOS/Android Q3 2026; 30 Tage
Geld-zurück nach Launch. **Pricing:** Free / Roam 9,90 / Guardian 24,90 / Founder 199 (einmalig,
nur 200 Plätze).

## Zwei Register, ein Designsystem (Dial, kein Switch)
- **App / Premium-Momente → Cinematic Core:** near-black emerald, silber, ein warmer Glow.
- **Social (@her.solotrip) + Landing + Ads → Warm Editorial Layer:** emerald-Basis, cream + marigold treten hervor, fotografische Wärme.
- Beide teilen: emerald-Rückgrat, Dusk-Glow, Grain, Cormorant-Serif-Stimme. Nie reines Weiß-SaaS, nie kaltes Neon-Tech.

## ⛔ HARTE REGELN (Founder ist da streng)
1. **Nur Bindestriche (-), NIE Gedankenstriche (—)** — in Bild-Text UND Captions.
2. **Fotos: nur echte reisende Frauen** (Rucksack, von hinten, in Natur/Stadt). Nie Männer,
   nie Studio/Fashion-Models. Fotos ohne Personen = nur Landschaft/Objekte.
3. **Nie ein Foto wiederholen** (Dup-Scan vor dem Ausspielen).
4. **Icons sind SILBER, nie Gold.** Gold/Marigold = nur Hintergrund-Atmosphäre + Text-Akzent.
5. **Reines Weiß (#fff) als Text ist verboten** — `--silver` (dunkel) oder `--cream` (warm).
6. **Schrift-Rollen fix** — nie Inter/Roboto/Arial für Display- oder Serif-Rolle.
7. **Social-Copy ist Deutsch, informelles "du"** (⚠️ siehe Konflikt unten).
8. **Max 5 Hashtags**, nach Plattform getrennt.

## Farben (Tokens)
**Emerald-Rückgrat (DAS Markenzeichen, in jedem Artefakt):**
`--emerald #0e3b2c` (primär) · `--emerald-deep #06251b` · `--emerald-mid #1d5240` (hover)
**Night-Neutrals (App / Cinematic):**
`--bg #0b1014` · `--card #131a20` · `--silver #d4dae0` (Text+Icons, NIE #fff) · `--silver-dim #8a8f96`
**Warm Layer (Editorial / Social):**
`--cream #f4ecdb` · `--paper #f1e6d0` · `--sage-mist #bcd2c4` · `--amber #e6a93d` ·
`--marigold #efc05a` (DIE warme Signatur — CTAs, Sonne, Highlight) · `--coral #dd7a4d` (selten) · `--warm-ink #1a140b`
**Disziplin:** Emerald immer. EIN warmer Akzent pro Fläche (Marigold = Signatur). Silber nur dunkler Core.
Dusk-Glow = marigold→emerald, radial, tief & warm. Nie drei laute Akzente.

## Typografie (4 Familien, je eine Rolle)
- **Display (warm):** `Archivo` 800/900 — übergroße Headlines, Post-Cover, Zahlen.
- **Serif (Markenstimme, beide):** `Cormorant Garamond` 500/600, italic für Akzente — DAYA-Stimme, Taglines, Wordmark.
- **Hand (warmer Akzent):** `Caveat` 500–700 — EIN menschlicher Touch pro Layout ("swipe →"). Nie Body.
- **Body/UI:** `Inter`. **Mono:** `ui-monospace`.
- **Wordmark:** "DAYA" Cormorant 600, uppercase, letter-spacing 0.18em.
- **Silver shimmer** auf dunklen Headlines. Social-Art nie unter 24px (auf 1080-Breite).

## Logo
Recurve-Bogen + horizontaler Pfeil + **zwei konzentrische Schallwellen-Bögen** rechts der
Pfeilspitze (Diana die Jägerin + "Stimme/Signal"). **Die Schallwellen sind essenziell — nie weglassen.**
Nie generische Sterne/Sparkles. Echte PNG-Lockups in `assets/` (in Claude Designs Workspace).

## Social-Produktion: der Cinematic-Kit
@her.solotrip-Posts werden als **eine HTML-Datei pro Post** gebaut (`cinematic-kit.jsx` +
`cinematic-slides.jsx`), mit per-Slide-PNG-Export + "Download all (ZIP)". Template:
`her.solotrip - Bag.html`. Korrektes PNG-Export-Muster: `her.solotrip - The Solo Tax.html`
(await img.decode() gegen die naturalWidth-Race). **Das ist die etablierte Pipeline von
Claude Design — nicht Canva.** Carousels 1080×1350, Stories 1080×1920, 80px Seitenränder.

## Hashtags (max 5, nach Plattform — fest)
- **TikTok-only:** `#fyp`, `#traveltok`.
- **Instagram:** `#solofemaletravel` + EIN hyper-relevanter Topic-Tag (z. B. `#singlesupplement`, `#budgettravel`).
- Keine toten Mega-Tags (`#travel`, `#women`). Nicht denselben Set über beide Plattformen.

## Voice (Social — Deutsch, "du")
Emotional, direkt, leicht trotzig. Beispiele:
- "Alleine reisen als Frau? Mit DAYA bist du nie wirklich allein."
- "Dein Bodyguard, deine Freundin, deine Assistentin. 24/7 an deiner Seite."
- Sign-off: "Made with rage and love in Nürnberg."
Copy durch Anti-Slop-Editing (kein KI-Vokabular, kein Hype, keine Fake-Social-Proof, keine
Dreierregel, keine Gedankenstriche).

---

## ⚠️ KONFLIKTE mit dem Content-Playbook (von Lesya zu klären)
1. **Sprache:** Dieses Design-Handoff sagt **Deutsch ("du")** für @her.solotrip. Das
   Content-Playbook + die echten Insights-Daten sagen **Englisch** (alle Top-Posts englisch).
   → **Welche Sprache gilt für die Instagram-Posts?** (Vermutung: Site = Deutsch, IG-Posts =
   Englisch? Oder Umstieg auf Deutsch?) **Bis geklärt: nicht final übersetzen.**
2. **Farben:** Design-Handoff = **emerald #0e3b2c / cream #f4ecdb / marigold #efc05a / silver**.
   Mein erstes Content-Playbook hatte **terracotta #C2552B / dark-green #1A3A2E** — das war
   eine ältere/andere Palette. → **Dieses Design-System gewinnt.** Die Canva-Demo (Ljubljana-
   Cover) nutzte versehentlich die alte Palette und ist damit **off-brand** → neu bauen.
3. **Produktions-Pipeline:** Echter Weg = Cinematic-Kit (HTML→PNG, bei Claude Design), nicht
   Canva. Meine Rolle = **Text/Strategie-Gehirn**, das fertige Blöcke an Claude Design übergibt.
