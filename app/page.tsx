import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { HomeContent } from "@/components/pages/HomeContent";
import { getContent, getDivisions } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const lang = "en" as const;

export const metadata: Metadata = buildMetadata(lang, "home", "/");

/**
 * The root URL serves the English home page directly. Visitors can switch to
 * Amharic from the language control in the header.
 */
export default function RootPage() {
  const content = getContent(lang);
  const divisions = getDivisions(lang);
  const divisionLinks = divisions.map(({ slug, name }) => ({ slug, name }));

  return (
    <SiteShell lang={lang} content={content} divisions={divisionLinks}>
      <HomeContent lang={lang} content={content} divisions={divisions} />
    </SiteShell>
  );
}
