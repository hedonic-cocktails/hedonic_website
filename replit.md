# Hedonic Cocktails - Premium RTD Cocktail E-Commerce

## Overview
Premium ready-to-drink cocktail brand website for Hedonic Cocktails. Luxurious dark/gold aesthetic targeting upscale consumers. Single-page landing with product detail pages and shopping cart.

## Recent Changes
- Initial build: Full MVP with age gate, landing page, product details, cart, order placement
- Dark luxury theme with gold accents (Playfair Display + Inter fonts)
- PostgreSQL backend with products and orders tables
- 7 products: Dirty Shirley, Orange Julius, Mezcal Soda, Whiskey Sour, Strawberry Daiquiri, Clover Club, Pheromone Martini ($29.99 each, 750mL)

## Architecture
- **Frontend**: React + Vite, wouter routing, TanStack Query, Framer Motion animations
- **Backend**: Express.js, Drizzle ORM, PostgreSQL
- **Styling**: Tailwind CSS with dark/gold luxury theme tokens
- **Cart**: localStorage-based with custom useCart hook
- **Pages**: Home (hero + collection + story + CTA), Product Detail, Cart/Checkout, About, Clarity, Compare (Hedonic at Home), Quiz (Find Your Bottle)

## User Preferences
- Brand: Hedonic Cocktails
- Vibe: Luxurious & Elegant
- Always dark theme with gold/champagne accents

## Key Files
- `client/src/pages/home.tsx` - Landing page with all sections
- `client/src/pages/product-detail.tsx` - Individual product view
- `client/src/pages/cart.tsx` - Cart and checkout with order form
- `client/src/components/header.tsx` - Fixed header with cart badge
- `client/src/components/age-gate.tsx` - Age verification overlay
- `server/seed.ts` - Product seed data
- `shared/schema.ts` - Products and orders schemas
