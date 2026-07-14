import { useTranslations } from 'next-intl';
import { HandCoins, Landmark } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Reveal from '@/components/motion/Reveal';
import Card from '@/components/ui/Card';
import DonateForm from '@/components/forms/DonateForm';
import { heroTitleMetadata } from '@/lib/pageMetadata';

export const generateMetadata = heroTitleMetadata('donate');

export default function DonatePage() {
  const t = useTranslations('donate');
  const tiers = t.raw('tiers.items') as { amount: string; impact: string }[];

  return (
    <>
      <PageHero title={t('hero.title')} sub={t('hero.sub')} />
      <Section>
        <Reveal>
          <h2 className="text-center font-display text-2xl font-bold text-brand-950">{t('tiers.title')}</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier, i) => (
            <Reveal key={tier.amount} delay={(i % 4) * 0.08}>
              <Card className="h-full text-center">
                <HandCoins className="mx-auto h-7 w-7 text-sun-500" aria-hidden="true" />
                <p className="mt-3 text-xl font-bold text-brand-950">{tier.amount}</p>
                <p className="mt-2 text-sm text-slate-600">{tier.impact}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">{t('tiers.note')}</p>
      </Section>

      <Section className="bg-slate-50">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="h-full rounded-2xl border border-dashed border-brand-300 bg-slate-50 p-8">
              <Landmark className="h-8 w-8 text-brand-600" aria-hidden="true" />
              <h2 className="mt-4 font-display text-xl font-bold text-brand-950">{t('bankDetails.title')}</h2>
              <p className="mt-3 text-sm text-slate-600">{t('bankDetails.note')}</p>
            </div>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <div className="rounded-2xl bg-slate-50 p-8 shadow-sm">
              <DonateForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
