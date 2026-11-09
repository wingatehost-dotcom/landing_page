import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { GalleryItem } from "@/components/gallery/Gallery";
import { Gallery } from "@/components/gallery/Gallery";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABanner } from "@/components/sections/CTABanner";
import { FadeIn } from "@/components/motion/FadeIn";
import { images } from "@/config/images";
import { localePath, siteConfig } from "@/config/site";
import { formatText, getContent, getDivisions, isLocale } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type GalleryPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: GalleryPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return buildMetadata(lang, "gallery", "/gallery/");
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const content = getContent(lang);
  const divisions = getDivisions(lang);

  const items: GalleryItem[] = divisions.flatMap((division) =>
    division.gallery.map((image, index) => ({
      id: `${division.slug}-${index}`,
      image,
      divisionName: division.name,
      divisionSlug: division.slug,
    })),
  );

  const filters = divisions
    .filter((division) => division.gallery.length > 0)
    .map((division) => ({ slug: division.slug, name: division.name }));

  return (
    <>
      <PageHero
        lang={lang}
        content={content}
        crumbs={[{ label: content.nav.gallery }]}
        eyebrow={content.gallery.hero.eyebrow}
        title={content.gallery.hero.title}
        description={content.gallery.hero.subtitle}
        image={images.galleryHero}
      />

      <Section>
        <Container>
          <FadeIn>
            <Gallery
              items={items}
              filters={filters}
              labels={{
                filterLabel: content.gallery.filterLabel,
                all: content.common.all,
                empty: content.gallery.empty,
                close: content.common.close,
                previous: content.common.previous,
                next: content.common.next,
                viewImage: content.common.viewImage,
                imageCounter: content.common.imageCounter,
              }}
            />
          </FadeIn>
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
