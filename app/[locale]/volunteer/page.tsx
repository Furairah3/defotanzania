import { useTranslations } from 'next-intl';
import { Users2 } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Reveal from '@/components/motion/Reveal';
import Card from '@/components/ui/Card';
import VolunteerForm from '@/components/forms/VolunteerForm';

export default function VolunteerPage() {
  const t = useTranslations('volunteer');
  const opportunities = t.raw('opportunities.items') as { name: string; body: string }[];

  return (
    <>
      <PageHero title={t('hero.title')} sub={t('hero.sub')} />
      <Section>
        <Reveal>
          <h2 className="text-center font-display text-2xl font-bold text-brand-950">
            {t('opportunities.title')}
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {opportunities.map((op, i) => (
            <Reveal key={op.name} delay={(i % 4) * 0.08}>
              <Card className="h-full">
                <Users2 className="h-6 w-6 text-brand-600" aria-hidden="true" />
                <h3 className="mt-3 font-semibold text-brand-950">{op.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{op.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section className="bg-slate-50">
        <Reveal className="mx-auto max-w-xl">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <VolunteerForm />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
