# Parm Midbrain Classes Website

A responsive Next.js website for Parm Midbrain Classes. The website is added alongside the existing Go files in this repository; the Go API source and `api.db` are not used or changed by the website.

## Project setup

Requirements: Node.js 20.19 or later and npm. (Next.js 16 itself supports Node.js 20.9+, but the installed npm/ESLint toolchain requests the newer Node 20 patch level.)

```bash
npm install
npm run dev
```

Open the local address printed by Next.js. For a production build:

```bash
npm run lint
npm run build
npm start
```

## Business content

The checked-in fallback file is [`data/website-content.json`](data/website-content.json). Site text, contact details, founders, services, benefits, gallery items, SEO metadata, navigation, and social links are read from that file. Edit its values to maintain the content without editing React components.

Media and contact fields that the business has not supplied are blank, and the service, benefit, and gallery arrays start empty. Add real information when it is available; the site provides configurable empty states for these sections.

The content loader in `lib/content.ts` optionally reads a public JSON document from `NEXT_PUBLIC_CONTENT_JSON_URL`. The hosted file is checked and merged with the local defaults. Missing fields use the local fallback; malformed, unreachable, or non-JSON responses fall back to the checked-in file. Arrays in the hosted JSON replace the corresponding local arrays. Content is fetched on the server without caching so published changes can be picked up by a running deployment.

Example hosted content:

```env
NEXT_PUBLIC_CONTENT_JSON_URL=https://example.com/website-content.json
```

Host `website-content.json` at a stable public HTTPS URL that returns JSON. No browser CORS configuration is needed because the website fetches it from the server. `NEXT_PUBLIC_CONTENT_JSON_URL` is read during the Next.js build/deployment, so configure it in the deployment environment before building.

## Environment variables

Copy `.env.example` to `.env.local` when local values are needed.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_CONTENT_JSON_URL` | Optional public JSON content URL. The local `data/website-content.json` remains the fallback. |
| `NEXT_PUBLIC_ENQUIRY_API_URL` | Optional HTTPS endpoint for enquiry form submissions. The endpoint URL is public in the browser; never put a secret here. |
| `NEXT_PUBLIC_SITE_URL` | Public canonical site origin, such as `https://your-domain.example`. Used for metadata, `robots.txt`, and `sitemap.xml`. |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Optional public cloud name for reference. The current implementation uses complete delivery URLs from JSON and does not require this variable. |

The enquiry form sends a `POST` request with `Content-Type: application/json` and the fields `name`, `phone`, `email`, `studentName`, `studentAge`, and `message`. The API should validate the data server-side and allow browser requests from the deployed website's origin. If the URL is blank, the form clearly reports that online submission is unavailable and provides phone contact options; it does not report a false success.

## Cloudinary media

Cloudinary is the media delivery source for the site. This display-only website does not upload files and does not need Cloudinary API credentials or an API secret.

1. Create a Cloudinary account and open its Media Library.
2. Upload photos and videos. Organize them with folders such as `parm-midbrain/logo/`, `founders/`, `services/`, `gallery/`, `videos/`, and `thumbnails/`.
3. Open an uploaded asset and copy its public **Secure URL**. Use the URL in the related JSON field. Do not put account secrets in JSON or public environment variables.
4. For photos, fill fields such as `site.logo`, `founders.founder.image`, `services[].image`, `gallery[].url`, or `gallery[].thumbnail`. Use each media type's matching field in `data/website-content.json`.
5. For videos, set a gallery item's `type` to `video`, its `platform` to `cloudinary`, and its `url` to the Secure URL. Set `thumbnail` to a Cloudinary image URL when available. Set `founderVideo.enabled` and its `videoUrl`/`thumbnail` to show the founder message.
6. Cloudinary image delivery URLs are enhanced with `f_auto`, `q_auto`, and a bounded width when no transformation is already present. Next.js generates responsive image sizes. Gallery video files are only loaded when a visitor opens a video; players use controls and do not autoplay with sound.
7. To replace media later, upload the new file and replace its URL in JSON. The React components do not need to change.

Cloudinary delivery flow:

```text
Upload media to Cloudinary → copy its Secure URL → add URL to website-content.json → website displays it
```

Supported video platforms are `cloudinary`, `youtube`, `vimeo`, and `local`. YouTube and Vimeo URLs are embedded in the video viewer; Cloudinary and local MP4 URLs use the browser's native video controls.

## External JSON hosting

The hosted document should have the same shape as `data/website-content.json`. It can contain the complete document or only the sections being changed: absent fields use the local fallback. For simple publishing, store the JSON on your static hosting or content platform, copy its public HTTPS URL into `NEXT_PUBLIC_CONTENT_JSON_URL`, then rebuild/redeploy the website. The running site requests that JSON without a cache; a failed request uses the local fallback.

## Deployment to Vercel

1. Import the repository into Vercel and select Next.js.
2. Set any required environment variables in the Vercel project settings before the build. Add `NEXT_PUBLIC_SITE_URL` after the public domain is known. Add the external content or enquiry URL only when configured.
3. Deploy. Vercel runs the Next.js build; `npm run start` is available for a self-hosted production server.

The checked-in JSON is sufficient to build and run the site without Cloudinary, external JSON hosting, or an enquiry API. Empty optional data is hidden or handled with the configured empty-state copy.
