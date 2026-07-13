import { useTranslations } from 'next-intl';
import { Handshake } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Reveal from '@/components/motion/Reveal';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function PartnersPage() {
  const t = useTranslations('partners');
  const items = t.raw('items') as string[];

  return (
    <>
      <PageHero title={t('hero.title')} sub={t('hero.sub')} />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((partner, i) => (
            <Reveal key={partner} delay={(i % 3) * 0.08}>
              <Card className="flex h-32 items-center justify-center text-center">
                <p className="font-semibold text-slate-500">{partner}</p>
              </Card>
            </Reveal>
          ))}
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
