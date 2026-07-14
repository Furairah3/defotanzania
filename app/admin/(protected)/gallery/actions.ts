'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { uploadFile } from '@/lib/storage';
import { GALLERY_CATEGORIES } from '@/lib/content';
import { ADMIN_COOKIE_NAME, verifySessionToken } from '@/lib/auth';

function assertAuthed() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) throw new Error('Unauthorized');
}

export async function saveGalleryItem(formData: FormData) {
  assertAuthed();

  const id = String(formData.get('id') || '');
  const file = formData.get('file');
  let fileUrl = String(formData.get('existingFileUrl') || '');

  if (file instanceof File && file.size > 0) {
    fileUrl = await uploadFile(file, 'gallery');
  }

  if (!fileUrl) throw new Error('A photo or video file is required');

  const categoryEn = String(formData.get('categoryEn') || '');
  const category = GALLERY_CATEGORIES.find((c) => c.en === categoryEn) ?? GALLERY_CATEGORIES[0];

  const data = {
    type: String(formData.get('type') || 'photo'),
    captionEn: String(formData.get('captionEn') || ''),
    captionSw: String(formData.get('captionSw') || ''),
    categoryEn: category.en,
    categorySw: category.sw,
    fileUrl,
    order: Number(formData.get('order') || 0),
    published: formData.get('published') === 'on',
  };

  if (id) {
    await prisma.galleryItem.update({ where: { id }, data });
  } else {
    await prisma.galleryItem.create({ data });
  }

  redirect('/admin/gallery');
}

export async function deleteGalleryItem(formData: FormData) {
  assertAuthed();
  const id = String(formData.get('id'));
  await prisma.galleryItem.delete({ where: { id } });
  redirect('/admin/gallery');
}
