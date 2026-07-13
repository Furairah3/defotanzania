import { useTranslations } from 'next-intl';
import Section from '@/components/ui/Section';
import Reveal from '@/components/motion/Reveal';
import Counter from '@/components/motion/Counter';

export default function ImpactStats() {
  const t = useTranslations('home.stats');
  const items = t.raw('items') as { value: number; suffix: string; label: string }[];

  return (
    <Section className="bg-brand-50">
      <Reveal>
        <h2 className="text-center font-display text-3xl font-bold text-brand-950 sm:text-4xl">{t('title')}</h2>
      </Reveal>
      <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {items.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <p className="font-display text-4xl font-bold text-brand-700 sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-slate-500">{t('note')}</p>
    </Section>
  );
}
