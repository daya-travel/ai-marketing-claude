# CLAUDE.md — ai-marketing-claude

## Regel 0: Raten ist verboten

**Entweder du hast es gesehen, oder du hast es nicht gesehen.** Es gibt nichts dazwischen.
Gilt für Code, für Webseiten, für Bilder, für Zahlen, für Features, für alles.

Festgelegt von Alesya, 03.08.2026, nach mehreren Fehlern hintereinander.

**Bevor du irgendetwas über ein Produkt, eine Seite oder eine Datei behauptest:**
1. Öffne sie. Lies sie. Bei Bildern: mit dem Read-Tool anschauen.
2. Findest du die Information nicht, sag „ich habe es nicht gefunden" und frag.
3. Schreibe niemals einen Satz, dessen Beleg du nicht gerade vor dir hattest.

**Was Raten in der Praxis heißt** (alles echte Fehler aus dieser Zusammenarbeit):
- Behauptet, der Name DAYA komme von Diana der Jägerin. Kam von Diana + Alesya.
- Behauptet „DAYA läuft leise im Hintergrund". Klang nach Life360, dem Wettbewerber.
- Danach ins Gegenteil übertrieben: „Nobody is tracking you". DAYA hat Live-Standort,
  Auto-Eskalation und Panik-Score. Die Featureliste stand die ganze Zeit auf der Seite.
- Captions mit 10 Hashtags geschrieben, obwohl 5 mehrfach angesagt waren.

Jeder dieser Fehler wäre durch **Nachsehen** vermieden worden, nicht durch Nachdenken.

**Ein falscher Satz kostet mehr als eine Rückfrage.** Diese Texte gehen an echte
Leserinnen und später an Redaktionen. Eine erfundene Behauptung, die eine Journalistin
prüft, beschädigt die Marke dauerhaft.

## Wo die Wahrheit steht

| Frage | Quelle |
|---|---|
| Was kann die App? | `daya/brand/DESIGN-SYSTEM.md`, Abschnitt Featureliste — und dayatravel.app selbst |
| Wie schreiben wir? | `daya/brand/DESIGN-SYSTEM.md`, Voice + Anti-Slop-Regeln |
| Was ist schon entschieden? | `daya/brand/DESIGN-SYSTEM.md`, Abschnitt GEKLÄRT |
| Was wurde schon gepostet? | `daya/content/*.md` |

Website-Texte lassen sich ohne Rendering auslesen: die Copy steht in den JS-Bundles unter
`dayatravel.app/assets/*.js`. Mit curl holen und die String-Literale extrahieren.

## Feste Regeln für alle Texte

- **Maximal 5 Hashtags.** Immer, überall, keine Ausnahme.
- **Keine langen Gedankenstriche.** Nur einfacher Bindestrich `-` mit Leerzeichen.
- **Kein „nicht X, sondern Y".** Bekanntes KI-Muster, zerstört Vertrauen.
- **Keine Dreierregel.** Zwei oder vier Aufzählungen, nie drei im gleichen Rhythmus.
- **Keine erfundenen Zahlen.** Jede Zahl muss belegt sein oder raus.
- **Captions immer als Chat-Text ausgeben**, nicht nur als Datei — Alesya öffnet die
  Dateien nicht.

## Bilder

Jedes generierte Bild vor der Auslieferung mit dem Read-Tool ansehen. In der Vergangenheit
kamen Bilder seitlich gedreht zurück und eine Frau atmete sichtbar Rauch aus. Beides wäre
ungeprüft rausgegangen.

Higgsfield speichert Generierungen serverseitig. Vor dem Neugenerieren erst
`show_generations` durchsuchen — spart Credits.
