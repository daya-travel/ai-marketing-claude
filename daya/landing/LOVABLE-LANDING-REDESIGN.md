# Landing-Redesign: eine visuelle Familie (Buch + Founder-Seite + Landing)

> Grundlage: kompletter Code-Read von index.tsx, founder.tsx (Struktur +
> Design-Tokens), PlaybookLongread.tsx + PDF v21. Skills: sales-council
> (Schwartz/Cialdini/Hormozi/Klaff), hormozi-100m-frameworks, marketingskills
> (lead-magnets, copywriting), humanizer, council-of-high-intelligence
> (Multi-Lens-Kritik). Unten der fertige englische Lovable-Prompt.
>
> Kern-Diagnose in einem Satz: Die Landing spricht eine DRITTE Design-Sprache
> (Archivo-BLACK-UPPERCASE-Poster), die weder das Buch (ruhige Serifen,
> Kicker, Pull-Quotes, Marigold-Chips) noch die Founder-Seite (Noir-Emerald,
> Grain, Mono-Labels) spricht - und sie zeigt ein GENERISCHES Buch-Mockup,
> obwohl das echte Cover (Paris-Fenster) existiert und schöner ist.

## LOVABLE-PROMPT (englisch, copy/paste)

Redesign pass on the landing page (src/routes/index.tsx, DE + EN copy).
Goal: the landing, the playbook (web edition + PDF) and the founder page must
read as ONE visual family. Today the landing speaks a third language:
poster-style ARCHIVO BLACK UPPERCASE everywhere, while the book uses calm
serif display with italic accents, kickers, pull quotes and marigold chips,
and the founder page uses noir emerald with grain and mono labels. Keep the
page structure and the working form logic - this is a reskin + copy pass, not
a rebuild.

**1. Type system - adopt the book's voice:**
- Replace the ARCHIVO BLACK UPPERCASE display headlines with the playbook's
  serif display style (same family the web playbook uses for pb-h1/pb-h2),
  sentence case, with one italic accent phrase per headline - exactly like
  the book's "Prepared, *not paranoid*." pattern.
- Keep Archivo ONLY for small uppercase kickers/eyebrows (the book's
  pb-kicker style) and for buttons.
- Use the founder page's mono style for numbers and small data labels
  (stat values, stack prices) - that is the founder page's signature.

**2. Color and texture:**
- Base stays light paper like the book (cream), ink emerald. Keep the
  handmade-paper texture but also add the founder page's subtle grain
  overlay so all three surfaces share it.
- Accents: marigold for the "min action"-style chips and value highlights
  (like the book), deep noir emerald (founder-style, near #0a2b20) for the
  two dark sections (NOT-for-you card and proof banner) so they echo the
  founder page instead of flat #0E3B2C.
- Icons silver/muted, never gold.

**3. Hero:**
- Headline becomes the promise, not the product name. DE: "Allein reisen,
  *ohne die Angst mitzunehmen*." EN: "Travel alone, *without packing the
  fear*." Product name moves to the kicker: "DAYA Solo Travel Playbook -
  kostenloses PDF" / "free PDF".
- REPLACE the generic dark book mockup with the REAL playbook cover (the
  Paris-window cover from the PDF, public/playbook assets or a rendered
  cover image). The real cover is the proof that the book exists - a generic
  mockup undercuts it. Keep the two floating chips (pages / offline) but
  restyle them as the book's polaroid-caption style.
- Under the CTA button add the reassurance line (from stackPriceSub): "Keine
  Kreditkarte. Keine Testphase. Eine E-Mail reicht." / EN equivalent, small
  and muted.
- Add ONE quiet trust link under the form: "Lies Kapitel 1 zuerst im Browser
  ->" linking to /de/playbook (EN: /playbook). The web edition is public
  anyway - linking it converts skeptics (they see the quality, then want the
  PDF + bonuses by email). Track clicks.

**4. Value stack section:**
- Restyle the 12-line stack list to look like the book's table of contents:
  serif item names, dotted leaders, mono prices right-aligned, chapter-accent
  tick on hover (the web playbook's CHAPTER_ACCENTS rotation).
- The summary card keeps Hormozi logic (total value struck through, "0 EUR
  today") but with mono numbers and a marigold underline tick instead of the
  current heavy black.
- Numbers must match the book invariants: 16 packing items, 7 taxi
  languages, 9 red-flag rules, 20 emergency countries, 30 DACH embassy
  contacts in 10 cities, page count = whatever the final rebuilt PDF has.
  Never state a number here that the book does not deliver.

**5. Copy pass (both languages) - humanizer rules:**
- Kill marketing-speak eyebrows: "Letzter Push" / "Last push" -> DE "Bevor
  du weiterscrollst" / EN "Before you keep scrolling".
- FAQ: delete the planted SEO question "Warum steigen die Suchen nach
  KI-Sicherheitsbegleitern gerade jetzt?" - it reads fake on a trust-first
  page. Keep the honest ones.
- Social proof header: "Sichtbar weiterempfohlen / Aufgebaut zusammen mit
  Frauen..." must not imply existing users. Replace eyebrow with "In
  Entwicklung mit echten Solo-Reisenden" / "Built with real solo travelers",
  and swap one stat tile ("12 Länder...") for an honest one ("20 /
  Länder-Notrufnummern offline" - the book has 4 city deep-dives, not 12
  country checks).
- Guarantee section: keep - it is the strongest trust block. Only restyle
  the circular "DAYA Promise" stamp to match the book's passport-stamp
  aesthetic.
- Voice check on every changed line: short sentences, no exclamation marks,
  no "revolutionary/ultimate", concrete numbers over adjectives - the same
  voice as the playbook letter page.

**6. Bridge to the founder page (one funnel, two offers):**
- The footer teaser ("Bald verfügbar: DAYA Founder Access") becomes a quiet
  full-width band above the footer, styled like the founder page's noir
  hero: dark emerald, grain, mono label "200 Lifetime-Plätze · 199 EUR",
  one serif line: DE "Für die, die nicht warten wollen: DAYA Founder
  Access." EN equivalent, arrow link to /founder. No urgency theatrics -
  the scarcity (200 spots) is real, state it plainly.
- Founder price is 199 EUR everywhere (the team decision) - verify no other
  number appears on this page.

**7. Do not touch:** the waitlist form logic (honeypot, UTM capture, consent,
success states), the API route, SEO/JSON-LD (except updating the page-count
string when the PDF settles), and the language switcher.

After the pass: screenshot hero + stack + dark band on mobile (390px) and
desktop (1440px), check that no headline wraps to more than 3 lines on
mobile, and confirm every number claim against the current
playbook-content.json in the same commit.
