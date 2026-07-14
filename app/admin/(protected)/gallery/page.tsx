import Link from 'next/link';
import Image from 'next/image';
import { Video } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { deleteGalleryItem } from './actions';
import ConfirmSubmitButton from '../ConfirmSubmitButton';

export const dynamic = 'force-dynamic';

export default async function AdminGalleryPage() {
  const items = await prisma.galleryItem.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-950">Gallery</h1>
        <Link
          href="/admin/gallery/new"
          className="focus-ring rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          New gallery item
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="relative aspect-video bg-slate-100">
              {item.type === 'video' ? (
                <div className="flex h-full w-full items-center justify-center text-slate-400">
                  <Video className="h-8 w-8" aria-hidden="true" />
                </div>
              ) : (
                <Image src={item.fileUrl} alt="" fill className="object-cover" sizes="320px" />
              )}
            </div>
            <div className="p-4">
              <p className="truncate text-sm font-semibold text-brand-950">{item.captionEn}</p>
              <p className="text-xs text-slate-500">
                {item.categoryEn} · {item.published ? <span className="text-green-600">Published</span> : <span className="text-slate-400">Draft</span>}
              </p>
              <div className="mt-3 flex gap-2">
                <Link
                  href={`/admin/gallery/${item.id}`}
                  className="focus-ring rounded-full border border-slate-200 px-3 py-1 text-xs font-medium hover:bg-slate-50"
                >
                  Edit
                </Link>
                <form action={deleteGalleryItem}>
                  <input type="hidden" name="id" value={item.id} />
                  <ConfirmSubmitButton
                    confirmMessage={`Delete "${item.captionEn}"? This cannot be undone.`}
                    className="focus-ring rounded-full border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </ConfirmSubmitButton>
                </form>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-slate-500">No gallery items yet.</p>}
      </div>
    </div>
  );
}
