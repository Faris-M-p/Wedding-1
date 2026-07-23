# Together Before God — A Sacred Wedding Invitation

A premium Christian wedding invitation website where **the church is the visual hero**
and the couple's names are the emotional focus. Built to feel like an Apple keynote
meeting a luxury wedding magazine — calm, editorial, sacred and timeless.

> _"I have found the one whom my soul loves." — Song of Solomon 3:4_

## Tech stack

- **Next.js 15** (App Router, server components by default)
- **TypeScript**
- **Tailwind CSS v4** (CSS-first theme in `app/globals.css`)
- **Framer Motion** — soft fade / translateY / scale entrances (no bounce)
- **GSAP** — hero cinematic zoom + scroll parallax only
- **Lucide** icons

All animation is GPU-accelerated (`transform` / `opacity`), fully responsive,
mobile-first, and honours `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

## Experience

1. **Door Intro** — elegant church doors cover the screen with a cross, the opening
   verse and an _Open Invitation_ button. Doors swing open into golden light
   (with a softly synthesised church-bell chime) and fade into the hero.
2. **Hero** — full-screen cinematic church image with a slow zoom, drifting clouds,
   floating gold particles and tiny birds. Names, date and church name centered.
3. **Sections** — Bible verse · Invitation · Countdown (circular gold rings) ·
   Timeline (Betrothal / Matrimony / Reception) · Church details + maps ·
   Reception · Parents · Gallery (masonry) · RSVP (with success animation) ·
   Blessings wall.
4. **Footer** — cross, thank you, and a blessing.

A floating **music button** (bottom-right) plays a gentle, fully-synthesised
church-piano hymn — no audio asset required, muted until the visitor presses play.

## Personalising

Everything editable lives in one place:

```
lib/config.ts
```

Update the couple, date, verse, church, reception, parents, timeline, gallery and
site metadata there and the whole site updates.

### Replacing the imagery

Drop your own AI-enhanced church photography and gallery images into
`public/images/` using the same file names (or edit the paths in `lib/config.ts`):

| File | Used for |
| --- | --- |
| `hero-church.png` | Hero background + Open Graph image |
| `gallery-church-arch.png` | Church details + gallery |
| `gallery-rings.png`, `gallery-bible.png`, `gallery-candles.png`, `gallery-flowers.png`, `gallery-cross.png`, `gallery-decor.png`, `gallery-invite.png` | Gallery |

The included images are AI-generated placeholders (golden-hour cathedral, rings,
Bible, candles, flowers, cross, decor and an invitation flat-lay) — no bride or
groom portraits, by design.

## Google Sheets (one Web App, two sheets)

Both forms post to a **single Google Apps Script Web App** — no backend, no
database. Requests are routed by a `type` field into one spreadsheet with two
sheets.

- `Sheet1` → RSVP: `Timestamp · Name · Phone · Guest Count · Attendance · Device · Submitted At`
- `Wishes` → Blessings: `Timestamp · Name · Phone · Wish · Is Custom · Status`

### Setup

1. Create **one** Google Sheet (its first tab is `Sheet1`).
2. **Extensions ▸ Apps Script**, paste `google-apps-script/Code.gs`, and
   **Deploy ▸ New deployment ▸ Web app** (Execute as _Me_, access _Anyone_).
3. Put the single URL in `.env.local`:

   ```bash
   NEXT_PUBLIC_RSVP_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
   ```

### API

- **RSVP** — `POST { type: "rsvp", name, phone, guestCount, attendance, device }` → appends to `Sheet1`.
- **Wish** — `POST { type: "wish", name, phone, wish, isCustom }` → appends to `Wishes` with `Status = "Pending"`.
- **Guestbook** — `GET ?action=wishes` → returns a plain array `[{ name, wish }]` of **Approved** rows only.

**Moderation:** every wish starts as `Pending`. The couple sets `Status` in the
`Wishes` sheet to `Approved` (shown on the site) or `Rejected` (hidden). No admin
UI is needed.

Both forms validate before sending, show `Sending…` while in flight, confirm on
success, and show a retry message on failure. If the endpoint is empty, forms
fall back to browser storage.

## Project structure

```
app/
  layout.tsx      # fonts, SEO metadata, OpenGraph/Twitter, JSON-LD
  page.tsx        # composes all sections (server component)
  globals.css     # Tailwind v4 theme + tokens
components/
  DoorIntro.tsx   # opening doors experience
  Hero.tsx        # GSAP parallax + ambient motion
  MusicPlayer.tsx # synthesised hymn toggle
  ScrollIndicator.tsx
  ui/             # Reveal / Stagger / Section / SectionHeading primitives
  sections/       # the ten content sections + footer
lib/
  config.ts       # single source of truth for all content
  sound.ts        # Web Audio bells + ambient hymn (no assets)
  rsvp.ts         # RSVP validation + submission (RSVP API)
  blessings.ts    # wish submission + approved-wish fetch (Wishes API)
google-apps-script/
  Code.gs         # one Web App: RSVP (Sheet1) + Wishes (Wishes sheet)
public/images/    # church & gallery imagery
```

## Notes

- **Accessibility:** keyboard-openable intro, skip link, ARIA labels, focus-visible
  rings, high contrast, reduced-motion support.
- **Performance:** static prerender, code-split client islands, optimized/lazy
  images via `next/image`, no layout shift. First-load JS ≈ 157 kB.
- **SEO:** metadata, OpenGraph, Twitter cards and `Event` JSON-LD included.
