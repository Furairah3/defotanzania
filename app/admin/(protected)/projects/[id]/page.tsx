import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { FOCUS_AREAS } from '@/lib/content';
import { saveProject } from '../actions';

const inputClass = 'focus-ring mt-1.5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900';
const labelClass = 'block text-sm font-medium text-slate-700';

export const dynamic = 'force-dynamic';

export default async function ProjectEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === 'new';
  const project = isNew ? null : await prisma.project.findUnique({ where: { id: params.id } });

  if (!isNew && !project) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">{isNew ? 'New Project' : 'Edit Project'}</h1>

      <form action={saveProject} className="mt-6 max-w-xl space-y-6">
        {project && <input type="hidden" name="id" value={project.id} />}

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="titleEn">
              Title (English)
            </label>
            <input id="titleEn" name="titleEn" defaultValue={project?.titleEn} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="titleSw">
              Title (Swahili)
            </label>
            <input id="titleSw" name="titleSw" defaultValue={project?.titleSw} required className={inputClass} />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="focusAreaEn">
              Focus area
            </label>
            <select id="focusAreaEn" name="focusAreaEn" defaultValue={project?.focusAreaEn ?? FOCUS_AREAS[0].en} className={inputClass}>
              {FOCUS_AREAS.map((f) => (
                <option key={f.en} value={f.en}>
                  {f.en}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="status">
              Status (e.g. Ongoing, Pilot, Annual)
            </label>
            <input id="status" name="status" defaultValue={project?.status} required className={inputClass} />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="bodyEn">
              Description (English)
            </label>
            <textarea id="bodyEn" name="bodyEn" defaultValue={project?.bodyEn} rows={4} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="bodySw">
              Description (Swahili)
            </label>
            <textarea id="bodySw" name="bodySw" defaultValue={project?.bodySw} rows={4} required className={inputClass} />
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
            defaultValue={project?.order ?? 0}
            className={`${inputClass} max-w-[8rem]`}
          />
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input type="checkbox" name="published" defaultChecked={project?.published ?? true} className="h-4 w-4 rounded" />
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
