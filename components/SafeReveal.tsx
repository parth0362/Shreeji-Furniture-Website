"use client";
import { useEffect, useRef, type ReactNode } from "react";

// SSR and the initial client render are visible. Only a running, finite browser
// animation may hide content; no persistent inline opacity or observer gate.
export function SafeReveal({ children, className = "", immediate = false }: { children: ReactNode; className?: string; immediate?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !element.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let animation: Animation | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let observer: IntersectionObserver | undefined;
    const reveal = () => {
      observer?.disconnect();
      try {
        animation = element.animate([{ opacity: 0, transform: "translateY(26px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: immediate ? 900 : 650, easing: "cubic-bezier(.22,1,.36,1)", fill: "none" });
        timer = setTimeout(() => animation?.cancel(), 1200);
      } catch { animation?.cancel(); }
    };
    if (immediate) reveal();
    else if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(entries => { if(entries.some(e => e.isIntersecting)) reveal(); }, { threshold: .12 });
      observer.observe(element);
    }
    return () => { observer?.disconnect(); animation?.cancel(); clearTimeout(timer); };
  }, [immediate]);
  return <div ref={ref} className={className}>{children}</div>;
}
