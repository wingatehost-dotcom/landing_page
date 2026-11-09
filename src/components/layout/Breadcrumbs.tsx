import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { localePath } from "@/config/site";
import { cn } from "@/lib/cn";

export type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  lang: string;
  homeLabel: string;
  label: string;
  items: readonly Crumb[];
  onDark?: boolean;
  className?: string;
};

export function Breadcrumbs({
  lang,
  homeLabel,
  label,
  items,
  onDark = false,
  className,
}: BreadcrumbsProps) {
  const linkClass = onDark
    ? "text-fourth/70 transition-colors hover:text-third"
    : "text-primary/70 transition-colors hover:text-secondary";
  const currentClass = onDark ? "text-fourth" : "text-primary";
  const iconClass = onDark ? "text-fourth/40" : "text-primary/30";

  return (
    <nav aria-label={label} className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <li>
          <Link href={localePath(lang, "/")} className={linkClass}>
            {homeLabel}
          </Link>
        </li>
        {items.map((item) => (
          <li key={`${item.label}-${item.href ?? "current"}`} className="flex items-center gap-2">
            <ChevronRight aria-hidden className={cn("h-3.5 w-3.5", iconClass)} />
            {item.href ? (
              <Link href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={currentClass}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
