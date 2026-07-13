'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const variants: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/20',
  secondary: 'bg-sun-500 text-brand-950 hover:bg-sun-400 shadow-lg shadow-sun-500/20',
  ghost: 'bg-white/10 text-white hover:bg-white/20 ring-1 ring-inset ring-white/40',
};

export default function Button({
  href,
  children,
  variant = 'primary',
  type,
  onClick,
  className = '',
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  type?: 'button' | 'submit';
  onClick?: () => void;
  className?: string;
}) {
  const classes = `focus-ring inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 ${variants[variant]} ${className}`;
  const locale = useLocale();

  if (href) {
    return (
      <Link href={`/${locale}${href}`} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? 'button'} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
