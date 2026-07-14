import { put } from '@vercel/blob';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

/**
 * Uploads a file and returns its public URL.
 *
 * Uses Vercel Blob when BLOB_READ_WRITE_TOKEN is configured (production).
 * Otherwise falls back to writing into /public/uploads for local development,
 * so the admin panel's upload flow works without needing a Blob account yet.
 */
export async function uploadFile(file: File, folder: string): Promise<string> {
  const ext = (file.name.split('.').pop() || 'bin').toLowerCase();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`${folder}/${filename}`, file, { access: 'public' });
    return blob.url;
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);
  return `/uploads/${folder}/${filename}`;
}
