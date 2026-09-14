'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

import Logo from '@/components/media/Logo';
import LocaleLink from '@/components/layout/LocaleLink';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import Button from '@/components/ui/Button';

const ABOUT_LINKS = [
  ['about', '/about'],
  ['team', '/team'],
] as const;

const PROGRAM_LINKS = [
  ['programs', '/programs'],
  ['projects', '/projects'],
] as const;

const NEWS_LINKS = [
  ['news', '/news'],
  ['gallery', '/gallery'],
  ['publications', '/publications'],
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setDesktopDropdown(null);
  }, [pathname]);

  const isActive = (href: string) => {
    const cleanPath = pathname.replace(/^\/(en|sw)/, '') || '/';

    if (href === '/') {
      return cleanPath === '/';
    }

    return cleanPath === href || cleanPath.startsWith(`${href}/`);
  };

  const navItemClass = (active = false) =>
    `focus-ring inline-flex items-center rounded-xl px-3 py-2 text-[15px] font-semibold transition-all duration-200 ${
      active
        ? 'bg-brand-100 text-brand-900 shadow-sm'
        : 'text-slate-700 hover:bg-brand-50 hover:text-brand-800'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md'
          : 'bg-white'
      }`}
    >
      <nav
        className="mx-auto flex w-full max-w-[1600px] items-center gap-5 px-5 py-3 sm:px-8 lg:px-10"
        aria-label="Primary"
      >
        {/* LOGO */}
        <LocaleLink
          href="/"
          className="focus-ring flex shrink-0 items-center rounded-md"
        >
          <Logo height={48} />
        </LocaleLink>

        {/* DESKTOP NAVIGATION */}
        <div className="ml-auto hidden items-center gap-1 xl:flex">
          {/* HOME */}
          <LocaleLink
            href="/"
            className={navItemClass(isActive('/'))}
          >
            {t('home')}
          </LocaleLink>

          {/* ABOUT DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setDesktopDropdown('about')}
            onMouseLeave={() => setDesktopDropdown(null)}
          >
            <button
              type="button"
              className={navItemClass(
                isActive('/about') || isActive('/team'),
              )}
              aria-expanded={desktopDropdown === 'about'}
              onClick={() =>
                setDesktopDropdown(
                  desktopDropdown === 'about' ? null : 'about',
                )
              }
            >
              {t('about')}
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform ${
                  desktopDropdown === 'about' ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {desktopDropdown === 'about' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full z-50 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
                >
                  {ABOUT_LINKS.map(([key, href]) => (
                    <LocaleLink
                      key={key}
                      href={href}
                      className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        isActive(href)
                          ? 'bg-brand-50 text-brand-800'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-brand-700'
                      }`}
                    >
                      {t(key)}
                    </LocaleLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* PROGRAMS DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setDesktopDropdown('programs')}
            onMouseLeave={() => setDesktopDropdown(null)}
          >
            <button
              type="button"
              className={navItemClass(
                isActive('/programs') || isActive('/projects'),
              )}
              aria-expanded={desktopDropdown === 'programs'}
              onClick={() =>
                setDesktopDropdown(
                  desktopDropdown === 'programs' ? null : 'programs',
                )
              }
            >
              {t('programs')}
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform ${
                  desktopDropdown === 'programs' ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {desktopDropdown === 'programs' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full z-50 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
                >
                  {PROGRAM_LINKS.map(([key, href]) => (
                    <LocaleLink
                      key={key}
                      href={href}
                      className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        isActive(href)
                          ? 'bg-brand-50 text-brand-800'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-brand-700'
                      }`}
                    >
                      {t(key)}
                    </LocaleLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* NEWS DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setDesktopDropdown('news')}
            onMouseLeave={() => setDesktopDropdown(null)}
          >
            <button
              type="button"
              className={navItemClass(
                isActive('/news') ||
                  isActive('/gallery') ||
                  isActive('/publications'),
              )}
              aria-expanded={desktopDropdown === 'news'}
              onClick={() =>
                setDesktopDropdown(
                  desktopDropdown === 'news' ? null : 'news',
                )
              }
            >
              {t('news')}
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform ${
                  desktopDropdown === 'news' ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {desktopDropdown === 'news' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
                >
                  {NEWS_LINKS.map(([key, href]) => (
                    <LocaleLink
                      key={key}
                      href={href}
                      className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        isActive(href)
                          ? 'bg-brand-50 text-brand-800'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-brand-700'
                      }`}
                    >
                      {t(key)}
                    </LocaleLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* PARTNERS */}
          <LocaleLink
            href="/partners"
            className={navItemClass(isActive('/partners'))}
          >
            {t('partners')}
          </LocaleLink>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <LanguageSwitcher />

          <Button
            href="/volunteer"
            variant="ghost"
            className="!bg-slate-100 !px-5 !text-brand-900 !ring-slate-200 hover:!bg-slate-200"
          >
            {t('volunteer')}
          </Button>

          <Button
            href="/donate"
            variant="secondary"
            className="!px-5"
          >
            {t('donate')}
          </Button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="focus-ring ml-auto rounded-xl p-2.5 text-brand-900 hover:bg-slate-100 xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">
            {open ? 'Close menu' : 'Open menu'}
          </span>

          {open ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            animate={{ height: 'auto', opacity: 1 }}
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
            <div className="mx-auto flex max-w-[1600px] flex-col gap-2 px-6 py-5">
              {/* HOME */}
              <LocaleLink
                href="/"
                className={navItemClass(isActive('/'))}
              >
                {t('home')}
              </LocaleLink>

              {/* ABOUT */}
              <div className="rounded-xl bg-slate-50 p-2">
                <div className="px-2 py-1 text-xs font-bold uppercase tracking-wide text-slate-400">
                  {t('about')}
                </div>

                {ABOUT_LINKS.map(([key, href]) => (
                  <LocaleLink
                    key={key}
                    href={href}
                    className="focus-ring block rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-white hover:text-brand-700"
                  >
                    {t(key)}
                  </LocaleLink>
                ))}
              </div>

              {/* PROGRAMS */}
              <div className="rounded-xl bg-slate-50 p-2">
                <div className="px-2 py-1 text-xs font-bold uppercase tracking-wide text-slate-400">
                  {t('programs')}
                </div>

                {PROGRAM_LINKS.map(([key, href]) => (
                  <LocaleLink
                    key={key}
                    href={href}
                    className="focus-ring block rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-white hover:text-brand-700"
                  >
                    {t(key)}
                  </LocaleLink>
                ))}
              </div>

              {/* NEWS */}
              <div className="rounded-xl bg-slate-50 p-2">
                <div className="px-2 py-1 text-xs font-bold uppercase tracking-wide text-slate-400">
                  {t('news')}
                </div>

                {NEWS_LINKS.map(([key, href]) => (
                  <LocaleLink
                    key={key}
                    href={href}
                    className="focus-ring block rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-white hover:text-brand-700"
                  >
                    {t(key)}
                  </LocaleLink>
                ))}
              </div>

              {/* PARTNERS */}
              <LocaleLink
                href="/partners"
                className={navItemClass(isActive('/partners'))}
              >
                {t('partners')}
              </LocaleLink>

              {/* VOLUNTEER */}
              <LocaleLink
                href="/volunteer"
                className={navItemClass(isActive('/volunteer'))}
              >
                {t('volunteer')}
              </LocaleLink>

              {/* DONATE */}
              <LocaleLink
                href="/donate"
                className="focus-ring rounded-xl bg-sun-500 px-4 py-3 text-base font-bold text-brand-950 shadow-sm hover:bg-sun-400"
              >
                {t('donate')}
              </LocaleLink>

              {/* LANGUAGE */}
              <div className="mt-2 border-t border-slate-200 pt-4">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
