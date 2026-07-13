import { useTranslations } from 'next-intl';
import Section from '@/components/ui/Section';
import Reveal from '@/components/motion/Reveal';
import Button from '@/components/ui/Button';

export default function CTABanner() {
  const t = useTranslations('home.ctaBanner');

  return (
    <Section className="!py-0">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-brand-800 px-8 py-16 text-center sm:px-16">
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-sun-500/20 blur-3xl" aria-hidden="true" />
          <h2 className="relative font-display text-3xl font-bold text-white sm:text-4xl">{t('title')}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/80">{t('sub')}</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/donate" variant="secondary">
              {t('ctaDonate')}
            </Button>
            <Button href="/volunteer" variant="ghost">
              {t('ctaVolunteer')}
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
