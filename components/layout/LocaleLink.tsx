'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import type { ReactNode } from 'react';

export default function LocaleLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const locale = useLocale();
  return (
    <Link href={`/${locale}${href}`} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
