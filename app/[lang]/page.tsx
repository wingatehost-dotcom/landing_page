import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeContent } from "@/components/pages/HomeContent";
import { getContent, getDivisions, isLocale } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type HomePageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return buildMetadata(lang, "home", "/");
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const content = getContent(lang);
  const divisions = getDivisions(lang);

  return (
    <HomeContent lang={lang} content={content} divisions={divisions} />
  );
}
