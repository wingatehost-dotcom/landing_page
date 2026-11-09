import type { ReactNode } from "react";
import type { Content } from "@/content/types";
import type { ImageAsset } from "@/config/images";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Container } from "./Container";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  lang: string;
  content: Content;
  crumbs: readonly Crumb[];
  eyebrow?: string;
  title: string;
  description?: string;
  image?: ImageAsset;
  children?: ReactNode;
};

export function PageHero({
  lang,
  content,
  crumbs,
  eyebrow,
  title,
  description,
  image,
  children,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-primary pb-16 pt-32 text-white sm:pb-20 sm:pt-36">
      {image ? (
        <div className="absolute inset-0 -z-10">
          <ParallaxImage
            image={image}
            className="h-full w-full"
            sizes="100vw"
            priority
          />
        </div>
      ) : (
        <div aria-hidden className="surface-grid absolute inset-0 -z-10 opacity-20" />
      )}

      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10",
          image
            ? "bg-gradient-to-r from-primary via-primary/90 to-primary/40"
            : "bg-gradient-to-br from-primary via-primary to-secondary/70",
        )}
      />
      <div
        aria-hidden
        className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full border-[24px] border-third/20"
      />

      <Container>
        <Breadcrumbs
          lang={lang}
          homeLabel={content.common.home}
          label={content.common.breadcrumb}
          items={crumbs}
          onDark
          className="mb-8"
        />
        <div className="max-w-4xl">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-third">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance text-shadow-hero sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-fourth/80 sm:text-lg">
              {description}
            </p>
          ) : null}
          {children}
        </div>
      </Container>
    </section>
  );
}
