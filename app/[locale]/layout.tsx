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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: {
      default: t('siteName'),
      template: `%s · ${t('siteShort')}`,
    },
    description: t('placeholderNotice'),
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
