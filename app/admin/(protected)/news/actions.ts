'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ADMIN_COOKIE_NAME, verifySessionToken } from '@/lib/auth';

function assertAuthed() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) throw new Error('Unauthorized');
}

export async function saveNewsPost(formData: FormData) {
  assertAuthed();

  const id = String(formData.get('id') || '');
  const data = {
    slug: String(formData.get('slug') || '').trim(),
    titleEn: String(formData.get('titleEn') || ''),
    titleSw: String(formData.get('titleSw') || ''),
    excerptEn: String(formData.get('excerptEn') || ''),
    excerptSw: String(formData.get('excerptSw') || ''),
    bodyEn: String(formData.get('bodyEn') || ''),
    bodySw: String(formData.get('bodySw') || ''),
    date: new Date(String(formData.get('date') || Date.now())),
    published: formData.get('published') === 'on',
  };

  if (id) {
    await prisma.newsPost.update({ where: { id }, data });
  } else {
    await prisma.newsPost.create({ data });
  }

  redirect('/admin/news');
}

export async function deleteNewsPost(formData: FormData) {
  assertAuthed();
  const id = String(formData.get('id'));
  await prisma.newsPost.delete({ where: { id } });
  redirect('/admin/news');
}
