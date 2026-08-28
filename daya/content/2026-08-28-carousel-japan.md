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
| 1 | Objekt | **One thing in this bag is banned in Japan.** Six things worth knowing before you fly. |
| 2 | Foto | **Japan is one of the safest countries in the world for women.** It also has women-only carriages on 87 train lines. Both of those are true. |
| 3 | Foto | **The pink markings aren't decoration.** Weekday rush hour, from the first train until around 9:30, and evenings on some lines. Pink paint on the platform, pink stickers on the door. Get on the wrong one by accident and nothing happens. It's a social rule, not a law. |
| 4 | Foto | **There's a police box within five minutes of you.** In central Tokyo, usually right by a JR exit. Search 交番 on the map. Most people walk in to ask for directions. Shibuya and Kabukicho have English speakers on every shift, and the emergency number is 110. |
| 5 | Objekt | **Check your cold medicine before you fly.** Sudafed, Actifed and Vicks inhalers are banned. Anything with codeine needs a permit you apply for in advance. Your prescription doesn't override it. |
| 6 | Objekt | **Pack a hand towel and a plastic bag.** Most public toilets have no paper and no dryer. And there are almost no public bins, so you carry your rubbish to a konbini. |
| 7 | Objekt | **Lose your phone here and you'll probably get it back.** In Tokyo about 83% of lost phones find their owner, the highest return rate of anything. Wallets are around 65%. They all go to the same police box, and about 7,700 things get handed in every day. |
| 8 | Foto | **Now go book it.** · DAYA-Wortmarke |

## Nachbesserung am 28.08. nach Alesyas Rueckmeldung

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

One thing in this bag is banned in Japan. It's the cold medicine.

Japan is one of the safest countries in the world for women, and it still has
women-only carriages on 87 train lines. Both of those are true, and knowing why makes
the trip easier.

Five things that are genuinely different there.

The pink markings on the platform are women-only carriages during weekday rush hour.
Pink paint, pink stickers on the door. It's a social rule, so nothing happens if you
board the wrong one.

There's a police box, a koban, within about five minutes of you in central Tokyo,
usually right by a JR exit. Search 交番 on the map. Most people walk in to ask for
directions. Emergency is 110.

Check your cold medicine before you fly. Sudafed, Actifed and Vicks inhalers are
banned, and anything with codeine needs a permit you apply for in advance.

Most public toilets have no paper and no dryer, so everyone carries a small hand towel.

And there are almost no public bins, so your rubbish goes with you until you reach a
konbini.

Now the good part. Lose your phone and you'll probably get it back. In Tokyo about 83%
of lost phones find their owner, and they go to the same police box.

Two more from the picture: slip-on shoes, because you take them off constantly, and an
IC card, which you tap for the train and at the konbini counter.

Save it for the flight. Who's going this year?

#japantravel #solofemaletravel #solotravel #japantips #travelalone

**TikTok**

One thing in this bag is banned in Japan, and it's probably the most boring thing you
own.

Five things worth knowing before you go, plus the one that will make you love the
place.

Save it for the flight.

#japantravel #solofemaletravel #solotravel #japantips #travelalone
