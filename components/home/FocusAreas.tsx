import { useTranslations } from 'next-intl';
import {
  Scale,
  GraduationCap,
  Users,
  Briefcase,
  Cpu,
  Megaphone,
  BookOpen,
  HeartPulse,
  Accessibility,
} from 'lucide-react';
import Section from '@/components/ui/Section';
import Reveal from '@/components/motion/Reveal';
import Card from '@/components/ui/Card';

const ICONS = [Scale, GraduationCap, Users, Briefcase, Cpu, Megaphone, BookOpen, HeartPulse, Accessibility];

export default function FocusAreas() {
  const t = useTranslations('home.focusAreas');
  const areas = useTranslations('projects').raw('focusAreas') as string[];

  return (
    <Section className="bg-slate-50">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-brand-950 sm:text-4xl">{t('title')}</h2>
          <p className="mt-3 text-slate-600">{t('sub')}</p>
        </div>
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((area, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <Reveal key={area} delay={(i % 3) * 0.08}>
              <Card className="h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="mt-4 font-semibold text-brand-950">{area}</p>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
