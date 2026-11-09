import {
  BadgeCheck,
  BadgeDollarSign,
  CheckCircle2,
  Compass,
  HeartHandshake,
  Landmark,
  PackageCheck,
  Target,
  Users,
} from "lucide-react";
import Image from "next/image";
import { DivisionCard } from "@/components/divisions/DivisionCard";
import { ButtonLink } from "@/components/layout/ButtonLink";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CTABanner } from "@/components/sections/CTABanner";
import { Hero } from "@/components/sections/Hero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { StatsCounter } from "@/components/sections/StatsCounter";
import { images } from "@/config/images";
import { localePath, siteConfig } from "@/config/site";
import type { Content, Locale } from "@/content/types";
import { formatText, type ResolvedDivision } from "@/lib/content";

type HomeContentProps = {
  lang: Locale;
  content: Content;
  divisions: readonly ResolvedDivision[];
};

const overviewIcons = [BadgeDollarSign, BadgeCheck, PackageCheck] as const;
const audienceIcons = [Landmark, HeartHandshake, Users] as const;

/**
 * The complete home page body. Shared by `/` (English) and `/[lang]/`.
 */
export function HomeContent({ lang, content, divisions }: HomeContentProps) {
  const home = content.home;

  return (
    <>
      <Hero
        content={{
          ...home.hero,
          subheadline: formatText(home.hero.subheadline),
        }}
        slides={home.hero.slides.map((slide) => ({
          title: slide.title,
          description: formatText(slide.description),
          image: images.divisions[slide.division].hero,
        }))}
        defaultImage={images.homeHero}
        primaryHref={localePath(lang, "/divisions/")}
        secondaryHref={localePath(lang, "/contact/")}
      />

      <Section id="overview" tone="fourth" className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={home.overview.eyebrow}
            title={home.overview.title}
            align="center"
            className="mx-auto"
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-3">
            {home.overview.items.map((item, index) => {
              const Icon = overviewIcons[index] ?? BadgeCheck;
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
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow={home.divisions.eyebrow}
              title={home.divisions.title}
              description={home.divisions.description}
            />
            <ButtonLink
              href={localePath(lang, "/divisions/")}
              variant="outline"
              withArrow
              className="shrink-0"
            >
              {home.divisions.cta}
            </ButtonLink>
          </div>

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

      <Section tone="primary" className="relative overflow-hidden">
        <div aria-hidden className="surface-grid absolute inset-0 opacity-10" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow={home.visionMission.eyebrow}
                title={home.visionMission.title}
                description={formatText(home.visionMission.promise)}
                tone="dark"
              />
              <ButtonLink
                href={localePath(lang, "/about/")}
                variant="outlineLight"
                withArrow
                className="mt-8"
              >
                {home.visionMission.cta}
              </ButtonLink>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FadeIn className="h-full">
                <div className="h-full rounded-xl border border-white/10 bg-white/5 p-7">
                  <Target aria-hidden className="h-7 w-7 text-third" />
                  <h3 className="mt-5 text-lg font-semibold text-fourth">
                    {home.visionMission.visionTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fourth/70">
                    {formatText(home.visionMission.visionText)}
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.08} className="h-full">
                <div className="h-full rounded-xl border border-white/10 bg-white/5 p-7">
                  <Compass aria-hidden className="h-7 w-7 text-third" />
                  <h3 className="mt-5 text-lg font-semibold text-fourth">
                    {home.visionMission.missionTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fourth/70">
                    {formatText(home.visionMission.missionText)}
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </Section>

      {siteConfig.showStats ? (
        <Section tone="primary" className="border-t border-white/10">
          <Container>
            <SectionHeading
              eyebrow={home.stats.eyebrow}
              title={home.stats.title}
              description={home.stats.description}
              tone="dark"
              align="center"
              className="mx-auto"
            />
            <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
              {siteConfig.stats.map((stat) => (
                <StatsCounter
                  key={stat.labelKey}
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  label={home.stats.items[stat.labelKey]}
                />
              ))}
            </div>
            <p className="mt-10 text-center text-xs text-fourth/50">
              {home.stats.note}
            </p>
          </Container>
        </Section>
      ) : null}

      <Section tone="fourth">
        <Container>
          <SectionHeading
            eyebrow={home.audience.eyebrow}
            title={home.audience.title}
            description={home.audience.description}
            align="center"
            className="mx-auto"
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-3">
            {home.audience.items.map((item, index) => {
              const Icon = audienceIcons[index] ?? Users;
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
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow={home.why.eyebrow}
            title={home.why.title}
            align="center"
            className="mx-auto"
          />
          <Stagger className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {home.why.items.map((item) => (
              <StaggerItem key={item.title} className="flex gap-4">
                <CheckCircle2
                  aria-hidden
                  className="mt-0.5 h-6 w-6 shrink-0 text-secondary"
                />
                <div>
                  <h3 className="text-base font-semibold text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary/70">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {siteConfig.partners.length > 0 ? (
        <Section tone="fourth" className="py-14">
          <Container>
            <SectionHeading
              eyebrow={home.partners.title}
              title={home.partners.description}
              align="center"
              className="mx-auto"
            />
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
              {siteConfig.partners.map((partner) => (
                <Image
                  key={partner.name}
                  src={partner.logo}
                  alt={partner.name}
                  width={140}
                  height={60}
                  className="h-14 w-auto object-contain opacity-80"
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CTABanner
        title={home.cta.title}
        primaryLabel={home.cta.primary}
        primaryHref={localePath(lang, "/contact/")}
        secondaryLabel={formatText(home.cta.secondary)}
        secondaryHref={`tel:${siteConfig.phone}`}
      />
    </>
  );
}
