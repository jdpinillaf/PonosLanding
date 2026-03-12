# SEO Action Plan — Ponos Landing
**Generated:** 2026-03-12 | **Score:** 42/100 | **Target:** 72/100

---

## CRITICAL — Fix immediately (blocks indexing / major ranking impact)

### C1. Add robots.txt
Create `src/app/robots.ts`:
```ts
import { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://ponos.com.co/sitemap.xml',
  };
}
```

### C2. Add sitemap.xml
Create `src/app/sitemap.ts`:
```ts
import { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ponos.com.co',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
```

### C3. Fix SSR blank page (critical for non-Google crawlers)
**Root cause:** `LanguageProvider` returns `null` until mounted → entire page is invisible in SSR HTML.

**Options (pick one):**
- **Option A (recommended):** Move all section content to Server Components with static EN text as default. Keep `useTranslation` only for interactive language switching overlay.
- **Option B (quick fix):** Remove `if (!mounted) return null` and render with default `locale: 'en'` immediately. Language detection still happens client-side but static content is crawlable.

### C4. Add OG Image
1. Create `/public/og-image.png` (1200×630px) with Ponos branding
2. Add to `layout.tsx` metadata:
```ts
openGraph: {
  // ... existing fields
  images: [{ url: 'https://ponos.com.co/og-image.png', width: 1200, height: 630 }],
},
twitter: {
  // ... existing fields
  images: ['https://ponos.com.co/og-image.png'],
},
```

### C5. Add canonical URL
In `layout.tsx` metadata:
```ts
alternates: {
  canonical: 'https://ponos.com.co',
},
```

---

## HIGH — Fix within 1 week (significant ranking impact)

### H1. Add JSON-LD Schema Markup
Create `src/components/SchemaOrg.tsx` (Server Component):
```tsx
export default function SchemaOrg() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Ponos',
        url: 'https://ponos.com.co',
        logo: 'https://ponos.com.co/logo-ponos.png',
        description: 'Boutique AI consulting firm. Custom agents, financial automation, and operational AI for LATAM businesses.',
        sameAs: [
          'https://www.linkedin.com/company/ponos-ai',
          'https://x.com/ponos_ai',
        ],
      },
      {
        '@type': 'WebSite',
        name: 'Ponos',
        url: 'https://ponos.com.co',
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```
Add `<SchemaOrg />` inside `<head>` via `layout.tsx`.

### H2. Fix `<html lang>` attribute
The SSR always outputs `lang="en"`. Either:
- Accept EN as canonical language (site is primarily EN) and add `lang="es"` only if you add `/es/` routes
- Or set `lang="es"` for the Spanish version via proper i18n routing

Quick fix for now: accept `lang="en"` but add note in hreflang for both:
```ts
// layout.tsx metadata
alternates: {
  canonical: 'https://ponos.com.co',
  languages: {
    'en': 'https://ponos.com.co',
    'es': 'https://ponos.com.co',  // same URL, both languages
  },
},
```

### H3. Fix Calendly script loading
In `src/components/Agendar.tsx`, replace manual `document.createElement` with:
```tsx
import Script from 'next/script';
// Remove the useEffect
// Add inside component return:
<Script
  src="https://assets.calendly.com/assets/external/widget.js"
  strategy="lazyOnload"
/>
```

### H4. Add favicon
1. Add `favicon.ico` to `/public/`
2. Add to `layout.tsx` metadata:
```ts
icons: {
  icon: '/favicon.ico',
  apple: '/apple-touch-icon.png',
},
```

### H5. Add security headers
In `next.config.mjs`:
```js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};
```

### H6. Strengthen title tag with geo-targeting
```ts
title: 'Ponos | AI Consulting for LATAM — Custom Agents & Automation',
```

---

## MEDIUM — Fix within 1 month (optimization opportunities)

### M1. Fix Hero LCP — reduce animation delays
The H1 currently delays 1500ms + 100ms mount = ~1600ms before appearing.
- Reduce `transitionDelay` on H1 to 0-200ms max
- Consider rendering H1 text immediately (opacity:1, no transition) and animating only decorative elements (logo letters, line)

### M2. Improve E-E-A-T signals
- Add a minimal "About" section with company founding, location (Colombia), team size
- Add verifiable metrics to success stories: "Reduced invoicing time by 3 hours/week"
- Link "JPRO Solutions" to a real domain or case study

### M3. Add FAQ section
Create a FAQ with schema markup. Example questions:
- "What industries does Ponos work with?"
- "How long does implementation take?"
- "Does Ponos work with existing systems?"

This improves AI citation readiness and long-tail keyword coverage.

### M4. Add `llms.txt`
Create `/public/llms.txt`:
```
# Ponos — AI Consulting

Ponos is a boutique AI consulting firm based in Colombia serving LATAM businesses.
We build custom AI agents, automate financial workflows, and deliver insights via WhatsApp.

## Services
- Operational Agents: Daily briefings, alerts, and reports via WhatsApp
- Financial Automation: Invoice generation, collections tracking
- Second Brain: Company knowledge base
- Sales Agent: WhatsApp conversational sales (coming soon)
- Marketing Agent: Automated content and distribution (coming soon)

## Contact
Book a consultation: https://calendly.com/jdpf1803/30min
LinkedIn: https://www.linkedin.com/company/ponos-ai
```

### M5. Add Service schema per module
Add individual Service JSON-LD for each of the 5 modules in the Servicios section.

### M6. Fix "See how it works" / "How It Works" duplicate H2s
Rename demos section H2 to "Live Demos" or "See it in action" to avoid duplication.

### M7. Add meta keywords for ES version
The Spanish metadata should use Spanish keywords (e.g., "agentes de IA", "automatización", "consultoría IA Colombia").

---

## LOW — Backlog (nice to have)

### L1. Add additional pages for SEO depth
- `/about` — Team, story, location
- `/services/operational-agents` — Dedicated service page
- `/case-studies/` — Expanded success stories
- `/blog/` — Content marketing for long-tail keywords

### L2. Add Open Graph image per section (if multi-page added)

### L3. Implement proper i18n routing
Use `/en/` and `/es/` routes (or subdomain `es.ponos.com.co`) for true hreflang support. This is a larger refactor.

### L4. Add Google Search Console verification meta tag

### L5. Implement Review schema for testimonials
Use `https://schema.org/Review` for the CasosExito section.

### L6. Add breadcrumb schema if multi-page architecture added

---

## Score Projection After Fixes

| Category | Current | After Critical+High | After All |
|---|---|---|---|
| Technical SEO | 35 | 70 | 80 |
| Content Quality | 45 | 50 | 65 |
| On-Page SEO | 55 | 70 | 78 |
| Schema | 0 | 60 | 75 |
| Performance | 60 | 72 | 75 |
| Images | 70 | 80 | 80 |
| AI Readiness | 30 | 45 | 65 |
| **Overall** | **42** | **~65** | **~75** |
