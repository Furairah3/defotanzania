import { getTranslations } from 'next-intl/server';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Reveal from '@/components/motion/Reveal';
import Card from '@/components/ui/Card';
import PlaceholderImage from '@/components/media/PlaceholderImage';
import LocaleLink from '@/components/layout/LocaleLink';
import { getPublishedNewsPosts, localizeNewsPost } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function NewsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('news');
  const common = await getTranslations('common');
  const posts = (await getPublishedNewsPosts()).map((post) => localizeNewsPost(post, locale));

  return (
    <>
      <PageHero title={t('hero.title')} sub={t('hero.sub')} />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.08}>
              <LocaleLink href={`/news/${post.slug}`} className="focus-ring block h-full rounded-2xl">
                <Card className="h-full !p-0 overflow-hidden">
                  <PlaceholderImage label={post.title} aspect="aspect-[16/10]" className="rounded-none" />
                  <div className="p-6">
                    <time className="text-xs font-medium text-slate-500">
                      {post.date.toISOString().slice(0, 10)}
                    </time>
                    <h3 className="mt-2 text-lg font-semibold text-brand-950">{post.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
                    <span className="mt-4 inline-block text-sm font-semibold text-brand-700">
                      {common('readMore')} →
                    </span>
                  </div>
                </Card>
              </LocaleLink>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
