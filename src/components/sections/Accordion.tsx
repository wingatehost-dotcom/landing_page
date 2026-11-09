"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import type { FaqItem } from "@/content/types";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";

type AccordionProps = {
  items: readonly FaqItem[];
  className?: string;
};

export function Accordion({ items, className }: AccordionProps) {
  const uid = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "divide-y divide-primary/10 overflow-hidden rounded-xl border border-primary/10 bg-white shadow-soft",
        className,
      )}
    >
      {items.map((item, index) => {
        const open = openIndex === index;
        const triggerId = `${uid}-trigger-${index}`;
        const panelId = `${uid}-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-fourth sm:px-6"
              >
                <span className="text-base font-semibold leading-snug text-primary">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                    open
                      ? "border-third bg-third text-primary"
                      : "border-primary/15 text-secondary",
                  )}
                >
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-6 pr-12 text-sm leading-relaxed text-primary/70 sm:px-6">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
