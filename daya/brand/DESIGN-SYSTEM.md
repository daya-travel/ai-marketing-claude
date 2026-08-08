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

## Name
**DAYA = Di*a*n*a* + ales*y*a** — die beiden Gründerinnen. Das ist die Herkunft des
Namens, nicht die Jägerin. (Das Bogen-Motiv im Logo spielt zusätzlich auf Diana die
Jägerin an — zwei verschiedene Sachen, nicht vermischen.)

**Nie ausbuchstabieren.** Den Namen nicht erklären, nicht auflösen, kein "der Name
steht für…". Stattdessen mit **„— Diana & Alesya"** signieren; wer will, kommt selbst
drauf. Entscheidung Alesya, 03.08.: erklärt ist der Effekt weg.

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

## Hashtags (nach Plattform — Update 2026-07, Wachstumsphase)
- **Instagram:** **~10-15 gemischt** (groß + mittel + nischig) für Discovery, solange der Account
  wächst. Immer `#solofemaletravel` + Stadt/Land + Themen-Tags. Keine toten Mega-Tags (`#travel`, `#women`).
- **TikTok:** **3-5** keyword-nahe Tags + `#fyp` `#traveltok`. Nicht denselben Set über beide Plattformen.
- (Die frühere „max 5"-Regel galt für etablierte Accounts; in der Wachstumsphase zählt Reichweite.)

## Voice (Social — Deutsch, "du")
Emotional, direkt, leicht trotzig. Beispiele:
- "Alleine reisen als Frau? Mit DAYA bist du nie wirklich allein."
- "Dein Bodyguard, deine Freundin, deine Assistentin. 24/7 an deiner Seite."
- Sign-off: "Made with rage and love in Nürnberg."
### Anti-Slop-Regeln (gelten für ALLE Texte, DE und EN)

Die Leserin muss merken, dass da Menschen sitzen. Jedes KI-Muster zerstört genau das.

**Verboten:**
1. **„nicht X, sondern Y"** und alle Varianten (`It's not A, it's B` / `Not an alarm, just a…`
   / `We didn't do X, we did Y`). Meistgenanntes KI-Erkennungszeichen. Sag einfach, was ist.
   Entscheidung Alesya, 03.08.
2. **Dreierregel** — drei aufgezählte Dinge im gleichen Rhythmus. Nimm zwei oder vier.
3. **Gedankenstriche (— / –)** im Fließtext. Punkt oder Komma. (Ausnahme: Signatur
   „— Diana & Alesya".)
4. **Etwas verneinen, das wir tatsächlich tun.** „We never ran a survey" widerspricht
   dem datengestützten Playbook. Erst prüfen, was auf der Seite steht.
5. **Über die Botschaft reden statt sie zu sagen** („this is not a marketing line",
   „let that sink in", „here's the thing").
6. **Schwere Wörter ohne Gewinn** — `roughly`, `deliberate`, `remarkable`, `ambient`,
   `leverage`, `seamless`. Die Hälfte der Leserinnen sind keine Muttersprachlerinnen.
7. **Vage Abstraktionen** („the other kind", „a system that…"). Wenn unklar ist, was
   gemeint ist, ist es nicht zu Ende gedacht.
8. Kein Hype, keine erfundene Social Proof, keine erfundenen Zahlen.

**Prüfung vor jedem Post:** Würde eine Freundin diesen Satz so sagen? Wenn nein, umschreiben.

---

## ✅ GEKLÄRT (Lesya, 2026-06-28) — Sprach- & Pipeline-Modell
1. **Sprache (final):**
   - **@her.solotrip Posts (Insta + TikTok) = ENGLISCH** (Reichweite). On-Image-Text + Captions englisch.
   - **App + Landing Page + Produkt = MEHRSPRACHIG** (DE + EN + mehr; Safety-Anruf via ElevenLabs-Stimmen).
   - **Interne Doks/Strategie = DEUTSCH** (für Lesya zum Lesen). Das "Deutsch/du" aus §8 gilt für
     Marke/Landing/App-Voice, NICHT für die englischen Social-Posts.
2. **Farben (final):** Dieses Design-System (emerald #0e3b2c / cream #f4ecdb / marigold #efc05a /
   silver #d4dae0) gewinnt. Die alte terracotta/dark-green-Palette ist überholt. Canva-Demo in
   alter Palette = off-brand, wird nicht verwendet.
3. **Pipeline (final):** siehe `daya/WORKFLOW.md`. Content-Gehirn (dieses Repo) liefert fertige
   EN-Textblöcke + Foto-Briefs → Claude Design baut Visuals mit dem Cinematic-Kit (HTML→PNG).
