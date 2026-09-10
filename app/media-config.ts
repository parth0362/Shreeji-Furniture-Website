/** Add your own web-ready videos under public/videos, then set these paths.
 * Do not include client names/footage without permission.
 * Empty slots are intentionally hidden; no unrelated videos are shown.
 */
export interface VideoSource {
  mp4?: string;
  webm?: string;
  poster: string;
  title: string;
  captions?: string;
  transcript?: string;
}
export interface ProjectExtraMedia {
  video?: VideoSource;
  images?: {file:string;alt:string}[];
  beforeAfter?: {before:string;after:string;alt:string};
}
export const videoConfig: {
  hero: VideoSource | null;
  work: VideoSource | null;
  projects: Record<string,ProjectExtraMedia>;
} = {
  hero: null,
  work: null,
  projects: {},
};
// Example: hero: { mp4: "/videos/hero.mp4", webm: "/videos/hero.webm",
//   poster: "feature-hero.webp", title: "Shreeji Furniture home interiors" }
// Example: projects: { "modern-3bhk": { video: { mp4:"/videos/project-3bhk.mp4",
//   poster:"project-3bhk.webp", title:"3 BHK installation walkthrough" } } }
