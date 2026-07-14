'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
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
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10" aria-label="Primary">
        <LocaleLink href="/" className="focus-ring rounded-md">
          <Logo />
        </LocaleLink>

        <div className="hidden items-center divide-x divide-slate-300 lg:flex">
          {LINKS.map(([key, href]) => (
            <LocaleLink
              key={key}
              href={href}
              className="focus-ring px-3 text-sm font-medium text-slate-700 transition-colors hover:text-brand-700"
            >
              {t(key)}
            </LocaleLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Button href="/volunteer" variant="ghost" className="!bg-slate-100 !text-brand-900 !ring-slate-200 hover:!bg-slate-200">
            {t('volunteer')}
          </Button>
          <Button href="/donate" variant="secondary">
            {t('donate')}
          </Button>
        </div>

        <button
          type="button"
          className="focus-ring rounded-md p-2 text-brand-900 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {[...LINKS, ['volunteer', '/volunteer'], ['donate', '/donate'], ['contact', '/contact']].map(
                ([key, href]) => (
                  <LocaleLink
                    key={key}
                    href={href}
                    className="focus-ring rounded-md px-2 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-700"
                  >
                    {t(key)}
                  </LocaleLink>
                ),
              )}
              <div className="mt-2">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
