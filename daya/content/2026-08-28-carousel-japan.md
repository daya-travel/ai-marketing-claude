# Karussell: „Before you fly to Japan alone"

Datum: 28.08.2026 · Kanal: Instagram + TikTok Karussell · Account: @her.solotrip
Build: `daya/studio/build-japan.mjs` · Ausgabe: `daya/studio/reels/carousel-japan/`

## Was das ist

Nutzwert-Post im Flatlay-Starter-Pack-Format, das Alesya am 26.08. vorgeschlagen hat.
Zielmetrik ist **Speichern**, nicht Reposten. Der CTA ist entsprechend.

Warum Japan und nicht Albanien: Japan steht auf der Wunschliste für Solo-Reisen ganz
oben, ist Thema dieses Accounts wegen der Sicherheits-Infrastruktur, und war hier noch
nicht bespielt. Albanien ist die Billig-Empfehlung von 2024/25.

## Slides

| # | Typ | Text |
|---|---|---|
| 1 | Objekt | **One thing in this picture is banned in Japan.** Six things worth knowing before you fly. |
| 2 | Foto | **Japan is one of the safest countries in the world for women.** It still has women-only carriages on 87 train lines. Both of those are true. |
| 3 | Foto | **Pink means women only.** · Pink paint on the platform, pink stickers on the door · Weekday rush hour, until about 9:30 · Any other time, anyone can use it · Get on the wrong one and nothing happens |
| 4 | Foto | **There's a police box within five minutes of you.** · They're called koban, around 1,000 in Tokyo · Red lamp outside, sign in English too · Search "police box" on your map · Most people go in just to ask directions · Emergency is 110 |
| 5 | Objekt | **Check your cold medicine before you fly.** · Sudafed, Actifed and Vicks inhalers are banned · Codeine needs a permit, applied for before you travel · A prescription from home doesn't help · Read the ingredients on the box |
| 6 | Objekt | **Pack a hand towel and a plastic bag.** · Most public toilets have no paper towels and no dryer · Almost no bins on the street · Your rubbish goes with you to a konbini · A konbini is a convenience store, they're everywhere |
| 7 | Objekt | **Lose your phone here and you'll probably get it back.** · About 83% of lost phones in Tokyo are returned · Wallets around 65% · It all goes to the same police box · About 7,700 items handed in every day |
| 8 | Foto | **Now go book it.** · DAYA-Wortmarke |

## Durchgang am 29.08.: unbrauchbare Anweisung und Stichpunkte

Alesya: „Und was ist das für japanisches Zeichen? Wie kann sie es eingeben oder
kopieren? ... schreibe nicht zu viel, stichpunkte vllt am besten damit es nicht so
klobig aussieht?"

**Das Kanji war eine Anweisung, die niemand ausfuehren kann.** „Search 交番 on the
map" steht in einem Bild. Man kann es weder mit einer deutschen Tastatur tippen noch
aus einer Bilddatei kopieren. Nachrecherchiert, und es ist doppelt unnoetig:

- **„police box" auf Englisch funktioniert** in Google Maps in Japan.
- **Koban tragen aussen eine rote Lampe und ein Schild auf Englisch.** Das ist die
  eigentliche Erkennungshilfe, und sie stand nirgends im Post.

Das Zeichen ist raus, die rote Lampe ist drin.

**Alle Fliesstexte auf den Info-Slides sind Stichpunkte geworden.** Vier bis fuenf
kurze Zeilen statt eines Absatzes von vier bis sechs Zeilen. Die Liste ist
linksbuendig, als Block mittig gesetzt, Punkte in Marigold. Slide 1, 2 und 8 bleiben
Fliesstext, das sind Aussagen und keine Listen.

Positionen nachgezogen, weil die Bloecke kuerzer geworden sind: Slide 5 auf `ty: 74`,
Slide 6 auf `ty: 76`.

## Nachbesserung am 28.08.## Nachbesserung am 28.08. nach Alesyas Rueckmeldung

> „vllt stärkeren hook? ansonsten mir gefällt es. und am ende fehlt etwas cooles,
> alles sehr trocken."

**Der Hook-Fehler war handwerklich.** Das Nutzenversprechen stand auf dem Cover
(„Before you fly to Japan alone - five things worth knowing") und die Spannung auf
Slide 2. Genau falsch herum: ein Cover, das wie eine Kapitelueberschrift liest,
stoppt keinen Daumen.

Neu zeigt der Hook auf das Bild selbst. Die Leserin scannt reflexhaft die
Gegenstaende, findet die Antwort nicht und muss wischen. Die Aufloesung steht auf
Slide 5, also tief im Post. **Die Behauptung stimmt:** die Blisterpackung liegt im
Bild, und Pseudoephedrin-Erkaeltungsmittel sind in Japan belegt verboten.

**Die neue Slide 7 ist die Belohnung.** Der Post handelt sechs Slides lang davon, was
schiefgehen kann. Diese dreht es um, beantwortet die groesste stille Angst jeder
Solo-Reisenden, und greift Slide 4 wieder auf: dasselbe Polizeihaeuschen.

**Die Schlusskarte** hiess „Save this before you book." Das ist eine Anweisung, keine
Pointe. Jetzt „Now go book it." Die Speichern-Bitte steht in der Caption.

**Zaehler korrigiert.** Das Cover versprach „five things", der Post liefert sechs
Info-Slides (02 bis 07). Alesya hat es gefunden. Jetzt „six".

**Der gruene Hintergrund ist weg.** Die Objektbilder lagen als 4:5-Karte auf
Emerald-Grund, weil ein 9:16-Zuschnitt rund 30 % der Breite weggeschnitten haette.
Alesya am 28.08.: „vllt kannst du doch das bild in voller breite des slides machen
... dieser gruene hintergrund stoert irgendwie." Geloest ueber `outpaint_image`
(4:5 auf 9:16). Das Modell verlaengert Leinen und Weg, die Gegenstaende bleiben
unangetastet, und oben und unten entsteht freie Flaeche fuer den Text. Beim
Handy-Motiv hat der Outpaint sogar den ganzen Herbstpark ergaenzt, das Ergebnis ist
besser als das Original.

Zwei Layout-Folgen daraus:

- **`light`-Flag.** Auf hellen Objektbildern entfallen Mittelverlauf und
  Emerald-Gradierung. Mit ihnen versank das Leinen im Matsch und die Gegenstaende
  waren nicht mehr absuchbar - genau das, was der Hook verlangt. Stattdessen nur ein
  enger, kraeftiger Verlauf hinter dem Textblock (`.botlight` bzw. `.toplight`).
- **Dunkle Kopfzeile.** Auf hellen Bildern mit tiefem Text steht `her.solotrip` in
  Emerald statt Creme, sonst ist es Creme auf Creme. Sitzt der Text oben (Slide 07),
  ist der Bildkopf ohnehin verdunkelt, dort bleibt die Kopfzeile creme.

**Hook zeigte auf eine Tasche, die es nicht gibt.** Erste Fassung: „One thing in
**this bag** is banned in Japan." Alesya am 28.08.: „da ist keine tasche auf dem
foto, nur sachen?" Sie hat recht. Auf dem Flatlay liegen Handtuch, Zip-Beutel,
Blisterpackung, Kraft-Kaertchen, IC-Karte, Muenzboerse und Schlupfschuhe flach auf
Leinen. Kein Rucksack, kein Koffer, keine Tasche.

Derselbe Fehlertyp wie das Superlativ oben, nur visuell: ein Satz ueber ein Bild
geschrieben, ohne das Bild dabei anzusehen. Neu **„One thing in this picture is
banned in Japan."** Formulierung von Alesya; sie schrieb „on this picture", im
Englischen heisst es „in this picture", „on" gilt fuer Oberflaechen. Der Fehler
kommt vom deutschen „auf diesem Bild".

**Bildinhalt auf dem Cover nach oben geschoben.** Oben stand leeres Leinen, waehrend
der Textverlauf unten die Schuhe angeschnitten hat. Geloest ueber zwei neue
BEATS-Felder in `build-japan.mjs`: `zoom` (Vergroesserung ueber das Noetige hinaus,
schafft Spielraum) und `oy` (wo aus diesem Spielraum geschnitten wird, groesser =
Inhalt weiter oben). Cover laeuft mit `zoom: 1.2, oy: 0.92`. Kein neues Bild,
nur der Ausschnitt.

**Verstaendlichkeits-Durchgang am 29.08.** Alesya: „sie muessen leicht verstaendlich
sein, ich weiss immer noch nicht wozu die pinken Markierungen sind?"

Sie hat recht, und der Fehler ist eindeutig: Slide 3 sagte, was die Markierungen
**nicht** sind (keine Dekoration), wann sie gelten, wo man sie sieht und was passiert,
wenn man falsch einsteigt. **Sie sagte nie, was Rosa bedeutet.** Die Leserin musste
das von Slide 2 herueberretten. Neue Ueberschrift: **„Pink means women only."**

Nebenbei war „It's a social rule, not a law" das verbotene „nicht X, sondern Y" in
Spiegelform. Ersetzt durch „nobody is fined".

Weitere Klarstellungen im selben Durchgang:

- **„koban"** wird jetzt benannt, vorher stand nur das Kanji im Text.
- **„JR exit"** raus, weil JR ausserhalb Japans niemand kennt. Jetzt „outside a station".
- **„konbini"** bekommt eine Erklaerung, vorher stand das Wort nackt da.
- **„Your prescription doesn't override it"** war umstaendlich. Jetzt „A prescription
  from home doesn't help", dazu die handfeste Anweisung „Check the ingredients on the box".
- Slide 7 gestrafft: „find their owner, the highest return rate of anything" war
  schwerfaellig, jetzt zwei kurze Saetze.

**Bildinhalt auch auf Slide 5 und 6 nach oben.** Gleiche Ursache wie auf dem Cover:
oben leeres Leinen, unten liefen die Gegenstaende in den Textverlauf. Slide 5 mit
`zoom: 1.2, oy: 0.92`, Slide 6 mit `zoom: 1.06, oy: 0.88` - dort war 1.16 zu eng, die
Tasche stiess an den Bildrand.

**Slide 4** hat einen Halbsatz Waerme bekommen. Belegt ist, dass Koban vor allem fuer
Wegauskuenfte benutzt werden. Das senkt die Hemmschwelle, dort wirklich hineinzugehen.

## Belegzeile - jeder Fakt mit Quelle

| Behauptung im Post | Beleg |
|---|---|
| Japan ist **eines der** sichersten Länder für Frauen | Global Peace Index 2026: Japan Platz 9 bis 10. Bounce Women Travel Safety Index: Japan in den Top 3 (Slowenien, Schweiz, Japan). |
| Frauenabteile auf **87 Linien**, 32 Bahngesellschaften | jrpass.com „Women-Only Train Cars in Japan: Rules, Hours, and What Tourists Should Know"; metropolisjapan.com; danayao.com „A Traveler's Guide To Japan's Women Only Trains In 2026" |
| Werktags Rushhour, erster Zug bis etwa 9:00 bis 9:30, abends auf manchen Linien | dieselben Quellen |
| Rosa Bodenmarkierung, rosa Aushang, rosa Türaufkleber | dieselben Quellen |
| Sozial durchgesetzt, kein Gesetz, versehentliches Einsteigen ohne Folgen | jrpass.com, ausdrücklich: „will not result in arrest, fines, or deportation" |
| Koban im Zentrum Tokios meist in fünf Gehminuten, oft am JR-Ausgang | kawaraban.jp; japantravel.navitime.com |
| Auf der Karte nach `交番` suchen | haniseoul.com „How to Use Japanese Police Boxes" |
| Kabukicho und Shibuya Station mit englischsprachigen Beamten in jeder Schicht | tokyocreative.com; japan-dev.com |
| Polizei-Notruf **110** | japan-dev.com; tokyocreative.com |
| Sudafed, Actifed, Vicks-Inhalatoren verboten | accessible-japan.com „List of Banned and Restricted Medications in Japan"; backpackingguys.com |
| Codein braucht vorab eine Genehmigung (Yunyu Kakunin-sho) | nomedic.co „Japan's Banned Medicines & Yunyu Kakunin-sho Guide"; en.japantravel.com |
| Rezept hebt das Verbot nicht auf | nomedic.co, ausdrücklich |
| Viele öffentliche Toiletten ohne Papier und ohne Trockner | explore.com „The Unexpected Item Tourists Should Know Many Public Restrooms In Japan Do Not Have"; japan.travel (JNTO) zu Tenugui |
| Kaum öffentliche Mülleimer, entfernt nach 1995 | japaninsidersecrets.com; yahoo.com |
| Müll zum Konbini, Behälter am Eingang oder an der Kasse | japaninsidersecrets.com |
| Koban werden vor allem für Wegauskünfte benutzt | japan-dev.com: „People in Japan use koban most for asking directions" |
| **Rund 83 %** der verlorenen Handys in Tokio kommen zurück, höchste Quote aller Kategorien | Tokyo Metropolitan Government, „Lost & Found Property System"; Auswertung der Tokioter Polizei |
| Geldbörsen **rund 65 %**, oft noch am selben Tag | dieselben Quellen; livejapan.com |
| **Rund 7.700** Fundsachen täglich in Tokios Koban | Tokyo Metropolitan Government |
| Kontext, nicht im Post: 4.538.244 Fundmeldungen 2025, 4,507 Mrd. Yen Bargeld, davon rund 3,23 Mrd. zurückgegeben | Tokioter Polizei, Jahreszahlen 2025 |

**Korrektur vor der Auslieferung.** Die erste Fassung von Slide 2 sagte „Japan is
ranked **the safest** country in the world for women". Das ist falsch. Island führt
den Global Peace Index seit über fünfzehn Jahren, Dänemark den WPS Index 2025/26,
Japan steht auf Platz 9 bis 10. Geändert auf „one of the safest". Genau diese Zeile
hätte eine Journalistin in zwei Minuten geprüft.

## Stimme

**Als Information, nicht als Erinnerung.** Entscheidung Alesya, 26.08. Kein „when I
was in Tokyo", keine erfundene Reiseerinnerung. Alesya war nicht in Japan; jede Zeile
ist recherchiert und hält einer Nachfrage stand.

**Kein Produktversprechen vor dem Launch.** Kein Link, kein Feature-Satz. Nur die
DAYA-Wortmarke auf der Schlusskarte.

## Bildproduktion

**Zwei Modelle, bewusst getrennt:**

- **Objektbilder** (Slides 1, 5, 6) über `nano_banana_pro`. Sie brauchen lesbare
  Kärtchen; `soul_2` kann keine Buchstaben. Jedes Wort einzeln buchstabiert und
  geprüft: „Japan - solo - before you fly" und „check before you fly", beide korrekt.
- **Fotos** (Slides 2, 3, 4, 7) über `soul_2` nach dem Bildrezept.

**Alle Slides sind randlos.** Die Objektbilder kamen als 4:5 und wurden über
`outpaint_image` auf 9:16 erweitert. Siehe Nachbesserung oben.

**Aussortiert und warum:**

- `j2-train-a`, `j2-train-c` - garbled Banner und Türbeschriftung im Wagen
- `j3-pink-a/b/c` - die rosa Bodenmarkierung war als **Buchstabensalat** gemalt statt
  als reine Farbe. Neu erzeugt mit „a plain smooth band of paint only"
- `j4-corner-a/b/c` und `k4-lane-a/b/c` - Ladenschilder „NeO", „PaohS", „Aunt Saig",
  „AM SHRIP HORN". Nach sechs Fehlversuchen den Ort komplett gewechselt: Parkweg statt
  Straße, weil ein Park keine Schaufenster hat
- `m4-park-c` - Buchstabensalat auf dem Taschengurt
- `j7-end-b` - Sweatshirt mit „Jan Cela"

**Layout-Korrektur:** Slide 4 hatte den Fließtext auf ihrem Gesicht. Der Textblock
sitzt dort jetzt bei 34 % statt 50 % (`ty` im BEATS-Array).

## Captions

**Instagram**

One thing in this picture is banned in Japan. It's the cold medicine.

Japan is one of the safest countries in the world for women, and it still has
women-only carriages on 87 train lines. Both of those are true.

Six things worth knowing.

Pink means women only. Pink paint on the platform, pink stickers on the door, weekday
rush hour until about 9:30. Any other time anyone can use it, and nobody is fined if
you get it wrong.

There's a police box within five minutes of you in central Tokyo. They're called
koban, around 1,000 in the city. Red lamp outside, sign in English. Search "police
box" on your map. Most people go in just to ask directions. Emergency is 110.

Sudafed, Actifed and Vicks inhalers are banned. Codeine needs a permit you apply for
before you travel, and a prescription from home doesn't help. Read the ingredients on
the box.

Most public toilets have no paper towels and no dryer, so pack a small hand towel.
And there are almost no bins on the street, so your rubbish goes with you to a
konbini, the convenience stores you'll find everywhere.

Now the good part. Lose your phone and you'll probably get it back. About 83% of lost
phones in Tokyo are returned to their owner.

Save it for the flight. Who's going this year?

#japantravel #solofemaletravel #solotravel #japantips #travelalone

**TikTok**

One thing in this picture is banned in Japan, and it's probably the most boring thing
you own.

Six things worth knowing before you go, plus the one that will make you love the place.

Save it for the flight.

#japantravel #solofemaletravel #solotravel #japantips #travelalone
