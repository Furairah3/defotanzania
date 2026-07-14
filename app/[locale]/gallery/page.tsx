import { getTranslations } from 'next-intl/server';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import ImageMarquee from '@/components/media/ImageMarquee';
import { getPublishedGalleryItems, localizeGalleryItem, GALLERY_CATEGORIES } from '@/lib/content';
import { heroTitleMetadata } from '@/lib/pageMetadata';

export const dynamic = 'force-dynamic';
export const generateMetadata = heroTitleMetadata('gallery');

export default async function GalleryPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('gallery');
  const items = (await getPublishedGalleryItems()).map((item) => localizeGalleryItem(item, locale));
  const categories = GALLERY_CATEGORIES.map((c) => (locale === 'sw' ? c.sw : c.en));

  const photos = items.filter((i) => i.type === 'photo').map((i) => ({ src: i.src, alt: i.caption }));
  const row1 = photos.filter((_, i) => i % 2 === 0);
  const row2 = photos.filter((_, i) => i % 2 === 1);

  return (
    <>
      <PageHero title={t('hero.title')} sub={t('hero.sub')} images={photos} />
      <Section className="!py-10">
        <div className="space-y-3">
          <ImageMarquee images={row1} direction="left" className="h-40 sm:h-56" />
          <ImageMarquee images={row2} direction="right" className="h-40 sm:h-56" />
        </div>
      </Section>
      <Section className="!pt-0">
        <GalleryGrid items={items} categories={categories} />
      </Section>
    </>
  );
}
