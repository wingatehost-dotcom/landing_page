import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DivisionCard } from "@/components/divisions/DivisionCard";
import { ButtonLink } from "@/components/layout/ButtonLink";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { divisionSlugs } from "@/content/divisions";
import { localePath } from "@/config/site";
import {
  getContent,
  getDivision,
  getDivisions,
  isLocale,
  locales,
} from "@/lib/content";
import { buildDivisionMetadata } from "@/lib/seo";

type DivisionPageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    divisionSlugs.map((slug) => ({ lang, slug })),
  );
}

export async function generateMetadata({
  params,
}: DivisionPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};

  const division = getDivision(slug, lang);
  if (!division) return {};

  return buildDivisionMetadata(
    lang,
    division.name,
    division.shortDescription,
    division.slug,
  );
}

export default async function DivisionPage({ params }: DivisionPageProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const division = getDivision(slug, lang);
  if (!division) notFound();

  const content = getContent(lang);
  const divisionPage = content.divisionPage;
  const contactHref = `${localePath(lang, "/contact/")}?division=${division.slug}`;

  /**
   * Non-soap/bakery divisions have a single confirmed photo, which is already
   * used in the page hero. Showing it again in a gallery would duplicate it,
   * so the gallery section only appears for soap and bakery, which have
   * additional distinct photos.
   */
  const galleryImages =
    division.slug === "soap" || division.slug === "bakery"
      ? division.gallery
      : [];

  const allDivisions = getDivisions(lang);
  const currentIndex = allDivisions.findIndex((item) => item.slug === division.slug);
  const otherDivisions = Array.from(
    { length: Math.min(3, allDivisions.length - 1) },
    (_, offset) => allDivisions[(currentIndex + offset + 1) % allDivisions.length],
  );

  return (
    <>
      <PageHero
        lang={lang}
        content={content}
        crumbs={[
          {
            label: content.nav.divisions,
            href: localePath(lang, "/divisions/"),
          },
          { label: division.name },
        ]}
        eyebrow={content.divisions.hero.eyebrow}
        title={division.name}
        description={division.shortDescription}
        image={division.hero}
      >
        <ButtonLink
          href={contactHref}
          variant="primary"
          size="lg"
          withArrow
          className="mt-8"
        >
          {content.common.requestService}
        </ButtonLink>
      </PageHero>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                {divisionPage.overviewTitle}
              </h2>
              <span aria-hidden className="mt-4 block h-1 w-14 rounded-full bg-third" />
              <p className="mt-6 text-base leading-relaxed text-primary/70 sm:text-lg">
                {division.fullDescription}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl border border-primary/10 bg-fourth p-7">
                <h3 className="text-lg font-semibold text-primary">
                  {divisionPage.productsTitle}
                </h3>
                <ul className="mt-5 space-y-3">
                  {division.products.map((product) => (
                    <li key={product} className="flex items-start gap-3">
                      <CheckCircle2
                        aria-hidden
                        className="mt-0.5 h-5 w-5 shrink-0 text-secondary"
                      />
                      <span className="text-sm leading-relaxed text-primary/75">
                        {product}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {galleryImages.length > 0 ? (
        <Section tone="fourth">
          <Container>
            <SectionHeading title={divisionPage.galleryTitle} />
            <div
              className={
                galleryImages.length > 1
                  ? "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  : "mx-auto mt-10 max-w-3xl"
              }
            >
              {galleryImages.map((image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl border border-primary/10 bg-primary/5"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={
                      galleryImages.length > 1
                        ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        : "(min-width: 768px) 768px, 100vw"
                    }
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section tone="primary" className="relative overflow-hidden">
        <div aria-hidden className="surface-grid absolute inset-0 opacity-10" />
        <Container className="relative">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-fourth sm:text-3xl">
                {divisionPage.requestTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-fourth/70">
                {divisionPage.requestText}
              </p>
            </div>
            <ButtonLink
              href={contactHref}
              variant="primary"
              size="lg"
              withArrow
              className="shrink-0"
            >
              {content.common.requestService}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading title={divisionPage.otherTitle} />
          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherDivisions.map((other) => (
              <StaggerItem key={other.slug} className="h-full">
                <DivisionCard
                  division={other}
                  lang={lang}
                  cta={content.divisions.cardCta}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>
    </>
  );
}
