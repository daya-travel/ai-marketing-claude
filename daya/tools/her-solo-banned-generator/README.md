# her-solo-banned-generator

Baut ein komplettes Post-Kit für das Format „seven things that are actually illegal
in X" für @her.solotrip. Lokale JSON-Datenbank, keine API-Keys, kein Netz.

Das Format hat sich beim Japan-Post bewährt: 3.202 Aufrufe, 89 Speicherungen,
11 neue Follower, 97,1 % davon Nicht-Follower (Instagram-App, 03.09.2026).
Zielmetrik ist Speichern, nicht Reposten.

## Benutzen

```bash
python3 generate.py --list                          # welche Länder sind belegt?
python3 generate.py --country Thailand --lang en    # ein Kit bauen
python3 generate.py --country Bali --lang de        # deutsches Skript
```

Landet in `output/{Land}_{Datum}/`:

| Datei | Inhalt |
|---|---|
| `facts.json` | die Fakten mit Strafe, Quelle und Prüfdatum |
| `flatlay_prompts.txt` | 1 Hauptflatlay + 2 Detailaufnahmen, fertig für `soul_2` |
| `elevenlabs_script.txt` | gesprochenes Skript, TTS-fertig |
| `caption.txt` | Instagram-Caption, fünf Hashtags |
| `posting_time.txt` | Termin plus Begründung |

## Zwei Sachen, die das Tool verweigert

Beide stehen so im Code, nicht als Kommentar. Beide kommen aus echten Fehlern.

**1. Kein unbelegter Fakt landet in einem Skript.**
Jeder Fakt trägt `source` und `checked`. Fehlt eins davon, wird er übersprungen und
beim Lauf gemeldet. `--include-unverified` gibt es zum Entwerfen, es warnt laut und
das Ergebnis ist nicht postfähig.

Der Grund: der Thailand-Post ging mit zwei Fehlern raus. Die Zahl der rauchfreien
Strände war der Stand von 2017, und die Drohnenregel („zwei Registrierungen binnen
30 Tagen") war schlicht falsch. Beides war einmal geprüft worden. Einmal geprüft ist
nicht dasselbe wie heute noch richtig, und ein Datum im Datensatz macht den
Unterschied sichtbar.

**2. Kein verbotener Gegenstand kommt ins Bild.**
`prompts/flatlay_prompts.json` hat eine `blocklist`. `generate.py` prüft jeden Prompt
dagegen und bricht ab, wenn ein Wort darin vorkommt. Vapes, Drohnen, Geld, Pässe,
Cannabis, Korallen und Buddha-Figuren stehen drauf.

Zwei Gründe. Erstens liest sich ein Flatlay mit Vape so, als hielte der Account einen
in der Hand. Zweitens schreibt `soul_2` auf jede bedruckte Fläche Buchstabensalat, und
in dieser Nische ist praktisch jeder verbotene Gegenstand ein bedruckter Gegenstand.
Der verbotene Gegenstand kommt später als Textoverlay.

## Die Datenbank pflegen

`data/banned_database.json`. Pro Land sieben Fakten, pro Fakt:

```json
{
  "id": "drone",
  "title": "Flying a drone",
  "why": "Warum Tourist:innen es trotzdem tun",
  "penalty_local": "Strafe im Originaltext",
  "penalty_usd": 3000,
  "penalty_display": "Strafe mit der Umrechnung an der richtigen Stelle im Satz",
  "tts": "Die gesprochene Zeile, kurz",
  "verified": true,
  "checked": "2026-09-01",
  "source": "wo es steht"
}
```

**Umrechnung.** `penalty_usd` steht nur da, wo die Quelle selbst einen Dollarbetrag
nennt oder ein datierter Kurs in `_meta.rates` liegt. Für Baht liegt der Kurs drin
(33,15 THB je USD, 30.08.2026). Für Rupiah, Won und Dong nicht, deshalb steht dort
nur die Zahl der Quelle. Geschätzt wird nichts.

**Neues Land.** Eintrag in `banned_database.json` anlegen und Requisiten in
`prompts/flatlay_prompts.json` unter `countries` ergänzen. Ohne Requisiten bricht der
Lauf mit einer klaren Meldung ab.

## Stand der Datenbank

```
Thailand       7/7    komplett belegt, das Reel ist damit gebaut
Singapore      5/7
Bali           4/7
South Korea    3/7
Vietnam        3/7
Sri Lanka      3/7
Japan          1/7    nur die Medikamentenregel, aus dem Japan-Karussell
```

Die unbelegten Felder sind angelegt und tragen eine `note`, was noch fehlt. Sie sind
**absichtlich leer** statt mit plausiblen Zahlen gefüllt. Ein Land unter 7/7 kann man
nicht als Siebener-Post bauen, das Tool sagt es beim Lauf.

## Länge

`WPM = 172`, gemessen an der echten Thailand-Tonspur (Higgsfield `seed_audio`, Stimme
Isla, `atempo=1.30`). Keine Faustregel, eine Messung.

Damit ist die Vorgabe „30 bis 32 Sekunden" mit dem vorgegebenen Hook und sieben
Punkten knapp nicht erreichbar. Thailand landet bei 98 Wörtern und rund 34 Sekunden,
und die gesprochenen Zeilen sind schon auf das Nötigste gekürzt. Wer wirklich unter 32
will, kürzt den Hook oder nimmt einen Punkt raus. Das Tool rechnet es bei jedem Lauf
vor und sagt, wie viele Wörter fehlen.

## Postingzeiten

Haupttermin Dienstag oder Freitag 13:30 CET, aus den eigenen Zahlen des Accounts
(13:00 bis 14:00 CET performt dort am besten). Testtermin Donnerstag 19:30 CET, das
prüft das EU-weite Reel-Fenster (14:00 bis 17:00 und ab 18:00, Donnerstag 21:00 am
höchsten). Erst umstellen, wenn der Test den Haupttermin zweimal schlägt.

## Rechtliches

**Not legal advice.** Steht in `facts.json` und in der Caption. Gesetze ändern sich,
der Cannabis-Punkt in Thailand hat sich zwischen Juni 2025 und Juni 2026 zweimal
geändert. Vor jedem Post das `checked`-Datum ansehen.
