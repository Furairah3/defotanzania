import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

const PALETTES = [
  'from-brand-700 via-brand-500 to-sun-400',
  'from-brand-900 via-brand-600 to-sun-300',
  'from-sun-500 via-brand-600 to-brand-900',
  'from-brand-600 via-brand-800 to-sun-500',
];

function paletteFor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) % PALETTES.length;
  return PALETTES[hash];
}

export default function PlaceholderImage({
  label,
  className = '',
  aspect = 'aspect-[4/3]',
  src,
}: {
  label: string;
  className?: string;
  aspect?: string;
  src?: string;
}) {
  if (src) {
    return (
      <div className={`relative flex ${aspect} w-full items-end overflow-hidden rounded-2xl ${className}`}>
        <Image src={src} alt={label} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
        <div className="relative flex w-full items-center bg-gradient-to-t from-black/60 to-transparent p-3">
          <span className="text-xs font-medium text-white sm:text-sm">{label}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Placeholder photo: ${label}`}
      className={`relative flex ${aspect} w-full items-end overflow-hidden rounded-2xl bg-gradient-to-br ${paletteFor(label)} ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_55%)]" />
      <div className="relative flex w-full items-center justify-between gap-2 bg-black/25 p-3 backdrop-blur-sm">
        <span className="text-xs font-medium text-white sm:text-sm">{label}</span>
        <ImageIcon className="h-4 w-4 shrink-0 text-white/80" aria-hidden="true" />
      </div>
    </div>
  );
}
