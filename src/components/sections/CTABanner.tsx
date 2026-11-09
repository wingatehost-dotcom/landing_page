import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/layout/ButtonLink";

type CTABannerProps = {
  title: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTABanner({
  title,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTABannerProps) {
  return (
    <section className="relative isolate overflow-hidden bg-primary py-20 text-white sm:py-24">
      <div aria-hidden className="surface-grid absolute inset-0 -z-10 opacity-15" />
      <div
        aria-hidden
        className="absolute -left-24 top-1/2 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-third/15 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-20 bottom-0 -z-10 h-80 w-80 rounded-full bg-secondary/30 blur-3xl"
      />

      <Container>
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <span aria-hidden className="block h-1 w-16 rounded-full bg-third" />
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {title}
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primaryHref} variant="primary" size="md" withArrow>
              {primaryLabel}
            </ButtonLink>
            {secondaryLabel && secondaryHref ? (
              <ButtonLink
                href={secondaryHref}
                variant="outlineLight"
                size="md"
                withArrow
              >
                {secondaryLabel}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
