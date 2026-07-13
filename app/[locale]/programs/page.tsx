import { useTranslations } from 'next-intl';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Reveal from '@/components/motion/Reveal';
import Card from '@/components/ui/Card';

export default function ProgramsPage() {
  const t = useTranslations('programs');
  const items = t.raw('items') as { name: string; body: string }[];

  return (
    <>
      <PageHero title={t('hero.title')} sub={t('hero.sub')} />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((program, i) => (
            <Reveal key={program.name} delay={(i % 2) * 0.1}>
              <Card className="h-full">
                <p className="text-xs font-semibold uppercase tracking-wide text-sun-600">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-brand-950">{program.name}</h3>
                <p className="mt-3 text-slate-600">{program.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
