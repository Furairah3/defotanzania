'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import Reveal from '@/components/motion/Reveal';

export default function PageHero({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children?: ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const meshY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 100]);

  return (
    <div ref={ref} className="relative overflow-hidden bg-brand-950">
      <motion.div
        style={{ y: meshY }}
        className="absolute inset-0 gradient-mesh opacity-30 animate-gradient-shift"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:px-10 sm:py-28">
        <Reveal>
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">{title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">{sub}</p>
        </Reveal>
        {children}
      </div>
    </div>
  );
}
