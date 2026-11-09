import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScaleOnHover } from "@/components/motion/ScaleOnHover";
import { localePath } from "@/config/site";
import type { ResolvedDivision } from "@/lib/content";

type DivisionCardProps = {
  division: ResolvedDivision;
  lang: string;
  cta: string;
  priority?: boolean;
};

export function DivisionCard({ division, lang, cta, priority = false }: DivisionCardProps) {
  return (
    <ScaleOnHover className="h-full">
      <Link
        href={localePath(lang, `/divisions/${division.slug}/`)}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-primary/10 bg-white shadow-soft transition-colors duration-300 hover:border-third/60"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={division.hero.src}
            alt={division.hero.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg font-semibold leading-snug text-primary">
            {division.name}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-primary/70">
            {division.shortDescription}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
            {cta}
            <ArrowRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </ScaleOnHover>
  );
}
