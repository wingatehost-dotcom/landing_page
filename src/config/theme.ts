/**
 * ─────────────────────────────────────────────────────────────────────────────
 * WINGATE COLLEGE — SINGLE SOURCE OF TRUTH FOR COLOURS
 * ─────────────────────────────────────────────────────────────────────────────
 * Change the four values below and the ENTIRE site re-themes:
 *   • Tailwind classes  bg-primary / text-secondary / bg-third / bg-fourth
 *   • CSS variables     --color-primary, --color-secondary, --color-third, --color-fourth
 *   • Buttons, links, hero overlays, cards, icons, focus rings and gradients
 *
 * They are injected as CSS variables by `app/layout.tsx` and mapped to Tailwind
 * in `tailwind.config.ts`. Derived tints and shades are created with opacity
 * utilities (e.g. `bg-primary/10`) or `color-mix()` — never with new hex values.
 *
 * Keep contrast in mind when changing them:
 *   primary   → used behind white / fourth text
 *   secondary → used as text on white / fourth backgrounds
 *   third     → used behind primary text (buttons, highlights)
 *   fourth    → used behind primary / secondary text
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const theme = {
  primary: "#0B2545", // deep navy: headers, hero overlay, main buttons
  secondary: "#1F7A4D", // industrial green: accents, links, icons
  third: "#F2A900", // amber: highlights, CTAs, hover states
  fourth: "#F5F7FA", // light neutral: section backgrounds, cards
} as const;

export type Theme = typeof theme;

/** CSS custom properties consumed by Tailwind and global styles. */
export const themeCssVariables = {
  "--color-primary": theme.primary,
  "--color-secondary": theme.secondary,
  "--color-third": theme.third,
  "--color-fourth": theme.fourth,
} as const;

export const themeList = [
  { name: "primary", value: theme.primary, usage: "Headers, hero overlays, primary text" },
  { name: "secondary", value: theme.secondary, usage: "Accents, links, icons" },
  { name: "third", value: theme.third, usage: "Highlights, CTA buttons, hovers" },
  { name: "fourth", value: theme.fourth, usage: "Section backgrounds, cards" },
] as const;
