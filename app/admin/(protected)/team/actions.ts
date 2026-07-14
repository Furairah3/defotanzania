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

export async function saveTeamMember(formData: FormData) {
  assertAuthed();

  const id = String(formData.get('id') || '');
  const photo = formData.get('photo');
  let photoUrl = String(formData.get('existingPhotoUrl') || '') || null;

  if (photo instanceof File && photo.size > 0) {
    photoUrl = await uploadFile(photo, 'team');
  }

  const data = {
    name: String(formData.get('name') || ''),
    roleEn: String(formData.get('roleEn') || ''),
    roleSw: String(formData.get('roleSw') || ''),
    bioEn: String(formData.get('bioEn') || ''),
    bioSw: String(formData.get('bioSw') || ''),
    photoUrl,
    order: Number(formData.get('order') || 0),
    published: formData.get('published') === 'on',
  };

  if (id) {
    await prisma.teamMember.update({ where: { id }, data });
  } else {
    await prisma.teamMember.create({ data });
  }

  redirect('/admin/team');
}

export async function deleteTeamMember(formData: FormData) {
  assertAuthed();
  const id = String(formData.get('id'));
  await prisma.teamMember.delete({ where: { id } });
  redirect('/admin/team');
}
