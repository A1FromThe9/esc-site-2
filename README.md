# Aurélie

A prototype **escort / companionship directory** for the German market (where the
trade is legal), built as a for-fun project. Built with **Next.js (App Router) +
Tailwind v4**.

> This is a demonstration only. No real bookings are brokered and no real payments
> are processed. All profile data is mock data and imagery is placeholder.

## Features

- **Age gate** (18+ confirmation, stored locally) shown site-wide
- **Directory** with client-side search, filters (city, language, services, price)
  and sorting, driven by `data/profiles.json`
- **Profile pages** with gallery + lightbox, stats, services and rates
- **Booking flow** ending in a *simulated* deposit checkout (UI only)
- **German legal pages**: Imprint, Privacy Policy, Terms (placeholder content)
- Single locked dark theme, one rose accent, responsive, reduced-motion aware
- Self-hosted fonts via `next/font`, optimized images via `next/image`, icons via
  Phosphor

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Structure

```
app/
  layout.js            # shared shell: header, footer, age gate, fonts
  page.js               # home
  browse/page.js        # directory (server) + BrowseClient (client filters)
  profile/[id]/page.js  # profile detail
  booking/[id]/page.js  # booking + simulated deposit checkout
  impressum/  datenschutz/  agb/   # legal pages
  not-found.js          # 404
components/             # Header, Footer, AgeGate, ProviderCard, Gallery, BookingForm, Reveal
lib/                    # profiles.js (data access), format.js (currency/photo helpers)
data/profiles.json      # mock providers — edit to change the whole site
```

Add or remove a provider in `data/profiles.json` and the grid, filters, and
profile/booking pages update with no code changes.

## Roadmap (Phase 3)

Real database + provider accounts, and real deposit charging via Stripe (the
current booking UI maps onto a Checkout Session).

## Deploy

Push to a connected Vercel project. Framework is auto-detected as Next.js from
`package.json` / `next.config.mjs` — no manual configuration needed.
