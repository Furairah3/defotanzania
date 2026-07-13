'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import PlaceholderImage from '@/components/media/PlaceholderImage';
import PlaceholderVideo from '@/components/media/PlaceholderVideo';

type Item = { type: 'photo' | 'video'; category: string; caption: string; src?: string };

export default function GalleryGrid() {
  const t = useTranslations('gallery');
  const common = useTranslations('common');
  const categories = t.raw('categories') as string[];
  const items = t.raw('items') as Item[];
  const [active, setActive] = useState('all');
  const [selected, setSelected] = useState<Item | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const filtered = useMemo(
    () => (active === 'all' ? items : items.filter((i) => i.category === active)),
    [active, items],
  );

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selected]);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t('filterAll')}>
        <button
          type="button"
          onClick={() => setActive('all')}
          aria-pressed={active === 'all'}
          className={`focus-ring rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            active === 'all' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {t('filterAll')}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
            className={`focus-ring rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === cat ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, i) => (
          <Reveal key={`${item.caption}-${i}`} delay={(i % 3) * 0.07}>
            <button
              type="button"
              onClick={() => setSelected(item)}
              className="focus-ring block w-full rounded-2xl text-left"
              aria-haspopup="dialog"
            >
              {item.type === 'photo' ? (
                <PlaceholderImage label={item.caption} src={item.src} />
              ) : (
                <VideoThumb caption={item.caption} src={item.src} />
              )}
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={selected.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="focus-ring absolute -top-12 right-0 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">{common('close')}</span>
              </button>
              {selected.type === 'photo' ? (
                <PlaceholderImage label={selected.caption} aspect="aspect-video" src={selected.src} />
              ) : (
                <PlaceholderVideo label={selected.caption} playLabel={common('watchVideo')} src={selected.src} />
              )}
              <p className="mt-4 text-center text-white/90">{selected.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function VideoThumb({ caption, src }: { caption: string; src?: string }) {
  if (!src) return <PlaceholderVideo label={caption} />;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-brand-950">
      <video src={src} muted playsInline preload="metadata" className="h-full w-full object-cover" aria-hidden="true" />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/40 backdrop-blur">
          <Play className="h-5 w-5 translate-x-0.5 text-white" fill="currentColor" aria-hidden="true" />
        </span>
      </div>
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-xs font-medium text-white sm:text-sm">
        {caption}
      </span>
    </div>
  );
}
