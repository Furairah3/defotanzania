'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/motion/Reveal';
import Card from '@/components/ui/Card';

type Project = { id: string; title: string; focusArea: string; status: string; body: string };

export default function ProjectsGrid({ items, focusAreas }: { items: Project[]; focusAreas: string[] }) {
  const t = useTranslations('projects');
  const [active, setActive] = useState<string>('all');

  const filtered = useMemo(
    () => (active === 'all' ? items : items.filter((p) => p.focusArea === active)),
    [active, items],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t('filterAll')}>
        <button
          type="button"
          onClick={() => setActive('all')}
          aria-pressed={active === 'all'}
          className={`focus-ring rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            active === 'all' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {t('filterAll')}
        </button>
        {focusAreas.map((area) => (
          <button
            key={area}
            type="button"
            onClick={() => setActive(area)}
            aria-pressed={active === area}
            className={`focus-ring rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === area ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {area}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <Reveal key={project.id} delay={(i % 3) * 0.08}>
            <Card className="h-full">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {project.status}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-brand-950">{project.title}</h3>
              <p className="mt-1 text-xs font-medium text-sun-600">{project.focusArea}</p>
              <p className="mt-3 text-sm text-slate-600">{project.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
