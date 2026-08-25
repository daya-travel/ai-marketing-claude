# Reel + TikTok-Karussell: „i have no one to go with. go alone."

Datum: 25.08.2026 · Kanal: Instagram Reel + TikTok Karussell · Account: @her.solotrip
Build: `daya/studio/build-tenouten.mjs` · Ausgabe: `daya/studio/reels/reel-tenouten/`

## Format

Das laufende 10/10-Muster. Erlebnis oben, Bewertung darunter, von 0/10 bis absurd.
Kein Tipp-Post, ein Identitaets-Check. Neun Frames, je zwei Sekunden, 18,0 Sekunden
gesamt, 1080x1920, 30 fps, **ohne Ton** - beim 10/10-Trend laeuft ein Trending-Sound,
den Alesya direkt in der App waehlt.

Layout-Variante B aus dem Design-System (randloses Foto, Text mittig, Kopfzeile mit der
her.solotrip-Glyphe), erweitert um die Bewertungszeile in Marigold unter dem Satz.

| # | Zeile | Bewertung | Foto |
|---|---|---|---|
| 1 | „i have no one to go with" · **go alone.** | Hook | `y1-hall` |
| 2 | first flight alone | 0/10 terrifying | `x2-plane-b` |
| 3 | dinner alone, day one | 4/10 everyone is looking (they are not) | `y3-dinner1` |
| 4 | dinner alone, day four | 10/10 peace | `x4-dinner4-b` |
| 5 | lost with no signal | 11/10 found a better street | `y5-lane` |
| 6 | sending the plate to your group chat | 10/10 normal now | `y6-street` |
| 7 | the first morning nobody knows your name | 100/10 | `x7-morning-b` |
| 8 | realising you do not need anyone to enjoy your life | ∞/10 | `y8-view` |
| 9 | Repost if you felt this on your first solo trip | DAYA-Wortmarke | `z9-train-c` |

Frame 6 ist der DAYA-Moment. Er steht mitten in einer Liste ueber Freiheit und wirkt
dadurch wie Alltag, nicht wie eine Warnung.

## Hook: offene Entscheidung

Alesyas Brief schlug die Trend-Zeile „Solo travel is like being gay" vor. Gebaut ist
stattdessen die nackte Trend-Zeile ohne Vergleich. Begruendung: der Account geht in den
naechsten Wochen an Redaktionen und an Global Fund for Women. Ein Vergleich, der eine
Coming-out-Erfahrung als Pointe fuer Reisemarketing benutzt, ist die Zeile, die dort
zitiert wird. **Die Entscheidung liegt bei Alesya**, das Original ist mit einer Zeile im
BEATS-Array wieder herstellbar.

## Bild-QA (Regel: jedes Motiv einzeln in echter Anzeigegroesse)

26 Motive erzeugt, 9 verwendet. Aussortiert und warum:

- **x1-airport-a** - Paparazzi-Look, gestyltes Outfit, posiert. Verstoesst gegen
  „keine Studio- oder Fashion-Models".
- **x2-plane-a** - Frau mit den Haenden vor dem Gesicht, liest als Weinen.
- **x3-dinner1-a/-b** - Speisekarte mit Buchstabensalat („eShc Safiy"), gross im Bild.
  Prompt neu gebaut ohne Karte, Haende um ein Wasserglas.
- **x4-dinner4-a** - uebergeschlagenes Bein waechst aus der Stuhllehne.
- **x5-lost-a** - Telefonhoerer mit Kabel mitten auf der Strasse.
- **x6-plate-a** - Ladenschilder „SANSPD / SSNARD" in Rot und Gelb.
- **x8-view-a** - Bildmittelpunkt ist ihr Hintern. Derselbe Fehler wie bei `u-home-a`
  und `c1` im Transit-Post.
- **x8-view-b** - HDR-Artefakte, gekachelter Himmel, Kopf und Nacken verformt.
- **y1-hall-b**, **y5-lane-b** - bedruckte Shirts mit Buchstabensalat.
- **y8-view-c** - eingescannter Abzug samt weissem Rand und Schmier-Artefakt.

Geprueft und bestanden: kein Gesicht wird von Text verdeckt (Slides 03, 04, 05 einzeln
gegengeprueft, die Zeile sitzt jeweils unter dem Kinn); das Anzeigeboard auf Slide 01
loest sich in echter Anzeigegroesse in unscharfe Flaechen auf; Marigold `#efc05a` und
Creme `#f4ecdb` sind in allen Slides messbar vorhanden.

## Aenderung am Layout

Die Schlusskarte hat einen zusaetzlichen Verlauf nach unten (`.bot`, 26 % Hoehe,
`rgba(6,29,21,.72)`). Ohne ihn verschwand die goldene DAYA-Bildmarke auf dem hellen
Hemd der Frau. Der Textblock der Schlusskarte sitzt bei 25 % statt 50 %, damit ihr
Gesicht frei bleibt.

## Captions

**Instagram**

„i have no one to go with."

Then go alone.

The first flight is a 0/10. Day one at dinner you are sure the whole room is watching
you, and by day four you order a second glass and stay because you feel like it. Nobody
tells you it flips that fast.

Somewhere in between, the small things stop being a decision. Plate number into the
group chat before you get in. The earlier train so you do not arrive in the dark. You
still do them, they just cost you nothing anymore.

That is where DAYA sits. She pings your person at the times you set, and if you do not
answer, she escalates for you. So the checking in happens whether or not you remember.

Which number are you on right now? Put it in the comments.

#solotravel #solofemaletravel #travelalone #firstsolotrip #dayatravel

**TikTok**

„i have no one to go with." go alone.

first flight: 0/10. the first morning nobody knows your name: 100/10.

which one are you on right now?

#solotravel #solofemaletravel #travelalone #firstsolotrip #dayatravel

Belegte Feature-Aussage in der Instagram-Caption: „Automatischer Check-in (App pingt
deine Person zu deinen Zeiten; bestaetigst du nicht, eskaliert sie fuer dich)",
DESIGN-SYSTEM.md Zeile 181. DAYA ist eine SIE.
