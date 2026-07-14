import { prisma } from '@/lib/prisma';
import type { NewsPost, Publication, TeamMember, GalleryItem, Project, Partner } from '@/lib/generated/prisma/client';

export const FOCUS_AREAS: { en: string; sw: string }[] = [
  { en: 'Disability rights advocacy', sw: 'Utetezi wa haki za walemavu' },
  { en: 'Inclusive education', sw: 'Elimu jumuishi' },
  { en: 'Youth leadership', sw: 'Uongozi wa vijana' },
  { en: 'Skills development and entrepreneurship', sw: 'Maendeleo ya ujuzi na ujasiriamali' },
  { en: 'Accessible technology and innovation', sw: 'Teknolojia inayofikika na ubunifu' },
  { en: 'Community awareness', sw: 'Uhamasishaji wa jamii' },
  { en: 'Research and policy advocacy', sw: 'Utafiti na utetezi wa sera' },
  { en: 'Health and well-being', sw: 'Afya na ustawi' },
  { en: 'Gender and disability inclusion', sw: 'Jinsia na ujumuishaji wa ulemavu' },
];

export const GALLERY_CATEGORIES: { en: string; sw: string }[] = [
  { en: 'Community', sw: 'Jamii' },
  { en: 'Training', sw: 'Mafunzo' },
  { en: 'Conferences', sw: 'Makongamano' },
  { en: 'Campaigns', sw: 'Kampeni' },
];

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

export async function getPublishedTeamMembers() {
  return prisma.teamMember.findMany({ where: { published: true }, orderBy: { order: 'asc' } });
}

export async function getPublishedGalleryItems() {
  return prisma.galleryItem.findMany({ where: { published: true }, orderBy: { order: 'asc' } });
}

export async function getPublishedProjects() {
  return prisma.project.findMany({ where: { published: true }, orderBy: { order: 'asc' } });
}

export async function getPublishedPartners() {
  return prisma.partner.findMany({ where: { published: true }, orderBy: { order: 'asc' } });
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

export function localizeTeamMember(member: TeamMember, locale: string) {
  const sw = locale === 'sw';
  return {
    id: member.id,
    name: member.name,
    role: sw ? member.roleSw : member.roleEn,
    bio: (sw ? member.bioSw : member.bioEn) ?? '',
    photoUrl: member.photoUrl,
  };
}

export function localizeGalleryItem(item: GalleryItem, locale: string) {
  const sw = locale === 'sw';
  return {
    id: item.id,
    type: item.type as 'photo' | 'video',
    caption: sw ? item.captionSw : item.captionEn,
    category: sw ? item.categorySw : item.categoryEn,
    src: item.fileUrl,
  };
}

export function localizeProject(project: Project, locale: string) {
  const sw = locale === 'sw';
  return {
    id: project.id,
    title: sw ? project.titleSw : project.titleEn,
    focusArea: sw ? project.focusAreaSw : project.focusAreaEn,
    status: project.status,
    body: sw ? project.bodySw : project.bodyEn,
  };
}

export function localizePartner(partner: Partner) {
  return { id: partner.id, name: partner.name, logoUrl: partner.logoUrl, websiteUrl: partner.websiteUrl };
}
