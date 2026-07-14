import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { savePartner } from '../actions';

const inputClass = 'focus-ring mt-1.5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900';
const labelClass = 'block text-sm font-medium text-slate-700';

export const dynamic = 'force-dynamic';

export default async function PartnerEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === 'new';
  const partner = isNew ? null : await prisma.partner.findUnique({ where: { id: params.id } });

  if (!isNew && !partner) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">{isNew ? 'New Partner' : 'Edit Partner'}</h1>

      <form action={savePartner} className="mt-6 max-w-xl space-y-6" encType="multipart/form-data">
        {partner && <input type="hidden" name="id" value={partner.id} />}
        <input type="hidden" name="existingLogoUrl" value={partner?.logoUrl ?? ''} />

        <div>
          <label className={labelClass} htmlFor="logo">
            Logo
          </label>
          {partner?.logoUrl && (
            <img src={partner.logoUrl} alt="" className="mt-2 h-16 w-16 rounded-lg object-contain bg-slate-50" />
          )}
          <input id="logo" name="logo" type="file" accept="image/*" className={`${inputClass} bg-white`} />
        </div>

        <div>
          <label className={labelClass} htmlFor="name">
            Organization name
          </label>
          <input id="name" name="name" defaultValue={partner?.name} required className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="websiteUrl">
            Website URL (optional)
          </label>
          <input id="websiteUrl" name="websiteUrl" type="url" defaultValue={partner?.websiteUrl ?? ''} className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="order">
            Display order (lower shows first)
          </label>
          <input
            id="order"
            name="order"
            type="number"
            defaultValue={partner?.order ?? 0}
            className={`${inputClass} max-w-[8rem]`}
          />
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input type="checkbox" name="published" defaultChecked={partner?.published ?? true} className="h-4 w-4 rounded" />
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
