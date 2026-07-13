import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../lib/generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const NEWS_POSTS = [
  {
    slug: 'national-conference-recap',
    titleEn: 'Highlights from the DEF National Conference',
    titleSw: 'Muhtasari wa Kongamano la Kitaifa la DEF',
    excerptEn:
      'Leaders, advocates, and award winners gathered to celebrate a year of progress toward a self-dependent Tanzania.',
    excerptSw:
      'Viongozi, watetezi, na washindi wa tuzo walikutana kuadhimisha mwaka wa maendeleo kuelekea Tanzania ya kujitegemea.',
    bodyEn:
      "This year's DEF National Conference brought together persons with disabilities, government representatives, and partner organizations for a day of awards, panel discussions, and shared commitments. Replace this placeholder text with the real recap once the event has taken place.",
    bodySw:
      'Kongamano la mwaka huu la Kitaifa la DEF liliwakutanisha watu wenye ulemavu, wawakilishi wa serikali, na mashirika washirika kwa siku ya tuzo, mijadala, na ahadi za pamoja. Badilisha maudhui haya ya mfano na muhtasari halisi baada ya tukio kufanyika.',
    date: new Date('2026-03-14'),
  },
  {
    slug: 'media-tour-launch',
    titleEn: 'DEF Launches Nationwide Media Tour',
    titleSw: 'DEF Yazindua Ziara ya Kitaifa ya Vyombo vya Habari',
    excerptEn: 'A new round of public meetings and media appearances kicks off our latest awareness campaign.',
    excerptSw:
      'Mzunguko mpya wa mikutano ya hadhara na matukio ya vyombo vya habari unaanza kampeni yetu mpya ya uhamasishaji.',
    bodyEn:
      'The media tour will visit multiple regions with public meetings focused on the rights and abilities of persons with disabilities. Replace this placeholder text with real coverage as the tour progresses.',
    bodySw:
      'Ziara hiyo itafika katika mikoa kadhaa na mikutano ya hadhara inayolenga haki na uwezo wa watu wenye ulemavu. Badilisha maudhui haya ya mfano na taarifa halisi ziara inavyoendelea.',
    date: new Date('2026-02-02'),
  },
  {
    slug: 'youth-leadership-cohort',
    titleEn: 'Meet the Newest Youth Leadership Cohort',
    titleSw: 'Tambulika na Kundi Jipya la Uongozi wa Vijana',
    excerptEn: "A new group of young leaders with disabilities begins DEF's leadership training program.",
    excerptSw: 'Kundi jipya la viongozi vijana wenye ulemavu wanaanza mpango wa mafunzo ya uongozi wa DEF.',
    bodyEn:
      'This cohort will spend the coming months building the skills needed to pursue leadership and political positions. Replace this placeholder text with real participant stories.',
    bodySw:
      'Kundi hili litatumia miezi ijayo kujenga ujuzi unaohitajika kufuatilia nafasi za uongozi na kisiasa. Badilisha maudhui haya ya mfano na hadithi halisi za washiriki.',
    date: new Date('2026-01-18'),
  },
];

const PUBLICATIONS = [
  { titleEn: 'State of Disability Inclusion — Annual Report', titleSw: 'Hali ya Ujumuishaji wa Ulemavu — Ripoti ya Mwaka', type: 'Report', year: '2026' },
  { titleEn: 'Policy Brief: Strengthening Disability Rights Legislation', titleSw: 'Muhtasari wa Sera: Kuimarisha Sheria za Haki za Walemavu', type: 'Policy Brief', year: '2025' },
  { titleEn: 'Inclusive Education Toolkit for Schools', titleSw: 'Mwongozo wa Elimu Jumuishi kwa Shule', type: 'Toolkit', year: '2025' },
  { titleEn: 'Youth Leadership Program — Impact Findings', titleSw: 'Mpango wa Uongozi wa Vijana — Matokeo ya Tathmini', type: 'Research', year: '2024' },
];

async function main() {
  for (const post of NEWS_POSTS) {
    await prisma.newsPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  for (const pub of PUBLICATIONS) {
    const existing = await prisma.publication.findFirst({ where: { titleEn: pub.titleEn } });
    if (!existing) {
      await prisma.publication.create({ data: pub });
    }
  }

  console.log(`Seeded ${NEWS_POSTS.length} news posts and ${PUBLICATIONS.length} publications.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
