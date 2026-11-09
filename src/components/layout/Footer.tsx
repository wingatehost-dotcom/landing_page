import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "@/components/icons/SocialIcon";
import { localePath, siteConfig } from "@/config/site";
import type { Content } from "@/content/types";
import { formatText } from "@/lib/content";
import { Container } from "./Container";

type FooterProps = {
  lang: string;
  content: Content;
  divisions: readonly { slug: string; name: string }[];
};

export function Footer({ lang, content, divisions }: FooterProps) {
  return (
    <footer className="border-t-4 border-third bg-primary text-fourth">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href={localePath(lang, "/")}
              className="inline-flex items-center gap-3"
              aria-label={siteConfig.name}
            >
              <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-white p-1">
                <Image
                  src={siteConfig.logo}
                  alt={`${siteConfig.name} logo`}
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="max-w-[13rem] text-sm font-semibold leading-tight">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-fourth/70">
              {formatText(content.footer.blurb)}
            </p>

            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-third">
                {content.common.followUs}
              </p>
              <div className="mt-3 flex items-center gap-2">
                {siteConfig.socials.map((social) => {
                  if (!social.href) {
                    return (
                      <span
                        key={social.name}
                        title={`${social.name}: profile link to be confirmed`}
                        aria-label={`${social.name}: profile link to be confirmed`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/55"
                      >
                        <SocialIcon name={social.icon} className="h-4 w-4" />
                      </span>
                    );
                  }
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-third hover:text-third"
                    >
                      <SocialIcon name={social.icon} className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-third">
              {content.footer.quickLinks}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.nav.map((item) => (
                <li key={item.key}>
                  <Link
                    href={localePath(lang, item.path)}
                    className="text-sm text-fourth/70 transition-colors hover:text-third"
                  >
                    {content.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-third">
              {content.footer.divisionsTitle}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {divisions.map((division) => (
                <li key={division.slug}>
                  <Link
                    href={localePath(lang, `/divisions/${division.slug}/`)}
                    className="text-sm leading-snug text-fourth/70 transition-colors hover:text-third"
                  >
                    {division.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-third">
              {content.footer.contactTitle}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-fourth/70">
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-start gap-3 transition-colors hover:text-third"
                >
                  <Phone aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-third" />
                  <span>{siteConfig.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-start gap-3 break-all transition-colors hover:text-third"
                >
                  <Mail aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-third" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-third"
                >
                  <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-third" />
                  <span>
                    {siteConfig.address || content.contact.addressPending}
                  </span>
                </a>
              </li>
              {siteConfig.workingHours ? (
                <li className="pl-7">{siteConfig.workingHours}</li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-fourth/55 sm:flex-row sm:items-center sm:justify-between">
          <p>{formatText(content.footer.rights)}</p>
          <p className="text-fourth/40">
            {siteConfig.tagline}
          </p>
        </div>
      </Container>
    </footer>
  );
}
