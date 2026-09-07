
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export function heroTitleMetadata(namespace: string) {
  return async function generateMetadata({
    params: { locale },
  }: {
    params: { locale: string };
  }): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace });
    const meta = await getTranslations({ locale, namespace: 'meta' });

    const baseUrl = 'https://defotanzania.or.tz';
    const canonicalUrl = `${baseUrl}/${locale}/${namespace}`;

    const title = t('hero.title');
    const description = t('hero.sub');

    return {
      title,
      description,

      alternates: {
        canonical: canonicalUrl,
        languages: {
          en: `${baseUrl}/en/${namespace}`,
          sw: `${baseUrl}/sw/${namespace}`,
        },
      },

      openGraph: {
        type: 'website',
        siteName: meta('siteName'),
        title,
        description,
        url: canonicalUrl,
        locale: locale === 'sw' ? 'sw_TZ' : 'en_TZ',
      },

      robots: {
        index: true,
        follow: true,
      },
    };
  };
}
