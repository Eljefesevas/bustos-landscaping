"use client";
import { useTranslations } from '@/components/LanguageProvider';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Marcellus, Hanken_Grotesk } from 'next/font/google';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createGardenRenderer, type GardenRenderer } from './gardenReveal';
import './hero.css';

const display = Marcellus({ weight: '400', subsets: ['latin'], variable: '--gh-display' });
const sans = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--gh-sans' });

const PLATES = '/assets/hero/garden';
const srcSet = (name: string) => `${PLATES}/${name}-1200.jpg 1200w, ${PLATES}/${name}-2000.jpg 2000w`;
const stages = ['Site prepared', 'Planted', 'Finished'];
// Landscape frames favour the beds and steps; the portrait crop holds on the steps and agaves at native resolution.
const sceneFor = (src: string) => {
  if (src.includes('-portrait')) return { before: `${PLATES}/before-portrait.jpg`, after: `${PLATES}/after-portrait.jpg`, mask: `${PLATES}/growth-mask-portrait.jpg`, aspect: 900 / 1220, focus: [0.5, 0.5] as [number, number] };
  const size = src.includes('-2000') ? 2000 : 1200;
  return { before: `${PLATES}/before-${size}.jpg`, after: `${PLATES}/after-${size}.jpg`, mask: `${PLATES}/growth-mask.jpg`, aspect: 4 / 3, focus: [0.6, 0.6] as [number, number] };
};

export default function Hero() {
  const t = useTranslations();
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const beforeImg = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = root.current, surface = canvas.current, fallback = beforeImg.current;
    if (!section || !surface || !fallback) return;
    const media = gsap.matchMedia();

    media.add({ small: '(max-width: 767px)', portrait: '(orientation: portrait)', motion: '(prefers-reduced-motion: no-preference)' }, ctx => {
      const { small, motion } = ctx.conditions as { small: boolean; motion: boolean };
      if (!motion) return;
      let renderer: GardenRenderer | null = null;
      let cancelled = false;
      const state = { p: 0 };
      let stage = -1;

      const paint = () => {
        renderer?.render(state.p);
        section.style.setProperty('--p', state.p.toFixed(4));
        const next = state.p < 0.36 ? 0 : state.p < 0.8 ? 1 : 2;
        if (next !== stage) { stage = next; section.dataset.stage = String(next); }
      };

      const tween = gsap.to(state, {
        p: 1,
        ease: 'none',
        onUpdate: paint,
        scrollTrigger: { trigger: section, start: 'top top', end: small ? '+=110%' : '+=170%', pin: true, scrub: 1.1, anticipatePin: 1, invalidateOnRefresh: true },
      });
      paint();

      const start = async () => {
        if (!fallback.complete) await new Promise(r => fallback.addEventListener('load', r, { once: true }));
        try {
          renderer = await createGardenRenderer(surface, sceneFor(fallback.currentSrc || fallback.src));
          if (cancelled) { renderer.destroy(); renderer = null; return; }
          renderer.render(state.p);
          section.classList.add('is-live');
        } catch {
          section.classList.add('is-static');
        }
      };
      start();

      const onResize = () => { renderer?.resize(); renderer?.render(state.p); };
      const observer = new ResizeObserver(onResize);
      observer.observe(surface);

      return () => {
        cancelled = true;
        observer.disconnect();
        tween.scrollTrigger?.kill();
        tween.kill();
        renderer?.destroy();
        renderer = null;
        section.classList.remove('is-live');
        section.style.removeProperty('--p');
        delete section.dataset.stage;
      };
    });
    return () => media.revert();
  }, []);

  return (
    <section ref={root} className={`garden-hero ${display.variable} ${sans.variable}`} aria-labelledby="hero-title">
      <div className="gh-scene" aria-hidden="true">
        <picture>
          <source media="(orientation: portrait)" srcSet={`${PLATES}/before-portrait.jpg`} />
          <img ref={beforeImg} className="gh-plate gh-plate-before" src={`${PLATES}/before-2000.jpg`} srcSet={srcSet('before')} sizes="100vw" alt="" fetchPriority="high" />
        </picture>
        <picture>
          <source media="(orientation: portrait)" srcSet={`${PLATES}/after-portrait.jpg`} />
          <img className="gh-plate gh-plate-after" src={`${PLATES}/after-2000.jpg`} srcSet={srcSet('after')} sizes="100vw" alt="" loading="lazy" />
        </picture>
        <canvas ref={canvas} className="gh-canvas" />
        <div className="gh-shade" />
      </div>

      <div className="gh-copy">
        <p className="gh-services">
          {t("Landscape Design")}<i aria-hidden="true"> • </i>{t("Installation")}<i aria-hidden="true"> • </i>{t("Outdoor Living ")}</p>
        <h1 id="hero-title">{t("Bringing Outdoor Spaces to Life")}</h1>
        <p className="gh-lede">{t("Thoughtful landscaping, refined craftsmanship, and a personal process from concept to completion.")}</p>
        <div className="gh-actions">
          <Link className="gh-button gh-button-primary" href="/our-work">{t("View Our Work ")}<ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" /></Link>
          <Link className="gh-button gh-button-quiet" href="/contact">{t("Start Your Project")}</Link>
        </div>
      </div>

      <div className="gh-foot">
        <div className="gh-progress" aria-hidden="true">
          <div className="gh-track"><span /></div>
          <ol>{stages.map((s, i) => <li key={s} data-i={i}>{t(s)}</li>)}</ol>
        </div>
        <p className="gh-credit">{t("Concept scene, not a Bustos project. Photo: Gene Giromini / Unsplash")}</p>
      </div>
      <p className="gh-cue" aria-hidden="true"><span />{t("Scroll to bring the garden in")}</p>
    </section>
  );
}
