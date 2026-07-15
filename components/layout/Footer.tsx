import { useTranslations } from 'next-intl';
import { Facebook, Instagram, Youtube, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import Logo from '@/components/media/Logo';
import LocaleLink from '@/components/layout/LocaleLink';
import { SOCIAL_LINKS } from '@/lib/orgInfo';

const QUICK_LINKS = [
  ['about', '/about'],
  ['team', '/team'],
  ['programs', '/programs'],
  ['projects', '/projects'],
  ['gallery', '/gallery'],
  ['volunteer', '/volunteer'],
  ['donate', '/donate'],
  ['contact', '/contact'],
] as const;

const SOCIAL_ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  whatsapp: MessageCircle,
} as const;

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-brand-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm text-white/70">{t('footer.tagline')}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">{t('footer.quickLinks')}</h3>
            <ul className="mt-4 space-y-2">
              {QUICK_LINKS.map(([key, href]) => (
                <li key={key}>
                  <LocaleLink href={href} className="focus-ring rounded-md text-sm text-white/80 hover:text-sun-300">
                    {t(`nav.${key}`)}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">{t('footer.contact')}</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{t('contact.info.phoneValue')}</span>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{t('contact.info.whatsappValue')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{t('contact.info.emailValue')}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{t('contact.info.addressValue')}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">{t('footer.followUs')}</h3>
            <div className="mt-4 flex gap-3">
              {SOCIAL_LINKS.map(({ name, href, icon }) => {
                const Icon = SOCIAL_ICONS[icon];
                return (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="focus-ring flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-sun-500 hover:text-brand-950"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} {t('meta.siteName')}. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
