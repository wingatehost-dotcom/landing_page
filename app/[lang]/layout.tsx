import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { getContent, getDivisions, isLocale, locales } from "@/lib/content";

type LangLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const content = getContent(lang);
  const divisions = getDivisions(lang).map(({ slug, name }) => ({ slug, name }));

  return (
    <SiteShell lang={lang} content={content} divisions={divisions}>
      {children}
    </SiteShell>
  );
}
