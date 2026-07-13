import Hero from '@/components/home/Hero';
import Pillars from '@/components/home/Pillars';
import ImpactStats from '@/components/home/ImpactStats';
import FocusAreas from '@/components/home/FocusAreas';
import ProgramsPreview from '@/components/home/ProgramsPreview';
import NewsPreview from '@/components/home/NewsPreview';
import PartnersStrip from '@/components/home/PartnersStrip';
import CTABanner from '@/components/home/CTABanner';

export const dynamic = 'force-dynamic';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <>
      <Hero />
      <Pillars />
      <ImpactStats />
      <FocusAreas />
      <ProgramsPreview />
      <NewsPreview locale={locale} />
      <PartnersStrip />
      <CTABanner />
    </>
  );
}
