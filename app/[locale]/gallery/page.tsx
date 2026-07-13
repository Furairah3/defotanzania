import { useTranslations } from 'next-intl';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import GalleryGrid from '@/components/gallery/GalleryGrid';

export default function GalleryPage() {
  const t = useTranslations('gallery');

  return (
    <>
      <PageHero title={t('hero.title')} sub={t('hero.sub')} />
      <Section>
        <GalleryGrid />
      </Section>
    </>
  );
}
