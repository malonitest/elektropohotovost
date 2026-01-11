# SEO & AI Search Audit + Action Plan
**Elektro pohotovost – Maloni s.r.o.**  
**Goal:** Local SEO & AI search excellence for Czech electrical emergency services  
**Date:** 2026-01-11

---

## Executive Summary

### Current Strengths ✅
- ✅ Clean technical foundation (Next.js SSG, trailing slashes, proper redirects)
- ✅ Structured data (JSON-LD) for LocalBusiness, Service, FAQPage, BreadcrumbList
- ✅ Mobile-first responsive design with proper viewport
- ✅ Security headers (CSP, X-Frame-Options, referrer policy)
- ✅ llms.txt for AI search optimization
- ✅ 19 blog posts with proper frontmatter
- ✅ Dynamic location pages with local context
- ✅ Consent-gated analytics (Microsoft Clarity)

### Critical Gaps 🔴
- 🔴 **No Open Graph images** (critical for social + AI previews)
- 🔴 **Missing schema ImageObject** in structured data
- 🔴 **No Google Business Profile integration** (NAP inconsistency risk)
- 🔴 **Missing local business schema enhancements** (review aggregates, service areas)
- 🔴 **No robots meta tags** for indexing control
- 🔴 **Blog posts lack datePublished/dateModified in metadata**
- 🔴 **No internal linking strategy** (orphan pages risk)
- 🔴 **Missing performance optimization** (no next/image, no font optimization)

---

## 1. Technical SEO (Priority: CRITICAL)

### 1.1 Open Graph & Social Meta ⚡ URGENT
**Impact:** High – affects social shares, AI previews, link previews  
**Effort:** Medium (2-3 hours)

**Current State:**
- Only basic OG tags (title, description, type, url)
- No `og:image`, `twitter:card`, `twitter:image`

**Actions:**
```typescript
// Create OG image generator or static images
1. Generate 1200×630 OG images for:
   - Homepage
   - Each location (using location name overlay)
   - Blog posts (auto-generated or template)
   - Service pages

2. Add to all page metadata:
   openGraph: {
     images: [{
       url: absoluteUrl('/og-images/default.jpg'),
       width: 1200,
       height: 630,
       alt: 'Elektro pohotovost 24/7'
     }]
   },
   twitter: {
     card: 'summary_large_image',
     title: '...',
     description: '...',
     images: [absoluteUrl('/og-images/default.jpg')]
   }
```

**Implementation:**
- [ ] Create `/public/og-images/` directory
- [ ] Generate default OG image (1200×630)
- [ ] Add OG/Twitter meta to `app/layout.tsx` metadata
- [ ] Add per-page OG images to dynamic routes
- [ ] Test with https://www.opengraph.xyz/

---

### 1.2 Enhanced Schema.org Structured Data ⚡ URGENT
**Impact:** High – Google rich snippets, AI understanding  
**Effort:** Medium (3-4 hours)

**Current Gaps:**
- LocalBusiness missing: `image`, `priceRange`, `aggregateRating`, `geo`, `hasMap`
- Service missing: `image`, `offers`
- BlogPosting missing: `image`, `wordCount`, `keywords`

**Actions:**
```typescript
// src/lib/jsonld.ts enhancements

1. Add to buildLocalBusiness():
   {
     "@type": "LocalBusiness",
     "image": [
       absoluteUrl("/og-images/business.jpg"),
       absoluteUrl("/og-images/van.jpg")  // if available
     ],
     "priceRange": "500 Kč - 5000 Kč",
     "geo": {
       "@type": "GeoCoordinates",
       "latitude": "50.0755",  // Calculate from businessAddress
       "longitude": "14.4378"
     },
     "areaServed": {
       "@type": "GeoCircle",
       "geoMidpoint": { ... },
       "geoRadius": "50000"  // 50km radius
     },
     "hasMap": googleBusinessProfileUrl,
     "paymentAccepted": "Cash, Card",
     "currenciesAccepted": "CZK"
   }

2. Add AggregateRating (if you have reviews):
   "aggregateRating": {
     "@type": "AggregateRating",
     "ratingValue": "4.8",
     "reviewCount": "42"
   }

3. Enhance Service schema:
   {
     "@type": "Service",
     "image": absoluteUrl("/og-images/service.jpg"),
     "offers": {
       "@type": "Offer",
       "priceCurrency": "CZK",
       "price": "800",
       "priceSpecification": {
         "@type": "UnitPriceSpecification",
         "price": "800",
         "priceCurrency": "CZK",
         "referenceQuantity": {
           "@type": "QuantitativeValue",
           "value": "1",
           "unitText": "hour"
         }
       }
     },
     "serviceType": "Emergency Electrical Repair",
     "availableChannel": {
       "@type": "ServiceChannel",
       "servicePhone": {
         "@type": "ContactPoint",
         "telephone": "+420774621763",
         "availableLanguage": "cs"
       }
     }
   }

4. Blog schema enhancements:
   - Add "image" with 1200×630 featured image
   - Add "wordCount" calculated from content
   - Add "keywords" array from frontmatter
   - Add "articleSection" from categoryName
```

**Implementation:**
- [ ] Update `buildLocalBusiness()` with geo, image, priceRange
- [ ] Update `buildService()` with offers
- [ ] Update `buildBlogPosting()` with image, wordCount, keywords
- [ ] Add Organization schema with logo
- [ ] Test with Google Rich Results Test

---

### 1.3 Robots Meta & Indexing Control
**Impact:** Medium – prevents indexing of unwanted pages  
**Effort:** Low (1 hour)

**Actions:**
```typescript
// Add to pages that shouldn't be indexed:

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    nocache: true  // for dynamic pages
  }
}

// Add to main pages:
export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}
```

**Implementation:**
- [ ] Add robots metadata to all page.tsx files
- [ ] NoIndex: `/legal/`, test pages (if any)
- [ ] Index: all location pages, blog, services, FAQ
- [ ] Add X-Robots-Tag header to staticwebapp.config.json for `/legal/`

---

### 1.4 Performance Optimization
**Impact:** High – Core Web Vitals, SEO ranking factor  
**Effort:** Medium (2-3 hours)

**Current Issues:**
- Not using `next/image` (unoptimized images)
- No font optimization
- Potential CLS from mobile menu

**Actions:**
```typescript
1. Add next.config.ts optimization:
   const nextConfig: NextConfig = {
     output: "export",
     trailingSlash: true,
     images: { 
       unoptimized: true,  // Keep for static export
       formats: ['image/webp']
     },
     experimental: {
       optimizeCss: true
     }
   }

2. Add font optimization to app/layout.tsx:
   import { Inter } from 'next/font/google'
   
   const inter = Inter({ 
     subsets: ['latin', 'latin-ext'],
     display: 'swap',
     variable: '--font-inter'
   })

3. Optimize images:
   - Convert PNG to WebP
   - Add width/height to all <img> tags
   - Use loading="lazy" for below-fold images
   - Add blur placeholders for hero images

4. Add resource hints:
   <link rel="preconnect" href="https://www.clarity.ms" />
   <link rel="dns-prefetch" href="https://www.google.com" />
```

**Implementation:**
- [ ] Install @next/font or use next/font
- [ ] Add font optimization
- [ ] Convert images to WebP
- [ ] Add explicit width/height to images
- [ ] Test with PageSpeed Insights
- [ ] Target: LCP < 2.5s, CLS < 0.1, FID < 100ms

---

## 2. Local SEO (Priority: HIGH)

### 2.1 Google Business Profile Integration ⚡ URGENT
**Impact:** Critical – local pack, map rankings  
**Effort:** Low (30 min code + manual GBP setup)

**Current State:**
- `googleBusinessProfileUrl` exists in site.ts but not fully utilized
- No GBP verification visible

**Actions:**
```typescript
1. Verify/claim Google Business Profile for Maloni s.r.o.
   - Ensure NAP (Name, Address, Phone) matches site exactly
   - Category: "Electrician", "Emergency Electrician"
   - Service areas: Praha-západ, Beroun, etc.
   - Hours: 24/7
   - Upload photos (van, team, work examples)

2. Add GBP data to schema:
   "sameAs": [
     googleBusinessProfileUrl,
     "https://www.facebook.com/...",  // if exists
     "https://www.linkedin.com/..."   // if exists
   ]

3. Add GBP review widget to homepage/kontakt
   - Use Google Reviews API or embed
   - Show 4-5 latest reviews

4. Request reviews after service completion
   - Send SMS/email with GBP review link
   - Incentivize with small discount on next service
```

**Implementation:**
- [ ] Claim/verify GBP listing
- [ ] Ensure NAP consistency across web + GBP
- [ ] Add service areas to GBP
- [ ] Upload 10-15 photos to GBP
- [ ] Set up review request system
- [ ] Target: 20+ reviews with 4.5+ rating in 3 months

---

### 2.2 Local Citations & Directory Listings
**Impact:** Medium-High – local authority, backlinks  
**Effort:** High (4-6 hours for initial setup)

**Actions:**
```
1. Create consistent NAP listings on:
   ✅ Priority (CZ):
   - Firmy.cz
   - Seznam Firmy
   - Zlate-stranky.cz
   - Najisto.cz
   - Yelp CZ
   - Facebook Business
   
   ✅ Secondary:
   - Bing Places
   - Apple Maps
   - Waze
   - Foursquare

2. Ensure exact NAP match:
   Maloni s.r.o.
   U vodoteče 149
   Vysoký Újezd, 26716
   774 621 763
   (Note: ensure consistent formatting everywhere)

3. Add business to local directories:
   - Praha-západ business directories
   - Beroun business directories
   - Czech electrician directories
```

**Implementation:**
- [ ] Create spreadsheet to track NAP across all listings
- [ ] Submit to top 10 Czech directories
- [ ] Monitor citations with BrightLocal or Moz Local
- [ ] Fix any NAP inconsistencies found

---

### 2.3 Location Page Optimization
**Impact:** High – rank for "elektro pohotovost [location]"  
**Effort:** Medium (2-3 hours)

**Current Strengths:**
- Unique content per location
- Local FAQ, pricing, nearby areas

**Enhancements:**
```typescript
1. Add unique local schema per location:
   - ServiceArea with specific GPS coordinates
   - Local landmarks in description
   - Distance/time from major nearby cities

2. Add location-specific keywords:
   - "elektrikář [location]"
   - "pohotovost elektro [location]"
   - "elektro havárie [location]"
   - "[location] elektro nonstop"

3. Embed Google Map with location marker
   - Already done ✅ (using iframe)
   - Add schema for Place

4. Add local trust signals:
   - "Působíme v [location] od roku XXXX"
   - "[X] spokojených zákazníků v [location]"
   - Photos of actual work in location (if available)

5. Internal linking:
   - Link to nearby locations: ✅ (already implemented)
   - Link to relevant blog posts for location context
   - Link to service pages
```

**Implementation:**
- [ ] Add year established (if applicable)
- [ ] Add customer count estimate per major location
- [ ] Create location-specific blog posts (e.g., "Nejčastější elektro poruchy v Praze-západ")
- [ ] Add Place schema to each location page

---

### 2.4 Local Content Marketing
**Impact:** Medium – authority, backlinks  
**Effort:** High (ongoing)

**Actions:**
```
1. Create location-specific blog content:
   - "Top 5 electrical issues in [location]"
   - "Power outage history in [area] and what to do"
   - "Electrical code changes affecting [region]"

2. Local event participation:
   - Sponsor local events in Praha-západ/Beroun
   - Write blog posts about safety at local events
   - Get backlinks from event sites

3. Partner with local businesses:
   - Property managers
   - Real estate agents
   - Construction companies
   - Get listed as preferred electrician

4. Local PR:
   - Submit to local news sites for safety tips
   - Offer free electrical safety inspections for community centers
   - Get featured in local business spotlights
```

**Implementation:**
- [ ] Create 3-6 location-specific blog posts
- [ ] Reach out to 10 local businesses for partnerships
- [ ] Submit 2 press releases to local news
- [ ] Target: 5-10 local backlinks in 6 months

---

## 3. AI Search Optimization (Priority: HIGH)

### 3.1 Enhanced llms.txt ⚡
**Impact:** High – AI chatbot discovery & understanding  
**Effort:** Low (1 hour)

**Current State:** Good foundation, needs enhancement

**Actions:**
```
# llms.txt improvements

1. Add structured FAQ section:
## Frequently Asked Questions
Q: What areas do you serve?
A: Praha-západ, západní Praha, Beroun a okolí (50km radius)

Q: What are your rates?
A: Starting from 800 Kč for emergency callout + diagnostic. Hourly rate 800-1500 Kč depending on complexity and time of day.

Q: Do you work 24/7?
A: Yes, we provide nonstop emergency electrical services 24/7/365.

2. Add service descriptions:
## Services Offered
### Elektro pohotovost (Emergency)
- Power outages and blackouts
- Circuit breaker problems
- Electrical short circuits
- Distribution board failures
- Emergency repairs

### Hodinový manžel (Scheduled)
- Furniture assembly
- Light fixture installation
- Minor home repairs
- Planned electrical work

3. Add contact preference:
## Contact
Preferred: Phone call to 774 621 763
Alternative: SMS to 774 621 763
Website: https://www.elektropohotovost24.cz/kontakt/
Response time: Immediate for emergencies, within 2 hours for scheduled work

4. Add pricing transparency:
## Pricing Structure
- Emergency callout: 800 Kč (includes first 30min diagnostic)
- Hourly rate: 800-1500 Kč
- Weekend surcharge: +20%
- Night surcharge (22:00-6:00): +30%
- Parts: Cost + 15% markup
```

**Implementation:**
- [ ] Enhance llms.txt with FAQ section
- [ ] Add detailed service descriptions
- [ ] Add pricing structure
- [ ] Test by asking ChatGPT/Claude about your business
- [ ] Regenerate in `scripts/generate-sitemap.ts`

---

### 3.2 Structured Data for AI Understanding
**Impact:** High – helps AI extract key info  
**Effort:** Medium (2 hours)

**Actions:**
```typescript
1. Add HowTo schema for common repairs:
   {
     "@type": "HowTo",
     "name": "Co dělat při výpadku proudu",
     "step": [
       {
         "@type": "HowToStep",
         "name": "Zkontrolujte jistič",
         "text": "Podívejte se do rozvaděče..."
       },
       ...
     ]
   }

2. Add VideoObject for tutorials (if you create videos):
   {
     "@type": "VideoObject",
     "name": "Jak bezpečně nahodit jistič",
     "description": "...",
     "thumbnailUrl": "...",
     "uploadDate": "...",
     "duration": "PT3M",
     "contentUrl": "https://youtube.com/..."
   }

3. Enhance FAQ schema with categories:
   - Group by Emergency vs Scheduled
   - Add "about" property to each question
```

**Implementation:**
- [ ] Add HowTo schema to relevant blog posts
- [ ] If creating videos, add VideoObject schema
- [ ] Categorize FAQ items in schema
- [ ] Test with Google's Rich Results Test

---

### 3.3 Content Optimization for AI Citations
**Impact:** Medium-High – get cited by ChatGPT/Perplexity  
**Effort:** Medium (ongoing)

**Current Strengths:**
- Clear, factual content
- Safety warnings (good for AI to cite responsibly)
- Specific pricing guidance

**Enhancements:**
```markdown
1. Add "Quick Answer" sections to blog posts:
   > **Quick Answer:** If your circuit breaker keeps tripping immediately after reset, do NOT keep trying. This indicates a serious short circuit or ground fault. Turn off the main breaker and call an emergency electrician.

2. Add "Expert Insight" quotes:
   > "In my 10 years as an electrician in Praha-západ, 80% of power outages are caused by overloaded circuits or faulty appliances. Always check which circuit failed before calling." - [Your Name], Certified Electrician

3. Add statistics and data:
   - "According to Czech electrical safety standards..."
   - "In 2024, we responded to 400+ emergency calls..."
   - "70% of our customers in Beroun experience..."

4. Cite sources:
   - Link to Czech electrical codes
   - Link to distributor guidelines (PRE, ČEZ, EG.D)
   - Link to safety standards

5. Add comparison tables:
   | Symptom | DIY Safe? | Call Electrician? |
   |---------|-----------|-------------------|
   | Breaker trips once | ✅ Try reset | If repeats: ✅ |
   | Burning smell | ❌ | ✅ Immediately |
```

**Implementation:**
- [ ] Add "Quick Answer" to top 10 blog posts
- [ ] Add expert quotes (with attribution)
- [ ] Add 5-10 comparison tables
- [ ] Cite official Czech electrical standards
- [ ] Test: ask AI "what to do when power goes out in Prague" - see if you're cited

---

## 4. Content SEO (Priority: MEDIUM-HIGH)

### 4.1 Blog Post Optimization
**Impact:** Medium – organic traffic growth  
**Effort:** Medium (3-4 hours)

**Current State:**
- 19 blog posts with good frontmatter
- Missing: images, internal links, CTAs

**Actions:**
```typescript
1. Add featured images to all blog posts:
   - Create 1200×630 images with overlay text
   - Add to frontmatter: featuredImage: "/blog/images/..."
   - Use in BlogPosting schema

2. Add internal links:
   - Each blog post should link to 2-3 relevant posts
   - Link to relevant service pages
   - Link to location pages when mentioning areas

3. Add CTAs:
   - End each post with relevant CTA:
     "Potřebujete pomoc s [problem]? Volejte 774 621 763"
   - Link to /kontakt/ or relevant service page

4. Optimize meta descriptions:
   - Currently only in frontmatter
   - Ensure 140-160 characters
   - Include target keyword + call to action

5. Add FAQ schema to blog posts:
   - Extract Q&A from frontmatter.faq
   - Already done in some posts ✅
   - Extend to all posts with FAQ

6. Add table of contents for long posts:
   - Auto-generate from h2/h3 headings
   - Helps with featured snippets
   - Improves UX
```

**Implementation:**
- [ ] Create featured image template
- [ ] Generate 19 blog post images
- [ ] Add internal links to all blog posts
- [ ] Add CTA component to blog layout
- [ ] Optimize all meta descriptions
- [ ] Add table of contents component

---

### 4.2 Keyword Research & Targeting
**Impact:** High – rank for high-intent keywords  
**Effort:** Medium (2-3 hours research + ongoing)

**Target Keywords (Czech):**

**High Priority (Emergency Services):**
- `elektro pohotovost praha západ` (high intent, local)
- `elektrikář nonstop praha` (high intent)
- `výpadek proudu co dělat` (informational → conversion)
- `oprava elektro praha` (commercial intent)
- `elektrikář beroun nonstop` (local)
- `elektrická havárie` (emergency)
- `vyhodil jistič` (problem-aware)

**Medium Priority (Service-specific):**
- `montáž svítidla praha` (scheduled work)
- `výměna zásuvky cena` (price research)
- `hodinový manžel praha západ` (alternative service)
- `elektro revize` (compliance)

**Long-tail (Blog targets):**
- `proč vypadává proudový chránič` (educational)
- `co dělat když nejde elektřina v bytě` (problem-solving)
- `kolik stojí výjezd elektrikáře` (price research)

**Actions:**
```
1. Create keyword map:
   - Map each page to 1 primary + 2-3 secondary keywords
   - Avoid keyword cannibalization

2. Optimize existing pages:
   - Include primary keyword in: title, H1, first paragraph, URL
   - Include secondary keywords naturally throughout
   - Add keyword variations (elektrikář/electrician, pohotovost/emergency)

3. Create new content for gaps:
   - "Elektro revize" - create dedicated page
   - "Výměna elektroměru" - create blog post
   - "Elektro havárie co je hrazeno pojišťovnou" - blog post

4. Monitor rankings:
   - Use Google Search Console
   - Track top 20 keywords monthly
   - Identify quick wins (position 11-20)
```

**Implementation:**
- [ ] Create keyword research spreadsheet
- [ ] Map keywords to existing pages
- [ ] Identify content gaps
- [ ] Create 5 new blog posts for gap keywords
- [ ] Set up rank tracking in GSC

---

### 4.3 Content Freshness & Updates
**Impact:** Medium – ranking stability  
**Effort:** Low (ongoing 30min/week)

**Actions:**
```
1. Update blog post dates:
   - Add "updatedAt" to all frontmatter ✅ (already present)
   - Show "Aktualizováno: XX.XX.XXXX" on blog posts
   - Refresh content quarterly

2. Add "Last updated" to location pages:
   - Show when pricing/info was last verified
   - Update quarterly or when pricing changes

3. Seasonal content updates:
   - Update before winter: "Elektro poruchy v zimě"
   - Update before summer: "Přetížení klimatizací"
   - Update before holidays: "Elektro pohotovost o svátcích"

4. News/trend content:
   - Watch for electrical safety alerts
   - Create blog posts about local power issues
   - Comment on electrical code changes
```

**Implementation:**
- [ ] Add "Last updated" display to blog layout
- [ ] Schedule quarterly content review
- [ ] Create seasonal content calendar
- [ ] Set up Google Alerts for "elektro praha" news

---

## 5. Link Building (Priority: MEDIUM)

### 5.1 Local Link Building
**Impact:** High – local authority  
**Effort:** High (ongoing)

**Strategies:**
```
1. Local partnerships:
   - Partner with property management companies
   - Get listed on real estate agent resources
   - Partner with construction companies
   - Offer exclusive discounts for partners' clients

2. Local sponsorships:
   - Sponsor local sports teams
   - Sponsor community events in Praha-západ/Beroun
   - Sponsor electrical safety workshops
   - Get backlinks from event/team websites

3. Local media:
   - Write guest posts for local news sites
   - Offer electrical safety tips for local blogs
   - Get featured in local business spotlights
   - Pitch stories: "Local electrician helps family in emergency"

4. Resource pages:
   - Get listed on Prague service directories
   - Get listed on emergency contact pages
   - Get listed on "trusted trades" lists

5. Local testimonials & case studies:
   - Ask satisfied customers for testimonials
   - Create case studies with customer permission
   - Get backlinks from customer websites (if businesses)
```

**Implementation:**
- [ ] Create partnership proposal template
- [ ] Reach out to 20 local businesses
- [ ] Identify 5 sponsorship opportunities
- [ ] Submit to 10 local resource pages
- [ ] Target: 10 local backlinks in 6 months

---

### 5.2 Digital PR & Content Marketing
**Impact:** Medium – brand awareness  
**Effort:** High (ongoing)

**Strategies:**
```
1. Create link-worthy content:
   - "Ultimate Guide to Home Electrical Safety in Czech Homes"
   - "Electrical Emergency Checklist [Downloadable PDF]"
   - Interactive tool: "Calculate if your circuit is overloaded"
   - Infographic: "What to do in electrical emergency"

2. Guest posting:
   - Write for DIY Czech blogs
   - Write for home improvement sites
   - Write for property management blogs
   - Include natural link to your site

3. HARO/journalist requests:
   - Sign up for Czech journalist request services
   - Respond to electrical safety queries
   - Get quoted in articles → backlink

4. Create shareable resources:
   - Electrical safety checklist
   - Seasonal maintenance guide
   - Emergency contact card (downloadable)
   - Share on social → encourage backlinks
```

**Implementation:**
- [ ] Create 2-3 link-worthy assets
- [ ] Pitch guest posts to 10 blogs
- [ ] Sign up for journalist request services
- [ ] Promote resources on social media
- [ ] Target: 5 quality backlinks in 6 months

---

## 6. User Experience & Conversion (Priority: MEDIUM)

### 6.1 Mobile UX Optimization
**Impact:** High – 70%+ traffic is mobile  
**Effort:** Low-Medium (1-2 hours)

**Current State:**
- Mobile menu implemented ✅
- Responsive design ✅
- Click-to-call buttons ✅

**Enhancements:**
```
1. Sticky mobile CTA bar:
   - Already implemented ✅
   - Ensure visible on all pages
   - A/B test button text: "Volejte" vs "Zavolat nyní"

2. Thumb-friendly tap targets:
   - Ensure all buttons > 44px height
   - Add padding around links
   - Test on actual devices

3. Reduce mobile friction:
   - Pre-fill phone number in forms
   - One-tap SMS sending
   - WhatsApp contact option (if available)

4. Mobile-first content:
   - Keep paragraphs short (2-3 sentences max)
   - Use bullet points extensively
   - Add more visual breaks
```

**Implementation:**
- [ ] Audit tap target sizes
- [ ] Test on iPhone and Android
- [ ] Add WhatsApp button if you use it
- [ ] Reformat content for mobile scanning

---

### 6.2 Conversion Rate Optimization
**Impact:** High – more calls from same traffic  
**Effort:** Medium (2-3 hours)

**Actions:**
```
1. A/B test CTAs:
   - Current: "Volejte: 774 621 763"
   - Test: "Zavolejte IHNED" (urgency)
   - Test: "Volejte - NEPŘETRŽITĚ 24/7"
   - Test: "Elektrická havárie? Volejte!"

2. Add trust signals:
   - "400+ spokojených zákazníků v roce 2024"
   - "Průměrná doba dojezdu: 35 minut"
   - "100% zákazníků by nás doporučilo"
   - Add customer testimonials (with photos if possible)

3. Reduce decision fatigue:
   - Simplify service descriptions
   - Use icons for quick scanning
   - Add "Kdy volat" vs "Kdy ne volat" sections

4. Add urgency (without being spammy):
   - "Momentálně dostupní" indicator
   - "Poslední výjezd: před 2 hodinami v [location]"
   - "Dnes už 7 zákazníků pomohlo"

5. Add social proof:
   - Google Reviews widget
   - Firmy.cz reviews widget
   - Real customer photos (with consent)
   - Before/after photos of work
```

**Implementation:**
- [ ] Set up A/B testing with Clarity or similar
- [ ] Collect testimonials from last 20 customers
- [ ] Add trust badges to homepage + contact
- [ ] Request permission to use customer photos
- [ ] Target: 20% increase in call rate

---

### 6.3 Analytics & Tracking
**Impact:** Medium – data-driven decisions  
**Effort:** Low (already implemented ✅)

**Current State:**
- Microsoft Clarity installed ✅
- Call click tracking implemented ✅
- Consent banner implemented ✅

**Enhancements:**
```
1. Set up Google Search Console:
   - Verify domain
   - Submit sitemap
   - Monitor: impressions, clicks, CTR, position
   - Fix any crawl errors

2. Set up Google Analytics 4 (optional):
   - Track page views
   - Track scroll depth
   - Track form submissions (if you add forms)
   - Set up conversions for tel: clicks

3. Enhanced Clarity events:
   - Already tracking tel_click ✅
   - Add tracking for:
     * SMS button clicks
     * Form submissions
     * Location page views
     * Blog scroll depth
     * CTA button clicks

4. Monthly reporting:
   - Track: organic traffic, call clicks, top pages
   - Track keyword rankings
   - Track backlink growth
   - Adjust strategy based on data
```

**Implementation:**
- [ ] Verify site in Google Search Console
- [ ] Submit sitemap to GSC
- [ ] Consider adding GA4 (optional)
- [ ] Set up monthly analytics review
- [ ] Create dashboard for key metrics

---

## 7. Priority Implementation Roadmap

### Week 1-2: Critical Fixes (20 hours)
**Goal:** Fix technical SEO blockers

- [ ] 1.1 Add Open Graph images (default + homepage) - 4h
- [ ] 1.2 Enhance LocalBusiness schema (geo, image, priceRange) - 3h
- [ ] 1.3 Add robots meta to all pages - 1h
- [ ] 1.4 Add font optimization - 2h
- [ ] 2.1 Verify Google Business Profile - 1h
- [ ] 3.1 Enhance llms.txt - 1h
- [ ] 6.3 Set up Google Search Console - 1h
- [ ] Test all changes - 2h

**Deliverable:** Technical SEO score 90/100

---

### Week 3-4: Local SEO Foundation (15 hours)
**Goal:** Establish local authority

- [ ] 2.1 Complete GBP optimization (photos, posts) - 2h
- [ ] 2.2 Submit to top 10 Czech directories - 4h
- [ ] 2.3 Add location-specific schema enhancements - 3h
- [ ] 4.1 Add featured images to blog posts - 3h
- [ ] 4.1 Add internal links to all blog posts - 2h
- [ ] 5.1 Create partnership proposal - 1h

**Deliverable:** Listed in 10 directories, GBP fully optimized

---

### Month 2: Content & Optimization (20 hours)
**Goal:** Improve content quality and rankings

- [ ] 1.1 Generate OG images for all location pages - 6h
- [ ] 1.2 Add Service & BlogPosting schema enhancements - 4h
- [ ] 4.1 Add CTAs and optimize meta descriptions - 3h
- [ ] 4.2 Conduct keyword research and mapping - 3h
- [ ] 4.3 Update top 10 blog posts with fresh content - 4h

**Deliverable:** All pages have OG images, top 20 keywords mapped

---

### Month 3: Link Building & Authority (15 hours)
**Goal:** Build local authority and backlinks

- [ ] 5.1 Reach out to 20 local businesses for partnerships - 4h
- [ ] 5.1 Secure 2-3 local sponsorships - 3h
- [ ] 5.2 Create 2 link-worthy assets - 4h
- [ ] 5.2 Write 3 guest posts - 4h

**Deliverable:** 5-10 quality local backlinks

---

### Month 4-6: Advanced Optimization (Ongoing)
**Goal:** Continuous improvement and ranking growth

- [ ] 1.4 Full performance audit and optimization - 8h
- [ ] 2.3 Create 5 location-specific blog posts - 10h
- [ ] 3.2 Add HowTo schema to tutorials - 3h
- [ ] 3.3 Add expert quotes and statistics - 4h
- [ ] 4.2 Create content for gap keywords - 10h
- [ ] 6.2 A/B testing and CRO - 5h

**Deliverable:** 50% increase in organic traffic, 20% increase in calls

---

## 8. Success Metrics (6-Month Targets)

### SEO Metrics
- [ ] Organic traffic: +100% (from baseline)
- [ ] Top 3 ranking for "elektro pohotovost praha západ"
- [ ] Top 10 ranking for 15 target keywords
- [ ] Google Search impressions: +200%
- [ ] Average CTR: >5%

### Local SEO Metrics
- [ ] Google Business Profile views: +150%
- [ ] GBP calls: +100%
- [ ] Local citations: 20+ directories
- [ ] Consistent NAP: 100%
- [ ] Google Reviews: 20+ with 4.5+ avg

### AI Search Metrics
- [ ] Featured in ChatGPT/Claude responses for "elektrikář praha" queries
- [ ] llms.txt accessed 100+ times (check server logs)
- [ ] Cited in 3+ AI-generated answer contexts

### Backlink Metrics
- [ ] Total backlinks: +20 quality links
- [ ] Local backlinks: 10+
- [ ] Domain Authority: +5 points (if tracking)

### Conversion Metrics
- [ ] Click-to-call rate: +30%
- [ ] Bounce rate: <60%
- [ ] Avg session duration: >1:30
- [ ] Pages per session: >2.0

### Technical Metrics
- [ ] PageSpeed Score: >85 (mobile & desktop)
- [ ] Core Web Vitals: All "Good"
- [ ] Schema validation: 100% pass rate
- [ ] Crawl errors: 0

---

## 9. Tools & Resources

### Required Tools
- ✅ Google Search Console (free) - Set up ASAP
- ✅ Google Business Profile (free) - Verify ASAP
- ✅ Microsoft Clarity (free) - Already installed ✅
- 📊 Google Analytics 4 (free) - Optional
- 🔍 Ahrefs or SEMrush ($99-$199/mo) - Keyword research & backlinks
- 📍 BrightLocal or Whitespark ($29-$49/mo) - Local citations
- 🖼️ Canva Pro ($13/mo) - OG image creation
- 📊 Looker Studio (free) - Reporting dashboard

### Czech-Specific Resources
- Firmy.cz - Business directory
- Seznam.cz - Czech search engine (submit site)
- Zlate-stranky.cz - Yellow pages
- Najisto.cz - Local services directory
- Golemio.cz - Prague open data (for local insights)

### AI Search Tools
- ChatGPT/Claude - Test llms.txt effectiveness
- Perplexity.ai - Test citation appearance
- Google Gemini - Test knowledge graph appearance

---

## 10. Maintenance Schedule

### Daily (5 minutes)
- Check Google Business Profile for questions/reviews
- Monitor Clarity for broken clicks or errors

### Weekly (30 minutes)
- Review Google Search Console for new issues
- Check for new reviews → respond within 24h
- Monitor call volume trends

### Monthly (2 hours)
- Generate SEO report (traffic, rankings, conversions)
- Update 1-2 blog posts with fresh content
- Check for new local backlink opportunities
- Review and respond to all reviews

### Quarterly (4 hours)
- Full content audit and refresh
- Update pricing/service info if changed
- Review and adjust keyword strategy
- Competitor analysis
- Create new seasonal content

---

## Next Actions (Start Immediately)

### This Week:
1. ✅ Create default OG image (1200×630)
2. ✅ Set up Google Search Console
3. ✅ Verify Google Business Profile
4. ✅ Add basic geo coordinates to schema
5. ✅ Enhance llms.txt with FAQ

### This Month:
1. ✅ Generate OG images for all pages
2. ✅ Submit to top 10 Czech directories
3. ✅ Add featured images to blog posts
4. ✅ Set up monthly reporting dashboard

### Critical Path to Success:
**Technical SEO** → **Local SEO** → **Content** → **Links** → **Conversions**

Each phase builds on the previous. Don't skip the foundation (technical + local) to jump to links.

---

## Conclusion

This is a comprehensive 6-month plan to achieve **local SEO excellence** and **AI search optimization** for Elektro pohotovost.

**Key Success Factors:**
1. **Consistency** - NAP must be identical everywhere
2. **Quality** - Better to have 10 great backlinks than 100 spammy ones
3. **User Focus** - SEO serves users first, search engines second
4. **Data-Driven** - Track everything, adjust based on results
5. **Patience** - Local SEO takes 3-6 months to show full results

**Expected Outcomes (6 months):**
- 2x organic traffic
- 3x local pack visibility
- Top 3 for "elektro pohotovost praha západ"
- 20+ quality local backlinks
- Featured in AI search results
- 30% increase in phone calls

**Total Estimated Effort:** 70-80 hours over 6 months  
**ROI:** High - Each new customer from organic search = 100% profit margin vs paid ads

---

**Questions or need clarification on any section?**
