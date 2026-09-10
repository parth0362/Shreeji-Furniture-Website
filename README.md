# September 10 update

For network startup, gallery editing and device checks, see [GALLERY-AND-NETWORK.md](GALLERY-AND-NETWORK.md).

# Shreeji Furniture — Ahmedabad

Existing premium website updated with 41 individual representative interior images, responsive image delivery, local business information and optional video support. The typography, colours, layouts, pricing, navigation and WhatsApp flow are preserved.

## Run locally with Next.js

Requires Node.js 22.13 or later and npm. Node 24 is suitable.

```bash
npm ci
npm run dev:next
```

Open http://localhost:3000. For production:

```bash
npm run build:next
npm run start:next
```

The original Sites runtime is also included: `npm run dev` and `npm run build` use Vinext and the supplied Cloudflare integration. No database or API secrets are needed for this website.

## Important image quality note

The original version used several roughly 512-pixel cropped images. This update replaces them with **41 separate native 1672 × 941 images**. The generator did not return the requested 2500–4000-pixel sources. These are not native 4K photographs and have not been artificially enlarged. They improve card/portfolio clarity substantially; true pixel-level sharpness on a full-width 4K monitor still requires larger source photography.

All imagery is AI-generated design inspiration appropriate for Ahmedabad homes, not a record of completed client projects. Labels on the site make that distinction. There are 12 different service images, 8 different portfolio images (none reused from services), 10 different construction-story images, 6 matched comparison images, a hero, 3 package images and one craftsmanship image.

## Image files and replacement

- `public/images/v2/`: native-size WebP images and responsive derivatives.
- `components/media/image-manifest.ts`: actual source dimensions and derivative widths.
- `components/media/ResponsiveImage.tsx`: `next/image` with a custom local loader, responsive `sizes`, lazy loading and hero priority.
- `scripts/prepare-media.mjs`: preserves native dimensions; never upscales. Quality 94 for full-size images, 92 for responsive files.

To replace photographs, put originals in a local folder using the existing base names (for example `service-bathroom.jpg`, `feature-hero.png`). Run:

```bash
node scripts/prepare-media.mjs /absolute/path/to/your/originals
```

Use a complete set of originals: the script rebuilds the manifest for that folder. The included full-size WebP images can also rebuild their derivatives using `npm run media:prepare`. For genuine 4K delivery, provide native 3840-pixel-wide photographs. Portrait files are supported; set a focal position on `Photo` where necessary. Never change width/height to pretend an image contains more detail.

## Add real videos

Put web-ready MP4/WebM files in `public/videos/`. Configure `app/media-config.ts`; all video slots are initially `null` or empty, so no unrelated or empty video section appears.

```ts
hero: {
  mp4: "/videos/home-tour.mp4",
  webm: "/videos/home-tour.webm", // optional
  poster: "feature-hero.webp",
  title: "Shreeji Furniture completed home tour"
},
work: {
  mp4: "/videos/workshop-installation.mp4",
  poster: "story-03.webp",
  title: "From workshop to final installation",
  captions: "/videos/workshop-en.vtt", // optional but recommended for speech
  transcript: "Add the spoken content here."
},
projects: {
  "modern-3bhk": {
    video: {
      mp4: "/videos/3bhk-walkthrough.mp4",
      poster: "project-3bhk.webp",
      title: "3 BHK walkthrough"
    },
    images: [{ file: "/images/my-project-detail.jpg", alt: "Custom storage detail" }],
    beforeAfter: {
      before: "comparison-living-before.webp",
      after: "comparison-living-after.webp",
      alt: "Living room transformation"
    }
  }
}
```

Hero video is muted, looping and inline with a poster, pause button and no default controls. It is disabled on mobile, reduced-motion settings and data-saving/slow connections. Project/work videos load only after the visitor presses Play, with controls and no forced autoplay; off-screen videos pause. Add only approved real business footage. The UI provides playback, not an upload/admin system.

Recommended media preparation: H.264 MP4 with `yuv420p` and fast-start metadata; optional VP9 WebM. A short 1080p hero loop is generally sufficient. Test your actual videos after adding them because codec, file size and hosting delivery affect playback. Do not put large raw camera files in the website.

## Content and inquiries

- Main content, projects, packages: `app/page.tsx`
- Video configuration: `app/media-config.ts`
- SEO/business schema: `app/layout.tsx`
- Domain entries: `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`
- Unpublished verified-statistic slots: `app/site-data.ts`

Business: Shreeji Furniture, Ranip, Ahmedabad, Gujarat. Serving Ahmedabad and nearby areas. Phone: +91 98247 34090.

The consultation form validates details and opens a prefilled WhatsApp message. The visitor must send that message. There is no hidden email delivery or form-submission database. Social handles use the supplied ShreejiFurniture name and should be confirmed by the business.

## ZIP contents

Source, lockfile, reusable components, all website images and documentation are included. Dependency folders, build outputs, credentials, deployment identity, test clips and temporary QA routes are excluded. Install dependencies with `npm ci` before running.
