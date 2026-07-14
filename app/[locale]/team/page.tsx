import { getTranslations } from 'next-intl/server';
import { UserRound } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Reveal from '@/components/motion/Reveal';
import Card from '@/components/ui/Card';
import PlaceholderImage from '@/components/media/PlaceholderImage';
import { getPublishedTeamMembers, localizeTeamMember } from '@/lib/content';
import { heroTitleMetadata } from '@/lib/pageMetadata';

export const dynamic = 'force-dynamic';
export const generateMetadata = heroTitleMetadata('team');

export default async function TeamPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('team');
  const members = (await getPublishedTeamMembers()).map((m) => localizeTeamMember(m, locale));

  return (
    <>
      <PageHero title={t('hero.title')} sub={t('hero.sub')} />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, i) => (
            <Reveal key={member.id} delay={(i % 3) * 0.08}>
              <Card className="h-full !p-0 overflow-hidden text-center">
                <PlaceholderImage label={member.role} aspect="aspect-square" className="rounded-none" src={member.photoUrl ?? undefined} />
                <div className="p-6">
                  <div className="mx-auto -mt-14 flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-700 shadow-md ring-4 ring-white">
                    <UserRound className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 font-semibold text-brand-950">{member.name}</h3>
                  <p className="text-sm font-medium text-sun-600">{member.role}</p>
                  <p className="mt-2 text-sm text-slate-600">{member.bio}</p>
                </div>
              </Card>
            </Reveal>
          ))}
          {members.length === 0 && <p className="text-sm text-slate-500">Team information coming soon.</p>}
        </div>
      </Section>
    </>
  );
}
