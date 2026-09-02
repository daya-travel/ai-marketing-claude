#!/usr/bin/env python3
"""her-solo-banned-generator - post kit for @her.solotrip.

Builds one "seven things that are actually illegal in X" post from a local
JSON database. No API keys, no network.

    python3 generate.py --country Thailand --lang en

Writes to output/{country}_{date}/:
    facts.json            the seven facts with source and check date
    flatlay_prompts.txt   1 main flatlay + 2 detail closeups
    elevenlabs_script.txt the spoken script, TTS-ready
    caption.txt           Instagram caption, five hashtags
    posting_time.txt      when to post it

Two things this tool refuses to do, both learned the hard way on the Thailand
post:

1. It will not put an unverified fact in a script. Every fact carries a source
   and the date it was checked. Anything without one is skipped and reported.
   The Thailand reel went out with a stale beach number and a wrong drone rule
   because "I checked it once" was treated as "it is still true".

2. It will not write a banned object into an image prompt. The blocklist in
   prompts/flatlay_prompts.json is enforced in code, not left as a comment.

Not legal advice.
"""
from __future__ import annotations

import argparse
import json
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data" / "banned_database.json"
PROMPTS = ROOT / "prompts" / "flatlay_prompts.json"
TEMPLATES = ROOT / "templates"
OUTPUT = ROOT / "output"

# Measured on the real Thailand reel (Higgsfield seed_audio, voice Isla,
# atempo 1.30). Every earlier estimate for that post was too optimistic, so
# this number comes from a file we actually timed, not from a rule of thumb.
WPM = 172

# Das Laengenziel haengt an der Anzahl der Punkte, nicht an einer festen Zahl.
# Der Meta-Auftrag gab "30 bis 32 Sekunden" vor, das galt fuer sieben Punkte.
# Seit Alesya am 01.09. neun und elf verlangt hat, war die feste Vorgabe eine
# Warnung, die bei jedem Lauf ansprang und nichts mehr aussagte.
#
# Beide Zahlen sind an der Thailand-Tonspur gemessen: 98 Woerter auf sieben
# Punkte, davon rund 21 fuer Hook und Schlusszeile, der Rest verteilt sich mit
# etwa elf Woertern auf jeden Punkt samt Zaehlwort.
OVERHEAD_WORDS = 21
WORDS_PER_POINT = 11
TOLERANCE = 0.10


def word_budget(n: int) -> int:
    """Wie viele Woerter ein Skript mit n Punkten realistisch braucht."""
    return OVERHEAD_WORDS + WORDS_PER_POINT * n

HASHTAGS = {
    "instagram": "#solofemaletravel #{tag} #traveltips #solotravel #fyp",
    "tiktok": "#solofemaletravel #{tag} #traveltok #solotravel #fyp",
}

# Own data: 13:00-14:00 CET Tue/Fri performs best on this account.
# EU-wide reel windows are 14:00-17:00 and after 18:00, with a Thursday
# 21:00 peak. The Thursday slot is the test, not the main post.
POSTING = {
    "main": "Tuesday or Friday, 13:30 CET",
    "test": "Thursday, 19:30 CET",
    "why": (
        "13:00-14:00 CET Tue/Fri is this account's own best window. "
        "The Thursday evening slot tests the EU-wide reel peak "
        "(14:00-17:00 and after 18:00, Thursday 21:00 highest). "
        "Post the main one first, only move the schedule once the test "
        "beats it twice."
    ),
}


def load(path: Path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        sys.exit(f"missing file: {path}")
    except json.JSONDecodeError as exc:
        sys.exit(f"broken JSON in {path}: {exc}")


def usable(fact: dict) -> bool:
    """A fact may be spoken only if someone read a source for it."""
    return bool(fact.get("verified")) and bool(fact.get("tts")) and bool(fact.get("source"))


def money(fact: dict) -> str:
    """Penalty text with the dollar figure appended when one is sourced.

    Never estimates. A currency with no dated rate and no USD figure from the
    source simply gets no conversion.
    """
    display = fact.get("penalty_display")
    if display:
        return display
    local = fact.get("penalty_local") or ""
    usd = fact.get("penalty_usd")
    if usd is None:
        return local
    return f"{local}, about ${usd:,}"


def check_prompt(text: str, blocklist: list[str]) -> None:
    low = text.lower()
    hits = [word for word in blocklist if word in low]
    if hits:
        sys.exit(
            "image prompt names a banned object: "
            + ", ".join(sorted(set(hits)))
            + "\nThe banned item goes on as a text overlay, never into the picture."
        )


def build_prompts(country: str, cfg: dict) -> str:
    entry = cfg["countries"].get(country)
    if entry is None:
        sys.exit(f"no flatlay props for {country} in prompts/flatlay_prompts.json")
    blocklist = cfg["blocklist"]

    main = cfg["base_style"].format(country=country, props=entry["props"])
    details = [cfg["detail_style"].format(subject=s) for s in entry["details"]]
    for prompt in [main, *details]:
        check_prompt(prompt, blocklist)

    negative = cfg["negative"]
    lines = [
        f"# Flatlay prompts - {country}",
        "# soul_2. The banned items are NOT in these pictures, they come as text overlay.",
        "",
        "## 1 - main flatlay",
        main,
        "",
        f"negative: {negative}",
        "",
    ]
    for i, prompt in enumerate(details, start=2):
        lines += [f"## {i} - detail", prompt, "", f"negative: {negative}", ""]
    return "\n".join(lines)


# Fallback, wenn ein Land kein eigenes hook-Feld hat. Bewusst nuechtern, damit
# auffaellt, dass noch keiner drueber nachgedacht hat: derselbe Listen-Hook zweimal
# hintereinander liest sich sofort wie eine Wiederholung (Alesya, 01.09.).
DEFAULT_HOOK = {
    "en": {
        "spoken": (
            "Planning a solo trip to {country}? Here are {n} things that are "
            "actually illegal and tourists do them every single day."
        ),
        "cover_head": "{N} things that are actually illegal in {country}.",
        "cover_sub": "And tourists do them every day.",
        "close": "Save this before you fly.",
    },
    "de": {
        "spoken": (
            "Du planst eine Solo-Reise nach {country}? {N} Sachen, die dort "
            "wirklich verboten sind. Und Tourist:innen machen sie jeden Tag."
        ),
        "cover_head": "{N} Sachen, die in {country} wirklich verboten sind.",
        "cover_sub": "Und Tourist:innen machen sie jeden Tag.",
        "close": "Speicher dir das, bevor du fliegst.",
    },
}


COUNT_WORDS = {
    "en": {7: ("seven", "Seven"), 8: ("eight", "Eight"), 9: ("nine", "Nine"),
           10: ("ten", "Ten"), 11: ("eleven", "Eleven")},
    "de": {7: ("sieben", "Sieben"), 8: ("acht", "Acht"), 9: ("neun", "Neun"),
           10: ("zehn", "Zehn"), 11: ("elf", "Elf")},
}


def get_hook(country: str, entry: dict, lang: str, n: int) -> dict:
    """Hook aus den Daten, mit Rueckfall auf die Standardformulierung.

    Die Anzahl kommt aus den Daten, nicht aus dem Text. Sonst steht irgendwann
    "seven things" ueber neun Punkten.
    """
    lower, upper = COUNT_WORDS[lang].get(n, (str(n), str(n)))
    hook = dict(DEFAULT_HOOK[lang])
    hook.update({k: v for k, v in (entry.get("hook") or {}).items() if v})
    return {k: (v.format(country=country, n=lower, N=upper)
                if isinstance(v, str) else v)
            for k, v in hook.items()}


def check_repeats(country: str, facts: list[dict], countries: dict) -> None:
    """Warnt, wenn ein Land dieselben Themen bringt wie ein schon geposteter Post.

    Grund: der Meta-Auftrag gab feste Kategorien fuer jedes Land vor (Vapes,
    Drohne, Overstay, ...). Genau so gebaut sieht jeder Post gleich aus. Alesya
    am 01.09.: "warum sind hier wieder vapes und dronen? alles gleich vom
    letzten post oder was?" Bei Korea waren fuenf von sieben dieselbe Kategorie
    wie bei Thailand.
    """
    mine = {f["id"] for f in facts}
    for name, entry in countries.items():
        if name == country or not entry.get("posted"):
            continue
        shared = sorted(mine & {f["id"] for f in entry["facts"]})
        if len(shared) > 2:
            print(
                f"! {len(shared)} Themen wie im geposteten {name}-Post "
                f"({entry['posted']}): {', '.join(shared)}\n"
                f"    Zwei Posts hintereinander mit denselben Kategorien lesen "
                f"sich wie derselbe Post. Landesspezifische Punkte suchen."
            )


def build_script(country: str, facts: list[dict], lang: str, hook: dict) -> tuple[str, int, float]:
    template = (TEMPLATES / f"elevenlabs_{lang}.txt").read_text(encoding="utf-8")
    numbers_en = ["One", "Two", "Three", "Four", "Five", "Six", "Seven",
                  "Eight", "Nine", "Ten", "Eleven"]
    numbers_de = ["Eins", "Zwei", "Drei", "Vier", "Fünf", "Sechs", "Sieben",
                  "Acht", "Neun", "Zehn", "Elf"]
    numbers = numbers_de if lang == "de" else numbers_en

    body = "\n\n".join(
        f"{numbers[i]}. {fact['tts']}" for i, fact in enumerate(facts)
    )
    script = template.format(hook=hook["spoken"], facts=body, close=hook["close"])
    words = len(script.split())
    seconds = words / WPM * 60
    return script, words, seconds


def build_caption(country: str, facts: list[dict], checked: str, hook: dict) -> str:
    template = (TEMPLATES / "caption.txt").read_text(encoding="utf-8")
    top = facts[0]
    second = facts[1] if len(facts) > 1 else facts[0]
    # money() liefert seinen eigenen Schlusspunkt, wenn penalty_display gesetzt
    # ist. Ohne das Abschneiden steht am Satzende ".." - stand so in der ersten
    # Italien-Caption.
    def sentence(text: str) -> str:
        return text.rstrip().rstrip(".") + "."

    return template.format(
        hook=f"{hook['cover_head']} {hook['cover_sub']}",
        highlight=f"{top['title']}. {top['why']} {sentence(money(top))}",
        second=(
            f"The other one I'd watch is {second['title'].lower()}. "
            f"{sentence(money(second))}"
        ),
        country_law=f"{country}'s own law",
        checked=checked,
        # Die Schlusszeile kommt aus dem Hook des Landes. Vorher stand "Save it
        # before you fly" fest in der Vorlage und widersprach jedem Land, das
        # man nicht anfliegt.
        close=hook["close"].replace("Save this", "Save it"),
        hashtags=HASHTAGS["instagram"].format(tag=country.lower().replace(" ", "")),
    )


def main() -> None:
    ap = argparse.ArgumentParser(description="Build one banned-things post kit.")
    ap.add_argument("--country", help="required unless --list")
    ap.add_argument("--lang", default="en", choices=["en", "de"])
    ap.add_argument(
        "--include-unverified",
        action="store_true",
        help="use facts with no source. Only for drafting, never for posting.",
    )
    ap.add_argument("--list", action="store_true", help="show countries and readiness")
    args = ap.parse_args()

    db = load(DATA)
    prompt_cfg = load(PROMPTS)
    countries = {k: v for k, v in db.items() if not k.startswith("_")}

    if args.list:
        for name, entry in countries.items():
            ready = sum(1 for f in entry["facts"] if usable(f))
            flag = "  gepostet " + entry["posted"] if entry.get("posted") else ""
            print(f"{name:14s} {ready} von {len(entry['facts'])} belegt{flag}")
        return

    if not args.country:
        ap.error("--country is required (or use --list)")
    if args.country not in countries:
        sys.exit(
            f"unknown country: {args.country}\nhave: {', '.join(sorted(countries))}"
        )

    all_facts = countries[args.country]["facts"]
    good = [f for f in all_facts if usable(f)]
    missing = [f for f in all_facts if not usable(f)]

    if missing:
        print(f"! {len(missing)} of {len(all_facts)} facts have no source yet:")
        for fact in missing:
            note = fact.get("note") or "no note"
            print(f"    {fact['id']:14s} {note}")

    facts = all_facts if args.include_unverified else good
    if args.include_unverified:
        print("! --include-unverified is on. This output is a draft, not postable.")
    if not facts:
        sys.exit("nothing verified for this country yet. Research first.")
    if len(facts) < 5:
        print(
            f"! nur {len(facts)} belegte Fakten. Unter fuenf traegt das Format "
            "nicht, erst weiter recherchieren."
        )

    stamp = date.today().isoformat()
    out = OUTPUT / f"{args.country.replace(' ', '_')}_{stamp}"
    out.mkdir(parents=True, exist_ok=True)

    (out / "facts.json").write_text(
        json.dumps(
            {
                "country": args.country,
                "generated": stamp,
                "disclaimer": db["_meta"]["disclaimer"],
                "facts": [
                    {
                        "title": f["title"],
                        "why": f.get("why"),
                        "penalty": money(f),
                        "source": f.get("source"),
                        "checked": f.get("checked"),
                        "verified": bool(f.get("verified")),
                    }
                    for f in facts
                ],
            },
            indent=2,
            ensure_ascii=False,
        )
        + "\n",
        encoding="utf-8",
    )

    (out / "flatlay_prompts.txt").write_text(
        build_prompts(args.country, prompt_cfg), encoding="utf-8"
    )

    check_repeats(args.country, facts, countries)
    hook = get_hook(args.country, countries[args.country], args.lang, len(facts))
    script, words, seconds = build_script(args.country, facts, args.lang, hook)
    (out / "elevenlabs_script.txt").write_text(script, encoding="utf-8")

    newest = max((f.get("checked") or "") for f in facts)
    (out / "caption.txt").write_text(
        build_caption(args.country, facts, newest, hook), encoding="utf-8"
    )

    (out / "cover.txt").write_text(
        f"{hook['cover_head']}\n{hook['cover_sub']}\n", encoding="utf-8"
    )

    (out / "posting_time.txt").write_text(
        f"main: {POSTING['main']}\ntest: {POSTING['test']}\n\n{POSTING['why']}\n",
        encoding="utf-8",
    )

    print(f"\n-> {out}")
    print(f"   {len(facts)} facts, script {words} words, about {seconds:.0f} s at {WPM} wpm")
    budget = word_budget(len(facts))
    print(
        f"   Budget fuer {len(facts)} Punkte: {budget} Woerter, "
        f"rund {budget / WPM * 60:.0f} s"
    )
    if words > budget * (1 + TOLERANCE):
        over = words - budget
        print(
            f"!  {over} Woerter ueber dem Budget ({over / WPM * 60:.0f} s). "
            f"Die 'tts'-Zeilen in der Datenbank kuerzen."
        )


if __name__ == "__main__":
    main()
