"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { ImageAsset } from "@/config/images";
import { cn } from "@/lib/cn";

type ParallaxImageProps = {
  image: ImageAsset;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Extra classes for the <img> element (e.g. object position). */
  imageClassName?: string;
  strength?: number;
};

export function ParallaxImage({
  image,
  className,
  sizes = "100vw",
  priority = false,
  imageClassName,
  strength = 6,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${strength}%`, `${strength}%`],
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 scale-[1.14]"
        style={reduceMotion ? undefined : { y }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className={cn("object-cover", imageClassName)}
        />
      </motion.div>
    </div>
  );
}
