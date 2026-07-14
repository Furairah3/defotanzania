import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { GALLERY_CATEGORIES } from '@/lib/content';
import { saveGalleryItem } from '../actions';

const inputClass = 'focus-ring mt-1.5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900';
const labelClass = 'block text-sm font-medium text-slate-700';

export const dynamic = 'force-dynamic';

export default async function GalleryEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === 'new';
  const item = isNew ? null : await prisma.galleryItem.findUnique({ where: { id: params.id } });

  if (!isNew && !item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">{isNew ? 'New Gallery Item' : 'Edit Gallery Item'}</h1>

      <form action={saveGalleryItem} className="mt-6 max-w-xl space-y-6" encType="multipart/form-data">
        {item && <input type="hidden" name="id" value={item.id} />}
        <input type="hidden" name="existingFileUrl" value={item?.fileUrl ?? ''} />

        <div>
          <label className={labelClass} htmlFor="type">
            Type
          </label>
          <select id="type" name="type" defaultValue={item?.type ?? 'photo'} className={inputClass}>
            <option value="photo">Photo</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="file">
            {isNew ? 'Photo or video file' : 'Replace photo/video (leave blank to keep current file)'}
          </label>
          {item?.fileUrl && item.type === 'photo' && (
            <img src={item.fileUrl} alt="" className="mt-2 h-32 w-32 rounded-lg object-cover" />
          )}
          <input
            id="file"
            name="file"
            type="file"
            accept="image/*,video/*"
            required={isNew}
            className={`${inputClass} bg-white`}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="captionEn">
              Caption (English)
            </label>
            <input id="captionEn" name="captionEn" defaultValue={item?.captionEn} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="captionSw">
              Caption (Swahili)
            </label>
            <input id="captionSw" name="captionSw" defaultValue={item?.captionSw} required className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="categoryEn">
            Category
          </label>
          <select id="categoryEn" name="categoryEn" defaultValue={item?.categoryEn ?? GALLERY_CATEGORIES[0].en} className={inputClass}>
            {GALLERY_CATEGORIES.map((cat) => (
              <option key={cat.en} value={cat.en}>
                {cat.en}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="order">
            Display order (lower shows first)
          </label>
          <input
            id="order"
            name="order"
            type="number"
            defaultValue={item?.order ?? 0}
            className={`${inputClass} max-w-[8rem]`}
          />
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input type="checkbox" name="published" defaultChecked={item?.published ?? true} className="h-4 w-4 rounded" />
          Published (visible on the site)
        </label>

        <button
          type="submit"
          className="focus-ring rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}
