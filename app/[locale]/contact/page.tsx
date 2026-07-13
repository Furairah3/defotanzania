import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, MessageCircle, Mailbox } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Reveal from '@/components/motion/Reveal';
import ContactForm from '@/components/forms/ContactForm';
import { WHATSAPP_CHAT_LINK } from '@/lib/orgInfo';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <>
      <PageHero title={t('hero.title')} sub={t('hero.sub')} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <div>
              <h2 className="font-display text-xl font-bold text-brand-950">{t('info.title')}</h2>
              <ul className="mt-6 space-y-5">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-slate-500">{t('info.phone')}</p>
                    <a href={`tel:${t('info.phoneValue').replace(/\s/g, '')}`} className="focus-ring rounded-md text-slate-800 hover:text-brand-700">
                      {t('info.phoneValue')}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-slate-500">{t('info.whatsapp')}</p>
                    <a
                      href={WHATSAPP_CHAT_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring rounded-md text-slate-800 hover:text-brand-700"
                    >
                      {t('info.whatsappValue')}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-slate-500">{t('info.email')}</p>
                    <a href={`mailto:${t('info.emailValue')}`} className="focus-ring rounded-md text-slate-800 hover:text-brand-700">
                      {t('info.emailValue')}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-slate-500">{t('info.address')}</p>
                    <p className="text-slate-800">{t('info.addressValue')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mailbox className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-slate-500">{t('info.poBox')}</p>
                    <p className="text-slate-800">{t('info.poBoxValue')}</p>
                  </div>
                </li>
              </ul>

              <div
                role="img"
                aria-label={t('mapLabel')}
                className="mt-8 flex aspect-video items-center justify-center rounded-2xl bg-slate-100 text-sm font-medium text-slate-400"
              >
                {t('mapLabel')}
              </div>
            </div>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
