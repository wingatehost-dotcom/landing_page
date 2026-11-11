# Client Checklist — Wingate College One Member PLC website

Everything below is still needed from the client before launch. Items marked **[CONFIRM]** already appear in the code as editable placeholder constants. Each entry states exactly where to update it.

---

## 1. Brand and company identity

- [ ] **[CONFIRM] Company name spelling.** The site currently uses **“Wingate College One Member PLC”**. If the correct spelling is “Winget” (as in the project folder), change it once in `src/config/site.ts` → `siteConfig.name`. All copy, metadata, footer and JSON-LD update automatically.
- [ ] **[CONFIRM] Relationship to the college.** The site currently says “Wingate Polytechnic College” (`siteConfig.collegeName`) as the parent college. Confirm the exact legal name and relationship.
- [ ] **Logo files.** Supply a vector logo (SVG/AI/PDF) and, if available, light-background and dark-background variants. Current file: `public/logo/wingate-crest.png`.
- [ ] **Favicon.** Approve the crest-as-favicon (`app/icon.png`) or supply a dedicated icon.
- [ ] **Brand colours.** Approve the four colours in `src/config/theme.ts`: navy `#0B2545`, green `#1F7A4D`, amber `#F2A900`, light `#F5F7FA`. If brand colours differ, supply hex values and we re-theme the site in one edit.
- [ ] **Tagline approval.** Current tagline: “Quality Products and Services, Made in Ethiopia”.

## 2. Contact details

- [x] **Public email address.** `wingatecollegeplc@gmail.com` is set in `src/config/site.ts` → `siteConfig.email` for the footer, contact page and mailto fallback.
- [x] **Contact-form inbox.** Form submissions are delivered to `wingatehost@gmail.com` through FormSubmit.co. This address is not displayed anywhere on the site.
- [x] **Physical address.** `siteConfig.address` is set to “General Wingate Polytechnic College, Addis Ababa, Ethiopia” and links to the Google Maps location.
- [x] **Working hours.** `siteConfig.workingHours` is set to “8:30 AM – 5:00 PM”.
- [x] **Map location.** Google Maps share link stored in `siteConfig.mapLink`; an OpenStreetMap embed is set in `siteConfig.mapEmbedUrl`.
- [x] **Phone confirmation.** The site publishes `0939 070 767` (`siteConfig.phone` / `phoneDisplay`).
- [ ] **Production domain.** Currently `https://example.com` (`siteConfig.domain`). Required for canonical URLs, Open Graph, sitemap and JSON-LD.
- [x] **Telegram.** `@wingatePLC` is linked as `https://t.me/wingatePLC` in `siteConfig.socials`.

## 3. Content approval

- [ ] **Headline approval.** Home hero: “Quality Products and Services, Made in Ethiopia”.
- [ ] **About page.** Approve the full story text and the relationship-to-college paragraph.
- [ ] **Vision and mission.** Approve the exact wording taken from the content document.
- [ ] **Division descriptions.** Approve the short and full descriptions and product/service lists for all nine divisions in `src/content/divisions.ts`.
- [ ] **FAQ.** Approve the five questions and answers on the contact page.
- [ ] **Training / Research / Consultancy.** Confirm the three service descriptions and the CTA.
- [ ] **Testimonials (optional).** None are published. Supply quotes, names, roles and permission to publish if wanted.
- [ ] **Any certifications, awards or registrations.** None are claimed. Supply evidence before we add them.
- [ ] **Legal pages (optional).** Privacy policy, terms of use, accessibility statement — needed if the site will collect personal data through the form in a regulated context.

## 4. Statistics

- [ ] **[CONFIRM] Decide whether to publish statistics at all.** The stats section is **hidden** (`siteConfig.showStats = false`) because no verified numbers were supplied.
- [ ] If publishing, confirm the real values for: number of divisions, customer groups, projects completed, people trained. Replace the placeholder values in `siteConfig.stats`, then set `showStats: true`.

## 5. Photography

Real client photos are now used for bakery, soap, metalwork, furniture, parquet, construction, machinery, electrical and textile. The following still need photos.

- [x] Furniture, doors and windows — hero + 8 gallery photos from the new furniture gallery set
- [x] Wooden parquet flooring — hero + 1 gallery photo
- [x] Construction and renovation — hero + metal poultry-cage gallery photo
- [x] Machinery manufacturing — hero + 1 gallery photo
- [x] Electrical and electronic technology — hero + 1 gallery photo
- [x] Poultry and egg production — new poultry farm photo used as hero and gallery
- [ ] Poultry and cattle feed — production photos
- [ ] Bakery and pastry — optional additional production photos
- [ ] Soap and cosmetics — optional additional production photos
- [x] Textile and garment training — hero + 1 gallery photo
- [ ] Training / students / workshop — additional photos welcome
- [ ] Team portraits (only if the team section should be shown)
- [ ] Partner logos (only if a partners strip should be shown)

Guidance: landscape photos, at least 1600 px wide for heroes, 1200 px for cards. Send originals; we optimise and compress them. Every slot and recommended size is listed in `public/images/README.txt`. Full-resolution source originals for the integrated division photos are kept in `source-photos/`, outside the web root.

## 6. Amharic translation

The `/am` site is fully built and now includes a working Amharic translation of the page copy, divisions, form messages and FAQ. The translation is a draft and must be reviewed before launch.

- [ ] Review all Amharic page copy and correct anything that does not match the approved wording.
- [ ] Confirm the Amharic meta titles and descriptions.
- [ ] Confirm the Amharic division names, descriptions and product lists.
- [ ] Confirm the Amharic form labels, validation messages and success/error messages.
- [ ] Confirm the Amharic FAQ.
- [ ] A native speaker to review the finished `/am` pages.

Files to update: `src/content/am.ts` and the `am` fields in `src/content/divisions.ts`. Any value left as `"TODO_AM"` falls back to English.

## 7. Social media

Social URLs are intentionally empty, so the icons render as disabled “link to be confirmed” chips in the footer and contact page.

- [x] Telegram: `https://t.me/wingatePLC` (`@wingatePLC`)
- [ ] Facebook page URL
- [ ] Instagram profile URL
- [ ] LinkedIn company page URL
- [ ] YouTube channel URL
- [ ] Any other platform (TikTok, X) — the icon set currently supports Facebook, Instagram, LinkedIn, YouTube and Telegram.

Update `siteConfig.socials` in `src/config/site.ts`.

## 8. Team and partners

- [ ] **[CONFIRM] Team section.** Hidden (`siteConfig.showTeam = false`). Supply names, roles, short bios and photos, then set `showTeam: true`.
- [ ] **[CONFIRM] Partner logos.** The strip is hidden while `siteConfig.partners` is empty. Supply logo files and permission to display them.

## 9. Contact form and email setup

- [x] **Form mode.** `formsubmit` — free FormSubmit.co endpoint configured in `.env.local`; no account required.
- [x] **Confirm the form recipient inbox:** `wingatehost@gmail.com` (internal; not shown on the site). Confirm who monitors it.
- [ ] **Activate FormSubmit.** Submit the form once and click the one-time confirmation link sent to the form inbox.
- [ ] **Replace the FormSubmit endpoint with the random alias** emailed after activation, then rebuild, so the inbox address is not exposed in the public bundle.
- [ ] **Test submission** from the live server and confirm delivery (including spam folder).
- [ ] **Auto-reply (optional).** Confirm whether the sender should receive an acknowledgement.
- [ ] **Privacy wording.** Approve the sentence “We only use your details to respond to your inquiry.”
- [ ] **Spam protection.** The form has a honeypot. If spam becomes a problem, we can add a simple rate limit or captcha.
- [ ] **Optional PHP fallback.** If you switch to `endpoint` mode with `public/api/contact.php`, configure cPanel SMTP and confirm PHP `mail()` works.

## 10. Hosting and launch

- [ ] **Domain and DNS access** (or the person who manages it).
- [ ] **cPanel hosting credentials** or a deployment contact.
- [ ] **SSL certificate** enabled (Let's Encrypt) and HTTPS forced.
- [ ] **Sending email setup.** The recipient is a Gmail inbox, so no domain mailbox is required for receiving. If PHP `mail()` or SMTP is used, create/confirm a sending account on the production domain.
- [ ] **Analytics (optional).** Google Analytics / Plausible ID, if traffic reporting is wanted. No tracking is installed by default.
- [ ] **Google Search Console / Bing Webmaster** access for sitemap submission.
- [ ] **Backups.** Confirm the host takes regular backups.
- [ ] **Existing site redirects.** If an old site exists, supply its URLs so we can add 301 redirects.
- [ ] **Final content sign-off** in writing before the site goes live.

---

## Already confirmed / live

- Company name in a single constant: `src/config/site.ts` → `siteConfig.name`
- Phone: `0939 070 767`
- Address, Google Maps link, map embed and working hours confirmed
- Telegram: `@wingatePLC`
- Nine divisions with approved copy from `Wingate_Website_Content.docx`
- Vision, mission, values, who-we-serve, why-choose-us and FAQ copy
- English site complete; static export builds with zero errors
- Responsive layout, keyboard-accessible navigation, lightbox and form
- Custom 404, sitemap, robots, canonical URLs, Open Graph and Organization JSON-LD
- `.htaccess` for clean URLs, 404 fallback, caching and compression

**Launch blocker summary:** FormSubmit activation, production domain, native-speaker review of the Amharic translation, and a decision on publishing statistics.
