"use client";
import { useEffect, useRef, useState } from "react";
import Image, { type ImageLoaderProps } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SafeReveal } from "@/components/SafeReveal";
import { galleryCategories, galleryData, type GalleryCategory, type GalleryMedia } from "@/app/galleryData";

function galleryLoader({ src, width }: ImageLoaderProps) {
  const target = [320, 640, 1024, 1440, 1672].find(w => w >= width) ?? 1672;
  return src.replace(/\.webp$/, `-${target}.webp`);
}
function GalleryImage({ media, full = false }: { media: GalleryMedia; full?: boolean }) {
  const [failed, setFailed] = useState(false);
  if(failed) return <div className="gallery-media-error" role="status">This image could not load. Please try again.</div>;
  const src = media.type === "video" ? media.poster! : media.src;
  return <Image src={src} alt={media.alt} width={media.width ?? 1672} height={media.height ?? 941}
    loader={!full && media.responsive ? galleryLoader : undefined} unoptimized={full || !media.responsive}
    sizes={full ? "100vw" : "(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 55vw"}
    loading={full ? "eager" : "lazy"} decoding="async" onError={() => setFailed(true)} />;
}
export function ProjectGallery() {
  const [filter, setFilter] = useState<GalleryCategory>("All");
  const [selection, setSelection] = useState<{ project: number; index: number } | null>(null);
  const [videoError, setVideoError] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const reduced = useReducedMotion();
  const project = selection ? galleryData[selection.project] : null;
  const current = selection && project ? project.media[selection.index] : null;
  const cards = galleryData.flatMap((project, projectIndex) => {
    if(filter === "Complete Home") return [{project, projectIndex, media: project.media[0], index: 0, complete: true}];
    return project.media.map((media, index) => ({project, projectIndex, media, index, complete: false})).filter(card => filter === "All" || card.media.category === filter);
  });
  function move(direction: number) {
    setVideoError(false);
    setSelection(s => s ? {...s, index: (s.index + direction + galleryData[s.project].media.length) % galleryData[s.project].media.length} : null);
  }
  useEffect(() => { window.dispatchEvent(new Event("gallery-layout")); }, [filter]);
  return <section className="section portfolio gallery" id="projects">
    <div className="heading-row"><SafeReveal className="section-heading"><p className="eyebrow">OUR WORK</p><h2>Spaces we’ve <em>transformed.</em></h2><p className="section-description">Explore furniture and interior work across bedrooms, living spaces, kitchens, wardrobes and complete homes.</p></SafeReveal><p className="side-copy">Rooted in Ahmedabad.<br/>Made around the way you live.<br/><small>Illustrative design concepts.<br/>Not completed client project photographs.</small></p></div>
    <div className="filters gallery-filters" aria-label="Filter gallery by room">{galleryCategories.map(category => <button type="button" key={category} aria-pressed={filter === category} className={filter === category ? "active" : ""} onClick={() => setFilter(category)}>{category}</button>)}</div>
    <p className="gallery-count" role="status">{cards.length} {filter === "Complete Home" ? "project collections" : "spaces"} · {filter === "All" ? "Every detail, considered" : filter}</p>
    <div className="editorial-gallery" key={filter}>{cards.map(({project, projectIndex, media, index, complete}, position) => <motion.button
      key={`${project.id}-${index}`} type="button" initial={false} animate={{opacity: 1}} className={`gallery-card gallery-shape-${position % 5}`}
      aria-label={`View ${complete ? project.title : media.title} — ${project.location}`}
      onClick={event => { opener.current = event.currentTarget; setVideoError(false); setSelection({project: projectIndex, index}); }}>
      <SafeReveal><GalleryImage media={media}/><div className="gallery-card-shade"/><span className="gallery-card-number">{String(position + 1).padStart(2, "0")}</span>
      <div className="gallery-card-copy"><p className="eyebrow">{complete ? "Complete Home" : media.category}</p><h3>{complete ? project.title : media.title}</h3><p>{project.location}</p><span className="gallery-view">{media.type === "video" ? <Play size={17}/> : null} View project · {project.media.length} moments <ArrowUpRight size={20}/></span></div></SafeReveal>
    </motion.button>)}</div>
    <Dialog open={!!selection} onOpenChange={open => { if(!open) setSelection(null); }}><DialogContent className="gallery-lightbox" data-lenis-prevent onCloseAutoFocus={event => { event.preventDefault(); opener.current?.focus(); }}
      onKeyDown={event => { if(event.target instanceof HTMLVideoElement) return; if(event.key === "ArrowRight") {event.preventDefault(); move(1);} if(event.key === "ArrowLeft") {event.preventDefault(); move(-1);} }}>
      {project && current && selection && <>
        <div className="gallery-lightbox-heading"><div><p className="eyebrow">{project.location}{project.concept ? " · DESIGN CONCEPT" : ""}</p><DialogTitle>{project.title}</DialogTitle></div><span className="gallery-lightbox-count" aria-live="polite">{String(selection.index + 1).padStart(2, "0")} / {String(project.media.length).padStart(2, "0")}</span></div>
        <div className="gallery-stage" onTouchStart={event => { if(current.type === "video") return; touch.current = {x: event.touches[0].clientX, y: event.touches[0].clientY}; }} onTouchEnd={event => { if(!touch.current) return; const dx = event.changedTouches[0].clientX - touch.current.x; const dy = event.changedTouches[0].clientY - touch.current.y; if(Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1); touch.current = null; }}>
          <motion.div className="gallery-stage-media" key={`${project.id}-${selection.index}`} initial={false} animate={reduced ? {} : {opacity: [0.5, 1]}} transition={{duration: .3}}>
            {current.type === "video" ? videoError ? <p role="status">The video could not load. Please check the connection and try again.</p> : <video controls playsInline preload="metadata" poster={current.poster} onError={() => setVideoError(true)}><source src={current.src}/>Your browser does not support video playback.</video> : <GalleryImage media={current} full/>}
          </motion.div>
          <button type="button" className="gallery-prev" onClick={() => move(-1)} aria-label="Previous project photo"><ChevronLeft/></button><button type="button" className="gallery-next" onClick={() => move(1)} aria-label="Next project photo"><ChevronRight/></button>
        </div>
        <div className="gallery-lightbox-footer"><div><p>{current.title}</p><DialogDescription>{project.concept ? "Illustrative design imagery, not a completed Shreeji Furniture project." : current.alt}</DialogDescription></div><a href={`https://wa.me/919824734090?text=${encodeURIComponent(`Hello Shreeji Furniture, I would like to discuss a space like ${project.title}: ${current.title}.`)}`}>Discuss on WhatsApp <ArrowUpRight size={18}/></a></div>
        <div className="gallery-filmstrip" aria-label="Project media">{project.media.map((media, index) => <button key={`${media.src}-${index}`} type="button" aria-label={`Show ${media.title}`} aria-pressed={selection.index === index} onClick={() => { setVideoError(false); setSelection({...selection, index}); }}>{media.type === "video" && <Play size={16}/>}<span>{String(index + 1).padStart(2, "0")}</span> {media.title}</button>)}</div>
      </>}
    </DialogContent></Dialog>
  </section>;
}
