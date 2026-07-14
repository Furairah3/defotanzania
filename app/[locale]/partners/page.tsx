import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Handshake, Building2 } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Reveal from '@/components/motion/Reveal';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { getPublishedPartners, localizePartner } from '@/lib/content';
import { heroTitleMetadata } from '@/lib/pageMetadata';

export const dynamic = 'force-dynamic';
export const generateMetadata = heroTitleMetadata('partners');

export default async function PartnersPage() {
  const t = await getTranslations('partners');
  const partners = (await getPublishedPartners()).map(localizePartner);

  return (
    <>
      <PageHero title={t('hero.title')} sub={t('hero.sub')} />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, i) => (
            <Reveal key={partner.id} delay={(i % 3) * 0.08}>
              {partner.websiteUrl ? (
                <a
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring block h-32 rounded-2xl"
                >
                  <PartnerCard partner={partner} />
                </a>
              ) : (
                <PartnerCard partner={partner} />
              )}
            </Reveal>
          ))}
          {partners.length === 0 && <p className="text-sm text-slate-500">Partner information coming soon.</p>}
        </div>
      </Section>
      <Section className="bg-slate-50">
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-2xl bg-brand-900 p-10 text-center text-white">
            <Handshake className="mx-auto h-9 w-9 text-sun-400" aria-hidden="true" />
            <h2 className="mt-4 font-display text-2xl font-bold">{t('becomePartner.title')}</h2>
            <p className="mt-3 text-white/80">{t('becomePartner.body')}</p>
            <div className="mt-6">
              <Button href="/contact" variant="secondary">
                {t('becomePartner.cta')}
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

function PartnerCard({ partner }: { partner: { name: string; logoUrl: string | null } }) {
  return (
    <Card className="flex h-32 items-center justify-center text-center">
      {partner.logoUrl ? (
        <Image src={partner.logoUrl} alt={partner.name} width={140} height={64} className="max-h-16 w-auto object-contain" />
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Building2 className="h-6 w-6 text-slate-400" aria-hidden="true" />
          <p className="font-semibold text-slate-500">{partner.name}</p>
        </div>
      )}
    </Card>
  );
}
