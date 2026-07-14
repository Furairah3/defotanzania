import { getTranslations } from 'next-intl/server';
import { FileText, Download } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Reveal from '@/components/motion/Reveal';
import { getPublishedPublications, localizePublication } from '@/lib/content';
import { heroTitleMetadata } from '@/lib/pageMetadata';

export const dynamic = 'force-dynamic';
export const generateMetadata = heroTitleMetadata('publications');

export default async function PublicationsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('publications');
  const items = (await getPublishedPublications()).map((pub) => localizePublication(pub, locale));

  return (
    <>
      <PageHero title={t('hero.title')} sub={t('hero.sub')} />
      <Section>
        <div className="mx-auto max-w-3xl space-y-4">
          {items.map((pub, i) => (
            <Reveal key={pub.id} delay={i * 0.06}>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-brand-300 hover:bg-white">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <FileText className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-brand-950">{pub.title}</p>
                    <p className="text-sm text-slate-500">
                      {pub.type} · {pub.year}
                    </p>
                  </div>
                </div>
                {pub.fileUrl ? (
                  <a
                    href={pub.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-700"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">Download {pub.title}</span>
                  </a>
                ) : (
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400"
                    title="File coming soon"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">File coming soon</span>
                  </span>
                )}
              </div>
            </Reveal>
          ))}
          <p className="pt-4 text-center text-sm text-slate-500">{t('downloadNote')}</p>
        </div>
      </Section>
    </>
  );
}
