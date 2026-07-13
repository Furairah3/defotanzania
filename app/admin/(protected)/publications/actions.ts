'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ADMIN_COOKIE_NAME, verifySessionToken } from '@/lib/auth';

function assertAuthed() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) throw new Error('Unauthorized');
}

export async function savePublication(formData: FormData) {
  assertAuthed();

  const id = String(formData.get('id') || '');
  const fileUrl = String(formData.get('fileUrl') || '').trim();
  const data = {
    titleEn: String(formData.get('titleEn') || ''),
    titleSw: String(formData.get('titleSw') || ''),
    type: String(formData.get('type') || ''),
    year: String(formData.get('year') || ''),
    fileUrl: fileUrl || null,
    published: formData.get('published') === 'on',
  };

  if (id) {
    await prisma.publication.update({ where: { id }, data });
  } else {
    await prisma.publication.create({ data });
  }

  redirect('/admin/publications');
}

export async function deletePublication(formData: FormData) {
  assertAuthed();
  const id = String(formData.get('id'));
  await prisma.publication.delete({ where: { id } });
  redirect('/admin/publications');
}
