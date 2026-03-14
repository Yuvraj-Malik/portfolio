# Yuvraj Portfolio

Production-ready React + Vite portfolio configured for custom-domain deployment.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## What Is Already Configured

1. SPA rewrites for deep links (`/anything` resolves to `index.html`)
2. Long-term asset caching for hashed bundles (`max-age=31536000, immutable`)
3. Basic security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`)
4. SEO baseline files: `robots.txt` and `sitemap.xml`
5. Performance-focused code splitting in Vite and lazy loading for heavy routes/components

## Deploy Option A: Vercel

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Keep `vercel.json` as-is for rewrites, headers, and caching.

### Connect Your Domain on Vercel

1. Open Project Settings -> Domains.
2. Add your domain (e.g. `yourdomain.com` and `www.yourdomain.com`).
3. Add DNS records exactly as Vercel asks (usually A record for root + CNAME for `www`).
4. Wait for SSL issuance and DNS propagation.

## Deploy Option B: Netlify

1. Push this repo to GitHub.
2. Import the repo in Netlify.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Keep `netlify.toml` and `public/_redirects` for SPA behavior and headers.

### Connect Your Domain on Netlify

1. Open Site settings -> Domain management.
2. Add custom domain.
3. Point domain DNS to Netlify using the records shown in the Netlify dashboard.
4. Wait for certificate provisioning.

## Required Post-Deployment Update

Replace `YOUR_DOMAIN` in the files below with your real domain:

1. `public/robots.txt`
2. `public/sitemap.xml`

## Optional Performance Notes

1. Keep media files compressed (WebP/AVIF for images where possible).
2. Avoid loading heavy SDKs on the home route unless needed.
3. Keep Lighthouse Performance target at 90+ on mobile.
