"use client";
import Link from 'next/link';
import { Pause, Play } from 'lucide-react';
import { useTranslations } from '@/components/LanguageProvider';
import { SLIDE_MS, useStage } from './HeroStage';

export type RailLink = { label: string; href: string };

/* Bottom rail: service links, a scroll cue, and the slide indicator with a pause control. */
export default function HeroRail({ links }: { links: RailLink[] }) {
  const t = useTranslations();
  const { index, count, playing, reduced, go, togglePlay } = useStage();
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div className="hx-rail">
      <nav className="hx-services" aria-label={t('Services')}>
        <ul>{links.map(l => <li key={l.href + l.label}><Link href={l.href}>{t(l.label)}</Link></li>)}</ul>
      </nav>
      <p className="hx-cue" aria-hidden="true"><span className="hx-cue-line"><span /></span>{t('Scroll')}</p>
      {count > 1 && (
        <div className="hx-slides" role="group" aria-label={t('Background photos')}>
          <span className="hx-count" aria-hidden="true"><b>{pad(index + 1)}</b> / {pad(count)}</span>
          <span className="hx-bars">
            {Array.from({ length: count }, (_, i) => (
              <button key={i} type="button" className="hx-bar" aria-label={t('Show photo {n} of {total}').replace('{n}', String(i + 1)).replace('{total}', String(count))} aria-current={i === index ? 'true' : undefined} onClick={() => go(i)}>
                <span style={i === index && playing ? { animationDuration: `${SLIDE_MS}ms` } : undefined} />
              </button>
            ))}
          </span>
          {!reduced && (
            <button type="button" className="hx-play" onClick={togglePlay} aria-label={t(playing ? 'Pause slideshow' : 'Play slideshow')}>
              {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
