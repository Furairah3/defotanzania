'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import Button from '@/components/ui/Button';
import PlaceholderVideo from '@/components/media/PlaceholderVideo';

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

  const meshY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 120]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -160]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, shouldReduceMotion ? 1 : 0.2]);

  return (
    <div ref={ref} className="relative overflow-hidden bg-brand-950">
      <motion.div
        style={{ y: meshY }}
        className="absolute inset-0 gradient-mesh opacity-40 animate-gradient-shift"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: blobY }}
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sun-500/20 blur-3xl animate-float"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-2 lg:items-center"
      >
        <motion.div
          variants={shouldReduceMotion ? undefined : container}
          initial={shouldReduceMotion ? 'show' : 'hidden'}
          animate="show"
        >
          <motion.p variants={item} className="text-sm font-semibold uppercase tracking-widest text-sun-300">
            {t('eyebrow')}
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            {t('headline')}
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-xl text-lg text-white/80">
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

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <PlaceholderVideo label={t('mediaLabel')} src="/videos/community-outreach.mp4" />
        </motion.div>
      </motion.div>
    </div>
  );
}
