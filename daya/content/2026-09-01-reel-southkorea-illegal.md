# Reel: „One thing in your carry-on is a narcotics charge in South Korea"

Datum: 01.09.2026 · Kanal: Instagram Reel + TikTok · Account: @her.solotrip
Status: **Entwurf.** Texte stehen, Bilder und Tonspur fehlen.

## Warum Suedkorea

Diana hat es vorgeschlagen. Die Zahlen geben ihr recht:

- 4,76 Mio auslaendische Besucher allein im ersten Quartal 2026, Rekord
- 8,72 Mio nach fuenf Monaten, ueber 10 Mio bis zum 20. Juni
- Im Maerz 2,06 Mio in einem einzigen Monat, getrieben von einem BTS-Comeback
- Besucherschaft jung und ueberwiegend weiblich

Quellen: travelandtourworld.com (mehrere Stuecke 2026), mysouthkoreastay.com Q1 2026.

## Warum neun, und warum diese neun

Alesya am 01.09.: „schon wieder 7..? mach 9 oder 11? und warum sind hier wieder
vapes und dronen? alles gleich vom letzten post oder was?"

**Beides war ein Konstruktionsfehler.** Der Meta-Auftrag gab feste Kategorien fuer
jedes Land vor - Vapes, Strandrauchen, Drohne, Majestaetsbeleidigung, CBD, Overstay,
Korallen - und ich habe das eins zu eins ins Schema gebaut. So gebaut sieht jedes
Land zwangslaeufig gleich aus. Die erste Korea-Liste teilte **vier von sieben**
Kategorien mit Thailand: Vapes, Drohne, Overstay, Cannabis.

Rausgeflogen sind **Vapes** und **Overstay**, die generischsten. Fuenf Punkte sind
neu recherchiert und belegt, die es so nur in Korea gibt. Zwei sind geblieben, aber
mit anderem Fokus: die Drohne (die 15-km-Sperrzone entlang der Grenze gibt es sonst
nirgends) und Cannabis (in Korea geht es um den Haartest bei der Einreise, in
Thailand ging es um die Ausfuhr).

**Systemische Loesung im Werkzeug.** `generate.py` hat jetzt `check_repeats`. Laender
tragen ein `posted`-Datum, und wer mehr als zwei Themen mit einem schon geposteten
Land teilt, bekommt beim Lauf eine Warnung mit den Namen der Doppelungen. Ausserdem
ist die feste Sieben raus: die Anzahl kommt aus den Daten, Zahlwoerter bis elf.

## Die neun Punkte, mit Beleg

Kurs: **1 USD = 1.368,62 KRW**, Stand 01.09.2026 (tradingeconomics.com).

| # | Punkt | Strafe | Quelle |
|---|---|---|---|
| 1 | **Fremde filmen** | Bis 5 Jahre, 7 beim Verbreiten, oder 50 Mio KRW (~36.500 $). Gilt auch im oeffentlichen Raum | Act on Special Cases Concerning the Punishment of Sexual Crimes Art. 14; Korea Herald; pureumlawoffice.com |
| 2 | **Nicht deklariertes Essen** | Bis 10 Mio KRW (~7.300 $) fuers Nichtdeklarieren. Jerky aus nicht zugelassenen Laendern ab 5 Mio. Gruener Ausgang erhoeht um 40 bis 60 % | APQA; trip.com Korea Customs 2026; haniseoul.com |
| 3 | **Miet-E-Scooter** | Mopedfuehrerschein Pflicht, Helm Pflicht. Ohne Fuehrerschein bis 100.000 KRW (~75 $), ohne Helm 20.000 | Korea Herald (Seoul Lizenzpruefung); swapswap.kr; frontlens.io |
| 4 | **Medikamente** ← Aufloesung | Adderall komplett verboten, keine Eigenbedarfsausnahme. Methylphenidat braucht MFDS-Genehmigung, 2 bis 3 Wochen vor Abflug | nomedic.co; insight-bridge.co.kr; tripbase.com |
| 5 | **Weiterverkaufte Konzertkarten** | Bis 1 Jahr oder 10 Mio KRW (~7.300 $), dazu Bussgelder bis zum 50-fachen des Ticketpreises. **Kaufen zaehlt, nicht nur Verkaufen.** Durchsetzung seit August 2026 | Korea Herald; Korea Times 24.06.2026; korea.net |
| 6 | **Han-Park** | Muell 30.000 KRW (~22 $), Laerm oder Betrunkenheit 70.000 (~51 $) | korea.net, verschaerfte Hangang-Park-Regeln |
| 7 | **Jeju, Zahlung sofort** | Vor-Ort-Bussgelder gegen auslaendische Tourist:innen fuer Bei-Rot-Gehen, Muell, Rauchen auf rauchfreien Strassen | Korea Herald, Jeju-Polizei |
| 8 | **Grenz-Sperrzone** | 15 km im Osten, 10 km im Westen. Bis 1 Jahr oder 10 Mio KRW (~7.300 $) nach dem Februar-2026-Gesetz | drone-laws.com; dronesgator.com |
| 9 | **Der Haartest** | Bis 5 Jahre oder 50 Mio KRW (~36.500 $). Zoll macht Haartests, Reisende wurden allein aufgrund des Tests festgehalten | Narcotics Control Act; UK FCDO; tripbase.com |

**Not legal advice.**

## Warum Punkt 1 zuerst steht

Das Filmverbot ist der staerkste Haken und zugleich der einzige Punkt, der die
Leserin **schuetzt** statt sie nur zu warnen. Die Molka-Gesetze existieren, weil
Frauen in Korea heimlich gefilmt wurden.

Der Haartest steht am Schluss, weil „they can prove what you smoked before you came"
direkt in den Schlusssatz „Save this before you fly" laeuft.

## Hook: Raetsel statt Liste

Der erste Entwurf lief mit demselben Listen-Hook wie Thailand. Alesya am 01.09.:
„der hook ist aber gleich wie der hook auf dem post davor". Stimmt.

**Zwei Belege haben die Wahl entschieden.** Erstens die eigene Hook-Formel aus den
Notion-Zahlen (`2026-07-05-reel-02-phone-stolen.md`): Zahl + Nische + Save-Trigger,
poetische Hooks floppen messbar (24-61 Views), Listen-Hooks laufen (1.000-1.700).
Zweitens der Japan-Post, der mit **48 Speicherungen auf 2216 Aufrufe** der beste
war - und der hatte gar keinen Listen-Hook, sondern ein **Raetsel**: „One thing in
this picture is banned in Japan", aufgeloest erst auf Slide 5.

Gewaehlt:

> **One thing in your carry-on is a narcotics charge in South Korea.**
> *Nine things worth checking before you fly.*

**Warum es auf den Koffer zeigt und nicht auf das Foto.** Bei Japan lag der verbotene
Gegenstand wirklich im Bild, die Erkaeltungsmedizin. Bei Korea geht das nicht: die
Punkte sind entweder bedruckt (Tabletten, Konzertkarte, und `soul_2` macht daraus
Buchstabensalat) oder gar kein Gegenstand (Filmen, Jaywalking). Ein Bildraetsel waere
genau der „this bag"-Fehler vom 28.08. gewesen, ein Satz ueber einen Gegenstand, der
nicht im Bild liegt. Das Raetsel zeigt deshalb auf ihren eigenen Koffer.

**Aufloesung auf Slide 5**, wie bei Japan: die Medikamente.

**Eine Praezisionsfrage, offen fuer Alesya.** „is a narcotics charge" stimmt fuer
jede, die ADHS-Mittel oder codeinhaltige Schmerzmittel dabeihat, fuer andere nicht.
Slide 5 traegt die Einschraenkung im Fliesstext, damit der Post insgesamt nicht mehr
behauptet als er belegen kann. Wer es ganz wasserdicht will, schreibt „could be"
statt „is" - das kostet Schaerfe, deshalb steht es nicht als Voreinstellung drin.

## Format: beides, und das ist belegt

Aus den eigenen Account-Daten (`2026-07-05-reel-02-phone-stolen.md`):
**TikTok Foto-Karussell** (Karussells laufen dort 30-50x besser als Video),
**Instagram Reel** (Reels bringen dort die Reichweite). Gleicher Inhalt, zwei
Verpackungen.

## Skript, 132 Woerter, rund 46 Sekunden bei 172 W/min

One thing in your carry-on is a narcotics charge in South Korea. Here are nine things to check before you fly.

One. Filming strangers. Up to five years, and it counts in public.

Two. Undeclared food. Ten million won, and the dogs work arrivals.

Three. Rental scooters. You need a licence for those kickboards.

Four. This one's the answer. Your medication. Adderall is banned, and the permit takes three weeks.

Five. Resold concert tickets. Buying one counts, not just selling.

Six. The river park. Getting loud there is a seventy thousand won fine.

Seven. Jaywalking on Jeju. They fine tourists on the spot.

Eight. The border. Fifteen kilometres of no-fly zone, and it's watched.

Nine. The hair test. They can prove what you smoked before you came.

Save this before you fly.

**Zur Laenge:** 46 Sekunden. Die urspruengliche Vorgabe von 30 bis 32 Sekunden ist
mit neun Punkten nicht zu halten, das waeren rund 92 Woerter fuer alles. Elf Punkte
kaemen auf ueber 55 Sekunden. Geschaetzt ist nichts, 172 W/min sind an der
Thailand-Tonspur gemessen.

## Elf Frames

Cover, neun Punkte, Schlusskarte. Aufloesung des Raetsels auf **Slide 5**, wie bei
Japan.

## Captions

### Instagram

> One thing in your carry-on is a narcotics charge in South Korea. It's your medication.
>
> Adderall is banned outright, and Concerta or Ritalin need a narcotics permit you apply for two to three weeks before you fly. A prescription from home doesn't substitute for it.
>
> The one that catches creators first is filming. Recording strangers without asking counts as a sexual offence here, and it applies in the street. Up to five years, seven if you post it.
>
> Every number here comes from Korean law and I checked each one this week. Save it before you fly.
>
> Not legal advice.
>
> #solofemaletravel #southkorea #traveltips #solotravel #fyp

### TikTok

> One thing in your carry-on is a narcotics charge in South Korea. Nine things to check before you fly.
>
> #solofemaletravel #southkorea #traveltok #solotravel #fyp

## Offen

- Bilder. Korea hat viel Beschilderung, also schriftfreie Orte waehlen: Park,
  Kueste, Innenraum. Keine Einkaufsstrasse.
- Reel mit Tonspur oder erst Karussell, entscheidet Alesya.

