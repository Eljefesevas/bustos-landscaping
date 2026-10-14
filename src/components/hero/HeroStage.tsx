"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

/*
  Owns the hero section and the shared slideshow state: which slide is showing, whether
  autoplay runs, and the subtle scroll parallax. Autoplay pauses when the tab is hidden,
  when the hero is off-screen, when the visitor pauses it, and never runs under reduced motion.
*/
export const SLIDE_MS = 7000;

type Stage = {
  index: number; count: number; playing: boolean; reduced: boolean;
  go: (i: number) => void; togglePlay: () => void;
};
const StageContext = createContext<Stage>({ index: 0, count: 1, playing: false, reduced: true, go: () => {}, togglePlay: () => {} });
export const useStage = () => useContext(StageContext);

export default function HeroStage({ count, labelledBy, children }: { count: number; labelledBy: string; children: React.ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync(); mq.addEventListener('change', sync);
    const vis = () => setTabVisible(document.visibilityState === 'visible');
    vis(); document.addEventListener('visibilitychange', vis);
    return () => { mq.removeEventListener('change', sync); document.removeEventListener('visibilitychange', vis); };
  }, []);

  // Off-screen pause, plus a flag the shared chrome uses (e.g. hiding the mobile call bar over the hero).
  useEffect(() => {
    const el = section.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setOnScreen(e.isIntersecting);
      document.documentElement.toggleAttribute('data-hero-in-view', e.intersectionRatio > 0.25);
    }, { threshold: [0, 0.25] });
    io.observe(el);
    return () => { io.disconnect(); document.documentElement.removeAttribute('data-hero-in-view'); };
  }, []);

  const playing = !reduced && !userPaused && onScreen && tabVisible && count > 1;
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setIndex(i => (i + 1) % count), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [playing, index, count]);

  // Parallax: one passive listener, one rAF per frame, transform/opacity only. Off below 900px and under reduced motion.
  useEffect(() => {
    const el = section.current; if (!el || reduced) return;
    const wide = window.matchMedia('(min-width: 900px)');
    let frame = 0;
    const apply = () => {
      frame = 0;
      if (!wide.matches) { el.style.removeProperty('--hx-shift'); el.style.removeProperty('--hx-fade'); return; }
      const y = Math.min(Math.max(window.scrollY, 0), window.innerHeight);
      el.style.setProperty('--hx-shift', `${(y * 0.35).toFixed(1)}px`);
      el.style.setProperty('--hx-fade', (1 - y / (window.innerHeight * 0.85)).toFixed(3));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(apply); };
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    wide.addEventListener('change', apply);
    return () => { window.removeEventListener('scroll', onScroll); wide.removeEventListener('change', apply); cancelAnimationFrame(frame); el.style.removeProperty('--hx-shift'); el.style.removeProperty('--hx-fade'); };
  }, [reduced]);

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  const togglePlay = useCallback(() => setUserPaused(p => !p), []);

  return (
    <StageContext.Provider value={{ index, count, playing, reduced, go, togglePlay }}>
      <section ref={section} className="hx-hero" aria-labelledby={labelledBy} data-playing={playing ? '' : undefined}>
        {children}
      </section>
    </StageContext.Provider>
  );
}
