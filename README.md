# Wingate College One Member PLC — Website

A complete bilingual (English / Amharic) marketing website for **Wingate College One Member PLC**, built with Next.js App Router, TypeScript, Tailwind CSS and Framer Motion. The site is a **fully static export** (`out/`) and is designed to be uploaded to cPanel / Apache hosting.

---

## 1. Quick start

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build (writes the static site to `out/`):

```bash
npm run build
```

Extra checks:

```bash
npm run typecheck  # TypeScript, no emit
npm run lint       # ESLint
```

> **Note:** The build intentionally uses the standard webpack pipeline (`next build`), not `--turbopack`. Do not re-enable Turbopack unless the full build has been re-tested.

---

## 2. Changing the four colours

All colours come from **one file**: `src/config/theme.ts`.

```ts
export const theme = {
  primary:   "#0B2545", // deep navy: headers, hero overlay, main buttons
  secondary: "#1F7A4D", // industrial green: accents, links, icons
  third:     "#F2A900", // amber: highlights, CTAs, hover states
  fourth:    "#F5F7FA", // light neutral: section backgrounds, cards
} as const;
```

Change the four hex values and the **entire site re-themes**. The values are injected as CSS variables on `<html>` in `app/layout.tsx` and mapped in `tailwind.config.ts`, so existing classes such as `bg-primary`, `text-secondary`, `bg-third` and `bg-fourth` keep working.

- Never add a fifth colour. Tints and shades are produced with opacity (`bg-primary/10`) or `color-mix()`.
- Keep contrast in mind: `primary` is used behind white/`fourth` text; `secondary` is used as text on white; `third` sits behind `primary` text.
- If you change the palette substantially, re-check the generated Open Graph image (`public/og/og-image.jpg`).

---

## 3. Editing content

All copy lives in typed data files. Components contain no hard-coded site copy.

| File | What it controls |
| --- | --- |
| `src/config/site.ts` | Company name, contact details, socials, navigation, flags, stats, domain |
| `src/content/en.ts` | Every English page string, form label, error and meta description |
| `src/content/am.ts` | Amharic mirror of the English keys (working translation, pending client review) |
| `src/content/divisions.ts` | The nine divisions: name, short/full description, products, images |
| `src/content/types.ts` | Shared TypeScript shapes (edit with care) |
| `src/config/images.ts` | Every image path, dimensions and alt text |

### Company name

The company name exists **once**:

```ts
// src/config/site.ts
export const siteConfig = {
  name: "Wingate College One Member PLC",
  ...
}
```

It is interpolated into copy with the token `{{name}}`. Also available: `{{college}}`, `{{phone}}`, `{{email}}`, `{{year}}`.

### Adding or changing navigation

Edit the `nav` array in `src/config/site.ts`. Each item has a `key` that matches a label in `src/content/en.ts` → `nav`, and a `path` without the language prefix.

### Amharic translations

`src/content/am.ts` mirrors the English structure and now contains a full working Amharic translation. `getContent()` still falls back to English for any value left as `"TODO_AM"` or left empty, so the site never shows a blank string.

To revise the translation:

1. Open `src/content/am.ts`.
2. Replace the wording with the client-approved Amharic text. Keep the same keys and array lengths.
3. Translate division text in `src/content/divisions.ts` (the `am` fields).
4. Translate meta titles/descriptions too — they are inside `meta` in each content file.

To add a new language string to both languages, add the key to `src/content/types.ts`, then to `en.ts` and `am.ts`. TypeScript will flag anything missing.

To add a whole new language later: add it to `locales` in `src/lib/content.ts`, add a content file, extend `Locale`, and add it to `siteConfig.languages` and the `LanguageSwitcher` links. The `[lang]` route and `generateStaticParams` will pick it up automatically.

### Flags

In `src/config/site.ts`:

```ts
showStats: false   // statistics section is hidden until real figures are confirmed
showTeam: false    // team section is hidden until profiles are supplied
partners: []       // partner strip is hidden while this array is empty
```

The stats values currently in `siteConfig.stats` are **placeholders**, not published figures. Confirm them with the client before setting `showStats: true`.

---

## 4. Logo and images

### Logo

| Path | Use |
| --- | --- |
| `public/logo/wingate-crest.png` | Header, footer, about page, 404, JSON-LD |
| `app/icon.png` | Favicon (Next.js app icon convention) |
| `public/og/og-image.jpg` | Open Graph / Twitter card |

The header and footer place the crest on a white pill, so the single supplied logo works on both light and dark backgrounds. If the client supplies dark-background or vector variants, add them to `public/logo/` and update `siteConfig.logo`.

### Photos and placeholders

- Real client photographs are used for bakery, soap, metalwork, furniture, parquet, construction, machinery, electrical and textile.
- No placeholder illustrations remain in `public/images/divisions/`; every division now uses a real photo.
- Full-resolution source originals for the integrated division photos are kept in `source-photos/`, outside the web root, so they are not copied into the static export.
- `public/images/README.txt` lists every slot, its recommended size and where it appears.
- To replace an image, either overwrite the file with the same filename or change the single reference in `src/config/images.ts`.
- Keep the declared `width`/`height` in `images.ts` in sync with replacement files to avoid layout shift.
- Never hotlink external images at runtime.

Photos were optimised to max 1600 px wide JPEGs. The original, full-resolution client files remain in the parent `images/` folder outside this project.

---

## 5. Contact form

The form uses `react-hook-form` + `zod` with a hidden honeypot and full loading / success / error states in both languages. Submission logic lives in `src/lib/submitForm.ts` and supports three modes.

### Mode A — FormSubmit.co (default, free, no account)

Form submissions are emailed to the internal inbox configured in `NEXT_PUBLIC_FORMSUBMIT_ENDPOINT`. The public contact address stays `wingatecollegeplc@gmail.com` (`siteConfig.email`) and is the only address shown in the footer, contact page and mailto fallback. The internal form inbox is never printed in page copy.

```bash
# .env.local (copy .env.example)
NEXT_PUBLIC_FORM_MODE=formsubmit
NEXT_PUBLIC_FORMSUBMIT_ENDPOINT=https://formsubmit.co/ajax/wingatehost@gmail.com
```

- The first submission sends a one-time activation email to the form inbox. Open it and confirm the address.
- After activation, FormSubmit emails a random alias. Put that alias in `NEXT_PUBLIC_FORMSUBMIT_ENDPOINT` and rebuild, so the inbox address is no longer present in the public bundle or network requests.
- The visitor's email is sent as `_replyto`, so replying to a notification goes straight to the sender.
- Rebuild after changing env values — they are compiled into the static bundle.

### Mode B — `endpoint`

```bash
NEXT_PUBLIC_FORM_MODE=endpoint
NEXT_PUBLIC_FORM_ENDPOINT=/api/contact.php
```

or point it at a Formspree endpoint:

```bash
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

### Mode C — `mailto` (no backend)

Set `NEXT_PUBLIC_FORM_MODE=mailto` to open the visitor's email app with a prefilled message to `siteConfig.email`.

### PHP handler

`public/api/contact.php` is copied to `out/api/contact.php`. It:

- accepts JSON or form-encoded POST,
- rejects non-POST requests,
- checks the honeypot,
- validates name, email, phone, division and message,
- strips newlines from header values to prevent header injection,
- sends plain-text mail and returns JSON.

Set the form recipient in the file or with cPanel environment variables:

```bash
CONTACT_TO_EMAIL=wingatehost@gmail.com
CONTACT_FROM_DOMAIN=yourdomain.com
CONTACT_ALLOWED_ORIGIN=https://yourdomain.com
```

`siteConfig.email` remains the public contact address (`wingatecollegeplc@gmail.com`); the PHP handler delivers to the internal form inbox. Test the form after upload; if your host blocks PHP `mail()`, configure SMTP in cPanel or use FormSubmit mode instead.

### Pre-selecting a division

Division pages link to:

```
/en/contact/?division=bakery
```

The form reads the `division` query parameter in a client component wrapped in `<Suspense>` (required for static export) and pre-selects the matching division.

---

## 6. Building and deploying to cPanel

1. Run `npm run build`.
2. Upload **the contents of `out/`** to `public_html` (not the `out` folder itself).
3. Make sure hidden files are included — especially `out/.htaccess` and `out/api/contact.php`.
4. The included `public/.htaccess` provides:
   - trailing-slash clean URLs (`/en/about/`),
   - `index.html` resolution,
   - a custom `404.html` error document,
   - long-lived caching for hashed assets and images,
   - `no-cache` for HTML,
   - gzip/deflate compression and basic security headers.
5. Enable SSL (Let's Encrypt) in cPanel and update `siteConfig.domain` to the live `https://` domain. Rebuild so canonical URLs, sitemap and Open Graph tags are correct.
6. Set the document root to `public_html` and confirm `mod_rewrite` is enabled (it is on standard cPanel).
7. Submit `https://yourdomain.com/sitemap.xml` in Google Search Console.

Routes generated by the export:

```
/                                   → English home page (canonical to /en/)
/en/  /am/
/en/about/  /am/about/
/en/services/  /am/services/
/en/divisions/  /am/divisions/
/en/divisions/<slug>/  /am/divisions/<slug>/   (9 slugs × 2 languages)
   furniture, parquet, construction, machinery, electrical,
   poultry, soap, bakery, textile
/en/training/  /am/training/
/en/gallery/  /am/gallery/
/en/contact/  /am/contact/
/404.html
/robots.txt
/sitemap.xml
```

---

## 7. Project structure

```
app/
  layout.tsx                 Root HTML, fonts, theme variables, Organization JSON-LD
  page.tsx                   English home page at the root URL
  not-found.tsx              Custom 404
  sitemap.ts / robots.ts     Static SEO routes
  [lang]/
    layout.tsx               Locale chrome via SiteShell (header, footer, scroll UI, transition)
    page.tsx                 Home
    about/page.tsx
    services/page.tsx        Services and Programs
    divisions/page.tsx
    divisions/[slug]/page.tsx
    training/page.tsx
    gallery/page.tsx
    contact/page.tsx
src/
  config/                    theme.ts, site.ts, images.ts
  content/                   en.ts, am.ts, divisions.ts, types.ts
  components/
    layout/                  Header, Footer, SiteShell, PageHero, Container, Section, etc.
    pages/                   HomeContent (shared by / and /[lang]/)
    motion/                  FadeIn, SlideUp, Stagger, ScaleOnHover, ParallaxImage, CountUp, PageTransition
    sections/                Hero, CTABanner, ServiceCard, StatsCounter, Accordion
    divisions/               DivisionCard
    gallery/                 Gallery, Lightbox
    forms/                   ContactForm
    icons/                   SocialIcon (inline brand SVGs)
  lib/                       content.ts, seo.ts, submitForm.ts, motion.ts, cn.ts
public/                      logo, images, og, api/contact.php, .htaccess
```

---

## 8. Design and motion notes

- Four-colour system only; no hard-coded hex values outside `src/config/theme.ts`.
- Fonts: Inter (Latin) and Noto Sans Ethiopic, self-hosted from `app/fonts` with `next/font/local` — no build-time or runtime Google Fonts request.
- Motion uses Framer Motion with `whileInView` + `once`, short durations, and transform/opacity only.
- `prefers-reduced-motion` is respected throughout (parallax, Ken Burns zoom, counters and page transitions are reduced or disabled).
- Header is transparent over the home hero and becomes solid/blurred on scroll; mobile drawer traps focus and closes on Escape.
- Gallery filter uses layout animation; the lightbox supports keyboard (Esc, ←/→) and touch swipe.
- The home hero renders a static headline and image first. After the division photos preload, it crossfades through one message and image per division. Reduced-motion users keep the static hero.
- Images below the fold are lazy-loaded; the first hero image and page-hero images are prioritised. Rotating hero images preload after first paint. Width/height are declared to avoid layout shift.

---

## 9. Decisions and placeholders

See **`CLIENT_CHECKLIST.md`** for the full list of client inputs. Key implementation decisions:

- No `public/logo/` existed at the start; the supplied crest (`../images/Wingate College Crest Emblem.png`) is used for the logo, favicon and OG image.
- Real client photos are used for bakery, soap, metalwork, furniture, parquet, construction, machinery, electrical, poultry and textile.
- Amharic content is a complete working translation in `src/content/am.ts` and the `am` fields of `src/content/divisions.ts`; it should be reviewed by a native speaker before launch.
- Telegram (`@wingatePLC`) is live; the other social profile URLs are empty, so those icons render as disabled “link to be confirmed” chips.
- Address, Google Maps link, map embed and working hours are confirmed in `src/config/site.ts`; the production domain remains a placeholder.
- Statistics, team and partner sections are hidden by default because no verified data was supplied.
- Phone `0939 070 767` is live.
- Brand icons are inline SVGs because current `lucide-react` no longer exports brand icons.
- The root `/` page renders the English home page directly using the shared `HomeContent` and `SiteShell` components; language switching is available in the header. No redirect or language-chooser page is used.

© Wingate College One Member PLC. Replace placeholder contact details before launch.
