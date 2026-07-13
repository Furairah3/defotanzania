import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Section from '@/components/ui/Section';
import Reveal from '@/components/motion/Reveal';
import PlaceholderImage from '@/components/media/PlaceholderImage';
import LocaleLink from '@/components/layout/LocaleLink';
import { ArrowLeft } from 'lucide-react';
import { getNewsPostBySlug, localizeNewsPost } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function NewsPostPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const common = await getTranslations('common');
  const record = await getNewsPostBySlug(slug);

  if (!record || !record.published) notFound();

  const post = localizeNewsPost(record, locale);

  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <LocaleLink
            href="/news"
            className="focus-ring inline-flex items-center gap-1 rounded-md text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {common('back')}
          </LocaleLink>
        </Reveal>
        <Reveal delay={0.05}>
          <time className="mt-6 block text-sm font-medium text-slate-500">{post.date.toISOString().slice(0, 10)}</time>
          <h1 className="mt-2 font-display text-3xl font-bold text-brand-950 sm:text-4xl">{post.title}</h1>
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <PlaceholderImage label={post.title} aspect="aspect-[16/9]" />
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 text-lg leading-relaxed text-slate-700">{post.body}</p>
        </Reveal>
      </div>
    </Section>
  );
}
