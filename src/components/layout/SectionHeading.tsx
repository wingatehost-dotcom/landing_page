"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        centered ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.2em]",
            tone === "dark" ? "text-third" : "text-secondary",
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={cn(
          "mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl",
          tone === "dark" ? "text-fourth" : "text-primary",
        )}
      >
        {title}
      </h2>

      <motion.span
        aria-hidden
        className={cn(
          "mt-5 block h-1 w-16 rounded-full bg-third",
          centered ? "origin-center" : "origin-left",
        )}
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.6, ease: EASE }}
      />

      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed text-pretty sm:text-lg",
            tone === "dark" ? "text-fourth/75" : "text-primary/70",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
