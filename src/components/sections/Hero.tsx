"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ImageAsset } from "@/config/images";
import type { Content } from "@/content/types";
import { buttonStyles } from "@/components/layout/ButtonLink";
import { Container } from "@/components/layout/Container";
import { EASE } from "@/lib/motion";

type HeroSlide = {
  readonly title: string;
  readonly description: string;
  readonly image: ImageAsset;
};

type HeroProps = {
  content: Content["home"]["hero"];
  slides: readonly HeroSlide[];
  defaultImage: ImageAsset;
  primaryHref: string;
  secondaryHref: string;
};

/** How long each rotating slide stays on screen. */
const ROTATE_MS = 6500;

export function Hero({
  content,
  slides,
  defaultImage,
  primaryHref,
  secondaryHref,
}: HeroProps) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [slidesReady, setSlidesReady] = useState(false);

  /**
   * The first paint is always the static headline and image below. Only after
   * every rotating image has loaded do we start the carousel, so a first-time
   * visitor can read and use the page while the rest of the photos download.
   */
  useEffect(() => {
    if (reduceMotion || slides.length === 0) return;

    let cancelled = false;
    const loads = slides.map(
      (slide) =>
        new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = slide.image.src;
        }),
    );

    void Promise.all(loads).then(() => {
      if (!cancelled) setSlidesReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [reduceMotion, slides]);

  useEffect(() => {
    if (reduceMotion) {
      setActiveIndex(-1);
      return;
    }
    if (!slidesReady || slides.length === 0) return;

    setActiveIndex(0);
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, ROTATE_MS);

    return () => window.clearInterval(id);
  }, [reduceMotion, slidesReady, slides.length]);

  const isDefault = activeIndex < 0;
  const current = isDefault ? undefined : slides[activeIndex] ?? slides[0];
  const title = current?.title ?? content.headline;
  const description = current?.description ?? content.subheadline;
  const image = current?.image ?? defaultImage;

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-primary text-white">
      <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={image.src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={reduceMotion ? undefined : { scale: [1, 1.06] }}
              transition={{ duration: ROTATE_MS / 1000 + 1.5, ease: "linear" }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={isDefault}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-primary/90 to-primary/40"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-primary/80 via-transparent to-primary/30"
      />
      <div aria-hidden className="surface-grid absolute inset-0 -z-10 opacity-10" />

      <Container className="relative z-10 pb-28 pt-32 sm:pb-32">
        <div className="max-w-4xl">
          <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-third">
            <span aria-hidden className="h-px w-10 bg-third" />
            {content.eyebrow}
          </span>

          <div className="mt-6 min-h-[13rem] sm:min-h-[14rem] lg:min-h-[15rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDefault ? "default" : activeIndex}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-shadow-hero sm:text-6xl lg:text-7xl">
                  {title}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-fourth/80 sm:text-lg">
                  {description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href={primaryHref}
              className={buttonStyles("primary", "lg", "group")}
            >
              <span>{content.primaryCta}</span>
              <ArrowDown
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </Link>
            <Link
              href={secondaryHref}
              className={buttonStyles("outlineLight", "lg", "group")}
            >
              <span>{content.secondaryCta}</span>
              <ArrowDown
                aria-hidden
                className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-y-0.5 group-hover:opacity-100"
              />
            </Link>
          </div>
        </div>
      </Container>

      <a
        href="#overview"
        aria-label={content.scrollCue}
        className="absolute bottom-7 left-1/2 z-10 inline-flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-fourth/65 transition-colors hover:text-third"
      >
        {content.scrollCue}
        <motion.span
          aria-hidden
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </a>
    </section>
  );
}
