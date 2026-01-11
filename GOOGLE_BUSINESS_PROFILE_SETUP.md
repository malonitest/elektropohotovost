# Google Business Profile Setup Guide
**Maloni s.r.o. - Elektro pohotovost**  
**Date:** 2026-01-11

## Overview
This guide covers the manual setup tasks for optimizing your Google Business Profile (GBP) listing. The technical integration (schema markup, review widget) has been implemented in the code.

---

## ✅ Code Implementation (COMPLETED)

### What's Been Implemented:
1. **Schema.org sameAs property** - Added to LocalBusiness JSON-LD schema
   - Links website to Google Business Profile
   - Helps Google understand business identity
   - Located in: `src/lib/jsonld.ts`

2. **Google Reviews Widget** - Added to homepage and contact page
   - Displays call-to-action to view/write reviews
   - Links to GBP listing and review form
   - Component: `src/components/GoogleReviews.tsx`
   - Pages: `app/page.tsx`, `app/kontakt/page.tsx`

---

## 📋 Manual Tasks (ACTION REQUIRED)

### 1. Claim/Verify Google Business Profile ⚡ URGENT

**Steps:**
1. Go to: https://business.google.com/
2. Search for "Maloni s.r.o." 
3. If listing exists → Claim it
4. If no listing → Create new business profile
5. Verification options:
   - Postcard (5-14 days) - most common
   - Phone call (if available)
   - Email (if available)
   - Instant verification (if eligible via Search Console)

**Required Information:**
- Business name: **Maloni s.r.o.**
- Address: **U vodoteče 149, Vysoký Újezd, 26716**
- Phone: **774 621 763**
- Website: **https://www.elektropohotovost24.cz**
- Hours: **Open 24 hours** (select "Open 24/7")

---

### 2. Ensure NAP Consistency ✅ CRITICAL

**NAP (Name, Address, Phone) must be IDENTICAL across:**
- ✅ Website (already consistent)
- ⬜ Google Business Profile
- ⬜ All directory listings (Firmy.cz, Seznam, etc.)

**Exact Format to Use:**
```
Name: Maloni s.r.o.
Address: U vodoteče 149, Vysoký Újezd, 26716
Phone: 774 621 763
```

**Why This Matters:**
- Google uses NAP to verify business legitimacy
- Inconsistencies hurt local search rankings
- Even small differences (spacing, abbreviations) can cause issues

---

### 3. Configure GBP Categories & Attributes

**Primary Category:**
- **Electrician** (Elektrikář)

**Additional Categories:**
- Emergency Electrician Service
- Electrical Repair Service

**Service Areas:**
Add all service locations:
- Praha-západ
- Praha 5
- Praha 6
- Břevnov
- Dejvice
- Beroun
- Černošice
- Dobřichovice
- Hostivice
- Jesenice
- Králův Dvůr
- Mníšek pod Brdy
- Roztoky
- (add all locations from `/data/locations.ts`)

**Attributes:**
- ✅ Open 24 hours
- ✅ Emergency services
- ✅ Service calls
- ✅ Accepts credit cards
- ✅ Accepts cash

---

### 4. Upload Photos to GBP 📸 HIGH PRIORITY

**Photo Checklist (minimum 10-15 photos):**

**Business Photos (3-5):**
- [ ] Company van/vehicle with logo
- [ ] Team member(s) in uniform
- [ ] Office/workspace (if applicable)

**Work Photos (5-8):**
- [ ] Electrical panel/distribution board work
- [ ] Light fixture installation
- [ ] Circuit breaker repair
- [ ] Cable/wiring work
- [ ] Before/after photos of repairs

**Location Photos (2-3):**
- [ ] Service area map
- [ ] Working in recognizable local areas
- [ ] Van at customer location (with permission)

**Photo Requirements:**
- Format: JPG or PNG
- Resolution: At least 720px tall, 720px wide
- Quality: Sharp, well-lit, professional
- Size: Under 5MB per photo

**Tips:**
- Photos with faces get 42% more requests for directions
- Photos of your team build trust
- Update photos monthly for freshness
- Avoid stock photos - use real photos from your business

---

### 5. Optimize GBP Description

**Write a compelling 750-character description:**

```
Maloni s.r.o. poskytuje elektro pohotovost 24/7 v Praze-západ, Berouně a okolí. 
Specializujeme se na havarijní výjezdy při výpadcích elektřiny, zkratech, poruchách 
jističů a rozvaděčů. Naši kvalifikovaní elektrikáři jsou k dispozici nonstop včetně 
víkendů a svátků.

Nabízíme:
✅ Elektro pohotovost NONSTOP 24/7
✅ Diagnostika a opravy elektroinstalace
✅ Výměna jističů a proudových chráničů
✅ Opravy rozvaděčů
✅ Montáž svítidel
✅ Hodinový manžel (drobné práce)

Oblast působení: Praha-západ, západní Praha, Beroun a okolí (50 km radius).
Volejte 774 621 763 pro okamžitou pomoc.
```

---

### 6. Set Up Review Request System 🌟 CRITICAL

**Goal:** 20+ reviews with 4.5+ rating in 3 months

**Strategy:**

**A. After Service Completion:**
1. Send SMS or email with review link
2. Personalize: "Děkujeme za důvěru! Pomozte nám sloužit dalším zákazníkům - zanechte recenzi:"
3. Include direct review link (from your GBP dashboard)

**B. Review Request Timing:**
- Send within 24 hours of service completion
- Best time: 1-2 days after payment
- Don't wait too long - strike while satisfaction is high

**C. Incentives (Optional):**
- Offer 5-10% discount on next service
- Be careful: Google prohibits incentives for POSITIVE reviews
- Safe approach: "Zanechte nám recenzi a získejte 5% slevu na příští servis" (any review, not just positive)

**D. Review Link:**
Your direct review link will be:
```
https://g.page/r/[YOUR_GBP_ID]/review
```
(Find this in your GBP dashboard under "Get more reviews")

**E. Sample SMS Template:**
```
Děkujeme za důvěru v naše služby, [Jméno]! Pokud jste byli spokojeni, 
pomozte nám sloužit dalším zákazníkům - zanechte nám recenzi: 
[review-link]

S pozdravem,
Maloni s.r.o.
```

---

### 7. GBP Posts & Updates (Ongoing)

**Post Frequency:** 2-3 times per week

**Post Ideas:**
- Emergency tip of the week
- Seasonal electrical safety tips
- Special offers (weekend rates, etc.)
- Customer success stories (with permission)
- Behind-the-scenes photos
- Service area announcements

**Sample Post:**
```
⚡ ELEKTRO HAVÁRIE? Volejte 774 621 763
Jsme dostupní NONSTOP 24/7 v Praze-západ a Berouně.
Průměrná doba dojezdu: 35 minut.

#ElektroPohotovost #PrahaZápad #Beroun
```

---

### 8. Monitor & Respond to Reviews

**Response Guidelines:**

**For Positive Reviews (5-4 stars):**
```
Děkujeme za skvělé hodnocení, [Jméno]! Jsme rádi, že jste byli spokojeni 
s našimi službami. Pokud budete potřebovat cokoli dalšího, neváhejte 
se obrátit na 774 621 763.

S pozdravem,
Tým Maloni s.r.o.
```

**For Negative Reviews (3-1 stars):**
```
Děkujeme za zpětnou vazbu, [Jméno]. Je nám líto, že jste nebyli spokojeni. 
Rádi bychom situaci vyřešili - prosím kontaktujte nás na 774 621 763, 
abychom to napravili.

S pozdravem,
Tým Maloni s.r.o.
```

**Response Best Practices:**
- Respond within 24-48 hours
- Always be professional and courteous
- Personalize responses (use customer name)
- Thank positive reviewers
- Address concerns in negative reviews
- Take heated discussions offline (phone/email)

---

### 9. GBP Insights & Analytics

**Monitor Monthly (in GBP dashboard):**
- [ ] Total searches (how customers found you)
- [ ] Views (profile, search, maps)
- [ ] Actions (website clicks, calls, direction requests)
- [ ] Photos (total views, compared to similar businesses)
- [ ] Reviews (total, rating, response rate)

**Target Metrics (3 months):**
- Profile views: +100%
- Call actions: +50%
- Direction requests: +30%
- Reviews: 20+ with 4.5+ average

---

### 10. Integration with Google Search Console

**Steps:**
1. Verify website ownership in Google Search Console
2. Link GBP to Search Console in GBP settings
3. Monitor: "Local Pack" performance
4. Track: Impressions and clicks from local searches

**Already Completed:**
✅ Website has proper schema markup
✅ NAP is consistent on website
✅ Review widget installed on homepage and contact page

---

## 📊 Success Metrics

**Track These KPIs:**

| Metric | Baseline | 3-Month Target | 6-Month Target |
|--------|----------|----------------|----------------|
| GBP Profile Views | TBD | +100% | +200% |
| Call Clicks from GBP | TBD | +50% | +100% |
| Direction Requests | TBD | +30% | +60% |
| Total Reviews | 0 | 20+ | 40+ |
| Average Rating | N/A | 4.5+ | 4.6+ |
| Response Rate | N/A | 100% | 100% |
| Response Time | N/A | <24 hours | <12 hours |

---

## 🚨 Common Pitfalls to Avoid

1. **Inconsistent NAP** - Double-check everywhere
2. **No photos** - Businesses with photos get 42% more direction requests
3. **Ignoring reviews** - Always respond within 48 hours
4. **Keyword stuffing** - Write naturally in description
5. **Wrong category** - Use most specific category (Electrician)
6. **Incomplete profile** - Fill out ALL fields in GBP
7. **Inactive profile** - Post 2-3x per week minimum
8. **Not tracking metrics** - Monitor GBP Insights monthly

---

## 🔗 Useful Links

- **Google Business Profile:** https://business.google.com/
- **GBP Help Center:** https://support.google.com/business/
- **Review Link Generator:** In your GBP dashboard
- **GBP Mobile App:** iOS/Android for quick updates
- **Local Search Forum:** https://www.localu.org/

---

## ✅ Checklist Summary

**Week 1: Foundation**
- [ ] Claim/verify GBP listing
- [ ] Ensure NAP consistency
- [ ] Add service areas
- [ ] Set hours to 24/7
- [ ] Add categories and attributes

**Week 2: Content**
- [ ] Upload 10-15 photos
- [ ] Write optimized description
- [ ] Create first 3 GBP posts

**Week 3: Reviews**
- [ ] Set up review request system (SMS/email)
- [ ] Get first 5 reviews
- [ ] Respond to all reviews

**Ongoing:**
- [ ] Post to GBP 2-3x per week
- [ ] Request reviews after every service
- [ ] Respond to reviews within 24-48 hours
- [ ] Upload new photos monthly
- [ ] Monitor GBP Insights monthly

---

## 📞 Questions?

If you encounter any issues during setup, consult:
1. Google Business Profile Help Center
2. Local SEO guides (BrightLocal, Moz Local)
3. Your web developer for technical integration questions

**Technical integration is complete.** Focus on the manual tasks above to maximize your local SEO impact!

---

**Last Updated:** 2026-01-11  
**Next Review:** 2026-02-11 (1 month)
