# Verification notes

## Passed
- Standard Next.js production build, including TypeScript, prerendered home page, robots.txt and sitemap.xml.
- All 41 native image files are distinct by SHA-256; every declared responsive derivative exists and is no larger than its source.
- 12 unique service images load in the browser; kitchen, wardrobe, bed, mattress, switches, lighting, painting, ceiling, curtains, bathroom and finishing images are subject-specific.
- Portfolio uses 8 separate images, with no reuse from the service set.
- Browser review of desktop hero, services, transformation planning stage, project detail, contact and mobile service/hero layouts.
- No horizontal overflow in the inspected mobile frame (373 CSS pixels of content), desktop (1363 CSS pixels) or large-screen frame (3823 CSS pixels).
- Responsive srcset is present, and the mobile service grid selects smaller image files. Cover-crop source sizing was adjusted to preserve sharpness.
- Transformation navigation changes the displayed stage image; planning and completed-home navigation were exercised.
- Kitchen before/after tab and keyboard slider work (50 to 51).
- Bathroom portfolio filter returns one project; modal opens, closes and moves to the next project.
- Mobile navigation opens and follows the Services link.
- Temporary local test clip confirmed project video decoding and playback (readyState 4, duration 3 seconds); background video autoplay, mute, loop, controls-hidden and manual pause were checked.
- Project media supports video and before/after tabs.
- Test clip and QA route removed; no video is rendered on the final page until real footage is configured.
- Final page browser check found no loaded-but-broken images. Package ranges remain ₹10–12, ₹13–15 and ₹18–20 Lakhs.

## Limits
- Native generated source resolution is 1672 × 941, not 4K. No upscaling was performed. Full-width 4K pixel-level sharpness requires higher-resolution original photographs.
- Images are representative AI concepts, not completed client photographs. Transformation stages are illustrative, not a construction record.
- Browser review used desktop and iframe-based responsive viewports; it is not a physical-device test or an exhaustive test of every browser.
- No Lighthouse score is claimed. Image sizing, lazy loading and video loading behavior were checked; production performance depends on hosting, device and actual future video files.
- Real business videos have not been supplied. Their encoding, size, captions and playback should be checked after replacement.
- No WhatsApp message was sent during verification.
