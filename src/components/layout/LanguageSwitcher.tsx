"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Content } from "@/content/types";
import { cn } from "@/lib/cn";

type LanguageSwitcherProps = {
  lang: string;
  labels: Pick<Content["nav"], "switchToAmharic" | "switchToEnglish" | "language">;
  onDark?: boolean;
  className?: string;
};

export function LanguageSwitcher({
  lang,
  labels,
  onDark = false,
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const target = (nextLang: "en" | "am") => {
    if (/^\/(en|am)(?=\/|$)/.test(pathname)) {
      return pathname.replace(/^\/(en|am)(?=\/|$)/, `/${nextLang}`);
    }
    return `/${nextLang}/`;
  };

  const activeClass = onDark
    ? "bg-fourth text-primary shadow-sm"
    : "bg-primary text-white shadow-sm";
  const idleClass = onDark
    ? "text-fourth hover:text-third"
    : "text-primary/70 hover:text-primary";

  const link = (nextLang: "en" | "am", short: string, ariaLabel: string) => {
    const active = lang === nextLang;
    return (
      <Link
        href={target(nextLang)}
        hrefLang={nextLang}
        aria-label={ariaLabel}
        aria-current={active ? "true" : undefined}
        className={cn(
          "rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
          active ? activeClass : idleClass,
        )}
      >
        {short}
      </Link>
    );
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border p-1",
        onDark
          ? "border-white/25 bg-white/10"
          : "border-primary/15 bg-primary/5",
        className,
      )}
      aria-label={labels.language}
      role="group"
    >
      {link("en", "EN", labels.switchToEnglish)}
      {link("am", "አማ", labels.switchToAmharic)}
    </div>
  );
}
