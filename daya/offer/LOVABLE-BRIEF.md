# Lovable-Übergabe: ehrlicher Bonus-Stack in den Waitlist-Flow

## So gehst du vor
1. **Dateien hochladen** in Lovable (Upload / "+"): die **6 SOS-Wallpaper** (bzw. `DAYA-SOS-Lockscreen-Pack.zip`)
   und die **`DAYA-First-24-Hours-Checklist.pdf`** (oder die `.md`, Lovable stylt sie).
2. **Prompt unten** (englisch, damit Lovable präzise baut) ins Chatfenster einfügen und abschicken.
3. Danach: `Gewinnspiel/Terms`-Seite von einer Anwältin prüfen lassen, bevor es live geht.

---

## PROMPT (englisch — copy/paste in Lovable)

> **Replace the fake bonus stack with an honest one and wire up delivery.**
>
> Context: this is the DAYA pre-launch waitlist. The old offer promised a €1,564 bonus stack we
> cannot deliver (bait-and-switch). Replace it everywhere with this **honest stack** and make every
> item actually deliverable.
>
> **1. Remove / fix**
> - Delete the "12 country safety briefings" bonus entirely.
> - Remove the "€1,497" valuation on the Founder-Pass raffle everywhere. A raffle entry is not worth
>   the prize. Reframe as: *"a monthly chance to win a Founder Pass (worth €199), 3 winners per month."*
>
> **2. Waitlist signup**
> - Form: email (required) + first name (optional) + preferred language (EN/DE, optional).
> - On submit: create a `waitlist_signups` row (email, name, language, created_at, source), and create
>   a `raffle_entries` row for the current month. Then send the confirmation email (below) via Resend.
> - Double opt-in if easy (GDPR-friendly); otherwise a clear consent checkbox.
>
> **3. Confirmation email (Resend) — deliver the instant bonuses**
> Store the two uploaded files in Supabase Storage and email signed download links:
> - 🔒 **SOS Lockscreen Pack** (the uploaded zip / 6 PNGs)
> - 📄 **"First 24 Hours" Safety Checklist** (the uploaded PDF)
> Also state: they're entered in this month's Founder-Pass draw, and they get 30 days of DAYA free
> when the app launches. Use the honest copy below. No spam claims we can't keep.
>
> **4. Landing bonus section — replace copy with:**
>
> EN:
> "Join the waitlist and get, free today:
> - 🔒 SOS Lockscreen Pack — 6 emergency wallpapers in 6 languages (€9)
> - 📄 'First 24 Hours' Safety Checklist — the exact steps I take the moment I land (€15)
> - 🎟️ A monthly chance to win a Founder Pass (worth €199) — 3 winners every month
> - ✨ 30 days of DAYA free when the app launches
> No spam. Leave anytime."
>
> DE:
> "Trag dich ein und bekomm heute gratis:
> - 🔒 SOS-Lockscreen-Pack — 6 Notfall-Wallpaper in 6 Sprachen (9 €)
> - 📄 'First 24 Hours'-Sicherheits-Checkliste — die Schritte für die erste Stunde (15 €)
> - 🎟️ Monatliche Chance auf einen Founder-Pass (Wert 199 €) — 3 Gewinnerinnen pro Monat
> - ✨ 30 Tage DAYA gratis beim Launch
> Kein Spam. Jederzeit abmeldbar."
>
> **5. Founder-Pass draw + admin**
> - Add a protected **/admin** page (see auth note) that lists this month's entries and has a
>   "Run this month's draw" button: pick 3 random unique winners from the current month's entries,
>   store them in `raffle_winners` (email, month, drawn_at, random_seed) for auditability, and mark
>   them. Never auto-charge anyone. Show past winners.
> - Auth: use **Supabase Auth with individual admin logins** (email+password or magic link), NOT a
>   shared token. Restrict /admin to allowlisted admin emails.
>
> **6. Legal (placeholder, mark "review with a lawyer")**
> - Add a **/gewinnspiel** (Terms) page linked in the footer + the email: participation independent
>   of any purchase, organizer (DAYA / Alesya & Diana, Nürnberg), period, prize (Founder Pass €199),
>   draw method (random), no cash alternative, data protection note. German + English.
>
> **7. Keep** the existing design system, fonts and colors. Do **not** display the DAYA logo publicly
> yet — text brand name only. Make it responsive.

---

## Confirmation-Email-Copy (zum Einbauen)

**Subject:** You're on the list 💚 (+ your safety bonuses inside)

> Welcome - you're on the DAYA waitlist.
>
> Here are your bonuses, yours right now:
> 🔒 SOS Lockscreen Pack (6 languages): [DOWNLOAD]
> 📄 "First 24 Hours" Safety Checklist: [DOWNLOAD]
>
> You're also entered in this month's Founder-Pass draw (3 winners, worth €199 each) - we'll email
> the winners at the end of the month.
> And you'll get 30 days of DAYA free the moment the app launches.
>
> We only build what actually keeps you safer. Reply anytime.
> - Alesya & Diana, Nürnberg

## Zum Admin-„Shared-Token"
⚠️ **Nicht empfohlen.** Geteilter Token = kein Einzel-Login, kein Entzug, kein Audit-Trail. Nimm den
Weg im Prompt: **Supabase Auth mit Einzel-Logins + Admin-Allowlist.** Genauso sicher, aber sauber.
