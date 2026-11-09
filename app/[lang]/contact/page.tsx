import { Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { SocialIcon } from "@/components/icons/SocialIcon";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Accordion } from "@/components/sections/Accordion";
import { FadeIn } from "@/components/motion/FadeIn";
import { siteConfig } from "@/config/site";
import { getContent, getDivisions, isLocale } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type ContactPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return buildMetadata(lang, "contact", "/contact/");
}

function FormFallback() {
  return (
    <div className="animate-pulse rounded-xl border border-primary/10 bg-white p-6 shadow-soft sm:p-8">
      <div className="h-4 w-1/3 rounded bg-primary/10" />
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="h-11 rounded-lg bg-primary/5" />
        ))}
        <div className="h-11 rounded-lg bg-primary/5 sm:col-span-2" />
        <div className="h-28 rounded-lg bg-primary/5 sm:col-span-2" />
      </div>
      <div className="mt-6 h-11 w-40 rounded-full bg-primary/10" />
    </div>
  );
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const content = getContent(lang);
  const contact = content.contact;
  const divisions = getDivisions(lang).map(({ slug, name }) => ({ slug, name }));

  const details = [
    {
      icon: Phone,
      label: content.common.phone,
      value: siteConfig.phoneDisplay,
      href: `tel:${siteConfig.phone}`,
    },
    {
      icon: Mail,
      label: content.common.email,
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
  ] as const;

  return (
    <>
      <PageHero
        lang={lang}
        content={content}
        crumbs={[{ label: content.nav.contact }]}
        eyebrow={contact.hero.eyebrow}
        title={contact.hero.title}
        description={contact.hero.subtitle}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading title={contact.detailsTitle} />

              <ul className="mt-8 space-y-4">
                {details.map((detail) => {
                  const Icon = detail.icon;
                  return (
                    <li key={detail.label}>
                      <a
                        href={detail.href}
                        className="group flex items-start gap-4 rounded-xl border border-primary/10 bg-white p-5 shadow-soft transition-colors hover:border-secondary/40"
                      >
                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                          <Icon aria-hidden className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
                            {detail.label}
                          </span>
                          <span className="mt-1 block break-words text-base font-semibold text-primary transition-colors group-hover:text-secondary">
                            {detail.value}
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}

                <li className="flex items-start gap-4 rounded-xl border border-primary/10 bg-white p-5 shadow-soft">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <MapPin aria-hidden className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
                      {content.common.address}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-primary/75">
                      {siteConfig.address || contact.addressPending}
                    </span>
                  </span>
                </li>

                <li className="flex items-start gap-4 rounded-xl border border-primary/10 bg-white p-5 shadow-soft">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <Clock aria-hidden className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
                      {content.common.workingHours}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-primary/75">
                      {siteConfig.workingHours || contact.hoursPending}
                    </span>
                  </span>
                </li>
              </ul>

              <div className="mt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">
                  {content.common.followUs}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  {siteConfig.socials.map((social) =>
                    social.href ? (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 text-primary/70 transition-colors hover:border-secondary hover:text-secondary"
                      >
                        <SocialIcon name={social.icon} className="h-4 w-4" />
                      </a>
                    ) : (
                      <span
                        key={social.name}
                        title={`${social.name}: profile link to be confirmed`}
                        aria-label={`${social.name}: profile link to be confirmed`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 text-primary/30"
                      >
                        <SocialIcon name={social.icon} className="h-4 w-4" />
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div className="mt-10 overflow-hidden rounded-xl border border-primary/10 bg-fourth shadow-soft">
                {siteConfig.mapEmbedUrl ? (
                  <iframe
                    title={contact.mapTitle}
                    src={siteConfig.mapEmbedUrl}
                    className="h-72 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="flex h-72 flex-col items-center justify-center px-6 text-center">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/5 text-secondary">
                      <MapPin aria-hidden className="h-6 w-6" />
                    </span>
                    <p className="mt-4 text-sm font-semibold text-primary">
                      {contact.mapTitle}
                    </p>
                    <p className="mt-2 max-w-xs text-xs leading-relaxed text-primary/70">
                      {contact.mapPending}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-7">
              <SectionHeading
                title={contact.formTitle}
                description={contact.formSubtitle}
              />
              <FadeIn className="mt-8">
                <Suspense fallback={<FormFallback />}>
                  <ContactForm
                    lang={lang}
                    content={content.form}
                    divisions={divisions}
                    optionalLabel={content.common.optional}
                    privacyNote={contact.privacyNote}
                    backToHome={content.notFound.primary}
                  />
                </Suspense>
              </FadeIn>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="fourth">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow={content.faq.eyebrow}
                title={contact.faqTitle}
              />
              <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-secondary">
                <MessageSquare aria-hidden className="h-4 w-4" />
                {content.contact.intro}
              </p>
            </div>
            <div className="lg:col-span-8">
              <Accordion items={content.faq.items} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
