import { useTranslations } from 'next-intl';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import ProjectsGrid from '@/components/projects/ProjectsGrid';

export default function ProjectsPage() {
  const t = useTranslations('projects');

  return (
    <>
      <PageHero title={t('hero.title')} sub={t('hero.sub')} />
      <Section>
        <ProjectsGrid />
      </Section>
    </>
  );
}
