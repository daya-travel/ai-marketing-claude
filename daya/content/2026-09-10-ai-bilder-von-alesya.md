# Generierte Bilder von Alesya

Alesya, 08.09.2026: „bist du im Stande aus meinem Bild bzw. Bildern ein neues
Bild zu erstellen in anderer Umgebung usw? Ich habe auf Instagram gerade
gesehen, dass ein Mädel dass so gemacht hat und es hat wie echt ausgesehen."

Ja. Higgsfield hat zwei Wege dafuer, und sie unterscheiden sich in Aufwand und
Aehnlichkeit.

| Weg | Aufwand | Modelle |
|---|---|---|
| **Element** | ein bis vier Fotos, sofort, kein Training | `nano_banana_pro`, `seedream_v4_5`, `gpt_image_2` und weitere - **nicht** `soul_2` |
| **Soul** | 5 bis 20 Fotos, rund 10 Minuten Training, dauerhaft | nur `soul_2` und `soul_cinematic` |

Sie hat sich fuer beides entschieden: erst der Schnelltest, dann das Training
mit neuen Fotos.

## Das Material

Was sie am 08.09. geschickt hatte, war zunaechst duenn: zwei Fotos und drei
Videos. Geprueft statt geschaetzt:

- `a911c06c-IMG_2165.mov`, 11 s, 1920x1080. Elf Frames ueber die Laenge
  angesehen, das Gesicht ist auf fast allen frei, das Telefon steht daneben und
  nicht davor. Daraus kamen drei Frames mit verschiedenen Kopfhaltungen.
- `e927dfdf-image.jpg`, Kleid am Spiegel. Gesicht sichtbar, Blick nach unten.
- `bab1d77c-IMG_3609.mov` faellt weg. Vier Frames geprueft, sie steht klein im
  Bild und bewegt sich, das Gesicht hat keine 100 px.
- Das Gruppenfoto mit vier Personen faellt als Ganzes weg. Fuer das Training
  spaeter auf sie allein zugeschnitten.

Am 08.09. kamen fuenf weitere Fotos dazu, und damit stimmte die Streuung:
Studioportrait, zwei Spiegelselfies bei Kunstlicht, ein Aufzugselfie **mit
offenen Haaren** und ein Parkfoto bei Tageslicht. Vorher stammte alles aus
einem Raum, einem Tag und derselben streng zurueckgebundenen Frisur - das
Training uebernimmt so etwas gern mit.

**Regel fuer das naechste Mal:** eine Referenzsammlung braucht Streuung in
Frisur, Licht und Abstand, nicht Menge. Neun gestreute Bilder schlagen zwanzig
aus derselben halben Stunde.

## Schnelltest ueber ein Element

Element `alesya`, `f4910ad1-d552-41b1-b023-a53d3fe3fcac`, vier Referenzen.
Modell `nano_banana_pro`, 9:16, drei Umgebungen: Bahnsteig am Abend, Marktgang
am Tag, Cafétisch auf einer Terrasse.

**Was gut war.** Licht, Tiefenschaerfe, Hintergrundpersonen und Koerperhaltung
lesen sich als echtes Foto. Der Bahnsteig ist sauber: kein Schild, keine
Schrift, rote Signale in der Ferne, Blindenleitstreifen im Vordergrund.

**Die Aehnlichkeit.** Referenzframe neben das generierte Gesicht gelegt: Nasenring,
Ohrpiercings, goldener Creolenring, zurueckgebundenes Haar und der schmale
Gesichtsschnitt sitzen. Das generierte Gesicht wirkt etwas hagerer und aelter.
Auf Distanz und im Profil traegt es, bei einer Nahaufnahme wuerde eine Bekannte
stutzen.

**Ein Fehler.** Auf einer Holzkiste im Marktbild steht erfundene Schrift. Bei
405 px Anzeigebreite unlesbar, beim Hineinzoomen sichtbar. Der bekannte
Mechanismus: Orte mit vielen beschrifteten Flaechen erzeugen Buchstabensalat,
und „no lettering" im Prompt haelt das nicht auf. Loesung ist auch hier der
andere Ort, nicht der bessere Prompt.

## Modellwahl, bewusste Abweichung

In CLAUDE.md steht `soul_2` fuer alles. Fuer den Schnelltest ging das nicht:
Elements laufen nicht mit `soul_2`, das kann nur ein trainiertes Soul. Deshalb
`nano_banana_pro` fuer diese drei Bilder. Mit dem Soul sind wir wieder auf
`soul_2` und damit im dokumentarischen Modell, das den Look der bisherigen
Serien traegt.

## Regel 0 gilt auch fuer Bilder von ihr

Ein Bild von Alesya an einem Ort, an dem sie nicht war, auf einem Reisekonto,
ist eine Behauptung ueber sie selbst. Unbedenklich sind Motive, die nichts
behaupten: eine Frau am Bahnsteig als Illustration zu einem Hinweis, ein
Cafétisch zu einem Tipp. Heikel ist „ich war in Tokio", wenn sie nicht dort
war. Das ist ihre Entscheidung, gehoert aber einmal ausgesprochen.
