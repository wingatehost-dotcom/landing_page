"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { ImageAsset } from "@/config/images";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import { Lightbox } from "./Lightbox";

export type GalleryItem = {
  id: string;
  image: ImageAsset;
  divisionName: string;
  divisionSlug: string;
};

type GalleryFilter = {
  slug: string;
  name: string;
};

type GalleryLabels = {
  filterLabel: string;
  all: string;
  empty: string;
  close: string;
  previous: string;
  next: string;
  viewImage: string;
  imageCounter: string;
};

type GalleryProps = {
  items: readonly GalleryItem[];
  filters: readonly GalleryFilter[];
  labels: GalleryLabels;
};

export function Gallery({ items, filters, labels }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? items
        : items.filter((item) => item.divisionSlug === activeFilter),
    [activeFilter, items],
  );

  const filterButton = (value: string, label: string) => {
    const active = activeFilter === value;
    return (
      <button
        key={value}
        type="button"
        aria-pressed={active}
        onClick={() => {
          setActiveFilter(value);
          setActiveIndex(null);
        }}
        className={cn(
          "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
          active
            ? "border-primary bg-primary text-white"
            : "border-primary/15 bg-white text-primary/70 hover:border-primary/35 hover:text-primary",
        )}
      >
        {label}
      </button>
    );
  };

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={labels.filterLabel}
      >
        {filterButton("all", labels.all)}
        {filters.map((filter) => filterButton(filter.slug, filter.name))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 rounded-xl border border-dashed border-primary/20 bg-fourth px-6 py-12 text-center text-sm text-primary/70">
          {labels.empty}
        </p>
      ) : (
        <motion.div layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((item, index) => (
              <motion.button
                key={item.id}
                layout
                type="button"
                onClick={() => setActiveIndex(index)}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-primary/10 bg-primary/5 text-left"
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      {item.divisionName}
                    </span>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-white/70">
                      <Maximize2 aria-hidden className="h-3.5 w-3.5" />
                      {labels.viewImage}
                    </span>
                  </span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>
        {activeIndex !== null ? (
          <Lightbox
            items={filtered}
            index={activeIndex}
            onIndexChange={setActiveIndex}
            onClose={() => setActiveIndex(null)}
            labels={{
              close: labels.close,
              previous: labels.previous,
              next: labels.next,
              imageCounter: labels.imageCounter,
            }}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
