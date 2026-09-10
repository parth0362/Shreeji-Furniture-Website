"use client";
import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

let activeLenis: Lenis | undefined;
export function scrollImmediately(top: number) {
  if(activeLenis) activeLenis.scrollTo(top, { immediate: true, force: true });
  else window.scrollTo({top, behavior: "instant"});
}

export function useAnimationRuntime(hero: RefObject<HTMLElement | null>, reduced: boolean) {
  useEffect(() => {
    if (reduced) return;
    let lenis: Lenis | undefined;
    let ctx: ReturnType<typeof gsap.context> | undefined;
    let frame = 0;
    let refreshFrame = 0;
    let disposed = false;
    const refresh = () => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => { if (!disposed) ScrollTrigger.refresh(); });
    };
    try {
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.to(".hero-photo", { yPercent: 12, ease: "none", scrollTrigger: { trigger: hero.current, start: "top top", end: "bottom top", scrub: true } });
      }, hero);
      refresh();
    } catch(error) { ctx?.revert(); console.warn("Parallax unavailable; content remains visible.", error); }
    try {
      lenis = new Lenis({ duration: 1.05, anchors: true, smoothWheel: true });
      activeLenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => {
        try { lenis?.raf(time); frame = requestAnimationFrame(raf); }
        catch(error) { lenis?.destroy(); if(activeLenis === lenis) activeLenis = undefined; lenis = undefined; console.warn("Smooth scrolling unavailable; native scrolling restored.", error); }
      };
      frame = requestAnimationFrame(raf);
    } catch(error) { lenis?.destroy(); if(activeLenis === lenis) activeLenis = undefined; lenis = undefined; console.warn("Using native scrolling.", error); }
    // Includes late lazy images and gallery layout changes.
    const onLoad = (event: Event) => { if(event.target instanceof HTMLImageElement) refresh(); };
    document.addEventListener("load", onLoad, true);
    window.addEventListener("resize", refresh);
    window.addEventListener("gallery-layout", refresh);
    document.fonts?.ready.then(() => { if(!disposed) refresh(); });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame); cancelAnimationFrame(refreshFrame);
      document.removeEventListener("load", onLoad, true);
      window.removeEventListener("resize", refresh); window.removeEventListener("gallery-layout", refresh);
      lenis?.off("scroll", ScrollTrigger.update); lenis?.destroy(); if(activeLenis === lenis) activeLenis = undefined; ctx?.revert();
    };
  }, [hero, reduced]);
}
