# Hedonic Cocktails - Premium RTD Cocktail Showcase

## Overview
Premium ready-to-drink cocktail brand website for Hedonic Cocktails. Luxurious dark/gold aesthetic targeting upscale consumers. Informational showcase site (no cart/purchase functionality). Quiz-led discovery experience with embedded value propositions.

## Recent Changes
- Branded age gate with bottle visual, tagline ("Pleasure, Bottled."), and brand descriptors
- Homepage CTAs reordered: quiz ("Find Your Bottle") is primary, "Browse All" is secondary
- Inline price comparison on homepage (compact savings display vs bar night)
- Quiz trimmed from 7 to 5 questions with segmented progress bar; result page shows price, per-serving details, "View Details" link, and "Browse Full Collection" escape
- Product detail pages now include per-serving price comparison vs bar pricing, and related bottles from same collection with similarity/difference notes
- Navigation restructured: "Our Process" added to nav, "About" + "Compare" merged into "Why Hedonic" page
- Old routes (/about, /compare, /clarity) redirect to new pages
- Seed function updated to incrementally add missing products by slug check

## Architecture
- **Frontend**: React + Vite, wouter routing, TanStack Query, Framer Motion animations
- **Backend**: Express.js, Drizzle ORM, PostgreSQL
- **Styling**: Tailwind CSS with dark/gold luxury theme tokens
- **Pages**: Home (hero + collection + value prop + story + CTA), Product Detail (with price comparison + related bottles), Our Process (/our-process), Why Hedonic (/why-hedonic, merged about+compare), Quiz (/quiz), Collection (/collection)
- **Redirects**: /about → /why-hedonic, /compare → /why-hedonic, /clarity → /our-process

## Products
- 12 individual cocktails ($29.99 each, 750mL, 4 servings)
- 3 variety packs ($34.99 each, 4x187mL)
- Three collections: Lovingly Light, Dark & Seductive, Tropical Paradise
- Clarification: Milk (original 8), Coconut milk (Tropical Paradise 4)

## User Preferences
- Brand: Hedonic Cocktails
- Vibe: Luxurious & Elegant
- Always dark theme with gold/champagne accents
- Site is informational showcase only (no cart/purchase)
- Quiz-led discovery is the primary CTA

## Key Files
- `client/src/pages/home.tsx` - Landing page with hero, collection, value prop, story, CTA
- `client/src/pages/product-detail.tsx` - Product view with price comparison + related bottles
- `client/src/pages/quiz.tsx` - 5-question quiz with progress bar and enhanced result
- `client/src/pages/why-hedonic.tsx` - Merged about + compare page
- `client/src/pages/clarity.tsx` - Our Process page (route: /our-process)
- `client/src/components/header.tsx` - Navigation with 5 links
- `client/src/components/age-gate.tsx` - Branded age verification overlay
- `client/src/components/footer.tsx` - Footer with updated nav links
- `client/src/App.tsx` - Routing with redirects for old URLs
- `server/seed.ts` - Product seed data (incremental seeding)
- `shared/schema.ts` - Products and orders schemas
