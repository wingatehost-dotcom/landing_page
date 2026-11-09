import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BackToTop } from "@/components/layout/BackToTop";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { PageTransition } from "@/components/motion/PageTransition";
import type { Content, Locale } from "@/content/types";

type DivisionLink = {
  slug: string;
  name: string;
};

type SiteShellProps = {
  lang: Locale;
  content: Content;
  divisions: readonly DivisionLink[];
  children: React.ReactNode;
};

/**
 * Shared chrome for every public page. Used by the `/en` and `/am` layouts and
 * by the root `/` page, which renders the English home page directly.
 */
export function SiteShell({ lang, content, divisions, children }: SiteShellProps) {
  return (
    <>
      <ScrollProgress />
      <a
        href="#main"
        className="sr-only rounded-full bg-third px-5 py-3 text-sm font-semibold text-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90]"
      >
        {content.common.skipToContent}
      </a>
      <Header lang={lang} nav={content.nav} />
      <PageTransition>
        <main id="main">{children}</main>
      </PageTransition>
      <Footer lang={lang} content={content} divisions={divisions} />
      <BackToTop label={content.common.backToTop} />
    </>
  );
}
