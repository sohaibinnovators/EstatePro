# EstatePro

Frontend real estate demonstration for discovering homes for sale and rent across **Lahore**, **Karachi**, and **Islamabad**.

EstatePro is a **browser-only demo**. There is no backend, database, authentication, payments, or live agent messaging. Sample listings ship with the app; user submissions, favorites, comparisons, and notifications persist in `localStorage` on the current device.

## Main features

- Property discovery (buy / rent / all listings) with filters, sorting, and pagination
- Property detail pages with galleries, amenities, and agent inquiry forms
- Favorites / saved properties
- Property comparison (up to 3 listings)
- Recently viewed properties and recommendations
- Property sharing (Web Share API + copy link)
- Agent directory and profiles
- List Your Property + dashboard CRUD for demo listings
- Local inquiries, activity notifications, and dashboard analytics
- Demo data reset from Dashboard → Settings

## Technology stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- `localStorage` for demo persistence (no external APIs)

## Getting started

### Requirements

- Node.js 20+ recommended
- npm (or yarn / pnpm / bun)

### Install

```bash
npm install
```

### Environment

Copy the example env file and optionally set your public site URL (used for metadata, sitemap, and Open Graph):

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Project structure

```
app/                  # Routes (pages, layouts, sitemap, robots)
components/           # UI, layout, properties, dashboard, home sections
lib/
  data/               # Sample properties & agents (read-only catalog)
  *.ts                # Search, storage helpers, favorites, compare, etc.
public/               # Static assets
```

### Key routes

| Route | Description |
| --- | --- |
| `/` | Homepage |
| `/buy`, `/rent`, `/properties` | Listings + filters |
| `/properties/[slug]` | Property details |
| `/compare` | Side-by-side comparison |
| `/saved` | Favorites |
| `/agents`, `/agents/[slug]` | Agents |
| `/list-property` | Public listing form |
| `/dashboard/*` | Demo workspace |
| `/about`, `/contact`, `/login`, `/signup` | Marketing / demo auth UI |

## Demo data & localStorage

**Sample catalog** (`lib/data/properties.ts`, `lib/data/agents.ts`) is bundled with the app and is never overwritten by user actions.

**Browser-only keys** (examples):

- `estatepro:favorites`
- `estatepro:compare`
- `estatepro:recently-viewed`
- `estatepro:recent-searches`
- `estatepro:notifications`
- `estatepro:user-properties`
- `estatepro:inquiries`
- `estatepro:user-profile`
- `estatepro:property-draft`

Clear them via **Dashboard → Settings → Reset all demo local data**, or by clearing site data in the browser.

### Important limitations

- Not a production marketplace
- Login / signup are UI demos only (no accounts)
- Notifications are local activity records, not realtime messages
- User listings exist only in the current browser
- Image uploads are compressed to data URLs for demo persistence (storage quota applies)

## Deployment

### GitHub

1. Create a new GitHub repository.
2. From the project root:

```bash
git init
git add .
git commit -m "Initial EstatePro release"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Do not commit `.env.local`, secrets, or `node_modules` (already covered by `.gitignore`).

### Vercel

1. Import the GitHub repository in [Vercel](https://vercel.com/new).
2. Framework preset: **Next.js** (auto-detected).
3. Set environment variable:
   - `NEXT_PUBLIC_SITE_URL` = `https://<your-deployment-domain>`
4. Deploy.

After the first deploy, update `NEXT_PUBLIC_SITE_URL` to the production URL if it differs from the preview domain, then redeploy so sitemap / Open Graph URLs are correct.

### Post-deploy checks

- Homepage, buy/rent listings, property detail, agents
- Favorites, compare, share, dashboard submit/edit/delete
- Images from Unsplash + user data-URL images
- `/sitemap.xml` and `/robots.txt`

## License

Private / demo project — update this section if you publish under a specific license.
