'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { uploadFile } from '@/lib/storage';
import { ADMIN_COOKIE_NAME, verifySessionToken } from '@/lib/auth';

function assertAuthed() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) throw new Error('Unauthorized');
}

export async function savePartner(formData: FormData) {
  assertAuthed();

  const id = String(formData.get('id') || '');
  const logo = formData.get('logo');
  let logoUrl = String(formData.get('existingLogoUrl') || '') || null;

  if (logo instanceof File && logo.size > 0) {
    logoUrl = await uploadFile(logo, 'partners');
  }

  const websiteUrl = String(formData.get('websiteUrl') || '').trim();

  const data = {
    name: String(formData.get('name') || ''),
    logoUrl,
    websiteUrl: websiteUrl || null,
    order: Number(formData.get('order') || 0),
    published: formData.get('published') === 'on',
  };

  if (id) {
    await prisma.partner.update({ where: { id }, data });
  } else {
    await prisma.partner.create({ data });
  }

  redirect('/admin/partners');
}

export async function deletePartner(formData: FormData) {
  assertAuthed();
  const id = String(formData.get('id'));
  await prisma.partner.delete({ where: { id } });
  redirect('/admin/partners');
}
