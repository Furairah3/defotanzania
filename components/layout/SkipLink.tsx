import { useTranslations } from 'next-intl';

export default function SkipLink() {
  const t = useTranslations('nav');
  return (
    <a href="#main-content" className="skip-link">
      {t('skipToContent')}
    </a>
  );
}
