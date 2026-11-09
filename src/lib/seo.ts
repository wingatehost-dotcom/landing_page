import type { Metadata } from "next";
import { images } from "@/config/images";
import { localePath, siteConfig } from "@/config/site";
import type { Content, Locale } from "@/content/types";
import { formatText, getContent } from "@/lib/content";

type MetaKey = keyof Content["meta"];

function openGraphLocale(lang: Locale): string {
  return lang === "am" ? "am_ET" : "en_US";
}

export function buildMetadata(
  lang: Locale,
  page: MetaKey,
  path: string,
): Metadata {
  const meta = getContent(lang).meta[page];
  const title = formatText(meta.title);
  const description = formatText(meta.description);
  const canonical = localePath(lang, path);
  const enPath = localePath("en", path);
  const amPath = localePath("am", path);

  return {
    metadataBase: new URL(siteConfig.domain),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: enPath,
        am: amPath,
        "x-default": enPath,
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: openGraphLocale(lang),
      alternateLocale: lang === "en" ? "am_ET" : "en_US",
      title,
      description,
      url: canonical,
      images: [
        {
          url: images.ogImage.src,
          width: images.ogImage.width,
          height: images.ogImage.height,
          alt: formatText(images.ogImage.alt),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [images.ogImage.src],
    },
  };
}

export function buildDivisionMetadata(
  lang: Locale,
  name: string,
  description: string,
  slug: string,
): Metadata {
  const path = `/divisions/${slug}/`;
  const canonical = localePath(lang, path);
  const title = `${name} | ${siteConfig.name}`;
  const formattedDescription = formatText(description);

  return {
    metadataBase: new URL(siteConfig.domain),
    title,
    description: formattedDescription,
    alternates: {
      canonical,
      languages: {
        en: localePath("en", path),
        am: localePath("am", path),
        "x-default": localePath("en", path),
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: lang === "am" ? "am_ET" : "en_US",
      title,
      description: formattedDescription,
      url: canonical,
      images: [
        {
          url: images.ogImage.src,
          width: images.ogImage.width,
          height: images.ogImage.height,
          alt: formatText(images.ogImage.alt),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: formattedDescription,
      images: [images.ogImage.src],
    },
  };
}
