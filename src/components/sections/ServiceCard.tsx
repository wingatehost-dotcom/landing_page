import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export function ServiceCard({
  icon: Icon,
  title,
  description,
  className,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-xl border border-primary/10 bg-white p-7 shadow-soft transition-colors duration-300 hover:border-secondary/40",
        className,
      )}
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
        <Icon aria-hidden className="h-6 w-6" />
      </span>
      <h3 className="mt-5 text-lg font-semibold leading-snug text-primary">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-primary/70">{description}</p>
    </div>
  );
}
