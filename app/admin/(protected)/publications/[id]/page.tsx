import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { savePublication } from '../actions';

const inputClass =
  'focus-ring mt-1.5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900';
const labelClass = 'block text-sm font-medium text-slate-700';

export const dynamic = 'force-dynamic';

export default async function PublicationEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === 'new';
  const pub = isNew ? null : await prisma.publication.findUnique({ where: { id: params.id } });

  if (!isNew && !pub) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">{isNew ? 'New Publication' : 'Edit Publication'}</h1>

      <form action={savePublication} className="mt-6 max-w-xl space-y-6">
        {pub && <input type="hidden" name="id" value={pub.id} />}

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="titleEn">
              Title (English)
            </label>
            <input id="titleEn" name="titleEn" defaultValue={pub?.titleEn} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="titleSw">
              Title (Swahili)
            </label>
            <input id="titleSw" name="titleSw" defaultValue={pub?.titleSw} required className={inputClass} />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="type">
              Type (e.g. Report, Toolkit, Research)
            </label>
            <input id="type" name="type" defaultValue={pub?.type} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="year">
              Year
            </label>
            <input id="year" name="year" defaultValue={pub?.year} required className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="fileUrl">
            File URL (leave blank until a PDF is hosted somewhere)
          </label>
          <input id="fileUrl" name="fileUrl" type="url" defaultValue={pub?.fileUrl ?? ''} className={inputClass} />
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input type="checkbox" name="published" defaultChecked={pub?.published ?? true} className="h-4 w-4 rounded" />
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
