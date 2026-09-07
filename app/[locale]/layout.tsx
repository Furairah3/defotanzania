import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SkipLink from '@/components/layout/SkipLink';
import Preloader from '@/components/motion/Preloader';
import PageTransition from '@/components/motion/PageTransition';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ScrollProgress from '@/components/motion/ScrollProgress';
import '../globals.css';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });

  const baseUrl = 'https://defotanzania.or.tz';
  const canonicalUrl = `${baseUrl}/${locale}`;

  return {
    metadataBase: new URL(baseUrl),

    title: {
      default: t('siteName'),
      template: `%s · ${t('siteShort')}`,
    },

    description: t('description'),

    keywords: t('keywords').split(', '),

    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en`,
        sw: `${baseUrl}/sw`,
      },
    },

    openGraph: {
      type: 'website',
      siteName: t('siteName'),
      title: t('siteName'),
      description: t('description'),
      url: canonicalUrl,
      locale: locale === 'sw' ? 'sw_TZ' : 'en_TZ',
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as (typeof locales)[number])) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Preloader />
          <ScrollProgress />
          <SkipLink />
          <Navbar />
          <main id="main-content">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
