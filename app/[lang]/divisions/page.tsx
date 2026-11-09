import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DivisionCard } from "@/components/divisions/DivisionCard";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CTABanner } from "@/components/sections/CTABanner";
import { images } from "@/config/images";
import { localePath, siteConfig } from "@/config/site";
import { formatText, getContent, getDivisions, isLocale } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type DivisionsPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: DivisionsPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return buildMetadata(lang, "divisions", "/divisions/");
}

export default async function DivisionsPage({ params }: DivisionsPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const content = getContent(lang);
  const divisions = getDivisions(lang);

  return (
    <>
      <PageHero
        lang={lang}
        content={content}
        crumbs={[{ label: content.nav.divisions }]}
        eyebrow={content.divisions.hero.eyebrow}
        title={content.divisions.hero.title}
        description={content.divisions.hero.description}
        image={images.divisionsHero}
      />

      <Section>
        <Container>
          <p className="max-w-2xl text-lg leading-relaxed text-primary/70">
            {content.divisions.intro}
          </p>

          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {divisions.map((division, index) => (
              <StaggerItem key={division.slug} className="h-full">
                <DivisionCard
                  division={division}
                  lang={lang}
                  cta={content.divisions.cardCta}
                  priority={index < 3}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <CTABanner
        title={content.home.cta.title}
        primaryLabel={content.home.cta.primary}
        primaryHref={localePath(lang, "/contact/")}
        secondaryLabel={formatText(content.home.cta.secondary)}
        secondaryHref={`tel:${siteConfig.phone}`}
      />
    </>
  );
}
