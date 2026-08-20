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
2. **Fotos: nur echte reisende Frauen** (in Natur, Stadt, unterwegs). **Die Haltung ist frei** -
   von hinten, von der Seite, von vorn, sitzend, gehend. Die alte Vorgabe „nur von hinten"
   ist aufgehoben (Alesya, 18.08.2026). Nie Männer, nie Studio/Fashion-Models, keine Posen.
   Fotos ohne Personen = nur Landschaft/Objekte.
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

## Post-Layout (Hausstil, 1080x1920)

**Vorlage ist die Slide, die Alesya am 20.08. geschickt hat** („Book a 24/7
reception", Strandbild, Zähler 03/05). Am Bild ausgemessen. Nicht erfinden,
nicht nachempfinden - nachbauen.

Aufbau von oben nach unten:

| Element | Wert |
|---|---|
| Kopfzeile | `68 px` vom Rand, `88 px` von oben. Links Bildmarke in Gold (30 px) plus `her.solotrip` in Inter 600, 26 px, Creme. Rechts der Zähler `01 / 06` in Inter 700, 24 px, Marigold, Laufweite .16em |
| Umriss-Ziffer | die Nummer der Slide als Umriss, Archivo 800, 300 px, ohne Füllung, Konturlinie 3 px in Marigold mit 62 % Deckkraft. Rechts oben. Nur auf den nummerierten Slides |
| Kicker | Kategorie in Versalien, Inter 700, 24 px, Marigold, Laufweite .22em |
| Kursive Zeile | `Cormorant Garamond` 500 **italic**, 46 px, Creme. Ein Satz, der die Überschrift anmoderiert |
| Überschrift | `Archivo` 800, 82 px, Zeilenhöhe 1.02, Creme, **genau ein Wort oder eine Wendung in Marigold** |
| Strich | 74 x 6 px, Marigold, abgerundet |
| Fließtext | `Inter` 400, 31 px, Zeilenhöhe 1.5, Creme, **genau eine Wendung in Marigold und 600** |
| Pille | unten rechts, Marigold gefüllt, Text `SAVE THIS` in Emerald, Inter 700, 24 px, Lesezeichen-Symbol davor |
| Endkarte | statt der Pille die Wortmarke unten links: Bildmarke plus `DAYA` in Cormorant 600 |
| Verlauf | oben ein leichter für die Kopfzeile, unten ein weicher über 58 % der Höhe |
| Bild | ein randloses Foto pro Slide |

**Die Gold-Hervorhebung ist Pflicht und sparsam:** eine Stelle in der Überschrift,
eine im Fließtext. Nie mehr. Am 20.08. stand auf einer Slide fast die ganze
Überschrift in Gold („Ask **who are you here for**") - damit hebt sie nichts mehr
hervor.

### Marken nicht vermischen

- **In der Kopfzeile steht allein `her.solotrip`**, ohne Zeichen davor. Eine
  eigene Bildmarke für den Reise-Account gibt es nicht.
- **Die DAYA-Bildmarke steht nur auf der Endkarte**, dort zusammen mit der
  Wortmarke. Das ist die einzige Stelle, an der DAYA als Absender auftritt.

Am 20.08. stand die DAYA-Marke direkt neben `her.solotrip` und wurde dadurch als
Logo des Reise-Accounts gelesen.

### Die Umriss-Ziffer liegt nie auf einem Gesicht

Seite und Höhe werden **pro Slide** gesetzt (`gx`, `gy` im Build-Skript), nicht
einmal fest für alle. Bei fester Ecke oben rechts lag die Ziffer am 20.08. auf
drei von sechs Slides auf einem Gesicht. Nach jedem Fototausch die Slide in
**voller Größe** ansehen - im Kontaktbogen sieht man ein Gesicht unter einer
Ziffer nicht.

### Regel für Layout-Entscheidungen

**Nie nach Schriftnamen fragen, nie ein Layout nacherzählen. Die geschickte
Vorlage aufmachen, ausmessen, nachbauen.** Am 20.08. wurden für einen einzigen
Post fünf Layouts gebaut, weil ich die Vorlage nicht angesehen habe. Die
Screenshots liegen in `/root/.claude/uploads/<session>/`. Vor jeder Layout-Arbeit
dort nachsehen.

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
**MAXIMAL 5 HASHTAGS. IMMER. AUF JEDER PLATTFORM. KEINE AUSNAHME.**

Festgelegt von Alesya, mehrfach, zuletzt 03.08. Die frühere „~10-15 in der Wachstumsphase"-
Empfehlung an dieser Stelle war falsch und hat wiederholt zu falschen Entwürfen geführt.
Sie ist gestrichen. Wer hier mehr als 5 hinschreibt, hat die Regel nicht gelesen.

- **Instagram:** 5 Stück, gemischt aus groß + mittel + nischig. Keine toten Mega-Tags
  (`#travel`, `#women`).
- **TikTok:** 5 Stück, letzter davon `#fyp`. Nicht derselbe Satz wie auf Instagram.

## Voice (Social — Deutsch, "du")
Emotional, direkt, leicht trotzig. Beispiele:
- "Alleine reisen als Frau? Mit DAYA bist du nie wirklich allein."
- "Dein Bodyguard, deine Freundin, deine Assistentin. 24/7 an deiner Seite."
- Sign-off: "Made with rage and love in Nürnberg."
### Featureliste (Stand dayatravel.app, 03.08.) — VOR jedem Text lesen

**Guardian-Kern:** KI-Guardian-Call · Live-Standort · Auto-Eskalation · KI-Begleiterin in
74 Sprachen · Prioritäts-SOS.
**Weiter:** Voice Cover (ein Tap, Handy klingelt, vorbereitetes Gespräch laut genug für
alle, verschafft 90 Sekunden) · Automatischer Check-in (App pingt deine Person zu deinen
Zeiten; bestätigst du nicht, eskaliert sie für dich) · Panik-Score (Puls-/Schlafdaten der
Uhr lösen einen Check-in aus, bevor du selbst etwas merkst; still, außer du brauchst ihn) ·
Lokaler Notruf-Assist (GPS erkennt das Land, blendet lokale Notrufnummer + SOS-Satz in der
Landessprache ein, alarmiert Kontakte parallel, weltweit).
**KI-Begleiterin heißt DAYA.** Kennt Reiseplan, Gesundheitsnotizen, lokale Notrufnummern.
Antwortet laut, in deiner Sprache, in 5 Sekunden.
**Tarife:** Guardian 24,90 EUR/Monat + Roam. Free-Tier behält SOS, Check-ins, Voice Cover.

### Logo auf @her.solotrip: erlaubt, aber nur am Schluss

Die alte Regel („Logo noch nicht zeigen, nur der Pfeil") ist von Alesya am 03.08.
aufgehoben worden. Das echte DAYA-Logo gehört jetzt **aufs Cover und auf die letzte
Slide**. Auf der Schluss-Slide zusätzlich: oben `@her.solotrip`, unten Logo plus
Wortmarke `DAYA` (Cormorant 600, uppercase, letter-spacing .2em). Nicht mitten in den
Inhalts-Slides — dazwischen zählt nur der Nutzen.

### DAYA ist eine SIE, kein ES

Die KI-Begleiterin heißt DAYA, und die eigene Seite schreibt bereits „**She** knows your
itinerary… **She** answers in 5 seconds." Das gilt für alle Texte.

- Pronomen: **she / her**, niemals `it`.
- So oft wie möglich **den Namen sagen** statt „the app", „it", „the product".
  „DAYA tells the people you chose" schlägt „the app notifies your contacts".
- Ziel ist Nähe. Die Leserin soll das Gefühl haben, dass jemand da ist, nicht dass eine
  Software läuft.
- Grenze: nichts behaupten, was eine Software nicht kann. Sie „hört zu" und „meldet sich",
  sie „sorgt sich" nicht und „liebt" nicht.

Festgelegt von Alesya, 03.08.

### Abgrenzung zu Life360 (Positionierung)

**Falsch wäre „DAYA trackt nicht".** DAYA hat Live-Standort, Auto-Eskalation und mit dem
Panik-Score sogar passives Mitlaufen. Wer das Gegenteil schreibt, lügt.

Der Unterschied ist, **für wen** es läuft. Bei Life360 richtet häufig jemand anderes die
Überwachung ein (Eltern, Partner) — die Frau ist das Objekt. Bei DAYA stellt sie es selbst
ein, wählt ihre Kontakte selbst, und die App handelt **für sie**, wenn sie selbst nicht
mehr kann. Eigene Zeile von der Seite: „Wenn du nicht bestätigst, eskaliert sie für dich."

**Richtig:** „You choose who sees you and when." · „If you cannot act, it acts for you."
**Falsch:** „Nobody is tracking you." · „Nothing runs in the background." (beides unwahr)

Zwei Fehler hintereinander gemacht am 03.08.: erst Überwachungssprache benutzt
(„runs quietly in the background" — klang nach Life360), dann ins Gegenteil übertrieben
(„Nobody is tracking you" — schlicht falsch). Ursache beide Male: über das Produkt
geraten, statt die Featureliste zu lesen.

### Anti-Slop-Regeln (gelten für ALLE Texte, DE und EN)

Die Leserin muss merken, dass da Menschen sitzen. Jedes KI-Muster zerstört genau das.

**Verboten:**
1. **„nicht X, sondern Y"** und alle Varianten (`It's not A, it's B` / `Not an alarm, just a…`
   / `We didn't do X, we did Y`). Meistgenanntes KI-Erkennungszeichen. Sag einfach, was ist.
   Entscheidung Alesya, 03.08.
2. **Dreierregel** — drei aufgezählte Dinge im gleichen Rhythmus. Nimm zwei oder vier.
3. **Lange Gedankenstriche (— / –) sind komplett verboten**, auch in der Signatur.
   Erlaubt ist nur der einfache Bindestrich/Minus `-`, mit Leerzeichen als Pause:
   „Hold for 2.4 seconds - false alarm impossible." So schreibt die DAYA-Seite selbst,
   das ist die Hausschreibweise. Signatur also `- Diana & Alesya`.
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
