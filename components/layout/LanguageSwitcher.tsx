'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales, localeLabels, type Locale } from '@/i18n/config';

export default function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/') || '/');
  }

  return (
    <div
      role="group"
      aria-label="Select language"
      className={`focus-ring flex items-center rounded-full p-1 text-xs font-semibold ${
        light ? 'bg-white/10 ring-1 ring-white/30' : 'bg-slate-100'
      }`}
    >
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-pressed={locale === l}
          className={`focus-ring rounded-full px-3 py-1.5 transition-colors ${
            locale === l
              ? light
                ? 'bg-white text-brand-900'
                : 'bg-brand-600 text-white'
              : light
                ? 'text-white/80 hover:text-white'
                : 'text-slate-600 hover:text-brand-700'
          }`}
        >
          {localeLabels[l]}
        </button>
      ))}
    </div>
  );
}
