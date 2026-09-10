# DAYA — Kreativ-Werkzeugkasten

Welches Tool wofür. So wisst ihr, womit ihr Inhalte tatsächlich produziert.

## Video & Bild (für Reels / TikToks)

| Tool | Wofür | Anbindung |
|---|---|---|
| **Kling AI** | KI-Video (B-Roll, Szenen, Bewegung) — euer Tool | bei euch vorhanden |
| **Caption AI** | Auto-Untertitel + Caption-Styling (TikTok-Look) — euer Tool | bei euch vorhanden |
| **Higgsfield** | KI-Bild & -Video, Upscaling, Hintergrund entfernen, Reframe 9:16, Virality-Check | über Claude (MCP) |
| **Canva** | On-Brand-Reels, Carousels, Text-Overlays aus eurem Brand-Kit | über Claude (MCP) |
| **Figma** | Design-System, App-Mockups, Visuals | über Claude (MCP) |
| **`short-form-pipeline`** | Langvideo → automatisch vertikale, untertitelte Clips | Repo `ai-marketing-skills` |

## Landingpage & Warteliste

| Tool | Wofür | Anbindung |
|---|---|---|
| **Lovable** | Echte Warteliste-Landingpage mit E-Mail-Sammlung bauen | über Claude (MCP) |
| `marketing/landing` Skill | Landingpage-Generator (Vorlagen, Copy) | Repo `claude-skills` |

## Text & Strategie (über die DAYA-Agents)

| Tool | Wofür |
|---|---|
| `daya-content-creator` | Posts, Captions, Hooks, Skripte |
| `daya-instagram-specialist` / `daya-tiktok-specialist` | Plattformgerechte Verpackung |
| `daya-brand-guardian` | Qualitäts-/Werte-/Nachhaltigkeits-Check |
| `daya-audience-analyst` | Zielgruppe schärfen, Content-Ideen, Feature-Validierung |
| `humanizer` / `taste-skill` (Repos) | Content menschlicher & geschmackvoller machen |

## Typischer Workflow (ein Thema → beide Plattformen)

1. Thema wählen → `daya-content-creator` schreibt IG-Reel + TikTok (verschieden verpackt).
2. `daya-brand-guardian` prüft beide.
3. **Footage:** eigene Clips (am besten für TikTok) ODER Kling AI / Higgsfield generieren.
4. **Untertitel:** Caption AI (TikTok-Style) drüberlegen.
5. **IG-Variante** in Canva on-brand finalisieren (ohne TikTok-Wasserzeichen).
6. Posten → Resonanz beobachten → `daya-audience-analyst` wertet aus.

> Frag Claude einfach: *"Mach aus Thema X einen TikTok UND einen IG-Reel mit dem DAYA-System
> und generier mir B-Roll dazu."*
