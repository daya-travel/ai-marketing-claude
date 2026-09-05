# Karussell - "7 things only solo female travellers understand"

**Account:** @her.solotrip · **Format:** 9 Slides 1080x1920, Instagram und TikTok ·
**Sprache:** Englisch · **Stand:** 22.08.2026, Textfassung offen

---

## Layout: Variante B, der Erkennungs-Post

Vorbild ist der Karussell-Post von `sebastiandariusch` („Small wins only solo
travelers understand"), den Alesya am 22.08. geschickt hat. Randloses Foto, ein
fetter Satz mittig, sonst nichts. Kein Kicker, kein Zähler, keine Pille.

Zwei bewusste Abweichungen vom Vorbild:

- **Auf jedem Bild ist eine Frau.** Harte Regel 2 im Design-System. Das Vorbild
  zeigt oft nur Orte.
- **Die Kopfzeile mit der `her.solotrip`-Glyphe bleibt.** Das Vorbild hat kein Logo.

Unterschied zu Variante A (`build-transit.mjs`): dort steht unten links ein Block
aus Kicker, kursiver Zeile, Überschrift und Fließtext. Hier steht ein einziger
Satz in der Bildmitte.

**Offen:** Textfarbe. Zwei Muster sind raus, A ganz in Marigold wie im Vorbild,
B in Creme mit einer goldenen Wendung wie in Variante A.

---

## Die Slides

| # | Text | Foto |
|---|---|---|
| Cover | 7 things only solo female travellers understand | `u-city-b` |
| 1 | Sending the plate number to the group chat before you even open the door | `u-kerb-a` |
| 2 | Choosing the fuller carriage without thinking about it | `u-tram-b` |
| 3 | Eating dinner alone and finding out you like your own company | `u-dinner-a` |
| 4 | The walk back where your keys are already in your hand | `u-walk-b` |
| 5 | Booking the earlier train just so you do not arrive in the dark | `u-platform-a` |
| 6 | Telling a stranger you are meeting a friend, when you are not | `u-desk-a` |
| 7 | Coming home different, and nobody seeing it yet | `u-home-b` |
| Schluss | You come home a little different every time + DAYA | `u-tram-a` |

Keine Tipps, keine Zahlen, Wiedererkennung. Satz 2 und 5 greifen den Transit-Post
auf, ohne ihn zu wiederholen.

---

## Bilder

Sechzehn Motive über Higgsfield `soul_2`, rund 1,9 Credits, jedes einzeln in
voller Größe angesehen. Aussortiert:

- `u-city-a` - wirkt wie ein Fashion-Model, verstößt gegen harte Regel 2
- `u-walk-a` - Buchstabensalat „C.ALK HOM1G6B7" auf dem Rücken, genau dort, wo der
  Satz steht
- `u-dinner-b` - garbelter Text im aufgeschlagenen Buch
- `u-home-a` - Kamera auf dem Hintern der Frau
- `u-platform-b` - gelbe Tafel mit lesbarem Buchstabensalat

Der Rest bleibt als Reserve liegen.

---

## Bauen

```bash
node daya/studio/build-understand.mjs              # Fassung A (gold)
STYLE=cream node daya/studio/build-understand.mjs  # Fassung B
STYLE=gold ONLY=01 node daya/studio/build-understand.mjs   # nur eine Slide, als Muster
```

Ausgabe: `daya/studio/reels/reel-understand/slides/01..09`. **Kein Video**, kein
Ton, keine Clips.

---

## Caption Instagram

Nachtragen, sobald die Textfassung steht.

## Caption TikTok

Nachtragen, sobald die Textfassung steht.
