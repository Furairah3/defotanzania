'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { FOCUS_AREAS } from '@/lib/content';
import { ADMIN_COOKIE_NAME, verifySessionToken } from '@/lib/auth';

function assertAuthed() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) throw new Error('Unauthorized');
}

export async function saveProject(formData: FormData) {
  assertAuthed();

  const id = String(formData.get('id') || '');
  const focusAreaEn = String(formData.get('focusAreaEn') || '');
  const focusArea = FOCUS_AREAS.find((f) => f.en === focusAreaEn) ?? FOCUS_AREAS[0];

  const data = {
    titleEn: String(formData.get('titleEn') || ''),
    titleSw: String(formData.get('titleSw') || ''),
    focusAreaEn: focusArea.en,
    focusAreaSw: focusArea.sw,
    status: String(formData.get('status') || ''),
    bodyEn: String(formData.get('bodyEn') || ''),
    bodySw: String(formData.get('bodySw') || ''),
    order: Number(formData.get('order') || 0),
    published: formData.get('published') === 'on',
  };

  if (id) {
    await prisma.project.update({ where: { id }, data });
  } else {
    await prisma.project.create({ data });
  }

  redirect('/admin/projects');
}

export async function deleteProject(formData: FormData) {
  assertAuthed();
  const id = String(formData.get('id'));
  await prisma.project.delete({ where: { id } });
  redirect('/admin/projects');
}
