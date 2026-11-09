import { GraduationCap, Microscope, Scale } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DivisionCard } from "@/components/divisions/DivisionCard";
import { ButtonLink } from "@/components/layout/ButtonLink";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CTABanner } from "@/components/sections/CTABanner";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { images } from "@/config/images";
import { localePath, siteConfig } from "@/config/site";
import { formatText, getContent, getDivisions, isLocale } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type ServicesPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return buildMetadata(lang, "services", "/services/");
}

const programIcons = [GraduationCap, Microscope, Scale] as const;

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const content = getContent(lang);
  const divisions = getDivisions(lang);
  const services = content.services;

  return (
    <>
      <PageHero
        lang={lang}
        content={content}
        crumbs={[{ label: content.nav.services }]}
        eyebrow={services.hero.eyebrow}
        title={services.hero.title}
        description={formatText(services.hero.subtitle)}
        image={images.divisionsHero}
      />

      <Section>
        <Container>
          <SectionHeading
            title={services.divisionsTitle}
            description={services.divisionsDescription}
            align="center"
            className="mx-auto"
          />
          <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-primary/70">
            {formatText(services.intro)}
          </p>

          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {divisions.map((division) => (
              <StaggerItem key={division.slug} className="h-full">
                <DivisionCard
                  division={division}
                  lang={lang}
                  cta={content.divisions.cardCta}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section tone="fourth">
        <Container>
          <SectionHeading
            title={services.programsTitle}
            description={services.programsDescription}
            align="center"
            className="mx-auto"
          />

          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {content.training.services.map((service, index) => {
              const Icon = programIcons[index] ?? GraduationCap;
              return (
                <StaggerItem key={service.title} className="h-full">
                  <ServiceCard
                    icon={Icon}
                    title={service.title}
                    description={service.description}
                    className="bg-white"
                  />
                </StaggerItem>
              );
            })}
          </Stagger>

          <div className="mt-10 flex justify-center">
            <ButtonLink
              href={localePath(lang, "/training/")}
              variant="outline"
              withArrow
            >
              {services.programsCta}
            </ButtonLink>
          </div>
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
