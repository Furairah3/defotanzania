'use client';

import { useRef, type ReactNode } from 'react';
import Reveal from '@/components/motion/Reveal';
import ImageMarquee from '@/components/media/ImageMarquee';
import { STOCK_IMAGES } from '@/lib/stockImages';

const ROW_1 = STOCK_IMAGES.filter((_, i) => i % 2 === 0);
const ROW_2 = STOCK_IMAGES.filter((_, i) => i % 2 === 1);

export default function PageHero({
  title,
  sub,
  children,
  images,
}: {
  title: string;
  sub: string;
  children?: ReactNode;
  images?: readonly { src: string; alt: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const row1 = images ? images.filter((_, i) => i % 2 === 0) : ROW_1;
  const row2 = images ? images.filter((_, i) => i % 2 === 1) : ROW_2;

  return (
    <div ref={ref} className="relative overflow-hidden bg-brand-950">
      <div className="absolute inset-0 flex flex-col justify-center gap-3 py-3" aria-hidden="true">
        <ImageMarquee images={row1.length ? row1 : ROW_1} direction="left" className="h-28 sm:h-36" />
        <ImageMarquee images={row2.length ? row2 : ROW_2} direction="right" className="h-28 sm:h-36" />
      </div>
      <div className="absolute inset-0 bg-brand-950/80" aria-hidden="true" />
      <div className="absolute inset-0 gradient-mesh opacity-20 animate-gradient-shift mix-blend-overlay" aria-hidden="true" />

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
