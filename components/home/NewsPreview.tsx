import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Reveal from '@/components/motion/Reveal';
import Card from '@/components/ui/Card';
import LocaleLink from '@/components/layout/LocaleLink';
import PlaceholderImage from '@/components/media/PlaceholderImage';
import { getPublishedNewsPosts, localizeNewsPost } from '@/lib/content';

export default async function NewsPreview({ locale }: { locale: string }) {
  const t = await getTranslations('home.newsPreview');
  const common = await getTranslations('common');
  const posts = (await getPublishedNewsPosts()).slice(0, 3).map((post) => localizeNewsPost(post, locale));

  return (
    <Section className="bg-slate-50">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <Reveal>
          <div>
            <h2 className="font-display text-3xl font-bold text-brand-950 sm:text-4xl">{t('title')}</h2>
            <p className="mt-3 max-w-xl text-slate-600">{t('sub')}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <LocaleLink
            href="/news"
            className="focus-ring inline-flex items-center gap-1 rounded-md text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            {common('viewAll')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </LocaleLink>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.1}>
            <LocaleLink href={`/news/${post.slug}`} className="focus-ring block h-full rounded-2xl">
              <Card className="h-full !p-0 overflow-hidden">
                <PlaceholderImage label={post.title} aspect="aspect-[16/10]" className="rounded-none" />
                <div className="p-6">
                  <time className="text-xs font-medium text-slate-500">{post.date.toISOString().slice(0, 10)}</time>
                  <h3 className="mt-2 text-lg font-semibold text-brand-950">{post.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
                </div>
              </Card>
            </LocaleLink>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
