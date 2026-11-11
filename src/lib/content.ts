import { siteConfig } from "@/config/site";
import { am } from "@/content/am";
import { divisions } from "@/content/divisions";
import { en } from "@/content/en";
import type {
  Content,
  Division,
  DivisionSlug,
  Locale,
  LocalizedList,
  LocalizedText,
} from "@/content/types";
import type { ImageAsset } from "@/config/images";

export const locales = ["en", "am"] as const;
export const defaultLocale: Locale = "en";
export const TODO_AM = "TODO_AM";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Recursively replace TODO_AM / empty strings with the English fallback. */
function resolveValue<T>(base: T, value: T): T {
  if (typeof value === "string") {
    return (value === TODO_AM || value.trim() === "" ? base : value) as T;
  }
  if (Array.isArray(value)) {
    const baseArray = Array.isArray(base) ? (base as unknown[]) : [];
    return value.map((item, index) =>
      resolveValue(baseArray[index], item),
    ) as T;
  }
  if (value !== null && typeof value === "object") {
    const baseObject = (base ?? {}) as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        resolveValue(baseObject[key], item),
      ]),
    ) as T;
  }
  return value;
}

export function getContent(lang: Locale): Content {
  return lang === "en" ? en : resolveValue(en, am);
}

export function localized(text: LocalizedText, lang: Locale): string {
  const value = text[lang];
  return value === TODO_AM || value.trim() === "" ? text.en : value;
}

export function localizedList(list: LocalizedList, lang: Locale): readonly string[] {
  const value = list[lang];
  if (!value.length || value.every((item) => item === TODO_AM)) {
    return list.en;
  }
  return value;
}

export type ResolvedDivision = {
  readonly slug: DivisionSlug;
  readonly name: string;
  readonly shortDescription: string;
  readonly fullDescription: string;
  readonly products: readonly string[];
  readonly productsTitle: string;
  readonly hero: ImageAsset;
  readonly gallery: readonly ImageAsset[];
};

export function resolveDivision(division: Division, lang: Locale): ResolvedDivision {
  return {
    slug: division.slug,
    name: localized(division.name, lang),
    shortDescription: localized(division.shortDescription, lang),
    fullDescription: localized(division.fullDescription, lang),
    products: localizedList(division.products, lang),
    productsTitle: division.productsTitle
      ? localized(division.productsTitle, lang)
      : "",
    hero: division.hero,
    gallery: division.gallery,
  };
}

export function getDivisions(lang: Locale): readonly ResolvedDivision[] {
  return divisions.map((division) => resolveDivision(division, lang));
}

export function getDivision(slug: string, lang: Locale): ResolvedDivision | undefined {
  const division = divisions.find((item) => item.slug === slug);
  return division ? resolveDivision(division, lang) : undefined;
}

export function isDivisionSlug(slug: string): slug is DivisionSlug {
  return divisions.some((division) => division.slug === slug);
}

/** Replace {{name}}, {{college}}, {{phone}}, {{email}} and {{year}} tokens. */
export function formatText(text: string): string {
  return text
    .replaceAll("{{name}}", siteConfig.name)
    .replaceAll("{{college}}", siteConfig.collegeName)
    .replaceAll("{{phone}}", siteConfig.phoneDisplay)
    .replaceAll("{{email}}", siteConfig.email)
    .replaceAll("{{year}}", String(new Date().getFullYear()));
}
