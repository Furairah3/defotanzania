'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import Button from '@/components/ui/Button';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const t = useTranslations('home.hero');
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const videoY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, shouldReduceMotion ? 1 : 0.2]);

  return (
    <div ref={ref} className="relative min-h-[92vh] overflow-hidden bg-brand-950">
      <motion.div style={{ y: videoY }} className="absolute inset-0" aria-hidden="true">
        <video
          src="/videos/community-outreach.mp4"
          autoPlay={!shouldReduceMotion}
          muted
          loop
          playsInline
          className="h-full w-full scale-110 object-cover"
        />
      </motion.div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/70 to-brand-950/40"
        aria-hidden="true"
      />
      <div className="absolute inset-0 gradient-mesh opacity-20 animate-gradient-shift mix-blend-overlay" aria-hidden="true" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative flex min-h-[92vh] items-end"
      >
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-20 sm:px-10 sm:pb-24">
          <motion.div
            variants={shouldReduceMotion ? undefined : container}
            initial={shouldReduceMotion ? 'show' : 'hidden'}
            animate="show"
            className="max-w-2xl"
          >
            <motion.p variants={item} className="text-sm font-semibold uppercase tracking-widest text-sun-300">
              {t('eyebrow')}
            </motion.p>
            <motion.h1
              variants={item}
              className={`mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl ${
                shouldReduceMotion
                  ? 'text-white'
                  : 'animate-gradient-shift bg-gradient-to-r from-white via-sun-300 to-white bg-[length:200%_auto] bg-clip-text text-transparent'
              }`}
            >
              {t('headline')}
            </motion.h1>
            <motion.p variants={item} className="mt-6 max-w-xl text-lg text-white/85">
              {t('sub')}
            </motion.p>
            <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
              <Button href="/donate" variant="secondary">
                {t('ctaPrimary')}
              </Button>
              <Button href="/volunteer" variant="ghost">
                {t('ctaSecondary')}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
