import { images } from "./images";

export type NavKey =
  | "home"
  | "about"
  | "services"
  | "divisions"
  | "training"
  | "gallery"
  | "contact";

export type NavItem = {
  readonly key: NavKey;
  /** Path without the language prefix. */
  readonly path: string;
};

export type SocialIconName =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "telegram";

export type SocialLink = {
  readonly name: string;
  /** Leave empty until the client supplies the real profile URL. */
  readonly href: string;
  readonly icon: SocialIconName;
};

export type Stat = {
  readonly value: number;
  readonly suffix: string;
  readonly prefix: string;
  /** Key into `content.home.stats.items` so the label stays translatable. */
  readonly labelKey: "divisions" | "customers" | "projects" | "trained";
};

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SITE-WIDE CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 * Everything marked [CONFIRM] is a placeholder that needs client input.
 * See CLIENT_CHECKLIST.md for the complete list.
 */
export const siteConfig = {
  /** [CONFIRM] Wingate / Winget spelling — change it here once. */
  name: "Wingate College One Member PLC",
  shortName: "Wingate College",
  /** [CONFIRM] exact relationship / spelling with the college. */
  collegeName: "Wingate Polytechnic College",
  tagline: "Quality Products and Services, Made in Ethiopia",
  description:
    "{{name}} provides furniture, construction, machinery, electrical services, feed, soap, bakery and more, plus job-oriented training and consultancy. Quality at a fair price.",

  phone: "0939070767",
  phoneDisplay: "0939 070 767",
  /** Public inbox address. */
  email: "wingatecollegeplc@gmail.com",
  /** Confirmed physical address. */
  address: "General Wingate Polytechnic College, Addis Ababa, Ethiopia",
  /** Confirmed office hours. */
  workingHours: "8:30 AM – 5:00 PM",
  /** [CONFIRM] production domain, used for sitemap, canonical and OG URLs. */
  domain: "https://example.com",
  /** Google Maps share link for the college location. */
  mapLink: "https://maps.app.goo.gl/vNzePci8NGqAQcPR9",
  /** OpenStreetMap embed for the same location (works without an API key). */
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=38.7045%2C9.0442%2C38.7245%2C9.0642&layer=mapnik&marker=9.0542158%2C38.7145377",
  addressConfirmed: true,

  logo: images.logo,
  ogImage: images.ogImage,
  logoPill: true,

  languages: {
    en: "English",
    am: "አማርኛ",
  },

  nav: [
    { key: "home", path: "/" },
    { key: "about", path: "/about/" },
    { key: "services", path: "/services/" },
    { key: "gallery", path: "/gallery/" },
    { key: "contact", path: "/contact/" },
  ] as readonly NavItem[],

  /** [CONFIRM] social profiles — fill `href` to activate the icons. */
  socials: [
    { name: "Telegram", href: "https://t.me/wingatePLC", icon: "telegram" },
    { name: "Facebook", href: "", icon: "facebook" },
    { name: "Instagram", href: "", icon: "instagram" },
    { name: "LinkedIn", href: "", icon: "linkedin" },
    { name: "YouTube", href: "", icon: "youtube" },
  ] as readonly SocialLink[],

  /** No verified figures were provided — keep hidden until confirmed. */
  showStats: false,
  /** [CONFIRM] add team members, then set the flag to true. */
  showTeam: false,

  stats: [
    { value: 9, suffix: "", prefix: "", labelKey: "divisions" },
    { value: 3, suffix: "", prefix: "", labelKey: "customers" },
    { value: 120, suffix: "+", prefix: "", labelKey: "projects" },
    { value: 500, suffix: "+", prefix: "", labelKey: "trained" },
  ] as readonly Stat[],

  /** [CONFIRM] partner logos — the section is hidden while this is empty. */
  partners: [] as readonly { name: string; logo: string }[],

  /** [CONFIRM] team members — the section is hidden unless showTeam is true. */
  team: [] as readonly { name: string; role: string }[],
} as const;

export type SiteConfig = typeof siteConfig;

/** Build a locale-aware path with the trailing slash required by static export. */
export function localePath(lang: string, path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `/${lang}/${clean}/` : `/${lang}/`;
}
