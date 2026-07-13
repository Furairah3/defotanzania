import { useTranslations } from 'next-intl';
import { Eye, Target } from 'lucide-react';
import Section from '@/components/ui/Section';
import Reveal from '@/components/motion/Reveal';

export default function Pillars() {
  const t = useTranslations('home.pillars');

  return (
    <Section>
      <div className="grid gap-6 sm:grid-cols-2">
        <Reveal direction="right">
          <div className="h-full rounded-2xl bg-brand-900 p-8 text-white">
            <Eye className="h-8 w-8 text-sun-400" aria-hidden="true" />
            <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-sun-300">
              {t('visionLabel')}
            </h3>
            <p className="mt-3 text-xl font-medium leading-snug">{t('vision')}</p>
          </div>
        </Reveal>
        <Reveal direction="left" delay={0.1}>
          <div className="h-full rounded-2xl bg-slate-900 p-8 text-white">
            <Target className="h-8 w-8 text-sun-400" aria-hidden="true" />
            <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-sun-300">
              {t('missionLabel')}
            </h3>
            <p className="mt-3 text-xl font-medium leading-snug">{t('mission')}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
