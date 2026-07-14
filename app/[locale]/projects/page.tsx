import { getTranslations } from 'next-intl/server';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import { getPublishedProjects, localizeProject, FOCUS_AREAS } from '@/lib/content';
import { heroTitleMetadata } from '@/lib/pageMetadata';

export const dynamic = 'force-dynamic';
export const generateMetadata = heroTitleMetadata('projects');

export default async function ProjectsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('projects');
  const items = (await getPublishedProjects()).map((p) => localizeProject(p, locale));
  const focusAreas = FOCUS_AREAS.map((f) => (locale === 'sw' ? f.sw : f.en));

  return (
    <>
      <PageHero title={t('hero.title')} sub={t('hero.sub')} />
      <Section>
        <ProjectsGrid items={items} focusAreas={focusAreas} />
      </Section>
    </>
  );
}
