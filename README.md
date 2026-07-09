# Aurélie

A prototype **escort / companionship directory** for the German market (where the
trade is legal), built as a for-fun project. Phase 1 is intentionally a zero-build
static site so it can be opened in a browser and deployed to Vercel immediately.

> This is a demonstration only. No real bookings are brokered and no real payments
> are processed. All profile data is mock data and imagery is placeholder.

## Features

- **Age gate** (18+ confirmation, stored locally) shown site-wide
- **Directory** with client-side search, filters (city, language, services, price)
  and sorting, all driven by `data/profiles.json`
- **Profile pages** with gallery + lightbox, stats, services and rates
- **Booking flow** ending in a *simulated* deposit checkout (UI only)
- **German legal pages**: Impressum, Datenschutz, AGB (placeholder content)
- Single locked dark theme, one rose accent, responsive, reduced-motion aware

## Run locally

No build step. Serve the folder with any static server:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Structure

```
index.html  browse.html  profile.html  booking.html
impressum.html  datenschutz.html  agb.html  404.html
css/styles.css
js/  data.js  cards.js  site.js  home.js  browse.js  profile.js  booking.js
data/profiles.json      # mock providers — edit to change the whole site
```

Add or remove a provider in `data/profiles.json` and the grid, filters and profile
pages update with no code changes.

## Roadmap (Phase 2)

Migrate to **Next.js + Tailwind** with a real database, provider accounts, and real
deposit charging via Stripe (the current booking UI maps onto a Checkout Session).

## Deploy

Push and import into Vercel as a static project (no framework preset needed).
