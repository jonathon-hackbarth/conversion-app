# quikconvert

A fast, accessible, and SEO-friendly web application for converting cooking and kitchen measurements instantly.

## Features

- **Simple & Fast**: Just type what you have (e.g., "12 oz", "100g", "2 cups") and select what you want
- **Smart Input**: Natural language parsing - recognizes units automatically
- **Instant Results**: Conversions happen immediately with minimal clicks
- **All Conversions in One Place**: No tabs or navigation needed
- **Supports**: Volume (cups, ml, tbsp), Weight (oz, grams, kg), Temperature (F, C)
- **Dark Mode**: Automatic light/dark theme support with user preference persistence
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Accessible**: Full ARIA support and keyboard navigation
- **SEO Optimized**: Server-side rendering, structured data, Open Graph metadata
- **Fast**: Lightweight, optimized build

## Use Cases

- Quick cooking and baking conversions
- Recipe scaling and ingredient conversions
- International recipe adaptation (cups to grams, etc.)
- Temperature conversions for ovens (Fahrenheit to Celsius)
- Fast unit conversions with minimal interaction

## Tech Stack

- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI components

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

```bash
npm run build
npm start
```

## Performance & SEO

- ✅ Server-side rendering for complete indexable content
- ✅ JSON-LD structured data markup for cooking conversions
- ✅ Open Graph social sharing support
- ✅ Security headers (CSP, X-Frame-Options, Permissions-Policy)
- ✅ robots.txt and sitemap.xml for search engines
- ✅ Mobile-optimized viewport configuration
- ✅ Targeted keywords: kitchen converter, cooking converter, recipe converter, baking converter
- ✅ Hybrid SEO strategy: primary focus on cooking/kitchen, secondary conversions for extended utility

## Deployment

Ready for production deployment. Security headers and CSP are configured in `next.config.ts`.
