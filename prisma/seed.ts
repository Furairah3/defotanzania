import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../lib/generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const TEAM_MEMBERS = [
  { name: 'Team Member', roleEn: 'Executive Director', roleSw: 'Mkurugenzi Mtendaji', bioEn: "Leads DEF's overall strategy and represents the organization nationally.", bioSw: 'Anaongoza mkakati mkuu wa DEF na kuwakilisha taasisi kitaifa.', order: 0 },
  { name: 'Team Member', roleEn: 'Programs & Advocacy Manager', roleSw: 'Meneja wa Mipango na Utetezi', bioEn: "Oversees program delivery and DEF's rights advocacy work.", bioSw: 'Anasimamia utekelezaji wa mipango na kazi ya utetezi wa haki za DEF.', order: 1 },
  { name: 'Team Member', roleEn: 'Youth Leadership Coordinator', roleSw: 'Mratibu wa Uongozi wa Vijana', bioEn: 'Runs the Youth Leadership Academy and mentorship activities.', bioSw: 'Anaendesha Chuo cha Uongozi wa Vijana na shughuli za ushauri.', order: 2 },
  { name: 'Team Member', roleEn: 'Inclusive Education Lead', roleSw: 'Kiongozi wa Elimu Jumuishi', bioEn: 'Partners with schools on accessibility and inclusive learning.', bioSw: 'Anashirikiana na shule kuhusu ufikivu na elimu jumuishi.', order: 3 },
  { name: 'Team Member', roleEn: 'Communications & Media Officer', roleSw: 'Afisa wa Mawasiliano na Habari', bioEn: 'Manages campaigns, media tours, and public communications.', bioSw: 'Anasimamia kampeni, ziara za vyombo vya habari, na mawasiliano ya umma.', order: 4 },
  { name: 'Team Member', roleEn: 'Finance & Operations Officer', roleSw: 'Afisa wa Fedha na Uendeshaji', bioEn: "Manages DEF's finances, operations, and partnerships.", bioSw: 'Anasimamia fedha, uendeshaji, na ushirikiano wa DEF.', order: 5 },
];

const PROJECTS = [
  { titleEn: 'School Outreach & Inclusion Visits', titleSw: 'Ziara za Shule na Ujumuishaji', focusAreaEn: 'Inclusive education', focusAreaSw: 'Elimu jumuishi', status: 'Ongoing', bodyEn: 'DEF visits schools such as Uhuru Mchanganyiko Primary School to donate basic needs items, support vulnerable learners, and raise community awareness on the rights and potential of persons with disabilities.', bodySw: 'DEF hutembelea shule kama Shule ya Msingi Uhuru Mchanganyiko kutoa vifaa vya mahitaji ya msingi, kusaidia wanafunzi wenye mazingira magumu, na kuhamasisha jamii kuhusu haki na uwezo wa watu wenye ulemavu.', order: 0 },
  { titleEn: 'Youth Leadership Academy', titleSw: 'Chuo cha Uongozi kwa Vijana', focusAreaEn: 'Youth leadership', focusAreaSw: 'Uongozi wa vijana', status: 'Ongoing', bodyEn: 'A training pipeline preparing young leaders with disabilities for civic and political roles.', bodySw: 'Mfumo wa mafunzo unaoandaa viongozi vijana wenye ulemavu kwa nafasi za kiraia na kisiasa.', order: 1 },
  { titleEn: 'DEF National Conference', titleSw: 'Kongamano la Kitaifa la DEF', focusAreaEn: 'Community awareness', focusAreaSw: 'Uhamasishaji wa jamii', status: 'Annual', bodyEn: 'A yearly gathering and awards ceremony celebrating the achievements of persons with disabilities.', bodySw: 'Mkusanyiko wa kila mwaka na sherehe ya tuzo inayoenzi mafanikio ya watu wenye ulemavu.', order: 2 },
  { titleEn: 'Digital Skills for Independence', titleSw: 'Ujuzi wa Kidijitali kwa Kujitegemea', focusAreaEn: 'Accessible technology and innovation', focusAreaSw: 'Teknolojia inayofikika na ubunifu', status: 'Ongoing', bodyEn: 'In partnership with Siloam International (South Korea), DEF trained blind students at the University of Dar es Salaam in assistive technologies including the BrailleSense device and computer skills — building digital literacy, independent learning, and access to education.', bodySw: 'Kwa ushirikiano na Siloam International (Korea Kusini), DEF ilitoa mafunzo kwa wanafunzi wasioona katika Chuo Kikuu cha Dar es Salaam kuhusu teknolojia saidizi ikiwemo kifaa cha BrailleSense na ujuzi wa kompyuta — kujenga ujuzi wa kidijitali, kujifunza kwa kujitegemea, na upatikanaji wa elimu.', order: 3 },
  { titleEn: 'Women with Disabilities Economic Circle', titleSw: 'Kikundi cha Kiuchumi cha Wanawake wenye Ulemavu', focusAreaEn: 'Gender and disability inclusion', focusAreaSw: 'Jinsia na ujumuishaji wa ulemavu', status: 'Pilot', bodyEn: 'Savings groups and entrepreneurship mentoring for women with disabilities.', bodySw: 'Vikundi vya akiba na ushauri wa ujasiriamali kwa wanawake wenye ulemavu.', order: 4 },
  { titleEn: 'Policy Advocacy Roundtables', titleSw: 'Mijadala ya Utetezi wa Sera', focusAreaEn: 'Research and policy advocacy', focusAreaSw: 'Utafiti na utetezi wa sera', status: 'Ongoing', bodyEn: 'Bringing policymakers and the disability community together to strengthen protective legislation.', bodySw: 'Kuwakutanisha watunga sera na jamii ya walemavu ili kuimarisha sheria za ulinzi.', order: 5 },
];

const PARTNERS = [
  'Partner Organization 1',
  'Partner Organization 2',
  'Partner Organization 3',
  'Partner Organization 4',
  'Partner Organization 5',
  'Partner Organization 6',
].map((name, i) => ({ name, order: i }));

const GALLERY_ITEMS = [
  { type: 'video', captionEn: 'DEF community outreach in action', captionSw: 'Shughuli za DEF za uhamasishaji wa jamii', categoryEn: 'Community', categorySw: 'Jamii', fileUrl: '/videos/community-outreach.mp4' },
  { type: 'photo', captionEn: 'DEF visits Uhuru Mchanganyiko Primary School to donate basic needs items and support vulnerable learners', captionSw: 'DEF yatembelea Shule ya Msingi Uhuru Mchanganyiko kutoa vifaa vya mahitaji ya msingi na kusaidia wanafunzi wenye mazingira magumu', categoryEn: 'Community', categorySw: 'Jamii', fileUrl: '/images/gallery/activity-1.jpeg' },
  { type: 'photo', captionEn: 'Assistive technology training for blind students with Siloam International (South Korea) at the University of Dar es Salaam', captionSw: 'Mafunzo ya teknolojia saidizi kwa wanafunzi wasioona kwa ushirikiano na Siloam International (Korea Kusini) katika Chuo Kikuu cha Dar es Salaam', categoryEn: 'Training', categorySw: 'Mafunzo', fileUrl: '/images/gallery/training-1.jpeg' },
  { type: 'photo', captionEn: "Learners at Uhuru Mchanganyiko Primary School during DEF's outreach visit", captionSw: 'Wanafunzi wa Shule ya Msingi Uhuru Mchanganyiko wakati wa ziara ya DEF', categoryEn: 'Community', categorySw: 'Jamii', fileUrl: '/images/gallery/activity-2.jpeg' },
  { type: 'photo', captionEn: 'Hands-on computer skills training as part of the assistive technology program', captionSw: 'Mafunzo ya vitendo ya ujuzi wa kompyuta kama sehemu ya mpango wa teknolojia saidizi', categoryEn: 'Training', categorySw: 'Mafunzo', fileUrl: '/images/gallery/training-2.jpeg' },
  { type: 'photo', captionEn: 'Raising community awareness on disability rights during the school visit', captionSw: 'Kuhamasisha jamii kuhusu haki za walemavu wakati wa ziara ya shule', categoryEn: 'Community', categorySw: 'Jamii', fileUrl: '/images/gallery/activity-3.jpeg' },
  { type: 'photo', captionEn: 'A student practices with a BrailleSense device during the training', captionSw: 'Mwanafunzi akijifunza kutumia kifaa cha BrailleSense wakati wa mafunzo', categoryEn: 'Training', categorySw: 'Mafunzo', fileUrl: '/images/gallery/training-3.jpeg' },
  { type: 'photo', captionEn: 'DEF team supporting vulnerable learners at Uhuru Mchanganyiko Primary School', captionSw: 'Timu ya DEF ikiwasaidia wanafunzi wenye mazingira magumu katika Shule ya Uhuru Mchanganyiko', categoryEn: 'Community', categorySw: 'Jamii', fileUrl: '/images/gallery/activity-4.jpeg' },
  { type: 'photo', captionEn: 'Building digital literacy and independent learning skills', captionSw: 'Kujenga ujuzi wa kidijitali na uwezo wa kujifunza kwa kujitegemea', categoryEn: 'Training', categorySw: 'Mafunzo', fileUrl: '/images/gallery/training-4.jpeg' },
  { type: 'photo', captionEn: 'Promoting disability inclusion at the school donation visit', captionSw: 'Kukuza ujumuishaji wa walemavu wakati wa ziara ya kutoa misaada shuleni', categoryEn: 'Community', categorySw: 'Jamii', fileUrl: '/images/gallery/activity-5.jpeg' },
  { type: 'photo', captionEn: 'Blind students learning assistive technology at the University of Dar es Salaam', captionSw: 'Wanafunzi wasioona wakijifunza teknolojia saidizi katika Chuo Kikuu cha Dar es Salaam', categoryEn: 'Training', categorySw: 'Mafunzo', fileUrl: '/images/gallery/training-5.jpeg' },
  { type: 'photo', captionEn: 'DEF and community members at the Uhuru Mchanganyiko Primary School outreach', captionSw: 'DEF na wanajamii katika ziara ya Shule ya Msingi Uhuru Mchanganyiko', categoryEn: 'Community', categorySw: 'Jamii', fileUrl: '/images/gallery/activity-6.jpeg' },
  { type: 'photo', captionEn: 'BrailleSense and computer skills training session with Siloam International', captionSw: 'Mafunzo ya BrailleSense na ujuzi wa kompyuta kwa ushirikiano na Siloam International', categoryEn: 'Training', categorySw: 'Mafunzo', fileUrl: '/images/gallery/training-6.jpeg' },
  { type: 'photo', captionEn: 'DEF donating basic needs items to learners', captionSw: 'DEF ikitoa vifaa vya mahitaji ya msingi kwa wanafunzi', categoryEn: 'Community', categorySw: 'Jamii', fileUrl: '/images/gallery/activity-7.jpeg' },
  { type: 'photo', captionEn: 'Improving access to education through assistive technology', captionSw: 'Kuboresha upatikanaji wa elimu kupitia teknolojia saidizi', categoryEn: 'Training', categorySw: 'Mafunzo', fileUrl: '/images/gallery/training-7.jpeg' },
  { type: 'photo', captionEn: 'Community awareness activity at Uhuru Mchanganyiko Primary School', captionSw: 'Shughuli ya uhamasishaji wa jamii katika Shule ya Msingi Uhuru Mchanganyiko', categoryEn: 'Community', categorySw: 'Jamii', fileUrl: '/images/gallery/activity-8.jpeg' },
  { type: 'photo', captionEn: 'A trainee at a computer workstation during the assistive technology program', captionSw: 'Mshiriki kwenye kituo cha kompyuta wakati wa mpango wa teknolojia saidizi', categoryEn: 'Training', categorySw: 'Mafunzo', fileUrl: '/images/gallery/training-8.jpeg' },
  { type: 'photo', captionEn: 'Learners and DEF staff during the school outreach visit', captionSw: 'Wanafunzi na wafanyakazi wa DEF wakati wa ziara ya shule', categoryEn: 'Community', categorySw: 'Jamii', fileUrl: '/images/gallery/activity-9.jpeg' },
].map((item, i) => ({ ...item, order: i }));

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

  for (const member of TEAM_MEMBERS) {
    const existing = await prisma.teamMember.findFirst({ where: { roleEn: member.roleEn } });
    if (!existing) {
      await prisma.teamMember.create({ data: member });
    }
  }

  for (const project of PROJECTS) {
    const existing = await prisma.project.findFirst({ where: { titleEn: project.titleEn } });
    if (!existing) {
      await prisma.project.create({ data: project });
    }
  }

  for (const partner of PARTNERS) {
    const existing = await prisma.partner.findFirst({ where: { name: partner.name } });
    if (!existing) {
      await prisma.partner.create({ data: partner });
    }
  }

  for (const item of GALLERY_ITEMS) {
    const existing = await prisma.galleryItem.findFirst({ where: { fileUrl: item.fileUrl } });
    if (!existing) {
      await prisma.galleryItem.create({ data: item });
    }
  }

  console.log(
    `Seeded ${NEWS_POSTS.length} news posts, ${PUBLICATIONS.length} publications, ${TEAM_MEMBERS.length} team members, ${PROJECTS.length} projects, ${PARTNERS.length} partners, ${GALLERY_ITEMS.length} gallery items.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
