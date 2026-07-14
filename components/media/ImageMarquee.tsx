'use client';

import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';

type Item = { src: string; alt: string };

export default function ImageMarquee({
  images,
  direction = 'left',
  className = '',
}: {
  images: readonly Item[];
  direction?: 'left' | 'right';
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const animationClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse';

  if (shouldReduceMotion) {
    return (
      <div className={`flex gap-3 overflow-hidden ${className}`} aria-hidden="true">
        {images.map((img, i) => (
          <div key={`${img.src}-${i}`} className="relative h-full w-48 shrink-0 overflow-hidden rounded-xl sm:w-64">
            <Image src={img.src} alt="" fill className="object-cover" sizes="256px" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className={`flex h-full w-max gap-3 ${animationClass}`}>
        {[...images, ...images].map((img, i) => (
          <div key={`${img.src}-${i}`} className="relative h-full w-48 shrink-0 overflow-hidden rounded-xl sm:w-64">
            <Image src={img.src} alt="" fill className="object-cover" sizes="256px" />
          </div>
        ))}
      </div>
    </div>
  );
}
