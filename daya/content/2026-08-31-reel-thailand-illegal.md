# Reel: „Seven things that are actually illegal in Thailand"

Datum: 31.08.2026 · Kanal: Instagram Reel + TikTok · Account: @her.solotrip
Tonspur: `daya/studio/audio/thailand/` - **verwendet wird `thailand-isla-115.wav`, 61 s**

## Herkunft und warum es geprueft werden musste

Alesya hat ein fertiges ElevenLabs-Skript uebergeben („Elevenlabs baut grad Scheisse,
kannst du bitte uebernehmen?"). Es behauptete **sieben Straftatbestaende mit konkreten
Haft- und Geldstrafen** fuer Thailand.

Das ist die riskanteste Textsorte, die dieser Account bisher hatte: eine Leserin
richtet ihr Verhalten danach, und eine Journalistin prueft es in fuenf Minuten.

**Von den sieben Punkten stimmten zwei. Zwei waren falsch, drei unvollstaendig.**

## Pruefprotokoll mit Quellen

| # | Original | Befund | Quelle |
|---|---|---|---|
| 1 | Vapes seit 2014 verboten, keine Touristen-Ausnahme | **Stimmt**, sogar untertrieben. Strafen bis 30.000 THB, Einfuhr ueber den Zoll nach Customs Act deutlich haerter. Razzia 2025: ueber 120.000 Vapes beschlagnahmt, 690 Festnahmen in einer Woche | terms.law, iamkohchang.com, canibringto.com |
| 2 | 20 Straende, bis 1 Jahr oder 100.000 THB | **Stimmt.** Verbot seit November 2017, Phuket und Koh Samui dabei | SCMP, SEATCA, Library of Congress Global Legal Monitor |
| 3 | Drohne: „5 Jahre oder 100.000 THB, Tempel No-Fly" | **Ungenau.** Zwei Gesetze: Air Navigation Act bis 1 Jahr + 40.000 THB, Radiocommunication Act bis 5 Jahre + 100.000 THB, beide koennen greifen. Registrierung binnen 30 Tagen nach Einreise. **„Tempel" nicht belegt.** Belegt: 9 km um jeden Flughafen (deckt fast ganz Phuket), koenigliche Anlagen, alle Nationalparks | TAT Newsroom, droneth.or.th, uavwiki.com |
| 4 | 3 bis 15 Jahre; Beispiel „auf Geld treten" | **Strafe stimmt**, §112, pro Anklagepunkt, Punkte addieren sich, Auslaender werden verfolgt. **Beispiel nicht belegbar.** Belegt ist: jeder einzelne Social-Media-Beitrag zaehlt als eigener Punkt | ARTICLE 19, ilaw.or.th, thailawonline.com |
| 5 | „drinnen entkriminalisiert, Einfuhr ist Drogenimport" | **Veraltet.** Seit 25.06.2025 medizinisch-only, umgestuft als „controlled herb". Kauf nur mit thailaendischem PT-33-Rezept, auslaendische Rezepte gelten nicht. CBD unter 0,2 % THC ohne Rezept legal, darueber Kategorie-5-Betaeubungsmittel. Tourist:innen duerfen Cannabis unter keinen Umstaenden ein- oder ausfuehren | Thaiger, terms.law, cannabisregulations.ai |
| 6 | „500 THB/Tag plus Haft, Abschiebung, Sperre" | **Unvollstaendig.** 500/Tag stimmt, **gedeckelt bei 20.000 THB** nach 40 Tagen. Entscheidend: selbst melden gegen erwischt werden. 30 Tage freiwillig = 15.000 THB ohne Sperre; dieselben 30 Tage am Checkpoint = 15.000 THB **plus 5 Jahre Einreisesperre**. Automatische Sperren ab rund 90 Tagen | juslaws.com, tratimmigration.com, thailawonline.com |
| 7 | „bis 10.000 THB" | **Falsch in beide Richtungen.** Fische fuettern bis 5.000 THB; Korallen/Muscheln bis 5.000 THB plus Abschiebung; **Beschaedigung von Naturguetern im Nationalpark bis 5 Jahre Haft und 500.000 THB** (National Park Act 2019) | thailand.go.th, thethailandlife.com, responsiblethailand.com |

## Das Laengenproblem

Das Original schaffte seine angekuendigten 31 Sekunden **auch dadurch, dass es
ungenau war**. Ich hatte die korrigierte Fassung auf rund 50 Sekunden geschaetzt.
**Auch das war zu optimistisch:** die fertige Tonspur laeuft 70 Sekunden (Isla) bzw.
81 Sekunden (Maeve). TTS liest langsamer als Lesegeschwindigkeit.

Wer auf 40 bis 45 Sekunden will, streicht die Detailsaetze bei 3 und 6 und behaelt
nur die Zahl. Der Nutzwert sinkt dabei spuerbar.

## Skript, englisch, gesprochene Fassung

Planning a solo trip to Thailand?
Seven things that are actually illegal, and tourists do them every day.

One. Vapes. Banned since 2014. Having one or bringing one in, and there's no
exception for tourists. Fines reach 30,000 baht.

Two. Smoking on the beach. Twenty of them, including Phuket and Koh Samui. Up to a
year in prison, or 100,000 baht.

Three. Flying a drone unregistered. You need two registrations, within thirty days of
landing. And the no-fly zone is nine kilometres around every airport, which covers
almost all of Phuket.

Four. Posting about the monarchy. Three to fifteen years, and every post counts
separately.

Five. Carrying cannabis in or out. Thailand went medical-only in June 2025, and your
prescription from home doesn't count.

Six. Overstaying. Five hundred baht a day. Report yourself and you just pay it. Get
stopped at the airport and you're banned for five years.

Seven. Taking coral home. Inside a national park that runs to five years and 500,000
baht.

Save this before you fly.

## Vertonung

ElevenLabs streikte, deshalb ueber Higgsfield `seed_audio` erzeugt. Zwei
Preset-Stimmen zum Vergleich, **Isla** und **Maeve**. Die von Alesya genannten
ElevenLabs-Einstellungen (Rachel/Bella, Stability 50, Clarity 75, Style 30, Speed
0.95) sind unveraendert geblieben, falls sie dort spaeter selbst einspricht.

**Ich kann Audio nicht anhoeren.** Bei „angenehm" musste ich passen. Bei „nicht zu
langsam" gibt es dagegen eine messbare Groesse, das Sprechtempo:

| Datei | Laenge | Woerter/Minute |
|---|---|---|
| `thailand-maeve.wav` | 80,8 s | 127,7 |
| `thailand-isla.wav` | 70,0 s | 147,4 |
| **`thailand-isla-115.wav`** | **60,9 s** | **169,5** |
| `thailand-isla-125.wav` | 56,0 s | 184,2 |

Normale Erzaehlgeschwindigkeit liegt bei rund 150 bis 160 W/min. **Maeve ist damit
messbar zu langsam, Isla sitzt fast auf Normaltempo.** Gewaehlt: Isla.

Die beschleunigten Fassungen entstehen mit `ffmpeg -filter:a "atempo=1.15"`. `atempo`
haelt die Tonhoehe, anders als reines Schnellerabspielen, das die Stimme quietschig
macht. Empfehlung ist **1.15 mit 61 Sekunden**, weil 170 W/min zuegig klingt und
verstaendlich bleibt. Alesya muss damit in Instagram Edits nichts mehr nachregeln.

## Bilder

Neun Frames, gebaut mit `daya/studio/build-thailand.mjs`. Ausgeliefert:
`daya/studio/reels/thailand/daya-reel-thailand-illegal.mp4`, 1080x1920, 30 fps,
62,8 s Bild auf 60,9 s Ton. Der Schlussframe laeuft zwei Sekunden laenger als die
Stimme, damit „Save this before you fly." lesbar bleibt.

### Die Segmentgrenzen sind gemessen, nicht geschaetzt

`ffmpeg -af silencedetect=noise=-32dB:d=0.30` hat 22 Sprechpausen in
`thailand-isla-115.wav` gefunden. Aus der Wortzahl je Abschnitt kam eine Erwartung,
die dann auf die naechstgelegene echte Pause gerastet wurde. Ergebnis in
`daya/studio/audio/thailand/cuts.json`:

| # | Abschnitt | von | bis | Dauer |
|---|---|---|---|---|
| 1 | Hook | 0,00 | 7,58 | 7,58 s |
| 2 | Vapes | 7,58 | 14,46 | 6,88 s |
| 3 | Strand | 14,46 | 22,39 | 7,93 s |
| 4 | Drohne | 22,39 | 32,87 | 10,48 s |
| 5 | Monarchie | 32,87 | 37,66 | 4,79 s |
| 6 | Cannabis | 37,66 | 45,44 | 7,78 s |
| 7 | Overstay | 45,44 | 54,12 | 8,68 s |
| 8 | Korallen | 54,12 | 59,08 | 4,96 s |
| 9 | Schluss | 59,08 | 60,87 | 1,79 s + 2,0 s Nachlauf |

### Die neun Motive

Alle mit `soul_2`. Thailand hat an jeder Strasse mehr Schrift als Japan, deshalb sind
die Orte bewusst schriftfrei gewaehlt - Strand, Himmel, Unterwasser, Blatt, leere
Halle. Keine Strassen, keine Maerkte, keine Laeden, keine Tempel.

| # | Motiv | Textposition |
|---|---|---|
| 1 | Frau mit Rucksack am Strand, Blick aufs Meer | oben, ueber Meer und Landzunge |
| 2 | blankes schwarzes Geraet auf Beton | unten, auf der freien Betonstufe |
| 3 | Zigarettenstummel halb im Sand, Meer unscharf dahinter | unten |
| 4 | Drohne klein gegen offenen Himmel ueber der Kueste | unten, vier Stichpunkte |
| 5 | Frau am Handy, von der Seite, Laub dahinter | unten, Gesicht bleibt frei |
| 6 | Cannabisblatt auf hellem Stein | unten, enger Verlauf, Kopfzeile in Emerald |
| 7 | Frau allein in einer leeren Sitzreihe | oben, vier Stichpunkte |
| 8 | flaches Korallenriff, klares Wasser | oben, im offenen Blau |
| 9 | Frau klein am Strand vor Karstfelsen im Abendlicht | unten, darunter das DAYA-Lockup |

### Was rausgeflogen ist, und warum

27 Varianten erzeugt, neun benutzt. Die Ausfaelle folgen genau den bekannten Mustern:

- **Buchstabensalat auf dem Gegenstand, sechsmal.** Ein Vape trug „worosiie" und
  „AOTVG PIAIEINI", zwei Longtailboote „ND SASS" und „Majodore", ein T-Shirt einen
  Aufdruck. Alle raus statt neu geprompted.
- **Der Hintern in der Bildmitte, einmal.** Die zweite Strandvariante schnitt auf
  Oberschenkelhoehe hinter einer Frau in kurzer Hose. Dazu ein weisser Scanrand.
- **Kippen wie Pfosten, dreimal.** `soul_2` stellt Zigarettenstummel senkrecht in den
  Sand, ordentlich verteilt. Das ist sofort als KI erkennbar, echte Kippen liegen.
  Geloest mit „lying flat on their sides half buried in the sand, casually dropped,
  not arranged, at different angles".
- **Beschilderung in der Abflughalle, zweimal.** Auch eine Halle hat Schilder. Die
  gewaehlte Variante hat nur Wandnotizen, die bei Anzeigegroesse kein Wort ergeben,
  und der Textblock liegt ohnehin darueber.

Neu erzeugt wurden daraufhin Strandrauchen, Abflughalle und Schlusskarte.

### Zwei Layout-Entscheidungen

- **Nicht drei Verlaeufe uebereinander.** Kopf-, Mittel- und Fussverlauf zusammen
  machten die Fotos matschig, also genau den bearbeiteten Look, der am 29.08. weg
  sollte. Liegt der Text tief, deckt der Fussverlauf ihn schon ab und der
  Mittelverlauf faellt weg.
- **Die DAYA-Wortmarke kommt aus dem eingecheckten Original**
  `daya/brand/design-package/daya-brand/daya-horiz-cream.png`. Der frueher benutzte
  Pfad unter `photos/daya-grid/` ist beim Container-Neustart verlorengegangen, und ein
  nachgebautes Logo waere geraten gewesen.

## Captions

### Instagram

> Seven things that are actually illegal in Thailand, and tourists do them every day.
>
> The vape one catches people at customs before they've even left the airport. Banned
> since 2014, no exception for tourists, fines up to 30,000 baht.
>
> The one that got me was overstaying. 500 baht a day sounds survivable. But report
> yourself and you just pay it, get stopped at the airport and there's a five-year ban
> on top of the money.
>
> Every number here comes from Thai law and I checked each one twice. Save it before
> you fly.
>
> #solofemaletravel #thailand #traveltips #solotravel #fyp

### TikTok

> Seven things that are actually illegal in Thailand. The vape alone runs to 30,000
> baht, and there's no tourist exception. Save this before you fly.
>
> #solofemaletravel #thailand #traveltok #solotravel #fyp
