'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState } from 'react';

export default function PlaceholderVideo({
  label,
  className = '',
  playLabel = 'Play video',
  src,
  poster,
}: {
  label: string;
  className?: string;
  playLabel?: string;
  src?: string;
  poster?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  if (src) {
    return (
      <div className={`relative aspect-video w-full overflow-hidden rounded-2xl bg-brand-950 ${className}`}>
        {playing ? (
          <video
            src={src}
            poster={poster}
            controls
            autoPlay
            className="h-full w-full object-cover"
            aria-label={label}
          />
        ) : (
          <>
            <video src={src} poster={poster} muted playsInline preload="metadata" className="h-full w-full object-cover" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="focus-ring absolute inset-0 flex w-full flex-col items-center justify-center gap-3 bg-black/25 text-white transition-colors hover:bg-black/35"
            >
              <motion.span
                animate={shouldReduceMotion ? {} : { scale: [1, 1.08, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/40 backdrop-blur"
              >
                <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" aria-hidden="true" />
              </motion.span>
              <span className="max-w-xs text-center text-sm font-medium text-white/90">
                {playLabel}: {label}
              </span>
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-brand-950 via-brand-800 to-brand-600 ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(245,158,11,0.35),transparent_55%)]" />
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-pressed={playing}
        className="focus-ring absolute inset-0 flex w-full flex-col items-center justify-center gap-3 text-white"
      >
        <motion.span
          animate={shouldReduceMotion ? {} : { scale: playing ? 1 : [1, 1.08, 1] }}
          transition={{ duration: 2.2, repeat: playing ? 0 : Infinity, ease: 'easeInOut' }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/40 backdrop-blur"
        >
          <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" aria-hidden="true" />
        </motion.span>
        <span className="sr-only">{playLabel}: </span>
        <span className="max-w-xs text-center text-sm font-medium text-white/90">
          {playing ? 'Placeholder video playing — replace with real footage' : label}
        </span>
      </button>
    </div>
  );
}
