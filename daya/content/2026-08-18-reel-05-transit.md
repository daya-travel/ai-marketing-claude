# Reel 05 - "How to move through a new city alone"

**Account:** @her.solotrip · **Format:** Reel 9:16, 35,5 s + 8 TikTok-Slides ·
**Sprache:** Englisch · **Stand:** 18.08.2026, gebaut und geprüft

---

## Faktenlage (vor dem Bau nachgelesen)

| Behauptung im Post | Beleg |
|---|---|
| Nightjet hat ein Damenabteil, Liege- und Schlafwagen, gleicher Preis wie gemischt, online wählbar | nightjet.com/en/komfortkategorien/spezialabteile/damenabteil |
| „Ask who are you here for" statt den eigenen Namen zuerst zu nennen | Standard-Rideshare-Guidance (Uber/Lyft Safety) |
| Der dokumentierte Betrug ist das richtige Modell mit falschem Kennzeichen | dieselbe Quelle |

Keine Zahl im Post, die nicht belegt ist. Keine Statistik, kein Prozentwert.

---

## Layout: der Hausstil, nicht neu erfunden

Drei Anläufe davor waren jeweils ein selbst ausgedachter Stil, und alle drei
waren falsch: Kopfzeilen-Band mit Textbalken, dann Text unten links über einem
Verlauf, dann derselbe Text weiter oben mit Handle und Marke in der Kopfzeile.

**Entscheidung Alesya, 20.08.: Der Stil bleibt gleich und wird pro Post nicht neu
erfunden.** Übernommen aus `build-solo-dates.mjs`, Wert für Wert:

| Element | Wert |
|---|---|
| Textband | oben 34 %, Höhe 32 %, weicher Emerald-Verlauf |
| Überschrift | Caveat 96 px, auf dem Cover 120 px |
| Fließtext | Archivo 700, 40 px, zentriert, max. 900 px |
| Handle | Archivo 800, 26 px, Marigold, 250 px von unten |
| Endkarte | Handle oben auf 150 px, Bildmarke plus Wort unten auf 300 px |

Der einzige Unterschied zum Vorgängerpost ist das Bild darunter: ein randloses
Foto pro Slide statt des Vierer-Rasters. Das Textband liegt dadurch auf einem
durchgehenden Foto statt auf einer Rasternaht.

**Safe Areas erledigen sich damit von selbst.** Das Band sitzt zwischen 34 und
66 % der Höhe. Instagram überdeckt oben 220 und unten 450 px, TikTok oben 140 und
unten 484 px (nachgelesen 20.08., die Quellen nennen unterschiedliche Werte,
genommen ist jeweils der strengste). Der Text liegt weit dazwischen.

Ändert sich der Hausstil, ändert er sich in beiden Build-Dateien zugleich.

## Bilder

Alle Motive neu gemacht am 18.08. nach dem Bildrezept in `CLAUDE.md`. **Auf jeder
der acht Slides ist eine Frau zu sehen.** Der erste Satz hatte auf 25 Motiven nur
sechs mit Menschen und eine leere Rolltreppe als Cover - unbrauchbar.

**Zweite Runde am 20.08.** nach Alesyas Durchsicht: vier Motive getauscht.
- Slide 4 „Check the plate": vorher öffnete sie schon die Tür, der Text sagt aber
  „prüfen, bevor du die Tür öffnest". Jetzt steht sie hinter dem Auto und schaut
  aufs Kennzeichen.
- Slide 5 „Fuller carriage": vorher frontaler Blick in die Kamera, wirkte gestellt.
  Jetzt sitzt sie in der Nähe der Türen zwischen anderen Fahrgästen, genau wie im
  Text.
- Slide 6 „Wait inside": im alten Bild gab es weder Scheibe noch Straße. Jetzt
  steht sie innen an der Glasfront, draußen die dunkle Straße, zwei weitere
  Personen im Raum.
- Slide 7 „Earlier train": vorher unglückliche Sitzhaltung hinter einem Pfeiler.
  Jetzt Bahnsteig im Morgenlicht mit anderen Reisenden. Eine Variante mit
  Kaffeebecher wurde verworfen, weil die Hand am Becher zu Brei zerlief, und eine
  zweite wegen einer verformten Hand im Vordergrund.

Aussortiert und warum:
- zwei Flughafen-Motive: verzerrte Buchstaben auf den Flugzeugleitwerken, dazu
  Mode-Styling statt echter Reisender
- ein Bahnsteig-Motiv: Anzeigetafel mit lesbarem Buchstabensalat („Smiffistan")
- ein Straßen-Motiv: Unterwäsche sichtbar, passt nicht auf diesen Account
- `clip-morning.mp4` nach dem Acht-Frame-Check: Zugfront mit zwei kleinen Figuren
  daneben, wäre die einzige Slide ohne Frau gewesen. Standbild ist stärker.

Bewegt ist nur noch das Cover (`clip-car.mp4`, Frau vor Autoscheinwerfern, über
acht Frames geprüft, keine Auflösungserscheinungen). Rest Standbilder mit
langsamem Zoom. **Keine neuen Video-Credits.**

---

## Slides

| # | Überschrift | Text |
|---|---|---|
| 1 | How to move through a new city alone | Six things that make it easier. Solo travel, minus the guesswork. |
| 2 | Book the ladies only compartment | Nightjet has one in the couchette and the sleeper. Women only, same price as a mixed compartment. Look for the female icon when you book, they sell out early. |
| 3 | Ask who are you here for | Never say your name first. A real driver already has it on the screen in front of them. If they have to guess, walk away. |
| 4 | Check the plate, not the car | The scam is the right model with the wrong plate. Match the whole thing before you open the door, not just the colour. |
| 5 | Sit in the fuller carriage | Not the empty one at the end, even though it is quieter. Near the doors, near other people, is the better seat. |
| 6 | Wait for your ride inside | Not at the kerb in the dark. Inside there are staff and other people, and you can watch for the car through the glass. |
| 7 | Book the earlier train | Same ticket, different arrival. More people on the platform, more open at the other end, and no waiting alone once you land. |
| 8 | Save this before your next transfer | Which one did you not know? |

---

## Dateien

```
daya/studio/reels/reel-transit/
  daya-reel-transit-VO.mp4      35,5 s, mit ElevenLabs-Stimme (33,2 s, ab 0,8 s)
  daya-reel-transit-CLEAN.mp4   35,5 s, ohne Ton
  slides/01..08                 1080x1920 PNG, TikTok-Karussell
```

Neu bauen: `node daya/studio/build-transit.mjs`

**Ich kann Audio nicht anhören.** Länge und Schnittpunkte passen, den Klang musst
du prüfen.

---

## Caption Instagram

Six things I do now that I did not do on my first solo trip.

The ladies only compartment on Nightjet is the one most people miss. It exists in
the couchette and in the sleeper, it costs the same as a mixed compartment, and
you pick it when you book. It sells out first, so book early.

With a driver, never say your name first. A real driver already has it on the
screen in front of them. And match the plate, not the car. The known trick is the
right model with the wrong plate.

On a train I take the fuller carriage, even though the empty one at the end is
quieter. Waiting for a ride, I wait inside where there are staff and glass to
watch through. And when there is a choice, I book the earlier train.

Save this before your next transfer.

#solofemaletravel #solotravel #travelsafety #traveltips #nightjet

---

## Caption TikTok

six things i do now that i did not do on my first solo trip.
the ladies only compartment is the one nobody tells you about.

which one did you not know?

#solofemaletravel #solotravel #travelsafety #traveltips #solotraveltips
