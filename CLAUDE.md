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
- **Keine Anweisung, die im Medium nicht ausführbar ist.** Am 29.08. stand „Search
  交番 on the map" in einem Bild. Mit einer deutschen Tastatur tippt man das nicht,
  und aus einem Bild kopiert man nichts. Bei jeder Handlungsanweisung prüfen: kann
  die Leserin das genau dort tun, wo sie den Text liest? Die brauchbare Fassung war
  „search police box on your map", auf Englisch, plus die rote Lampe als
  Erkennungszeichen.
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
- **Seitenverhältnis nicht per Zuschnitt lösen, sondern per `outpaint_image`.**
  Objektbilder aus `nano_banana_pro` kommen als 4:5, die Slides sind 9:16. Ein
  zentraler Zuschnitt schneidet rund 30 % der Breite weg, also die Gegenstände am
  Rand. `outpaint_image` mit `aspect_ratio: '9:16'` verlängert Leinen, Holz oder Weg
  sauber weiter und schafft nebenbei freie Fläche für den Text (28.08.). Ein
  farbiger Hintergrund hinter einer Bildkarte ist die schlechtere Lösung, Alesya
  hat sie sofort als störend erkannt.
- **Kein Emerald-Layer über Fotos.** Alesya, 29.08.: „ich will diesen grünen layer
  auf allen fotos weghaben, es sieht sehr bearbeitet aus, muss aber eher roh
  aussehen, nicht wie KI." Die Emerald-Gradierung aus dem DESIGN-SYSTEM entfällt
  damit für Fotos, und alle Verläufe sind neutrales Schwarz statt emerald-getönt.
  Das Emerald bleibt in Wortmarke, Kopfzeile und Palette.
- **Nicht das Gestellte bestellen.** „Pinterest editorial aesthetic", „arranged with
  generous spacing" und „product photography" im Prompt erzeugen genau den
  Katalog-Look, der nach KI aussieht. Was echt wirkt: „casually dropped, not
  arranged", „items at different angles and some overlapping", „uneven spacing",
  „real creases in the sheet", „warm natural window light from one side".
- **Auf hellen Objektbildern keine Verläufe über das ganze Bild.** Mittelverlauf und
  Emerald-Gradierung machen Leinen zu Matsch und die Gegenstände unlesbar. Nur ein
  enger, kräftiger Verlauf hinter dem Textblock. Und die Kopfzeile dort in Emerald
  statt Creme, sonst steht Creme auf Creme.
- **Behauptungen über das eigene Bild sind auch Behauptungen.** Bevor ein Text sagt
  „this bag", „these shoes" oder „die Frau links", das Bild ansehen und auflisten,
  was wirklich drauf ist. Am 28.08. stand „One thing in this bag is banned in Japan"
  über einem Flatlay ganz ohne Tasche. Regel 0 gilt für die eigene Copy.
- **Deutsche Präpositionen nicht mitübersetzen.** Es heißt „**in** this picture",
  nicht „on this picture" (von „auf diesem Bild"). Gleiche Familie wie die
  Verkürzungs-Regel: solche Kleinigkeiten verraten einen Text sofort.
- **Gar keine Buchstaben auf den Gegenständen im Bild.** Festgelegt von Alesya,
  29.08.2026: „keine buchstaben oder worte auf bilder tun, sie sind alle schief, also
  falsch halt." Das gilt auch für Modelle, die Schrift können - selbst ein korrekt
  geschriebenes Kärtchen wirkt gestellt. Der Text, der über das Bild gelegt wird,
  bleibt davon unberührt: „nur normalen text drauf wie immer".
  Praktisch heißt das: Gegenstände wählen, die von Natur aus unbedruckt sind. Pässe,
  Münzbörsen, Verpackungen und Schuhe mit Label erzeugen zuverlässig Buchstabensalat
  („PASSGORT", „MARSSOFIT", „CUPPI M SINOCTAY", alle am 29.08.). Ein Pass lässt sich
  nicht sauber generieren, er fliegt raus statt neu geprompted zu werden.
- **Das DAYA-Logo fuer Posts ist die flache Fassung, nicht das App-Icon.** Alesya,
  31.08.2026: „das logo von daya muss aber anders sein". Im Repo lagen nur Dateien
  mit der abgerundeten Emerald-Kachel und dem gepraegten Bogen - das ist das
  App-Icon. Auf Slides gehoert die flache Strichzeichnung plus Wortmarke in einer
  Farbe: `daya/brand/design-package/daya-brand/daya-lockup-flat-cream.png` auf
  dunklem Grund, die Emerald-Fassung daneben fuer helle Slides. Beide sind aus
  `daya-horiz-cream.png` geloest, also dieselbe Zeichnung, nur ohne Kachel und ohne
  Praegung.
- **Damit ist die Modellwahl einfach:** `soul_2` für alles. Der textfähige
  `nano_banana_pro` wurde nur wegen der Kärtchen gebraucht, die es nicht mehr gibt,
  und `soul_2` ist ohnehin der dokumentarische von beiden.
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
- **Nicht drei Verlaeufe uebereinander legen.** Kopf-, Mittel- und Fussverlauf auf
  demselben Slide machen das Foto matschig und erzeugen selbst den bearbeiteten Look,
  der weg sollte. Belegt am 31.08. am Thailand-Reel: neun Slides sahen erst nach
  Streichen des Mittelverlaufs wieder nach Foto aus. Regel: liegt der Text tief, deckt
  der Fussverlauf ihn schon ab, der Mittelverlauf faellt dann weg.
- **Kleinteiliger Abfall wird von soul_2 aufgestellt, nicht hingelegt.**
  Zigarettenstummel standen dreimal senkrecht wie Pfosten im Sand, ordentlich
  verteilt. Echte Kippen liegen. Prompt-Baustein, der es loest: „lying flat on their
  sides half buried in the sand, casually dropped, not arranged, at different angles".
- **Schrift im Bild:** soul_2 kann keine Buchstaben. Motive so rahmen, dass keine bedruckte
  Fläche scharf im Bild liegt. Bilder immer in echter Anzeigegröße prüfen, nicht in voller
  Auflösung - Buchstabensalat, der bei 100 % unsichtbar ist, wird in der Zelle zur Schlagzeile.

Bei Videoclips nicht nur ein Standbild prüfen, sondern **acht Frames über die ganze Länge**.
Die Fehler stecken in der Bewegung: eine Person, die sich auflöst; ein Handtuch, das am Ende
herunterrutscht; zwei Hände mit verschiedenen Hauttönen; eine Männerhand auf einem
Solo-Frauen-Account.
