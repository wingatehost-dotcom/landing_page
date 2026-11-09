import type { MetadataRoute } from "next";
import { divisionSlugs } from "@/content/divisions";
import { siteConfig } from "@/config/site";
import { locales } from "@/lib/content";

const base = siteConfig.domain.replace(/\/+$/, "");

export const dynamic = "force-static";

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const staticEntries: readonly Entry[] = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "about", priority: 0.8, changeFrequency: "monthly" },
  { path: "services", priority: 0.9, changeFrequency: "monthly" },
  { path: "divisions", priority: 0.9, changeFrequency: "monthly" },
  { path: "training", priority: 0.8, changeFrequency: "monthly" },
  { path: "gallery", priority: 0.6, changeFrequency: "monthly" },
  { path: "contact", priority: 0.8, changeFrequency: "yearly" },
];

const divisionEntries: readonly Entry[] = divisionSlugs.map((slug) => ({
  path: `divisions/${slug}`,
  priority: 0.75,
  changeFrequency: "monthly",
}));

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((lang) =>
    [...staticEntries, ...divisionEntries].map((entry) => ({
      url: `${base}/${lang}/${entry.path ? `${entry.path}/` : ""}`,
      lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    })),
  );
}
