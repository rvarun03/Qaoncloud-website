# QAonCloud Website Technical Documentation

**Project:** `company-website`  
**Framework:** Next.js App Router (`src/app`)  
**Audit Date:** May 4, 2026  
**Repository Root:** `/home/varun/Desktop/Projects/QAonCloud/company-website`

<div style="page-break-after: always;"></div>

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Runtime Model](#2-tech-stack--runtime-model)
3. [Repository Structure](#3-repository-structure)
4. [Setup & Installation](#4-setup--installation)
5. [App Router Deep Dive](#5-app-router-deep-dive)
6. [Route-by-Route Documentation](#6-route-by-route-documentation)
7. [API Route Documentation](#7-api-route-documentation)
8. [Components Architecture](#8-components-architecture)
9. [Data Flow & State Management](#9-data-flow--state-management)
10. [File-by-File Explanation (Important Files)](#10-file-by-file-explanation-important-files)
11. [Common Errors & Debugging Guide](#11-common-errors--debugging-guide)
12. [Performance & Best Practices](#12-performance--best-practices)
13. [Deployment Guide](#13-deployment-guide)
14. [Appendix: Style/Asset Files and Notes](#14-appendix-styleasset-files-and-notes)

---

## 1. Project Overview

This project is the QAonCloud marketing website and service funnel. It is a content-driven site with route-specific landing pages for industries and service offerings, plus form-based lead capture and hiring workflows.

### What the application does

- Renders SEO-oriented pages for core routes (`/`, `/How-we-work`, `/services`, industry pages, legal pages).
- Collects business inquiries and career applications.
- Verifies reCAPTCHA tokens server-side.
- Uploads user documents to Cloudinary.
- Sends email notifications through EmailJS (client-side) and optionally through server APIs (`/api/contact`, `/api/career`).

### Key business features implemented

- Industry landing pages: FinTech, HealthTech, SaaS.
- CTA-driven conversion flow to `/Contact-us`.
- Career form with file upload and anti-bot verification.
- Shared branding components (hero/header/banner/testimonials/FAQ blocks).
- Metadata and canonical URLs for major routes.

---

## 2. Tech Stack & Runtime Model

### Framework and libraries

- Next.js `16.1.1`
- React `19.2.3`
- TypeScript `^5`
- CSS Modules + global CSS (no Tailwind)
- `next/font/google` for Raleway/Poppins/Inter
- `swiper` for testimonial carousel
- `react-icons` and `lucide-react` for iconography
- `react-google-recaptcha` for CAPTCHA widget
- `@emailjs/browser` for client-side email sending
- `cloudinary` for document uploads
- `resend` and `nodemailer` in API handlers

### Rendering model

- **Server Components by default** in `src/app` routes.
- **Client Components** explicitly marked with `'use client'` for interactivity.
- Navbar is loaded via `dynamic(..., { ssr: false })` in `ClientLayout` to avoid hydration mismatch.

---

## 3. Repository Structure

```text
company-website/
  src/
    app/                    # App Router pages, root layout, API route handlers
    components/             # Feature and shared UI components
    styles/                 # global tokens/typography
    assets/                 # imported local logo assets
  public/                   # static images, icons, robots, sitemap
  scripts/                  # utility script for metadata updates
  package.json              # scripts + deps
  next.config.ts            # Next config (minimal)
  tsconfig.json             # TS config + @/* alias
  eslint.config.mjs         # ESLint flat config
  .env.local                # runtime secrets (local)
```

---

## 4. Setup & Installation

### Prerequisites

- Node.js `20+` recommended for Next.js 16.
- npm (project ships with `package-lock.json`).

### Install

```bash
npm install
```

### Required environment variables

Detected from code and `.env.local` keys:

```bash
# Contact API / Resend
RESEND_API_KEY=

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

# Cloudinary upload API
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Career API (nodemailer route)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
CAREER_TO_EMAIL=
```

### Run locally

```bash
npm run dev
```

Open: `http://localhost:3000`

### Production build/start

```bash
npm run build
npm run start
```

Note: in this audit environment, `npm run build` failed because `next/font/google` could not fetch Google Fonts (network-restricted runtime).

---

## 5. App Router Deep Dive

### Current App Router implementation

- Uses `src/app/layout.tsx` as root layout.
- Uses route-level `page.tsx` files for each page.
- Uses `app/api/**/route.ts` for HTTP handlers.
- Does **not** currently define:
  - `template.tsx`
  - `loading.tsx`
  - `error.tsx`
  - `not-found.tsx`
  - route groups like `(marketing)`
  - dynamic segments like `[id]`

### Semantics in this project

- `layout.tsx`: wraps all pages with fonts, GTM script, `ClientLayout` (navbar), `Footer`, `BackToTop`.
- `page.tsx`: route content + route metadata.
- `route.ts`: API endpoints for POST handlers.

### Server vs Client boundaries

- Server components: all route pages by default.
- Client components:
  - forms (`ContactUsPage`, `CareerPage`)
  - navbar/menu state (`Navbar`)
  - sliders/carousels (`Common/Slider`, testimonial slider)
  - accordion FAQs, policy TOC behavior, back-to-top

### Nested routing behavior

No nested layout tree currently beyond root layout. Each route folder in `src/app/*` has a single `page.tsx`.

---

## 6. Route-by-Route Documentation

| Route | File | Purpose | Metadata strategy |
|---|---|---|---|
| `/` | `src/app/page.tsx` | Homepage composition (hero, process, services, testimonials, industry links, CTA banners) | explicit `metadata` export |
| `/services` | `src/app/services/page.tsx` | Services landing page and FAQ | `generateMetadata` derived from parent |
| `/How-we-work` | `src/app/How-we-work/page.tsx` | Process/methodology page with phases, milestones, FAQs | explicit `metadata` |
| `/About-us` | `src/app/About-us/page.tsx` | Company story, board members, certifications | explicit `metadata` |
| `/Blogs` | `src/app/Blogs/page.tsx` | Case-study style blog page wrapper | `generateMetadata` derived from parent |
| `/Contact-us` | `src/app/Contact-us/page.tsx` | Lead capture form page | explicit `metadata` |
| `/Careers` | `src/app/Careers/page.tsx` | Career application form page | explicit `metadata` |
| `/fintech-software-testing` | `src/app/fintech-software-testing/page.tsx` | FinTech industry page | explicit `metadata` |
| `/healthtech-software-testing` | `src/app/healthtech-software-testing/page.tsx` | HealthTech industry page | explicit `metadata` |
| `/saas-software-testing` | `src/app/saas-software-testing/page.tsx` | SaaS industry page | explicit `metadata` |
| `/Privacy-policy` | `src/app/Privacy-policy/page.tsx` | Legal policy page wrapper | explicit `metadata` |
| `/Terms-of-use` | `src/app/Terms-of-use/page.tsx` | Terms page wrapper | explicit `metadata` |

---

## 7. API Route Documentation

| Endpoint | File | Method | Behavior |
|---|---|---|---|
| `/api/contact` | `src/app/api/contact/route.ts` | POST | Accepts JSON inquiry payload and sends HTML email through Resend |
| `/api/career` | `src/app/api/career/route.ts` | POST | Accepts `formData`, optional resume attachment, sends team + applicant emails via nodemailer |
| `/api/upload` | `src/app/api/upload/route.ts` | POST | Uploads received file to Cloudinary and returns `secure_url` |
| `/api/verify-captcha` | `src/app/api/verify-captcha/route.ts` | POST | Sends token to Google reCAPTCHA verify endpoint and returns `{success}` |

### Request/response handling notes

- Validation exists but is minimal in `/api/contact` and `/api/upload`.
- `/api/career` enforces required fields and sets `runtime = 'nodejs'`.
- `/api/verify-captcha` handles missing token and secret misconfiguration explicitly.

### Middleware

No `middleware.ts` found.

---

## 8. Components Architecture

### High-level structure

- `components/Common/*`: shared primitives (`Banner`, `SectionHeader`, `Button`, wrappers, slider, footer).
- `components/HomePage/*`: homepage section blocks.
- `components/ServicePage/*`: `/services` page sections.
- `components/Industries/*`: reusable industry page building blocks.
- `components/How-we-work/*`: methodology timeline/cards sections.
- `components/Policies/*`: legal content with in-page TOC behavior.

### Reuse pattern

- Route pages compose sections from these directories.
- Shared section primitives (`SectionHeader`, `ContentWrapper`, `Banner`) enforce visual consistency.
- Industry pages share the same section template and differ by data constants defined in page files.

### Client-heavy components

- `Navbar.tsx`
- `ContactUsPage.tsx`
- `CareerPage.tsx`
- `Common/Slider/Slider.tsx`
- `HomePage/TestimonialsSection/ClientSlider.tsx`
- both FAQ components
- legal policy pages (TOC/scroll behavior)

---

## 9. Data Flow & State Management

### State management model

- No Redux/Zustand/Context state container.
- Local component state via `useState` and `useEffect`.
- Data is mostly static constants in route files and section components.

### Primary runtime data flows

#### Contact form flow (`ContactUsPage`)

1. User enters form fields + reCAPTCHA.
2. Client validates email/phone + required fields.
3. Calls `POST /api/verify-captcha`.
4. If file present, calls `POST /api/upload` to Cloudinary.
5. Sends team email via EmailJS template.
6. Sends confirmation email via EmailJS template.

#### Career form flow (`CareerPage`)

1. User enters candidate data + resume + reCAPTCHA.
2. Client validates fields.
3. Calls `POST /api/verify-captcha`.
4. Uploads resume via `POST /api/upload`.
5. Sends team and candidate notifications via EmailJS templates.

### Important architecture note

- `/api/contact` and `/api/career` exist server-side but current UI forms are primarily wired to EmailJS + `/api/upload` + `/api/verify-captcha`.
- This creates two parallel email delivery approaches in one codebase.

---

## 10. File-by-File Explanation (Important Files)

### 10.1 Root/config/runtime files

- `package.json`: scripts (`dev`, `build`, `start`, `lint`) and dependency graph.
- `next.config.ts`: currently default/no custom Next config.
- `tsconfig.json`: strict TS, `@/* -> src/*` alias, `moduleResolution: bundler`.
- `eslint.config.mjs`: Next core-web-vitals + TS lint rules.
- `.env.local`: runtime keys for reCAPTCHA, Cloudinary, Resend.
- `scripts/update-page-metadata.mjs`: offline utility that updates `metadata` in `src/app/**/page.*` from spreadsheet/CSV mapping.

### 10.2 App Router core files

- `src/app/layout.tsx`: root HTML shell, metadata base, GTM script, fonts, footer and back-to-top injection.
- `src/app/ClientLayout.tsx`: client wrapper that mounts Navbar with SSR disabled.
- `src/app/globals.css`: imports token/typography CSS and global body/headings defaults.

### 10.3 Route files (`src/app/**/page.tsx`)

- `src/app/page.tsx`: homepage section composition and homepage metadata.
- `src/app/services/page.tsx`: service page assembly and inherited metadata generator.
- `src/app/How-we-work/page.tsx`: process timeline + FAQs + CTA.
- `src/app/About-us/page.tsx`: board/certification story page.
- `src/app/Blogs/page.tsx`: wraps `BlogPage` and emits canonical/social metadata.
- `src/app/Contact-us/page.tsx`: route-level metadata + contact form mount.
- `src/app/Careers/page.tsx`: route-level metadata + career form mount.
- `src/app/fintech-software-testing/page.tsx`: FinTech page data and section composition.
- `src/app/healthtech-software-testing/page.tsx`: HealthTech page data and section composition.
- `src/app/saas-software-testing/page.tsx`: SaaS page data and section composition.
- `src/app/Privacy-policy/page.tsx`: wraps policy client component.
- `src/app/Terms-of-use/page.tsx`: wraps terms client component.

### 10.4 API route files

- `src/app/api/contact/route.ts`: Resend-driven email dispatch endpoint.
- `src/app/api/career/route.ts`: nodemailer endpoint with attachment support.
- `src/app/api/upload/route.ts`: Cloudinary upload adapter.
- `src/app/api/verify-captcha/route.ts`: server-side captcha verifier.

### 10.5 Critical UI/business components

- `src/components/Navbar.tsx`: responsive navigation + industries dropdown logic.
- `src/components/ContactUsPage/ContactUsPage.tsx`: full business inquiry workflow (validation, captcha, upload, EmailJS dispatch).
- `src/components/CareerPage/CareerPage.tsx`: full hiring workflow (validation, captcha, upload, EmailJS dispatch).
- `src/components/BlogPage/BlogPage.tsx`: case-study style content page.
- `src/components/Policies/PrivacyPolicy.tsx`: legal sections + TOC scrolling.
- `src/components/Policies/TermsOfUse.tsx`: legal sections + TOC scrolling.

### 10.6 Shared primitives frequently composed by routes

- `src/components/Common/SectionHeader/SectionHeader.tsx`: title/highlight/description pattern.
- `src/components/Common/ContentWrapper/ContentWrapper.tsx`: max-width section wrapper.
- `src/components/Common/Banner/Banner.tsx`: CTA banner.
- `src/components/Common/Button/Button.tsx`: typed link button variants.
- `src/components/Common/Slider/Slider.tsx`: client-logo slider.
- `src/components/Common/Footer/Footer.tsx`: global footer links and social.
- `src/components/Common/BackToTop/BackToTop.tsx`: scroll visibility and smooth top action.

### 10.7 Page-specific section components (used in active routes)

- Home: `HeroSection`, `ServicesSection`, `CaseStudies`, `Testimonials`, `WhyQAonCloud`, `PartnershipSection`.
- Service page: `ServicePageHeader`, `QualityAssurance`, `QualityServices`, `SmoothReleases`, `CaseStudiesSection`, `GreenLineCard`, `UnmatchedExpertise`, `ServicePage/FAQS`.
- Industry pages: `IndustryPageHeader`, `Mistakes`, `ReleaseRegulations`, `WorkWell`, `FinTechteamSection`, `Comparisontable`, `Industries/FAQS`.
- How-we-work: `TwoSystems`, `PhaseSection`, `FeatureShowcase`, `MilestoneSection`, `TestimonialCard`.
- About page: `About-Us/ContentSection`, `PageHeader`, `SectionHeader`.

### 10.8 Files currently present but not actively wired into route tree (as of this audit)

- `src/components/HomePage/TeamServices/WideFeatureSection.tsx`
- `src/components/HomePage/TeamServices/WideFeatureCard.tsx`
- `src/components/HomePage/Stats/Stats.tsx`
- `src/components/HomePage/PartnerSection/*`
- `src/components/Industries/Benefits/Benefits.tsx`
- `src/components/Industries/Partnership/Partnership.tsx`
- `src/components/Industries/SaasHeader/Header/ServicePageHeader.tsx`
- `src/components/Industries/SmoothReleases/SmoothReleases.tsx`
- `src/components/Industries/QualityServices/QualityServices.tsx`
- `src/components/How-we-work/WorkingTogether/*`
- `src/components/How-we-work/HighlightCards/HighlightCards.tsx`
- `src/components/Common/CaseStudyCard/CaseCard.tsx`

These appear to be retained experiments/legacy variants.

---

## 11. Common Errors & Debugging Guide

### 11.1 Build error: Google Fonts fetch failure

**Symptom**: `next/font` fails fetching Inter/Poppins/Raleway during `next build`.  
**Cause**: no outbound internet or blocked Google Fonts endpoint.  
**Fix**:

- Allow egress to `fonts.googleapis.com` + `fonts.gstatic.com`, or
- switch to local font files (`next/font/local`) for build isolation.

### 11.2 Hydration mismatch around navbar

**Symptom**: menu state mismatch/warnings in SSR pages.  
**Cause**: client-only resize/body class logic in Navbar.  
**Current mitigation**: Navbar is dynamically imported with `ssr: false` in `ClientLayout`.

### 11.3 "use client" errors

**Symptom**: hooks/event handlers not allowed in server component.  
**Cause**: missing `'use client'` directive in interactive components.  
**Fix**: ensure top-level `'use client'` in components using hooks or browser APIs.

### 11.4 Environment variable not loading

**Symptom**: reCAPTCHA/server upload/email failures.  
**Cause**: missing `.env.local` key or using non-`NEXT_PUBLIC_` var in client.  
**Fix**:

- client-exposed key must be prefixed `NEXT_PUBLIC_`.
- restart dev server after env changes.
- verify keys used by `/api/upload` and `/api/verify-captcha`.

### 11.5 API 400/500 for captcha or upload

**Symptom**: form fails with dialog error.  
**Likely causes**:

- captcha token missing/expired
- `RECAPTCHA_SECRET_KEY` missing
- Cloudinary credentials invalid

**Fix path**:

- check browser network calls in order: `/api/verify-captcha` then `/api/upload`.
- verify server console logs from route handlers.

### 11.6 Routing issues (404 / wrong path casing)

Routes are case-sensitive as generated from folder names (`/How-we-work`, `/Contact-us`, etc.).  
Use exact casing in links and metadata canonicals.

### 11.7 Real lint findings in this repository

From `npm run lint` during this audit:

- many `react/no-unescaped-entities` errors (apostrophes/quotes in JSX text)
- `@typescript-eslint/no-explicit-any` in upload route
- many `@next/next/no-img-element` warnings
- some unused imports/vars and hook dependency warnings

These currently block `npm run lint` from succeeding.

---

## 12. Performance & Best Practices

### Current strengths

- App Router server-rendered pages by default.
- Reusable section primitives reduce duplicated logic.
- Static assets in `public/` and imported local images for logos.

### Improvements recommended

- Replace `<img>` with `next/image` where practical (many lint warnings).
- Consolidate duplicate slider implementations if both are not required.
- Reduce large inline static data in route files by moving to `lib/content/*.ts`.
- Add `loading.tsx` per heavy routes for perceived performance.
- Add explicit `not-found.tsx` and route-level `error.tsx`.
- Add request throttling/rate limiting for public APIs (`upload`, `verify-captcha`).

### SEO and metadata

- Good use of per-route metadata/canonical/openGraph.
- Ensure consistent titles for routes using parent-derived metadata (`/Blogs`, `/services`) to avoid inherited generic title risk.

---

## 13. Deployment Guide

### Standard process

1. Set environment variables in deployment platform.
2. Install dependencies: `npm ci`.
3. Build: `npm run build`.
4. Start: `npm run start`.

### Platform requirements

- Node runtime for Next.js 16.
- External network access for `next/font/google` at build time (unless migrated to local fonts).
- Runtime access for:
  - Google reCAPTCHA verify endpoint
  - Cloudinary API
  - Email providers (EmailJS client-side, Resend/Nodemailer if those APIs are used)

### Common production issues

- Missing secrets causing silent client-side form failures.
- CORS/network restrictions to third-party APIs.
- Build breakage from strict lint if lint is added to CI gate.

### Recommended CI checks

```bash
npm run lint
npm run build
```

Add a smoke test that submits mocked payloads to:

- `/api/verify-captcha`
- `/api/upload`

---

## 14. Appendix: Style/Asset Files and Notes

### Styling system

- `src/app/globals.css` imports:
  - `src/styles/tokens.css`
  - `src/styles/typography.css`
- Route/components use CSS modules (`*.module.css`) extensively.

### Static content

- `public/Images/**` and `public/logos/**` provide route-specific visual assets.
- `public/robots.txt`, `public/sitemap.xml`, `public/site.webmanifest` are present.

### Security and architecture observations

- EmailJS public keys are hardcoded in client components; this is expected for EmailJS public keys, but review template/service IDs and abuse protections.
- `/api/contact` and `/api/career` overlap with client EmailJS flow. Consider selecting one backend email strategy to simplify operations and observability.

---

## Quick Start for New Developers

```bash
npm install
cp .env.local.example .env.local   # if you create an example file
npm run dev
```

Then validate:

- open `/Contact-us` and test captcha + upload pipeline
- open `/Careers` and test resume upload path
- run `npm run lint` and review known lint debt above

