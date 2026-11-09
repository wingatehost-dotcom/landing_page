import {
  Compass,
  Factory,
  GraduationCap,
  Lightbulb,
  Target,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/layout/ButtonLink";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CTABanner } from "@/components/sections/CTABanner";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { images } from "@/config/images";
import { localePath, siteConfig } from "@/config/site";
import { formatText, getContent, isLocale } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type AboutPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return buildMetadata(lang, "about", "/about/");
}

const focusIcons = [GraduationCap, Factory, Lightbulb] as const;

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const content = getContent(lang);
  const about = content.about;

  return (
    <>
      <PageHero
        lang={lang}
        content={content}
        crumbs={[{ label: content.nav.about }]}
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        description={formatText(about.hero.subtitle)}
        image={images.aboutHero}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-pretty text-primary/80 sm:text-xl">
                {formatText(about.intro)}
              </p>

              <h2 className="mt-14 text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                {about.storyTitle}
              </h2>
              <span aria-hidden className="mt-4 block h-1 w-14 rounded-full bg-third" />
              <div className="mt-6 space-y-5">
                {about.story.map((paragraph) => (
                  <p
                    key={formatText(paragraph).slice(0, 40)}
                    className="text-base leading-relaxed text-primary/70"
                  >
                    {formatText(paragraph)}
                  </p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <ParallaxImage
                  image={images.aboutStory}
                  className="aspect-[4/5] rounded-xl shadow-lift"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <div className="mt-5 rounded-xl border border-primary/10 bg-fourth p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                    {about.visionTitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-primary/75">
                    {formatText(about.visionText)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="fourth">
        <Container>
          <SectionHeading
            title={about.focusTitle}
            align="center"
            className="mx-auto"
          />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {about.focus.map((item, index) => {
              const Icon = focusIcons[index] ?? Lightbulb;
              return (
                <StaggerItem key={item.title} className="h-full">
                  <ServiceCard
                    icon={Icon}
                    title={item.title}
                    description={item.description}
                    className="bg-white"
                  />
                </StaggerItem>
              );
            })}
          </Stagger>

          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            <FadeIn className="h-full">
              <div className="flex h-full flex-col rounded-xl border border-primary/10 bg-white p-8 shadow-soft">
                <Target aria-hidden className="h-7 w-7 text-secondary" />
                <h3 className="mt-5 text-xl font-semibold text-primary">
                  {about.visionTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-primary/70">
                  {formatText(about.visionText)}
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.08} className="h-full">
              <div className="flex h-full flex-col rounded-xl border border-primary/10 bg-white p-8 shadow-soft">
                <Compass aria-hidden className="h-7 w-7 text-secondary" />
                <h3 className="mt-5 text-xl font-semibold text-primary">
                  {about.missionTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-primary/70">
                  {formatText(about.missionText)}
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            title={about.valuesTitle}
            description={about.valuesIntro}
            align="center"
            className="mx-auto"
          />
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {about.values.map((value, index) => (
              <StaggerItem key={value.title} className="h-full">
                <div className="h-full rounded-xl border border-primary/10 bg-white p-7 shadow-soft">
                  <span className="text-xs font-semibold tabular-nums text-third">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-primary">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary/70">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section tone="primary" className="relative overflow-hidden">
        <div aria-hidden className="surface-grid absolute inset-0 opacity-10" />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow={siteConfig.collegeName}
                title={about.collegeTitle}
                description={formatText(about.collegeText)}
                tone="dark"
              />
              <ButtonLink
                href={localePath(lang, "/contact/")}
                variant="outlineLight"
                withArrow
                className="mt-8"
              >
                {content.common.contactUs}
              </ButtonLink>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center sm:p-10">
              <span className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-white p-2">
                <Image
                  src={siteConfig.logo}
                  alt={`${siteConfig.name} logo`}
                  width={96}
                  height={96}
                  className="h-full w-full object-contain"
                />
              </span>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-third">
                {siteConfig.shortName}
              </p>
              <p className="mt-2 text-lg font-medium leading-snug text-fourth">
                {siteConfig.tagline}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {siteConfig.showTeam && siteConfig.team.length > 0 ? (
        <Section tone="fourth">
          <Container>
            <SectionHeading
              title={about.teamTitle}
              align="center"
              className="mx-auto"
            />            <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {siteConfig.team.map((member) => (
                <StaggerItem key={member.name} className="h-full">
                  <div className="h-full rounded-xl border border-primary/10 bg-white p-6 text-center shadow-soft">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                      <Users aria-hidden className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-primary">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-primary/70">{member.role}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      ) : null}

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
