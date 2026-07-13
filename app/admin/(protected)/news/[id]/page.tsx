import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { saveNewsPost } from '../actions';

const inputClass =
  'focus-ring mt-1.5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900';
const labelClass = 'block text-sm font-medium text-slate-700';

export const dynamic = 'force-dynamic';

export default async function NewsEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === 'new';
  const post = isNew ? null : await prisma.newsPost.findUnique({ where: { id: params.id } });

  if (!isNew && !post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">{isNew ? 'New News Post' : 'Edit News Post'}</h1>

      <form action={saveNewsPost} className="mt-6 space-y-6">
        {post && <input type="hidden" name="id" value={post.id} />}

        <div>
          <label className={labelClass} htmlFor="slug">
            Slug (URL path, e.g. "national-conference-recap")
          </label>
          <input id="slug" name="slug" defaultValue={post?.slug} required className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="date">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={(post?.date ?? new Date()).toISOString().slice(0, 10)}
            required
            className={inputClass}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="titleEn">
              Title (English)
            </label>
            <input id="titleEn" name="titleEn" defaultValue={post?.titleEn} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="titleSw">
              Title (Swahili)
            </label>
            <input id="titleSw" name="titleSw" defaultValue={post?.titleSw} required className={inputClass} />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="excerptEn">
              Excerpt (English)
            </label>
            <textarea id="excerptEn" name="excerptEn" defaultValue={post?.excerptEn} rows={3} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="excerptSw">
              Excerpt (Swahili)
            </label>
            <textarea id="excerptSw" name="excerptSw" defaultValue={post?.excerptSw} rows={3} required className={inputClass} />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="bodyEn">
              Full story (English)
            </label>
            <textarea id="bodyEn" name="bodyEn" defaultValue={post?.bodyEn} rows={8} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="bodySw">
              Full story (Swahili)
            </label>
            <textarea id="bodySw" name="bodySw" defaultValue={post?.bodySw} rows={8} required className={inputClass} />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input type="checkbox" name="published" defaultChecked={post?.published ?? true} className="h-4 w-4 rounded" />
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
