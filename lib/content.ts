import { prisma } from '@/lib/prisma';
import type { NewsPost, Publication } from '@/lib/generated/prisma/client';

export async function getPublishedNewsPosts() {
  return prisma.newsPost.findMany({ where: { published: true }, orderBy: { date: 'desc' } });
}

export async function getNewsPostBySlug(slug: string) {
  return prisma.newsPost.findUnique({ where: { slug } });
}

export async function getPublishedPublications() {
  return prisma.publication.findMany({
    where: { published: true },
    orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
  });
}

export function localizeNewsPost(post: NewsPost, locale: string) {
  const sw = locale === 'sw';
  return {
    slug: post.slug,
    title: sw ? post.titleSw : post.titleEn,
    excerpt: sw ? post.excerptSw : post.excerptEn,
    body: sw ? post.bodySw : post.bodyEn,
    date: post.date,
  };
}

export function localizePublication(pub: Publication, locale: string) {
  const sw = locale === 'sw';
  return {
    id: pub.id,
    title: sw ? pub.titleSw : pub.titleEn,
    type: pub.type,
    year: pub.year,
    fileUrl: pub.fileUrl,
  };
}
