# Shreeji Furniture — gallery and network setup

## Run the downloadable code on Windows

Use Node.js 22.18+ (or Node.js 24 LTS). Extract this ZIP into a fresh folder.
Open PowerShell in the `shreeji-furniture` folder and run:

```powershell
npm ci
npm run dev
```

The downloadable package uses `next dev --webpack -H 0.0.0.0` on port 3000.
Open http://localhost:3000 on the server computer, or http://192.168.1.6:3000
on devices connected to the same local network. The server must remain running.
The Site checkout also provides the same local command as `npm run dev:next`.

If the computer's IP changes, set DEV_ALLOWED_ORIGINS in `.env.local`:

```env
DEV_ALLOWED_ORIGINS=192.168.1.8
```

Use only hostnames/IPs (no scheme or port); multiple entries are comma-separated.
Restart the server after changing this setting. Native Next.js assets use the
current origin, and image URLs are root-relative. Do not use localhost in asset
or API URLs used by other devices.

To clear an old development cache, stop the server using Ctrl+C, then:

```powershell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run dev
```

Hard-refresh each browser. If the server is unreachable entirely, check that
Windows allows Node.js on your private network and that both devices use the
same Wi-Fi without guest/client isolation. Do not disable the firewall.
If HTML loads but controls fail, inspect F12 → Console and Network for the first
error and failed JavaScript request. An HMR/origin configuration issue alone is
not proof of every missing-content symptom.

Production-style local testing:

```powershell
npm run build
npm start
```

## Why hidden sections happened

The former hero and scroll-reveal components rendered initial opacity:0 in
server HTML. If client JavaScript did not start, those elements stayed hidden.
SafeReveal now outputs visible HTML, starts a finite browser animation only
when the element is visible, and cancels residual effects after 1.2 seconds.
No observer support or reduced-motion preference leaves content visible.
GSAP contexts are cleaned up, Lenis failure restores native scrolling, and
ScrollTrigger refreshes after images, fonts, resizes and gallery filtering.

Next.js 16.2.6's development-origin guard was tested directly: a request carrying
Origin http://192.168.1.6:3000 was rejected before adding allowedDevOrigins and
allowed after. Webpack is selected for the portable dev command. This does not
establish the exact console error on your original Windows browser.

## Add real projects

Edit `app/galleryData.ts`. Each project has a title, location, concept flag and
an ordered media array. There are 2 example collections and 14 image entries,
with two images per room category. They reuse existing illustrative design
assets and are explicitly labelled as concepts. They are not client photographs
or a claim that all rooms depict one completed home.

Put your photographs in `public/images/projects/project-01/` (or a new project
folder) and videos in `public/videos/projects/project-01/`.
Never add `public` to the browser URL. Set `concept: false` only after replacing
all the illustrative media in that collection with your own project photos.
Do not add client names or exact addresses without permission.

Image example:

```ts
{
  type: "image",
  src: "/images/projects/project-01/bedroom-02.webp",
  title: "Custom master bedroom",
  category: "Bedroom",
  alt: "Oak bed and fitted wardrobes in a master bedroom",
  width: 2400,
  height: 1600,
  responsive: true
}
```

After adding full-quality WebP originals, run `npm run gallery:prepare` to create
thumbnail variants. Keep original dimensions in the data. For an image without
prepared variants, set responsive:false until preparation is complete. Originals
are loaded in the lightbox; cards select responsive variants and lazy-load.
Existing illustrations are 1672×941 pixels; they are not genuine 2K/4K originals.
You can replace them with larger real photographs without redesigning the gallery.

Video example (append anywhere in a project's media array):

```ts
{
  type: "video",
  src: "/videos/projects/project-01/walkthrough.mp4",
  poster: "/images/projects/project-01/living-room-01.webp",
  title: "Home walkthrough",
  category: "Living Room",
  alt: "A walkthrough of the completed interior"
}
```

Use browser-compatible MP4 (H.264, optionally AAC audio) with a poster. Gallery
videos load only when selected, have native controls, do not autoplay, and are
removed/stopped when navigating or closing. No demonstration video is shipped.
Room filters show matching media; clicking any item opens its entire project
collection at that item. Complete Home shows one cover per project. Add as many
media items or projects as needed. Arrow keys, previous/next buttons, Escape,
project filmstrip buttons and touch swipes navigate the lightbox. Video controls
retain their normal keyboard and touch behavior.

## Validation and remaining device checks

Completed here: Next.js production compilation and TypeScript; development
origin guard before/after; desktop and 390px iframe viewport visual checks;
category switching, complete-home collections, multi-photo navigation, keyboard
arrows, Escape, transformation chapter controls, and temporary MP4 loading/playback.
The temporary video and mobile QA route were removed before delivery.
No application console errors were observed in those browser checks; the browser
extension emitted unrelated metadata errors.

Not accessible here: your physical Windows PC, http://192.168.1.6:3000, a second
Wi-Fi laptop, or real Android/iPhone touch input. Check those devices after
extracting this update; mobile iframe checks are not physical-device testing.
