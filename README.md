# Kitchen Measurement Converter

A fast, accessible, and SEO-friendly web application for converting kitchen measurements instantly.

## Features

- **6 Converter Types**: Volume, Weight, Temperature, Length, Area, Speed
- **Intuitive UI**: Easy-to-use interface with preset buttons and increment controls
- **Dark Mode**: Automatic light/dark theme support with user preference persistence
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Accessible**: Full ARIA support and keyboard navigation
- **SEO Optimized**: Server-side rendering, structured data, Open Graph metadata
- **Fast**: Lightweight, optimized build with 102KB shared JS

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
- ✅ JSON-LD structured data markup
- ✅ Open Graph social sharing support
- ✅ Security headers (CSP, X-Frame-Options, Permissions-Policy)
- ✅ robots.txt and sitemap.xml for search engines
- ✅ Mobile-optimized viewport configuration

## Deployment

Ready for production deployment. Security headers and CSP are configured in `next.config.ts`.

