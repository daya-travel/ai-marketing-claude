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
- **Keine Superlative ohne Index.** „Das sicherste Land der Welt für Frauen" stand am
  28.08. fast im Japan-Post. Falsch: Island führt den Global Peace Index, Dänemark den
  WPS Index, Japan steht auf Platz 9 bis 10. Wer „der/die/das sicherste, beste,
  größte" schreibt, nennt die Rangliste dazu oder schreibt „eines der".
- **Verkürzungen benutzen.** „I don't answer", nicht „I do not answer". Belegt an den
  eigenen Posts (`grep` über `daya/content/*.md`: it's 10x, don't 9x). Vollformen
  machen jeden Satz steif, das ist der häufigste Grund, warum ein Text „künstlich"
  klingt. Dazu: jede Zeile laut lesen, Füllwörter wie „just" und „so" drinlassen, und
  kein Sprichwort bauen, wo ein Satz hingehört (Alesya, 26.08.).
- **Captions immer als Chat-Text ausgeben**, nicht nur als Datei — Alesya öffnet die
  Dateien nicht.

## Bilder

Jedes generierte Bild vor der Auslieferung mit dem Read-Tool ansehen. In der Vergangenheit
kamen Bilder seitlich gedreht zurück und eine Frau atmete sichtbar Rauch aus. Beides wäre
ungeprüft rausgegangen.

Higgsfield speichert Generierungen serverseitig. Vor dem Neugenerieren erst
`show_generations` durchsuchen — spart Credits.

**Kein Thema wählen, dessen Kern ein Handgriff ist.** Bildgenerierung kann Räume, Wege,
Gegenstände und Menschen von hinten. Hände, die etwas Feinmechanisches tun, kann sie nicht.
Belegt am 14.08. am Hoteltür-Reel: 24 Motive, kein einziges korrekt, immer derselbe Fehler
(Stoff über die Hardware gehängt statt hineingestopft). Ein falsch gezeigter Sicherheitsgriff
ist schlimmer als gar keiner — jemand macht es nach und hält die Tür für gesichert.
Braucht ein Thema eine Demonstration: Alesya filmt sie mit dem Handy, oder das Thema fällt weg.

### Das Bildrezept (funktioniert, nicht neu erraten)

Referenz sind `daya/studio/photos/daya-grid/hero.png` und `founders.png` (beide von Diana
in Claude Design gebaut) sowie `photos/transit/t901.png` und `t902.png`. Vor jeder neuen
Serie ansehen und den Look treffen.

- **Auf jedem Bild ist ein Mensch**, außer es ist bewusst reine Landschaft. Ein Rückspiegel,
  ein Türgriff oder ein Stück Straße ist kein Motiv.
  **Ausnahme, Alesya 26.08.2026:** Objektbilder und Flatlays sind erlaubt, wenn die
  Gegenstände selbst der Inhalt sind und Information tragen. Die Regel richtet sich
  gegen faule Ersatzmotive, nicht gegen ein bewusstes Objektbild. Ihre Begründung:
  „Es ging um Sachen die man packt, was hat es mit Menschen zu tun?"
- **Modellwahl nach Schrift im Bild.** Braucht das Motiv lesbaren Text, etwa ein
  beschriftetes Kärtchen in einem Flatlay, dann `nano_banana_pro`. `soul_2` kann keine
  Buchstaben. Bei textfähigen Modellen jedes Wort einzeln buchstabieren und prüfen.
- **Keine Motive durch Glas oder Fensterscheiben.** `soul_2` legt dann Innen- und
  Außenraum übereinander. Belegt am 25.08. an `x2-plane-b`: die Tragfläche läuft durch
  ihre Schulter.
- **Länder mit viel Beschilderung brauchen einen anderen Ort, nicht einen besseren
  Prompt.** Für den Japan-Post scheiterten sechs Versuche an erfundenen Ladenschildern
  („NeO", „PaohS", „AM SHRIP HORN"), obwohl „no signs, no lettering" im Prompt stand.
  Gelöst erst durch Ortswechsel: Parkweg statt Einkaufsstraße. Genauso bei
  Bodenmarkierungen - „a plain smooth band of paint only" statt einer Markierung, die
  das Modell als Schriftzeichen malt (28.08.).
- **Die Haltung ist frei** - von hinten, von der Seite, von vorn, sitzend, gehend.
  Entscheidung Alesya, 18.08.2026. Was bleibt: echte Reisende, keine Studio- oder
  Fashion-Models, keine Posen.
- **Der Ort muss ein Ort sein, den man in einem Satz benennen kann.** Bahnsteig,
  Nachtzugabteil, Marktgang, Aussichtspunkt. Geht das nicht, taugt das Motiv nicht.
- **Schön, aber nicht zu perfekt.** Sonst glaubt es niemand. Prompt-Bausteine, die das
  liefern: „Candid documentary photograph of an ordinary young woman ...", „everyday
  clothes, no styling", „unposed, caught mid-thought", „slight imperfection".
- **Stil-Zusatz, der nachweislich funktioniert:** „Rich saturated colour, warm natural
  light, slight imperfection, shallow depth of field, realistic, vertical."
- **Verbotene Prompt-Bausteine:** „no colour grading", „slight grain", „shot on a phone"
  (erzeugt flaue dunkle Bilder, 14.08. komplett neu gemacht) und jeder Filmstock-Name wie
  „Kodak Portra" (erzeugt einen echten Filmstreifen samt Perforation).
- **Der Bildmittelpunkt ist nie ihr Hintern.** Steht die Kamera hinter einer Frau und
  schneidet auf Oberschenkelhöhe ab, sitzt die Gesäßtasche in der Bildmitte. Belegt am
  14.08. (`u-home-a`, `c1`) und am 25.08. wieder (`x8-view-a`). Prompt-Baustein, der es
  löst: „seen small in the frame from a distance, full figure, the view doing the work".
- **Anatomie an Sitzmöbeln prüfen.** Übergeschlagene Beine an Stühlen erzeugt soul_2
  regelmäßig falsch - das Bein wächst dann aus der Lehne (25.08., `x4-dinner4-a`).
- **Schrift im Bild:** soul_2 kann keine Buchstaben. Motive so rahmen, dass keine bedruckte
  Fläche scharf im Bild liegt. Bilder immer in echter Anzeigegröße prüfen, nicht in voller
  Auflösung - Buchstabensalat, der bei 100 % unsichtbar ist, wird in der Zelle zur Schlagzeile.

Bei Videoclips nicht nur ein Standbild prüfen, sondern **acht Frames über die ganze Länge**.
Die Fehler stecken in der Bewegung: eine Person, die sich auflöst; ein Handtuch, das am Ende
herunterrutscht; zwei Hände mit verschiedenen Hauttönen; eine Männerhand auf einem
Solo-Frauen-Account.
