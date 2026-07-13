'use client';

import { useTranslations } from 'next-intl';
import { useReducedMotion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Reveal from '@/components/motion/Reveal';

export default function PartnersStrip() {
  const t = useTranslations('home.partnersStrip');
  const partners = useTranslations('partners').raw('items') as string[];
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section className="py-12 sm:py-16">
      <Reveal>
        <p className="text-center text-sm font-medium text-slate-500">{t('title')}</p>
      </Reveal>

      {shouldReduceMotion ? (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {partners.map((partner) => (
            <span key={partner} className="text-sm font-semibold text-slate-400">
              {partner}
            </span>
          ))}
        </div>
      ) : (
        <div
          className="group mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
          role="marquee"
          aria-label={t('title')}
        >
          <div className="flex w-max animate-marquee gap-16 group-hover:[animation-play-state:paused]">
            {[...partners, ...partners].map((partner, i) => (
              <span key={`${partner}-${i}`} className="whitespace-nowrap text-sm font-semibold text-slate-400">
                {partner}
              </span>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
