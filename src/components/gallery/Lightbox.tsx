"use client";

import { motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import type { GalleryItem } from "./Gallery";
import { EASE } from "@/lib/motion";

type LightboxLabels = {
  close: string;
  previous: string;
  next: string;
  imageCounter: string;
};

type LightboxProps = {
  items: readonly GalleryItem[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  labels: LightboxLabels;
};

export function Lightbox({
  items,
  index,
  onIndexChange,
  onClose,
  labels,
}: LightboxProps) {
  const reduceMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const item = items[index];

  const goPrevious = useCallback(() => {
    onIndexChange((index - 1 + items.length) % items.length);
  }, [index, items.length, onIndexChange]);

  const goNext = useCallback(() => {
    onIndexChange((index + 1) % items.length);
  }, [index, items.length, onIndexChange]);

  useEffect(() => {
    closeRef.current?.focus();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrevious();
      if (event.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [goNext, goPrevious, onClose]);

  if (!item) return null;

  const counter = labels.imageCounter
    .replace("{{current}}", String(index + 1))
    .replace("{{total}}", String(items.length));

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.divisionName}
      className="fixed inset-0 z-[100] flex flex-col bg-primary/95 backdrop-blur-sm"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-4 text-fourth sm:px-6">
        <p className="text-sm font-medium text-fourth/80">{counter}</p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
        >
          <X aria-hidden className="h-5 w-5" />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-16"
        onClick={(event) => event.stopPropagation()}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (touchStartX.current === null) return;
          const delta =
            (event.changedTouches[0]?.clientX ?? touchStartX.current) -
            touchStartX.current;
          if (Math.abs(delta) > 50) {
            if (delta > 0) goPrevious();
            else goNext();
          }
          touchStartX.current = null;
        }}
      >
        <motion.div
          key={item.id}
          className="relative h-full w-full max-w-6xl"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </motion.div>

        <button
          type="button"
          onClick={goPrevious}
          aria-label={labels.previous}
          className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-primary/60 text-white transition-colors hover:bg-white/15 sm:left-4"
        >
          <ChevronLeft aria-hidden className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label={labels.next}
          className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-primary/60 text-white transition-colors hover:bg-white/15 sm:right-4"
        >
          <ChevronRight aria-hidden className="h-6 w-6" />
        </button>
      </div>

      <div
        className="border-t border-white/10 px-4 py-4 text-center sm:px-6"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-sm font-semibold text-third">{item.divisionName}</p>
        <p className="mt-1 text-xs text-fourth/60">{item.image.alt}</p>
      </div>
    </motion.div>
  );
}
