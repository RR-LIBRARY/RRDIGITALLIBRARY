# RR Digital Library — Website

Landing page for **RR Digital Library, Bandipatti** (Bhadohi, Uttar Pradesh) — an AC self-study hub open 24/7 with monthly shift plans from ₹330.

- **Live site:** https://rrdigitallibrary.lovable.app
- **Repository:** https://github.com/RR-LIBRARY/RRDIGITALLIBRARY (renamed from `RRLIBRARY9`)
- **Website code:** merged into `main` via PR #1 — https://github.com/RR-LIBRARY/RRDIGITALLIBRARY/pull/1
- **Built with:** [Lovable](https://lovable.dev) · TanStack Start · React 19 · TypeScript · Tailwind CSS v4

## What the page contains

One scrolling landing page (`/`) in the library's navy & gold brand:

| Section | Content |
| --- | --- |
| Hero | Intro video (click-to-play), "Admission Open" badge, 24/7 + AC + free trial highlights marquee |
| Timings & Fees | 5 monthly plans — Morning / Afternoon / Evening ₹400, Full Day Power Plan ₹600 (featured), Night ₹330 |
| Facilities | AC hall, free Wi-Fi, charging at every seat, individual seats, silent zone, separate seating for girls, RO water, daily cleaning, eye-friendly lighting, reference books |
| Interior Look | Photo gallery + YouTube tour videos |
| Online Community | Telegram quiz group, WhatsApp channel, YouTube channel |
| लाइब्रेरी के नियम | 12 library rules with staggered reveal + hover animations |
| Get in touch | Location map, phone, email, WiFi password and notice-board links |

Legacy pages from the original static site still work and are linked, not embedded:

- `/site/wifi_ka_password_yaha_milega_.html` — WiFi password
- `/site/IMP LINKS FOR LIBRARY.html` — important links / notice board
- `/site/index.html` — the original static site

## Project layout

```
src/routes/index.tsx    the whole landing page — all copy lives in typed arrays at the top
src/routes/__root.tsx   app shell, <head> metadata, Google Fonts (DM Serif Display, Fira Sans, Noto Sans Devanagari)
src/styles.css          design tokens (@theme) + utilities: bg-hero, bg-gold-gradient, text-gold-gradient,
                        shadow-gold, bg-gold-line, bg-dots, marquee
src/components/ui/      shadcn/ui primitives
public/images/          library photos, posters and logo used by the page
public/site/            original static site (WiFi, notice board, legacy index)
src/test/               vitest checks
```

## Editing content

Almost every change is a small edit to the arrays and constants at the top of `src/routes/index.tsx` — no JSX needed:

| Array / constant | Controls |
| --- | --- |
| `TRIAL` | Google Form used by every "Book Free Trial" button |
| `WIFI`, `NOTICE`, `MAPS`, `MAP_EMBED`, `PHONE` | WiFi page, notice page, map link, map embed, call button |
| `plans` | shift names, Hindi labels, timings, fees, which card is `featured` |
| `features` | facility cards (lucide icon + Hindi title + description) |
| `highlights` | scrolling strip under the hero |
| `rules` | the 12 rules; a third string highlights the key phrase in gold |
| `heroVideo`, `tourVideos` | YouTube video ids and captions |
| `gallery` | photo filenames from `public/images/` (`large: true` = wide tile) |
| `community` | Telegram / WhatsApp / YouTube cards with member counts |
| footer tiles | brand-coloured SVG tiles: YouTube, Telegram, WhatsApp, Gmail, Linktree |

Keep every claim in these arrays traceable to the library's own materials (the original site HTML or the poster images in `public/images/`) — do not invent offers, facilities or guarantees.

## Design rules

- Navy/gold tokens are defined once in `src/styles.css`; components use the semantic utilities (`bg-hero`, `bg-gold-gradient`, `text-gold-gradient`, `shadow-gold`, …) instead of hard-coded colours, so dark/light surfaces keep working.
- YouTube always goes through the `VideoEmbed` click-to-play facade (poster + play button, iframe only after click) — never a raw autoloading `<iframe>`.
- The map uses the key-less `https://www.google.com/maps?q=<place>&output=embed` URL pointing at the same place the official short link resolves to, so no API key is needed.
- Scroll animations run through the `Reveal` component and fall back to fully visible when the visitor prefers reduced motion.

## Run it locally

```sh
git clone https://github.com/RR-LIBRARY/RRDIGITALLIBRARY.git
cd RRDIGITALLIBRARY
npm install
npm run dev        # http://localhost:8080
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | start the dev server |
| `npm run build` | production build |
| `npm run preview` | serve the production build |
| `npm test` | run the vitest suite |
| `npm run lint` | eslint |
| `npm run format` | prettier |

## GitHub sync & deploying

The project is connected to Lovable, so every change made in the editor is committed to the repository automatically — no manual commits or pull requests needed. Pushing to the connected branch syncs back into Lovable, so keep the branch in a working state and avoid rewriting published history.

The website code already sits in the repository's `main` branch (PR #1 merged), so a fresh clone builds the same site. To update the live site, publish from the Lovable editor — it deploys to `rrdigitallibrary.lovable.app`.
