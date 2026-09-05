# Lovable-Sammel-Prompt: Landing-Wahrheits-Fixes + 199-EUR-Vereinheitlichung

> Copy/paste in den Lovable-Chat (oder Claude sendet ihn per MCP).
> Ein Durchlauf, nur Korrekturen - kein Redesign. Stand: 2026-07-04,
> nach Team-Entscheidung: Founder Pass bleibt 199 EUR; Fotos der
> Gründerinnen sind erlaubt.

---

Truth-pass on the landing page (src/routes/index.tsx, DE + EN copy) and
project memory. Corrections only - no redesign, no new sections.

**1. Bonus stack numbers (align with the real playbook content):**
- "Notfall-Karte für den Reisepass, A6, laminierbar" -> "Notfall-Karte im
  Pass-Format (88 x 125 mm), laminierbar" / EN: "Passport-format emergency
  card (88 x 125 mm), laminate-ready"
- Taxi scripts: "5 Sprachen" -> "7 Sprachen" (DE, EN, ES, PT, IT, FR, TR),
  EN accordingly. Also in the stat tile "5 / Sprachen für Taxi-Skripte" -> 7.
- Red flags: "12 Wenn-Dann-Regeln" -> "9 Wenn-Dann-Regeln" / EN "9 if-then
  rules".
- Embassies: "DACH-Botschaften für die Top-30 Reiseländer" -> "30
  DACH-Botschaftskontakte für 10 Reisestädte" / EN "30 embassy contacts
  (DE/AT/CH) for 10 travel cities".
- Packing list: "14 Items" -> "16 Items" (both languages).
- Lockscreen line -> "Lockscreen-Anleitung + SOS-Wallpaper-Pack (per
  Unlock-Code im Playbook)" / EN "Lockscreen guide + SOS wallpaper pack
  (via unlock code inside the playbook)".
- Wallet line -> "Wallet-Pass-Anleitung für Apple und Google" / EN "Wallet
  pass guide (Apple and Google)". Do not promise an automatic pass.

**2. Stat tile "12 Länder mit eigenem Sicherheits-Check":** replace with an
honest stat, e.g. DE "20 / Länder-Notrufnummern offline" and EN "20 /
countries' emergency numbers offline". (The playbook has 4 city deep-dives,
not 12 country checks.)

**3. Social proof heading:** soften "Sichtbar weiterempfohlen / Aufgebaut
zusammen mit Frauen, die nicht warten..." so it does not imply existing
users, e.g. DE eyebrow "In Entwicklung mit echten Solo-Reisenden", EN
"Built with real solo travelers". Keep the design.

**4. Founder price = 199 EUR everywhere.** The team decided against 499.
Check founder.tsx, OfferStackWarm/TryDayaWarm, email templates and
docs/discovery/FEATURES.md category 5: lifetime Founder Pass is 199 EUR,
200 spots, raffle prize value 199 EUR. Remove any 499 mention.

**5. Founder photos are allowed.** Update
.lovable/memory/constraints/founder-voice.md: Diana and Alesya may appear
with photos and full first names in press and on the site. Keep the calm,
no-fear-marketing tone rules unchanged.

**6. Hero layout (the form sits too low):**
- hero <section>: items-center -> items-start; pt-12 -> pt-6;
  md:pt-16 -> md:pt-10 (keep pb).
- hero <h1>: text-[clamp(2.6rem,7.4vw,6.6rem)] ->
  text-[clamp(2.4rem,6.4vw,5.4rem)] (keep everything else).
- mockup column (md:col-span-5): add md:pt-6.
- Add a small reassurance line directly under the hero CTA button row:
  reuse stackPriceSub copy ("Keine Kreditkarte. Keine Testphase. Eine
  E-Mail reicht." / EN equivalent) in small muted text.

**7. Page count:** only if the rebuilt PDFs (DE + EN) really have 34 pages,
keep "34" claims; otherwise adjust per language to the real count. Update
docs/CONTENT-TRUTH.md after the rebuild.

Do not touch anything else. Layout classes and copy strings only.
