import { GraduationCap, Microscope, Scale } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/layout/ButtonLink";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { images } from "@/config/images";
import { localePath } from "@/config/site";
import { formatText, getContent, isLocale } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type TrainingPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: TrainingPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return buildMetadata(lang, "training", "/training/");
}

const serviceIcons = [GraduationCap, Microscope, Scale] as const;

export default async function TrainingPage({ params }: TrainingPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const content = getContent(lang);
  const training = content.training;

  return (
    <>
      <PageHero
        lang={lang}
        content={content}
        crumbs={[{ label: content.nav.training }]}
        eyebrow={training.hero.eyebrow}
        title={training.hero.title}
        description={formatText(training.hero.subtitle)}
        image={images.trainingHero}
      />

      <Section>
        <Container>
          <SectionHeading
            title={training.servicesTitle}
            description={training.intro}
            align="center"
            className="mx-auto"
          />
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {training.services.map((service, index) => {
              const Icon = serviceIcons[index] ?? GraduationCap;
              return (
                <StaggerItem key={service.title} className="h-full">
                  <ServiceCard
                    icon={Icon}
                    title={service.title}
                    description={service.description}
                  />
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      <Section tone="fourth">
        <Container>
          <div className="flex flex-col items-start gap-8 rounded-xl border border-primary/10 bg-white p-8 shadow-soft sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                {training.ctaTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-primary/70">
                {training.ctaText}
              </p>
            </div>
            <ButtonLink
              href={localePath(lang, "/contact/")}
              variant="primary"
              size="lg"
              withArrow
              className="shrink-0"
            >
              {content.common.contactUs}
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
