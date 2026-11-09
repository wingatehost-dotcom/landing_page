import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "white" | "fourth" | "primary";

type SectionProps = {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  id?: string;
};

const tones: Record<Tone, string> = {
  white: "bg-white text-primary",
  fourth: "bg-fourth text-primary",
  primary: "bg-primary text-fourth",
};

export function Section({ children, className, tone = "white", id }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 sm:py-24", tones[tone], className)}>
      {children}
    </section>
  );
}
