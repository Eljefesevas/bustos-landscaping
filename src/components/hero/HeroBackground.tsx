"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useStage } from './HeroStage';

export type Slide = {
  src: string;
  /** tiny inline preview painted instantly while the full image loads */
  blur?: string;
  /** object-position for landscape and portrait frames, so the focal point stays in view */
  position: string;
  portraitPosition: string;
  /** Ken Burns drift end offsets (percent) */
  drift: [number, number];
};
export type HeroVideo = { src: string; poster: string };

/*
  Decorative background: either a slow crossfading slideshow or one muted looping video.
  Slide 1 is server-rendered with priority so it is the first thing painted; the others
  mount after the page has loaded so they never compete with it.
*/
export default function HeroBackground({ slides, video }: { slides: Slide[]; video?: HeroVideo }) {
  const { index, reduced } = useStage();
  const [rest, setRest] = useState(false);
  const [previous, setPrevious] = useState<number | null>(null);
  const [shown, setShown] = useState(index);

  useEffect(() => {
    if (reduced || slides.length < 2) return;
    let idle = 0, timer = 0;
    const later = () => { const ric = window.requestIdleCallback; if (ric) idle = ric(() => setRest(true), { timeout: 2500 }); else timer = window.setTimeout(() => setRest(true), 1200); };
    if (document.readyState === 'complete') later(); else window.addEventListener('load', later, { once: true });
    return () => { window.removeEventListener('load', later); if (idle) window.cancelIdleCallback?.(idle); window.clearTimeout(timer); };
  }, [reduced, slides.length]);

  // Track the outgoing slide so its drift keeps running while it fades out.
  if (index !== shown) { setPrevious(shown); setShown(index); }

  return (
    <div className="hx-bg" aria-hidden="true">
      <div className="hx-bg-media">
        {video ? (
          <video className="hx-video" src={video.src} poster={video.poster} muted loop playsInline autoPlay={!reduced} preload="metadata" />
        ) : slides.map((s, i) => {
          if (i > 0 && !rest) return null;
          const state = i === index ? ' is-active' : i === previous ? ' is-leaving' : '';
          return (
            <div key={s.src} className={`hx-slide${state}`} style={{ '--hx-pos': s.position, '--hx-pos-portrait': s.portraitPosition, '--hx-drift-x': `${s.drift[0]}%`, '--hx-drift-y': `${s.drift[1]}%` } as React.CSSProperties}>
              <Image src={s.src} alt="" fill sizes="100vw" quality={78} priority={i === 0} fetchPriority={i === 0 ? 'high' : 'low'} loading={i === 0 ? undefined : 'lazy'} placeholder={s.blur ? 'blur' : 'empty'} blurDataURL={s.blur} />
            </div>
          );
        })}
      </div>
      <div className="hx-overlays">
        <div className="hx-vignette" />
        <div className="hx-legibility" />
        <div className="hx-top" />
        <div className="hx-sweep" />
        <div className="hx-grain" />
      </div>
    </div>
  );
}
