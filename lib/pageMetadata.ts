import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export function heroTitleMetadata(namespace: string) {
  return async function generateMetadata({
    params: { locale },
  }: {
    params: { locale: string };
  }): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace });
    return { title: t('hero.title') };
  };
}
