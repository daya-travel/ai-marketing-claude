# DAYA — Content-Produktions-Workflow (effizient, festgelegt)

> Entscheidung 2026-06-28: maximale Effizienz, jede Seite macht das, was sie am besten kann.
> Kein Doppelaufbau. Interne Doks Deutsch, Posts Englisch.

## Rollenverteilung

```
   [3-Wort-Brief]                [Content-Gehirn]            [Visual]            [Ausspielen]
 Goal+Format+Theme  ──────▶  dieses Repo (Claude Code)  ──▶  Claude Design  ──▶  Scheduler
   (Lesya/Diana)              EN-Text + Foto-Brief +          Cinematic-Kit       Meta Suite/
                              Hashtags, regelgeprüft          (HTML → PNG)        Later/Metricool
                                     │
                                     └──▶ Higgsfield/Kling: faceless Fotos on demand
```

**Warum so:** Der Cinematic-Kit (HTML→PNG bei Claude Design) ist erprobt und perfekt on-brand
(emerald/marigold, Grain, Cormorant, PNG-Export-Fix). Den in Canva nachzubauen wäre Mehrarbeit
mit Palette-Drift-Risiko. Mein Mehrwert = das **schnelle, regelkonforme Content-Gehirn** davor.

## Wer macht was

| Schritt | Wer | Output |
|---|---|---|
| 1. Brief (Goal + Format + Theme) | Lesya/Diana | 3 Wörter, z. B. "saves · carousel · safety" |
| 2. Content bauen | **Content-Gehirn (hier)** | EN-Slide-Text + EN-Caption + Foto-Brief + Hashtags |
| 3. Regel-Check | `daya-brand-guardian` | Pass gegen DESIGN-SYSTEM + PLAYBOOK (Bindestriche, faceless, ≤5 Hashtags, DO-NOT-REPEAT …) |
| 4. Faceless-Fotos (bei Bedarf) | **Higgsfield/Kling (hier)** | echte-Frau-von-hinten / Landschaft, nie Männer/Models |
| 5. Visuals bauen | **Claude Design** | Cinematic-Kit → 8 PNGs + ZIP |
| 6. Captions/Untertitel | Caption AI (Reels/TikTok) | Karaoke-Captions |
| 7. Schedulen | Lesya/Diana | Meta Business Suite / Later / Metricool |

## Übergabe-Format (was ich an Claude Design liefere)
Pro Post ein sauberer Block:
- **Slides:** je Slide minimaler EN-Text (Cover-Hook, Credentials, Tipp, Endcard).
- **Caption (EN):** voller Text, Bindestriche statt —, endet mit Save-/Send-Zeile + 💚.
- **Foto-Brief:** je Slide eine faceless Bild-Idee (echte Frau von hinten ODER Landschaft).
- **Hashtags:** nach §9 (IG: #solofemaletravel + 1 Topic · TikTok: #fyp #traveltok).
- **Brand-Guardian-Vermerk:** Checkliste bestanden.

> 💡 Reibungslos-Tipp: Wenn ihr mir **einmal** ein Beispiel von `cinematic-slides.jsx` oder
> `her.solotrip - Bag.html` gebt, liefere ich den Block direkt im **exakten Kit-Format** —
> dann kann Claude Design ihn ohne Anpassung übernehmen (null Hin-und-Her).

## Batch-Rhythmus (gegen den Daily Grind)
1× im Monat eine Batch-Session: 4–5 SOLO & SAFE-Städte + 2–3 Reels auf einmal durch Schritt 2–5,
dann über den Monat verteilt schedulen. (Genau euer Playbook-Workflow.)

## Sprach-Regel im Workflow
- Alles, was **gepostet** wird (Slides, Captions, Reel-/TikTok-Text) = **Englisch**.
- Alles, was **ich dir zum Lesen/Entscheiden** gebe = **Deutsch**.
- **App/Landing** (separates Produkt) = mehrsprachig (DE/EN/+), Voice via ElevenLabs.
