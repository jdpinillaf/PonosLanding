# Full SEO Audit — Ponos Landing Page
**Date:** 2026-03-12
**URL:** https://ponos.com.co
**Business Type:** B2B AI Consulting — Boutique, LATAM-focused

---

## Executive Summary

**SEO Health Score: 42 / 100**

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 25% | 35/100 | 8.75 |
| Content Quality | 25% | 45/100 | 11.25 |
| On-Page SEO | 20% | 55/100 | 11.00 |
| Schema / Structured Data | 10% | 0/100 | 0.00 |
| Performance (CWV) | 10% | 60/100 | 6.00 |
| Images | 5% | 70/100 | 3.50 |
| AI Search Readiness | 5% | 30/100 | 1.50 |
| **Total** | | | **42 / 100** |

### Top 5 Critical Issues
1. **No robots.txt or sitemap.xml** — Google can't discover or prioritize content
2. **Zero schema markup** — Missing Organization, WebSite, and Service structured data
3. **All content is client-side rendered** — `'use client'` + `useTranslation()` means HTML served to crawlers is empty; content only appears after JS executes
4. **No OG image / Twitter card image** — Social shares render blank previews
5. **`<html lang="en">` hardcoded in SSR** — Spanish users always get English in initial render; hreflang missing

### Top 5 Quick Wins
1. Add `robots.txt` and `sitemap.xml` (10 min)
2. Add OG image and favicon (30 min)
3. Add Organization + WebSite JSON-LD schema (20 min)
4. Add canonical URL to metadata (5 min)
5. Move Calendly script to `next/Script` with `strategy="lazyOnload"` (5 min)

---

## Technical SEO

### Crawlability
- **robots.txt:** MISSING — `/public/robots.txt` does not exist. Google must infer crawlability. Next.js can generate it via `src/app/robots.ts`.
- **Sitemap:** MISSING — No `sitemap.xml`. Only 1 page exists currently, but this should still be declared. Use `src/app/sitemap.ts`.
- **Internal links:** All internal links are anchor hashes (`#services`, `#demos`, etc.) — zero multi-page crawling possible.

### Indexability
- **Canonical:** Not set in `layout.tsx` metadata. Google may deduplicate `ponos.com.co` vs `www.ponos.com.co`.
  - Fix: Add `alternates: { canonical: 'https://ponos.com.co' }` to metadata.
- **Meta robots:** Not explicitly set; defaults to index, follow — acceptable.
- **Client-side rendering risk:** Every component except `layout.tsx` is `'use client'`. The `LanguageProvider` renders `null` until mounted (`if (!mounted) return null`), so on SSR, the entire page body is blank. Googlebot does execute JS, but with delay (rendering budget). Other crawlers (Bing, AI bots) often don't.

### Security / Headers
- `next.config.mjs` is essentially empty — no security headers configured.
- Missing: `X-Content-Type-Options`, `X-Frame-Options`, `Content-Security-Policy`, `Referrer-Policy`, `Permissions-Policy`.
- These don't directly affect rankings but are a trust signal and affect Core Web Vitals audits.

### i18n / Hreflang
- Site supports EN and ES but both are served at the same URL (`ponos.com.co`).
- `<html lang="en">` is hardcoded in `layout.tsx` line 55 — Spanish users always receive `lang="en"` from the server.
- `MetadataUpdater.tsx` tries to patch `lang` attribute client-side, but this doesn't help crawlers.
- No `hreflang` tags — Google doesn't know this page has an ES version.
- **Recommendation:** Either use separate routes (`/es/`, `/en/`) or set `hreflang` to `x-default` pointing to ponos.com.co.

### Favicon
- No favicon in `/public/` directory — only `logo-ponos.png` and `logo-ponos-small.png`.
- No favicon configured in `layout.tsx` metadata (no `icons` field).
- Browser tab shows generic icon, hurting brand recognition.

---

## Content Quality

### E-E-A-T Assessment: **Weak**

| Signal | Status |
|---|---|
| Author / expert identified | ❌ No About section, no team page |
| Company info | ❌ No founding date, location, or contact page |
| External trust signals | ❌ No press mentions, certifications, or partnerships |
| Testimonials | ⚠️ 2 entries: "JPRO Solutions" (generic) + "Ponos (Dogfooding)" |
| Real client names | ⚠️ "JPRO Solutions" exists but no links, photos, or verifiable details |

### Thin Content Risk
- Single page (~2,000 words of visible text across all sections)
- Each section is a minimum 2-4 sentences — acceptable for a landing page but insufficient for competitive rankings on "AI consulting" queries
- Success stories section has zero metrics (no "reduced X by Y%", no timeframes, no verifiable outcomes)
- Demo section is entirely interactive JS — no crawlable text describing what the demos show

### Readability
- Copy is clear and concise — grade level ~10 (appropriate for B2B SaaS)
- Good use of contrast (pain points vs. solutions)
- CTAs are clear: "Book a consultation"
- Tagline "From chaos to order, automated" is memorable

### AI Citation Readiness: **Poor**
- All content is client-side rendered — AI crawlers (GPTBot, ClaudeBot, PerplexityBot) typically don't execute JS
- No `llms.txt` file
- No FAQ section with Q&A structure (easy AI citation format)
- No statistics, research citations, or data points that would make content citation-worthy

---

## On-Page SEO

### Title Tags
- **Current:** `"Ponos | AI Consulting — Custom solutions for your business"` (65 chars) ✓
- **Issue:** No geo-targeting (missing "Colombia", "LATAM", or "Latin America")
- **Suggestion:** `"Ponos | AI Consulting for LATAM Businesses | Custom Agents & Automation"`

### Meta Description
- **Current:** `"Boutique AI consulting firm. We connect AI to your real data, on your channels. Operational agents, financial automation, and more."` (133 chars) ✓
- Well-written, fits within limit, includes product types
- Missing: geo-qualifier, urgency, or differentiator

### Heading Structure
```
(H1) Custom AI solutions for your business  ← client-side rendered
  (H2) The problem we solve
  (H2) Our Modules
    (H3) Operational Agents
    (H3) Financial Automation
    (H3) Second Brain
    (H3) Sales Agent
    (H3) Marketing Agent
  (H2) See how it works
  (H2) How It Works
  (H2) Success Stories
  (H2) Transform your operations with AI
  (H2) Book your free consultation
```
- **Issue:** H1 is not present in SSR HTML — it's rendered by a `'use client'` component
- **Issue:** "See how it works" and "How It Works" are redundant H2s
- **Positive:** H3 service names are keyword-rich

### Keywords Analysis
- **Target keywords in metadata:** AI, artificial intelligence, consulting, automation, WhatsApp, AI agents, LATAM
- **Missing long-tail opportunities:**
  - "AI agents for small business LATAM"
  - "WhatsApp automation Colombia"
  - "AI financial automation"
  - "operational AI consulting"
- **Keyword in H1:** Present ("Custom AI solutions") — but not crawlable without JS

### Internal Linking
- Only anchor-hash links — no traditional page-to-page linking
- No footer navigation links (only LinkedIn and Twitter)
- No "Learn more" links to deeper content

### URL Structure
- Single page at `/` — no sub-pages
- Missing opportunity for `/services/`, `/case-studies/`, `/about/` pages

---

## Schema / Structured Data

**Current:** NONE

**Missing schemas (high priority):**

### 1. Organization
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Ponos",
  "url": "https://ponos.com.co",
  "logo": "https://ponos.com.co/logo-ponos.png",
  "description": "Boutique AI consulting firm specializing in operational agents, financial automation, and custom AI solutions for LATAM businesses.",
  "sameAs": [
    "https://www.linkedin.com/company/ponos-ai",
    "https://x.com/ponos_ai"
  ]
}
```

### 2. WebSite (enables Sitelinks Searchbox)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Ponos",
  "url": "https://ponos.com.co"
}
```

### 3. Service (per module)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Operational Agents",
  "provider": { "@type": "Organization", "name": "Ponos" },
  "description": "Agent connected to your database. Automatic reports, alerts, and daily briefings delivered via WhatsApp.",
  "serviceType": "AI Consulting"
}
```

### 4. FAQPage (if FAQ section added)
### 5. Review (for success stories, with proper attribution)

---

## Performance

### Estimated Core Web Vitals (based on code analysis)

| Metric | Estimated | Status |
|---|---|---|
| LCP | > 3.5s | ❌ Poor |
| INP | Unknown | ⚠️ |
| CLS | Low | ✅ |

### LCP Issues
1. **Hero animations intentionally delay content** — `transitionDelay` up to 2500ms before any visible content (H1 appears at 1500ms delay, after a 100ms mount timer = 1600ms minimum before H1 visible)
2. **`LanguageProvider` renders `null` until mounted** — entire page blank during hydration
3. **Calendly script:** loaded via `document.createElement` in `useEffect` — not using `next/Script`, which means no priority/loading optimization. The 700px widget iframe is large.
4. **No preload hints** for critical resources

### What's Good
- Google Fonts with `display: swap` ✓
- No large above-fold images
- Tailwind CSS — small CSS bundle
- No unnecessary third-party scripts except Calendly

### Calendly Fix
Replace manual script injection with:
```tsx
import Script from 'next/script';
<Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
```

---

## Images

- **Total images:** 2 (`logo-ponos.png`, `logo-ponos-small.png`) — neither appears to be used as `<img>` tags; Navbar uses text-based logo
- **In-content images:** None — all sections use text, CSS, and inline SVGs
- **OG Image:** MISSING — `og:image` not set in `layout.tsx` metadata; social shares show blank
- **Twitter card image:** MISSING — `twitter:image` not set
- **Favicon:** MISSING

**Recommendation:** Create a 1200×630px OG image branded with Ponos colors and add to public/. Configure in metadata.

---

## AI Search Readiness

### Crawler Access
- GPTBot, ClaudeBot, PerplexityBot: Can access `ponos.com.co` (no robots.txt to block them)
- However, all content is behind client-side JS rendering — AI crawlers mostly see blank HTML
- No `llms.txt` to guide LLM understanding of site purpose

### Citability Score: 20/100
- No statistics or research-backed claims
- No FAQ or Q&A structure
- No author attribution
- Success stories lack verifiable detail
- No "how to" content or step-by-step guides

### AI Visibility Improvements
1. Add static/SSR content fallbacks for main sections
2. Add FAQ section with structured Q&A
3. Add `llms.txt` to `/public/`
4. Add author/company About section with verifiable details

---

## Appendix: File-Level Issues

| File | Issue |
|---|---|
| `src/app/layout.tsx` | `lang="en"` hardcoded; no canonical; no OG image; no favicon config |
| `src/i18n/context.tsx` | `if (!mounted) return null` — SSR renders nothing |
| `src/components/MetadataUpdater.tsx` | Client-side meta manipulation doesn't help SSR crawlers |
| `src/components/Agendar.tsx` | Calendly script injected via `useEffect`, not `next/Script` |
| `public/` | Missing: robots.txt, sitemap.xml, favicon.ico, og-image.png |
| `next.config.mjs` | Empty — no security headers, no image domains, no rewrites |
