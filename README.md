# ListOnce

**List once, post everywhere.** A cross-posting web app that lets resellers create one product listing and publish it to multiple marketplaces.

- **Web app:** Next.js (App Router) + TypeScript, Tailwind, shadcn-style UI, NextAuth, Prisma + PostgreSQL  
- **Chrome extension:** Assisted posting for Facebook Marketplace and OfferUp (auto-fill form; user stays logged in and clicks Publish)  
- **Inbox:** Unified notifications via inbound email (Mailgun / SendGrid / IMAP) with deep-links to platform conversations  

---

## Prerequisites

- Node.js 18+
- PostgreSQL (local or hosted)
- (Optional) Mailgun or SendGrid account for inbound email; or IMAP for polling

---

## Quick start

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/listonce.git
cd listonce
cp .env.example .env
```

Edit `.env` and set at least:

- `DATABASE_URL` – PostgreSQL connection string  
- `NEXTAUTH_URL` – e.g. `http://localhost:3000`  
- `NEXTAUTH_SECRET` – run `openssl rand -base64 32` to generate  

### 2. Install dependencies

If `npm install` fails with cache permission errors, try:

```bash
npm cache clean --force
npm install
```

### 3. Database

```bash
npm run db:generate
npm run db:push
```

Or for migration history: `npm run db:migrate` (name the migration when prompted).

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Chrome extension (assisted posting)

```bash
cd extension
npm install
npm run build
```

In Chrome: go to `chrome://extensions`, enable Developer mode, “Load unpacked”, and select the `extension` folder. Add `icons/icon16.png` and `icons/icon48.png` (e.g. 16×16 and 48×48) or the extension will show a missing-icon state.

---

## Project structure

```
listonce/
├── app/                 # Next.js App Router (pages, layout, API routes)
├── lib/                 # Shared code (auth, prisma, utils)
├── prisma/
│   └── schema.prisma   # Data model (users, listings, channels, inbox)
├── types/              # TypeScript declarations (e.g. next-auth)
├── extension/          # Chrome extension (Manifest V3, TypeScript)
│   ├── src/            # background.ts, content.ts
│   ├── manifest.json
│   └── popup.html
├── .env.example
└── README.md
```

---

## Environment variables

See `.env.example` for all supported variables. Summary:

| Variable           | Purpose |
|--------------------|--------|
| `DATABASE_URL`     | PostgreSQL connection string |
| `NEXTAUTH_URL`     | App URL (e.g. `http://localhost:3000`) |
| `NEXTAUTH_SECRET`  | NextAuth signing secret |
| `EBAY_*`           | eBay OAuth/API (when implementing) |
| `UPLOAD_DIR`       | Local uploads directory |
| `MAILGUN_*` / `SENDGRID_*` / `IMAP_*` | Inbound email (one approach for MVP) |
| `APP_URL`          | Base URL for webhooks / links |

---

## Security & Compliance Notes

- **We do not store users’ Facebook or OfferUp passwords.**  
  Facebook Marketplace and OfferUp are supported via **assisted posting** only: the Chrome extension auto-fills the listing form in the user’s browser while the user is logged in; the user clicks Publish on the platform. No headless automation or credential storage.

- **eBay:** We use official OAuth and APIs. Tokens are stored per NextAuth/Prisma design (e.g. in `Account` or a dedicated token store). No scraping.

- **Craigslist:** MVP uses official bulk-posting integration where available, or a mocked adapter until access is confirmed. No scraping or credential misuse.

- **Inbox:** Notifications are created from **forwarded/inbound email** (Mailgun, SendGrid, or IMAP). The MVP inbox shows platform, listing, timestamp, and a **link to open the thread on the original platform**. We do **not** promise in-app reply for Facebook/OfferUp in v1.

- **File storage:** Local directory in dev; optional S3 in production. No user credentials in uploads.

- **Secrets:** All secrets (API keys, OAuth client secrets, DB URL) live in environment variables and `.env`; `.env` is gitignored. Use `.env.example` as a template only.

---

## Deployment (e.g. Vercel)

1. Push the repo to GitHub.  
2. Import the project in Vercel and link the repo.  
3. Set environment variables in the Vercel dashboard from `.env.example`.  
4. Use a hosted PostgreSQL (e.g. Vercel Postgres, Neon, Supabase) and set `DATABASE_URL`.  
5. Set `NEXTAUTH_URL` to your production URL (e.g. `https://listonce.vercel.app`).  
6. For inbound email, configure your provider’s webhook URL to `https://your-app.vercel.app/api/webhooks/inbound-email` (or the route you implement).  

---

## License

MIT (or your choice).
