"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { localePath, siteConfig } from "@/config/site";
import type { Content } from "@/content/types";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import { ButtonLink } from "./ButtonLink";
import { LanguageSwitcher } from "./LanguageSwitcher";

type HeaderProps = {
  lang: string;
  nav: Content["nav"];
};

export function Header({ lang, nav }: HeaderProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const homePath = localePath(lang, "/");
  const isHome =
    pathname === homePath || (lang === "en" && pathname === "/");
  const transparent = isHome && !scrolled;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const isActive = (path: string) => {
    const target = localePath(lang, path);
    return path === "/"
      ? pathname === target || (lang === "en" && pathname === "/")
      : pathname.startsWith(target);
  };

  const navLinkClass = (active: boolean) =>
    cn(
      "relative inline-flex items-center gap-1 whitespace-nowrap px-2.5 py-2 text-[13px] font-medium transition-colors xl:px-3 xl:text-sm",
      transparent
        ? active
          ? "text-white"
          : "text-white/75 hover:text-white"
        : active
          ? "text-primary"
          : "text-primary/70 hover:text-primary",
      active &&
        "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-third",
    );

  const closeMobile = () => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        transparent
          ? "bg-transparent text-white"
          : "border-b border-primary/10 bg-white/90 text-primary shadow-soft backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-8xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href={homePath}
          className="flex min-w-0 items-center gap-3"
          aria-label={siteConfig.name}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-0.5 ring-1 ring-primary/5">
            <Image
              src={siteConfig.logo}
              alt={`${siteConfig.name} logo`}
              width={44}
              height={44}
              className="h-full w-full object-contain"
            />
          </span>
          <span
            className={cn(
              "hidden max-w-[10.5rem] text-[13px] font-semibold leading-[1.2] tracking-tight sm:block",
              transparent ? "text-white" : "text-primary",
            )}
          >
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center lg:flex" aria-label={nav.menu}>
          {siteConfig.nav.map((item) => (
            <Link
              key={item.key}
              href={localePath(lang, item.path)}
              aria-current={isActive(item.path) ? "page" : undefined}
              className={navLinkClass(isActive(item.path))}
            >
              {nav[item.key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher
              lang={lang}
              labels={nav}
              onDark={transparent}
            />
          </div>
          <div className="hidden xl:block">
            <ButtonLink href={localePath(lang, "/contact/")} variant="primary">
              {nav.cta}
            </ButtonLink>
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={nav.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(true)}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-lg border transition-colors lg:hidden",
              transparent
                ? "border-white/25 text-white hover:bg-white/10"
                : "border-primary/15 text-primary hover:bg-primary/5",
            )}
          >
            <Menu aria-hidden className="h-5 w-5" />
          </button>
        </div>
      </div>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {mobileOpen ? (
                <>
                  <motion.div
                    aria-hidden
                    className="fixed inset-0 z-[120] bg-primary/60 backdrop-blur-sm lg:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={closeMobile}
                  />
                  <motion.div
                    id="mobile-menu"
                    ref={dialogRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label={nav.menu}
                    className="fixed inset-y-0 right-0 z-[121] flex w-[min(88vw,22rem)] flex-col bg-primary text-white shadow-lift lg:hidden"
                    initial={reduceMotion ? false : { x: "100%" }}
                    animate={{ x: 0 }}
                    exit={reduceMotion ? undefined : { x: "100%" }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white p-0.5">
                          <Image
                            src={siteConfig.logo}
                            alt=""
                            width={40}
                            height={40}
                            className="h-full w-full object-contain"
                          />
                        </span>
                        <span className="max-w-[10rem] text-xs font-semibold leading-tight">
                          {siteConfig.name}
                        </span>
                      </div>
                      <button
                        ref={closeButtonRef}
                        type="button"
                        aria-label={nav.closeMenu}
                        onClick={closeMobile}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-white transition-colors hover:bg-white/10"
                      >
                        <X aria-hidden className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-5 py-6">
                      <motion.ul
                        initial={reduceMotion ? false : "hidden"}
                        animate="visible"
                        variants={{
                          hidden: {},
                          visible: { transition: { staggerChildren: 0.05 } },
                        }}
                        className="space-y-1"
                      >
                        {siteConfig.nav.map((item) => (
                          <motion.li
                            key={item.key}
                            variants={{
                              hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, x: 16 },
                              visible: { opacity: 1, x: 0 },
                            }}
                          >
                            <Link
                              href={localePath(lang, item.path)}
                              aria-current={isActive(item.path) ? "page" : undefined}
                              className={cn(
                                "flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors",
                                isActive(item.path)
                                  ? "bg-white/10 text-third"
                                  : "text-white/85 hover:bg-white/5 hover:text-white",
                              )}
                            >
                              {nav[item.key]}
                              <ArrowRight aria-hidden className="h-4 w-4 opacity-50" />
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>

                    <div className="border-t border-white/10 p-5">
                      <LanguageSwitcher lang={lang} labels={nav} onDark className="w-full justify-center" />
                      <div className="mt-4 flex flex-col gap-2">
                        <ButtonLink
                          href={localePath(lang, "/contact/")}
                          variant="primary"
                          className="w-full"
                          withArrow
                        >
                          {nav.cta}
                        </ButtonLink>
                        <a
                          href={`tel:${siteConfig.phone}`}
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                        >
                          <Phone aria-hidden className="h-4 w-4 text-third" />
                          {siteConfig.phoneDisplay}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </header>
  );
}
