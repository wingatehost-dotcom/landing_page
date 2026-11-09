"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

type ScaleOnHoverProps = {
  children: ReactNode;
  className?: string;
  scale?: number;
  lift?: number;
};

export function ScaleOnHover({
  children,
  className,
  scale = 1.02,
  lift = 4,
}: ScaleOnHoverProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={reduceMotion ? undefined : { scale, y: -lift }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
