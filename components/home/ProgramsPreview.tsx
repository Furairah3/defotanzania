import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Reveal from '@/components/motion/Reveal';
import Card from '@/components/ui/Card';
import LocaleLink from '@/components/layout/LocaleLink';

export default function ProgramsPreview() {
  const t = useTranslations('home.programsPreview');
  const common = useTranslations('common');
  const programs = useTranslations('programs').raw('items') as { name: string; body: string }[];

  return (
    <Section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <Reveal>
          <div>
            <h2 className="font-display text-3xl font-bold text-brand-950 sm:text-4xl">{t('title')}</h2>
            <p className="mt-3 max-w-xl text-slate-600">{t('sub')}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <LocaleLink
            href="/programs"
            className="focus-ring inline-flex items-center gap-1 rounded-md text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            {common('viewAll')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </LocaleLink>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {programs.slice(0, 3).map((program, i) => (
          <Reveal key={program.name} delay={i * 0.1}>
            <Card className="h-full">
              <p className="text-xs font-semibold uppercase tracking-wide text-sun-600">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-brand-950">{program.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{program.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
