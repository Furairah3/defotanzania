import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { deletePublication } from './actions';
import ConfirmSubmitButton from '../ConfirmSubmitButton';

export const dynamic = 'force-dynamic';

export default async function AdminPublicationsPage() {
  const items = await prisma.publication.findMany({ orderBy: [{ year: 'desc' }, { createdAt: 'desc' }] });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-950">Publications</h1>
        <Link
          href="/admin/publications/new"
          className="focus-ring rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          New publication
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((pub) => (
          <div key={pub.id} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4">
            <div className="min-w-0">
              <p className="truncate font-semibold text-brand-950">{pub.titleEn}</p>
              <p className="text-xs text-slate-500">
                {pub.type} · {pub.year} ·{' '}
                {pub.published ? <span className="text-green-600">Published</span> : <span className="text-slate-400">Draft</span>}
                {!pub.fileUrl && <span className="text-amber-600"> · No file linked</span>}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link
                href={`/admin/publications/${pub.id}`}
                className="focus-ring rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium hover:bg-slate-50"
              >
                Edit
              </Link>
              <form action={deletePublication}>
                <input type="hidden" name="id" value={pub.id} />
                <ConfirmSubmitButton
                  confirmMessage={`Delete "${pub.titleEn}"? This cannot be undone.`}
                  className="focus-ring rounded-full border border-red-200 px-4 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Delete
                </ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-slate-500">No publications yet.</p>}
      </div>
    </div>
  );
}
