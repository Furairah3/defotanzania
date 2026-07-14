import { useTranslations } from 'next-intl';
import { Eye, Target, CheckCircle2 } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Reveal from '@/components/motion/Reveal';
import Card from '@/components/ui/Card';
import PlaceholderImage from '@/components/media/PlaceholderImage';
import { heroTitleMetadata } from '@/lib/pageMetadata';

export const generateMetadata = heroTitleMetadata('about');

export default function AboutPage() {
  const t = useTranslations('about');
  const objectives = t.raw('objectives.items') as string[];
  const values = t.raw('values.items') as { name: string; body: string }[];

  return (
    <>
      <PageHero title={t('hero.title')} sub={t('hero.sub')} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <h2 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">{t('intro.title')}</h2>
              <p className="mt-4 text-slate-600">{t('intro.body')}</p>
            </div>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <PlaceholderImage label="DEF team and community members" aspect="aspect-[4/3]" />
          </Reveal>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="grid gap-6 sm:grid-cols-2">
          <Reveal direction="right">
            <div className="h-full rounded-2xl bg-brand-900 p-8 text-white">
              <Eye className="h-8 w-8 text-sun-400" aria-hidden="true" />
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-sun-300">
                {t('vision.label')}
              </h3>
              <p className="mt-3 text-xl font-medium leading-snug">{t('vision.body')}</p>
            </div>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <div className="h-full rounded-2xl bg-slate-900 p-8 text-white">
              <Target className="h-8 w-8 text-sun-400" aria-hidden="true" />
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-sun-300">
                {t('mission.label')}
              </h3>
              <p className="mt-3 text-xl font-medium leading-snug">{t('mission.body')}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <h2 className="text-center font-display text-3xl font-bold text-brand-950">{t('objectives.title')}</h2>
        </Reveal>
        <ol className="mx-auto mt-10 max-w-3xl space-y-4">
          {objectives.map((obj, i) => (
            <Reveal key={obj} delay={i * 0.07} as="li">
              <div className="flex items-start gap-4 rounded-xl border border-slate-200 p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-slate-700">{obj}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section className="bg-slate-50">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-bold text-brand-950">{t('values.title')}</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal key={value.name} delay={(i % 4) * 0.08}>
              <Card className="h-full">
                <CheckCircle2 className="h-6 w-6 text-brand-600" aria-hidden="true" />
                <h3 className="mt-3 font-semibold text-brand-950">{value.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{value.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-2xl bg-brand-50 p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-brand-950">{t('whoWeServe.title')}</h2>
            <p className="mt-3 text-slate-600">{t('whoWeServe.body')}</p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
