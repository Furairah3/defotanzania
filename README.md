# DEF Tanzania Website

Website for **Disability Enlightenment Foundation (DEF)** — Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion + next-intl (English/Swahili) + Prisma/PostgreSQL.

## Getting Started

1. **Database**: get a free PostgreSQL database from [Supabase](https://supabase.com) or [Neon](https://neon.tech), or run one locally with Docker:
   ```bash
   docker run -d --name defotanzania-postgres -e POSTGRES_USER=defo -e POSTGRES_PASSWORD=defo_dev_password -e POSTGRES_DB=defotanzania -p 5433:5432 postgres:16-alpine
   ```
2. Copy `.env.example` to `.env` and fill in `DATABASE_URL`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET`.
3. Install dependencies, create the database tables, and seed starter content:
   ```bash
   npm install
   npm run db:migrate
   npm run db:seed
   ```
4. Run the dev server:
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` (it redirects to `/en`). Swap `/en` for `/sw` to view the Swahili version. The admin panel is at `/admin/login`.

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run db:studio  # visual database browser (Prisma Studio)
```

## Project Structure

- `app/[locale]/` — one route folder per public page (Home, About, Programs, Projects, News, Gallery, Publications, Partners, Volunteer, Donate, Contact)
- `app/admin/` — password-protected content admin (see below), outside the `[locale]` tree
- `app/api/` — form-submission endpoints (`contact`, `volunteer`, `donate`) that write to the database, plus `api/admin/login|logout`
- `components/` — design system (`ui/`, `motion/`, `media/`, `layout/`), plus page-specific sections (`home/`, `projects/`, `gallery/`, `forms/`)
- `i18n/en.json` / `i18n/sw.json` — copy for pages that aren't database-backed (nav, labels, About/Programs/Projects/Gallery/Partners content). Edit these files directly to change that text.
- `prisma/schema.prisma` — database schema. `prisma/seed.ts` — starter content loaded by `npm run db:seed`.
- `lib/prisma.ts`, `lib/content.ts` — database client and query/localization helpers.
- `lib/auth.ts` — signed-cookie session helpers for the admin panel.

## Admin Panel (Mini CMS)

News posts and Publications are stored in the database and manageable at **`/admin`** without touching code:

- Sign in at `/admin/login` with the `ADMIN_PASSWORD` from your `.env`.
- **News** — create/edit/delete bilingual posts (English + Swahili title, excerpt, and body for each).
- **Publications** — create/edit/delete report/publication entries, optionally linking a hosted file URL (e.g. a PDF uploaded to Supabase/Neon storage or any file host).
- **Submissions** — read-only view of everything submitted through the Contact, Volunteer, and Donate forms.

The admin session is a signed, `httpOnly` cookie (see `lib/auth.ts`) — not a full user-account system. That's intentional for a small org site with one or two editors. Before launch:
- Set a long, random `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` (generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).
- If more than one person needs an editor account, or you need an audit trail of who changed what, that would require adding a real multi-user auth system — not currently built.

## Database & Deployment

- Schema lives in `prisma/schema.prisma`; models: `ContactSubmission`, `VolunteerApplication`, `DonationIntent`, `NewsPost`, `Publication`.
- This project uses Prisma 7's driver-adapter architecture (`@prisma/adapter-pg`), so `DATABASE_URL` is read directly by the app at runtime (`lib/prisma.ts`) — no extra config needed beyond setting the env var.
- To deploy (e.g. on [Vercel](https://vercel.com)): push to a Git repository, import the project, set `DATABASE_URL`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` as environment variables, and add `prisma migrate deploy` as a build step (or run it once manually against the production database) before the first deploy.
- Local Docker Postgres (see step 1 above) is for development only — point `DATABASE_URL` at your real Supabase/Neon connection string for production.

## Branding

- The real DEF Tanzania logo lives at `public/images/brand/logo-full.png` (trimmed) and `logo.png` (original), rendered via `components/media/Logo.tsx`.
- The color palette in `tailwind.config.ts` (`brand` = navy, `sun` = orange) was sampled directly from the logo (`#2c2e8f` / `#fda731`).
- Real contact details, phone/WhatsApp numbers, and social links (Facebook, Instagram, YouTube, WhatsApp Channel) are centralized in `lib/orgInfo.ts` and `i18n/*.json` (`contact.info`) — update them there if they change.

## Editing Translations

- `i18n/en.json` is the source of truth for English copy that isn't database-backed.
- `i18n/sw.json` contains a best-effort Swahili translation. **Have a native Swahili speaker review it before launch** — some phrasing (program names, legal/organizational terms) may benefit from local review. The same applies to the Swahili fields you enter in the admin panel for News/Publications.
- Both JSON files share the same key structure — if you add a key to `en.json`, add the matching key to `sw.json` or the Swahili version of that page will throw a missing-message error.

## Placeholder / Sample Content

A few sections still use clearly-labeled sample data until DEF supplies the real material — edit these directly in `i18n/en.json` / `i18n/sw.json`:

- **Impact stats** (Home page) — illustrative numbers, flagged with a note under the stats section.
- **Projects, Gallery items, Partner names** — sample entries so every page shows a fully populated layout.
- **Donate giving tiers and bank/mobile-money details** — placeholder amounts and a "details coming soon" note (no live payment processor is wired up — the Donate form just records the donor's intent so the team can follow up manually).
- Photos and videos are still code-generated placeholders (`components/media/PlaceholderImage.tsx` / `PlaceholderVideo.tsx`) — swap them for real `<Image>`/`<video>` elements once real photos/footage are available.

## Animation & Accessibility

- Scroll-triggered reveals (`components/motion/Reveal.tsx`), scroll-linked parallax hero backgrounds, an animated impact-counter, a scroll-progress bar, page transitions, and an auto-scrolling partners marquee.
- All motion respects the OS-level "reduce motion" setting via Framer Motion's `useReducedMotion` (and a global CSS fallback in `app/globals.css`).
- Skip-to-content link, visible focus rings, semantic headings, ARIA labels throughout, and a palette chosen for WCAG AA contrast.
- Test with keyboard-only navigation and a screen reader before launch, in addition to automated tools (e.g. Lighthouse, axe DevTools) — this matters especially for a disability-rights organization's own site.
