import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const base = siteConfig.domain.replace(/\/+$/, "");

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
