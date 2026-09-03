# Graceland Montessori — public website

The public marketing site for Graceland Montessori (Accra, Ghana): homepage, About/Programmes,
Admissions (with inquiry form), Gallery, Contact, and Blog/News.

This is a separate, standalone project from the school's internal management system (the
Next.js "portal" covering students, guardians, attendance, invoicing, messaging, etc.). This
site is a static/server-rendered marketing site — it holds no student data and has no admin
login. The internal system is this site's future "backend"; see **Integration seams** below.

## Stack

- Next.js 16 (App Router, TypeScript, Turbopack)
- Tailwind CSS v4
- Self-hosted variable fonts (`@fontsource-variable/inter`, `@fontsource-variable/plus-jakarta-sans`)
  — no runtime or build-time calls to Google Fonts, so builds work in network-restricted
  environments and there's no font FOUC.
- Content lives in plain TypeScript files (`src/lib/content.ts`, `src/lib/posts.ts`), not a CMS.
  Straightforward to edit directly, and structured so swapping in a real data source later only
  touches those two files.

## Local development

```bash
npm install
npm run dev
```

## Project structure

```
src/
  app/                 routes (App Router) — one folder per page
    admissions/actions.ts   server action handling the inquiry form
    contact/actions.ts      server action handling the contact form
    blog/[slug]/             blog post detail route
  components/          shared UI (header, footer, forms, cards, photo placeholders)
  lib/
    content.ts          all site copy: mission/vision, programmes, staff, contact info, FAQs
    posts.ts             blog posts
```

### Photo placeholders

There are no real photos yet. `src/components/photo-placeholder.tsx` renders a clearly-labelled
placeholder tile everywhere a photo belongs (hero, programme cards, staff, gallery, blog posts).
Before launch, replace these with real images — either swap the component usage for `next/image`
calls, or extend `PhotoPlaceholder` to fall back to a real image when one is provided.

## Integration seams (not built yet, by design)

Two places are deliberately kept open for the internal school-management system to plug into
later, per the brief — nothing here calls out to that system yet.

1. **Admissions inquiries** (`src/app/admissions/actions.ts`, and the near-identical
   `src/app/contact/actions.ts` for general contact messages): the form submits to a Next.js
   Server Action that validates input and then, if an `ADMISSIONS_WEBHOOK_URL` (or
   `CONTACT_WEBHOOK_URL`) environment variable is set, POSTs the submission there as JSON.
   Without it configured, submissions are only logged server-side. To wire this up for real,
   either point that env var at an endpoint the internal system exposes, or replace the
   forwarding block with a direct authenticated call into that system's API. No page or
   component needs to change.

2. **Blog publish → parent notifications** (`src/lib/posts.ts`): posts are static today. The
   file's top comment marks the seam — once posts move through a real publish action (a CMS
   webhook, or a server action), that's the one place to add a call into the internal system's
   notification pipeline (SMS via Arkesel, in-app messaging) so publishing a post can notify
   parents automatically.

## Deployment

Not yet deployed. Plan is Vercel (first choice — zero-config for Next.js, generous free tier,
easy custom domain), with Netlify or Cloudflare Pages as alternatives. See project conversation
for current deployment status.
