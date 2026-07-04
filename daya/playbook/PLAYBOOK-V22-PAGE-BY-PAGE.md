# Playbook v21 (EN) - Seite-für-Seite-Audit + v22-Redesign-Prompt

> Grundlage: komplette Sichtung aller 37 Seiten der EN-v21-PDF + Skills
> (sales-council: Hormozi/Cialdini/Schwartz-Lens, marketingskills/lead-magnets,
> humanizer). Unten der fertige englische Prompt für Lovable.
>
> Wichtigste Diagnose vorab: Das Buch ist NICHT langweilig konzipiert - die
> Basis (Polaroids, Props, Kapitel-Cover, Handschrift-Zeilen) ist stark. Es
> wirkt langweilig, weil (a) 9 Seiten zu 40-60% leer sind, (b) dieselben 4
> Polaroid-Fotos x-fach wiederholt werden, (c) 3 Seiten kaputt sind (Inhalt
> abgeschnitten/überlappt). Die stärksten Seiten sind die mit "Props"
> (Boarding-Pass S.7, Lockscreen-Phone S.14, Wallet-Card S.17, Pass S.18) -
> dieses Muster fehlt auf den leeren Seiten.

## Kritische Bugs (Inhalt kaputt)

| Seite | Problem |
|---|---|
| 6 (Packing) | Überschrift verspricht 16 Items, nur 01-10 sind da - **11-16 fehlen komplett**. Handschrift-Zeile überlappt Item 09. |
| 15 (Digital hygiene) | Überschrift verspricht "10 small settings" - **die Seite ist leer**. Alle 10 Items fehlen. |
| 24 (Red flags) | Item 09 kollidiert mit Handschrift-Zeile + Seitenzahl. Ausgerechnet die wichtigste Flagge ist zerquetscht. |
| 28 (Rescue phrases) | Überlauf: Handschrift-Zeile läuft durch den letzten Block; Claim sagt "8 sentences", sichtbar sind 6. |
| 22 (Panic) | 4-7-8-Kreis: Labels "8 out / 7 hold" kollidieren mit der Zahl in der Mitte. |

## Wahrheits-/Konsistenz-Fehler

- Cover sagt **"34 pages"**, das Buch hat **37** (S.37 sagt selbst "You made it to page 37"). Eine Zahl überall - auch auf der Landing.
- Inhaltsverzeichnis: Kapitel V steht als "25-34", geht real bis 37; "One more thing" (S.37) fehlt im TOC.
- **S.26 empfiehlt Life360** - direkter Widerspruch zu unserem Anti-Tracking-Manifest (Datenskandal 2021, unser PR-Angle E!). Muss raus.
- Phone-Mockup S.26 zeigt "Maps.me", Text empfiehlt Organic Maps; Ordner zeigt 6 Icons bei "7 apps".
- EN-Ausgabe hat deutsche Reste: Label **"SPRICH"** auf S.12, deutsche Lautschrift ("sstäpp töh kaar hïer") beim EN-Satz.
- S.36 (Unlock): **"You bought this in a moment that mattered"** - das Playbook ist GRATIS. "Bought" ist falsch und genau der Vertrauensbruch, den wir überall sonst gekillt haben.

## Layout/Langeweile (Seiten mit 40-60% Leerraum)

S.5, 8, 11, 14, 15, 17, 19, 23, 27, 30, 32, 33 - Fixes im Prompt unten:
Props statt Leere (Message-Bubble für das Check-in-Skript, 3-Karten-Diagramm,
City-Cards), Polaroid-Wiederholungen ersetzen, Footer-Zone reservieren.

---

## LOVABLE-PROMPT (englisch, copy/paste)

Playbook v22 - page-by-page fix pass on scripts/playbook (both DE and EN
editions). Three severities: BROKEN (content lost/overlapping - must fix),
TRUTH (claims wrong), RHYTHM (dead space / repetition). Keep the existing
design language exactly: cream paper, emerald/gold, serif display, polaroids,
handwritten Caveat footer lines, chapter covers. Do not redesign - repair and
densify.

**GLOBAL (root causes first)**
1. Reserve a fixed footer zone (~70px) on every content page: the handwritten
   Caveat line and page number may NEVER overlap body content. This currently
   breaks pages 6, 24, 28.
2. Page-count truth: the book has 37 pages but the cover badge says "34 pages".
   Decide 37, then update: cover badge, TOC chapter ranges (V is "25-34" but
   ends at 37), add "One more thing ... 37" to the TOC, keep the "You made it
   to page 37" line, and update every "34 pages/Seiten" claim on the landing
   page (hero tag, stat tile, stack item, final CTA) and docs/CONTENT-TRUTH.md
   to the same number.
3. Polaroid variety: each polaroid photo may appear at most ONCE in the book.
   Currently "lisbon 07:12", "notes day 4", "one line a day", "old town blue
   hour", "lisbon balcony 21:40" repeat 2-4x, which reads as filler. Use
   different images from the existing asset set or drop the second occurrence
   and let the designed props carry the page.
4. EN edition language leak: on the taxi page the phonetic column is labeled
   "SPRICH" and the EN row carries a German phonetic gloss ("sstäpp töh kaar
   hïer"). In the EN edition: label = "SAY IT", drop phonetics for the EN row
   entirely, and write phonetics for English speakers. Audit the whole EN
   edition for other German leftovers.

**PAGE-BY-PAGE**
- p1 Cover: fix the page-count badge (see global 2). Otherwise keep as is.
- p5 Read this first: bottom 40% is empty. Set "There are only 3 rules" as a
  designed numbered block (01/02/03 with thin rules, like p13's list style)
  instead of a plain paragraph. Move the second polaroid up to balance.
- p6 Packing: BROKEN. Restore items 11-16 (the source JSON has 16). Make it a
  two-page spread (8 + 8, keep the 2-col numbered grid) OR tighten to a 4x4
  grid on one page - whichever fits without shrinking type below current size.
  No overlap with the footer line.
- p8 Check-in script: bottom half empty. Render the script as a phone
  messages-app mockup (speech bubble on an emerald phone frame, same prop
  style as p14) with a small "code word" chip. The full script text stays as
  the bubble content.
- p9 Money & cards: add a small 3-icon row (visible / hidden / room wallet)
  above the list to break the text wall; pull the photo up.
- p11 Street-smart basics: middle-right is empty; move the second polaroid to
  sit between habits 3 and 4 height, or add one pull-quote block.
- p12 Taxi: see global 4 (EN edition fixes).
- p14 Lockscreen card: the ICE card header text on the phone mockup clips at
  the edge - add padding. Fill the empty bottom with a 3-step mini-row (Notes
  app -> screenshot -> set as wallpaper) using small numbered chips.
- p15 Digital hygiene: BROKEN - the headline promises "10 small settings" and
  the page body is completely empty. Restore the 10 settings as a 2x5 numbered
  list (same style as p13). If the items are missing from the source JSON, add
  them (SIM PIN, phone PIN not biometrics-only at borders, Find My/Remote
  wipe on, cloud passport photo, offline maps downloaded, eSIM installed at
  home, auto-connect WiFi off, Bluetooth name anonymized, banking app + travel
  notice, emergency info filled in OS health card).
- p17 Wallet pass: bottom 40% empty - enlarge the pass mockup slightly and add
  the back side of the pass next to it (hotel / insurance / embassy fields).
- p19 Card layout: half empty. Show the three cards as small visual thumbnails
  (passport card, wallet pass, lockscreen) in a row - reuse existing mockups
  scaled down - so the "3 cards, 3 places" rule is visible, not just told.
- p22 Panic protocol: redraw the 4-7-8 ring so "4 in / 7 hold / 8 out" labels
  sit OUTSIDE the circle with connector ticks; nothing overlaps the center
  number.
- p24 Red flags: BROKEN. Give flag 09 ("Your gut says no") its own emphasized
  closing block (full-width, gold left border, like the "if you only do one
  thing" boxes) - it is the payoff of the page and currently collides with the
  footer. Rebalance 01-08 in two columns above it.
- p26 Apps & links: REPLACE the Life360 recommendation - it contradicts DAYA's
  anti-tracking positioning (2021 location-data scandal; our own manifesto).
  Replace with: "WhatsApp / Signal live location - share a session with your
  check-in person, it ends by itself." Sync the phone-folder mockup with the
  written list (7 apps -> 7 icons, Organic Maps not Maps.me).
- p27 Emergency numbers: align as a strict 3-column table (flag chip | country
  | numbers right-aligned, one line per country, no wrapping like "EU-wide" /
  "United States / Canada" currently). Drop the tiny inline icons - they add
  noise. Fill the empty bottom with the "screenshot this page" instruction as
  a designed chip row instead of only the intro line.
- p28 Rescue phrases: BROKEN. Fix the overflow: either 8 sentences across two
  pages (4+4 blocks) or 6 sentences on one page with the headline changed to
  "6 sentences". No handwriting over content, no footer collision.
- p30 If it happens II: page is half empty. Pull the "FULL SCRIPTS ... ON
  DAYATRAVEL.APP/PLAYBOOK" line into a designed CTA box, and add the "one
  page for the bag" print hint. Alternatively merge the medical block into
  p29 if it fits and use the freed page for packing items 11-16.
- p32+33 City briefings: 60% dead space each. Merge into ONE spread: four city
  cards (Lisbon, Marrakech, Bali, Mexico City), each card = small photo chip +
  3 tight bullets. This frees one page for the restored content above.
- p36 Unlock code: TRUTH - change "You bought this in a moment that mattered."
  The playbook is free. New line in the same voice: "You did the quiet,
  unglamorous thing: you prepared. That deserves more than a thank-you."
  Keep the referral mechanic sentence and the EUR 199 prize value (that number
  is correct). DE edition: fix the equivalent "Du hast das gekauft" line.
- p37 One more thing: keep - it is the best page in the book (the "tell one
  woman one honest thing" ask stays).

After the pass: rebuild both PDFs (DE + EN), verify final page count, then
sync the page-count claims (landing + CONTENT-TRUTH.md) in the same commit.
