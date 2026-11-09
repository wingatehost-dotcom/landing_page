import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/layout/ButtonLink";
import { siteConfig } from "@/config/site";
import { en } from "@/content/en";
import { formatText } from "@/lib/content";

export const metadata: Metadata = {
  title: formatText(en.meta.notFound.title),
  description: formatText(en.meta.notFound.description),
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-primary px-6 py-24 text-center text-fourth">
      <div aria-hidden className="surface-grid absolute inset-0 -z-10 opacity-15" />
      <div
        aria-hidden
        className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full border-[28px] border-third/20"
      />

      <Link href="/en/" aria-label={siteConfig.name}>
        <span className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5">
          <Image
            src={siteConfig.logo}
            alt={`${siteConfig.name} logo`}
            width={80}
            height={80}
            className="h-full w-full object-contain"
            priority
          />
        </span>
      </Link>

      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-third">
        404
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        {en.notFound.title}
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-fourth/70">
        {en.notFound.description}
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/en/" variant="primary" withArrow>
          {en.notFound.primary}
        </ButtonLink>
        <ButtonLink href="/en/contact/" variant="outlineLight" withArrow>
          {en.notFound.secondary}
        </ButtonLink>
      </div>

      <div className="mt-10 flex items-center gap-4 text-xs text-fourth/50">
        <Link href="/en/" className="transition-colors hover:text-third">
          {siteConfig.languages.en}
        </Link>
        <span aria-hidden>·</span>
        <Link href="/am/" className="transition-colors hover:text-third">
          {siteConfig.languages.am}
        </Link>
      </div>
    </main>
  );
}
