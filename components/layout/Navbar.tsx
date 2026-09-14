'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

import Logo from '@/components/media/Logo';
import LocaleLink from '@/components/layout/LocaleLink';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import Button from '@/components/ui/Button';

const LINKS = [
  ['home', '/'],
  ['about', '/about'],
  ['team', '/team'],
  ['programs', '/programs'],
  ['projects', '/projects'],
  ['news', '/news'],
  ['gallery', '/gallery'],
  ['publications', '/publications'],
  ['partners', '/partners'],
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const currentPath =
    pathname.replace(new RegExp(`^/${locale}`), '') || '/';

  const isActive = (href: string) => {
    if (href === '/') {
      return currentPath === '/';
    }

    return (
      currentPath === href ||
      currentPath.startsWith(`${href}/`)
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-200/80 bg-white/95 shadow-md backdrop-blur-lg'
          : 'border-b border-transparent bg-white'
      }`}
    >
      <nav
        className="mx-auto flex w-full max-w-[1600px] items-center gap-6 px-5 py-3 lg:px-8 xl:gap-8"
        aria-label="Primary"
      >
        {/* Logo */}
        <LocaleLink
          href="/"
          className="focus-ring shrink-0 rounded-lg"
          aria-label="DEF Tanzania Home"
        >
          <Logo height={48} />
        </LocaleLink>

        {/* Desktop Navigation */}
        <div className="hidden min-w-0 flex-1 items-center justify-center xl:flex">
          <div className="flex items-center gap-1">
            {LINKS.map(([key, href]) => {
              const active = isActive(href);

              return (
                <LocaleLink
                  key={key}
                  href={href}
                  className={`focus-ring relative whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-semibold transition-all duration-200 ${
                    active
                      ? 'bg-brand-50 text-brand-800'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-brand-700'
                  }`}
                >
                  {t(key)}

                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-600"
                    />
                  )}
                </LocaleLink>
              );
            })}
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          {/* Language */}
          <div className="mr-1">
            <LanguageSwitcher />
          </div>

          {/* Volunteer */}
          <Button
            href="/volunteer"
            variant="ghost"
            className="!rounded-full !bg-slate-50 !px-5 !py-2.5 !text-brand-900 !ring-1 !ring-inset !ring-slate-200 hover:!bg-brand-50 hover:!ring-brand-200"
          >
            {t('volunteer')}
          </Button>

          {/* Donate */}
          <Button
            href="/donate"
            variant="secondary"
            className="!rounded-full !px-6 !py-2.5"
          >
            {t('donate')}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="focus-ring ml-auto rounded-xl p-2.5 text-brand-900 transition-colors hover:bg-brand-50 xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">
            {open ? 'Close menu' : 'Open menu'}
          </span>

          {open ? (
            <X
              className="h-6 w-6"
              aria-hidden="true"
            />
          ) : (
            <Menu
              className="h-6 w-6"
              aria-hidden="true"
            />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { height: 0, opacity: 0 }
            }
            transition={{
              duration: 0.25,
              ease: 'easeInOut',
            }}
            className="overflow-hidden border-t border-slate-200 bg-white xl:hidden"
          >
            <div className="mx-auto flex max-w-[1600px] flex-col gap-1 px-5 py-4 lg:px-8">
              {LINKS.map(([key, href]) => {
                const active = isActive(href);

                return (
                  <LocaleLink
                    key={key}
                    href={href}
                    className={`focus-ring rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                      active
                        ? 'bg-brand-50 text-brand-800'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-brand-700'
                    }`}
                  >
                    {t(key)}
                  </LocaleLink>
                );
              })}

              <div className="my-2 border-t border-slate-100" />

              {/* Mobile Volunteer */}
              <LocaleLink
                href="/volunteer"
                className="focus-ring rounded-xl px-4 py-3 text-base font-semibold text-brand-900 hover:bg-brand-50"
              >
                {t('volunteer')}
              </LocaleLink>

              {/* Mobile Donate */}
              <LocaleLink
                href="/donate"
                className="focus-ring rounded-xl bg-sun-500 px-4 py-3 text-center text-base font-semibold text-brand-950 shadow-md transition-colors hover:bg-sun-400"
              >
                {t('donate')}
              </LocaleLink>

              {/* Mobile Contact */}
              <LocaleLink
                href="/contact"
                className="focus-ring rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-700"
              >
                {t('contact')}
              </LocaleLink>

              <div className="mt-2 border-t border-slate-100 pt-3">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
