import { notFound } from 'next/navigation';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { saveTeamMember } from '../actions';

const inputClass = 'focus-ring mt-1.5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900';
const labelClass = 'block text-sm font-medium text-slate-700';

export const dynamic = 'force-dynamic';

export default async function TeamEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === 'new';
  const member = isNew ? null : await prisma.teamMember.findUnique({ where: { id: params.id } });

  if (!isNew && !member) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">{isNew ? 'New Team Member' : 'Edit Team Member'}</h1>

      <form action={saveTeamMember} className="mt-6 max-w-xl space-y-6" encType="multipart/form-data">
        {member && <input type="hidden" name="id" value={member.id} />}
        <input type="hidden" name="existingPhotoUrl" value={member?.photoUrl ?? ''} />

        <div>
          <label className={labelClass} htmlFor="photo">
            Photo
          </label>
          {member?.photoUrl && (
            <Image
              src={member.photoUrl}
              alt=""
              width={80}
              height={80}
              className="mt-2 h-20 w-20 rounded-full object-cover"
            />
          )}
          <input id="photo" name="photo" type="file" accept="image/*" className={`${inputClass} bg-white`} />
        </div>

        <div>
          <label className={labelClass} htmlFor="name">
            Name
          </label>
          <input id="name" name="name" defaultValue={member?.name} required className={inputClass} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="roleEn">
              Role (English)
            </label>
            <input id="roleEn" name="roleEn" defaultValue={member?.roleEn} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="roleSw">
              Role (Swahili)
            </label>
            <input id="roleSw" name="roleSw" defaultValue={member?.roleSw} required className={inputClass} />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="bioEn">
              Bio (English)
            </label>
            <textarea id="bioEn" name="bioEn" defaultValue={member?.bioEn ?? ''} rows={3} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="bioSw">
              Bio (Swahili)
            </label>
            <textarea id="bioSw" name="bioSw" defaultValue={member?.bioSw ?? ''} rows={3} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="order">
            Display order (lower shows first)
          </label>
          <input
            id="order"
            name="order"
            type="number"
            defaultValue={member?.order ?? 0}
            className={`${inputClass} max-w-[8rem]`}
          />
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input type="checkbox" name="published" defaultChecked={member?.published ?? true} className="h-4 w-4 rounded" />
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
