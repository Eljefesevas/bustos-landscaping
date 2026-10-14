import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { getTranslations } from '@/lib/i18n/server';

/* Server-rendered so the headline is in the initial HTML and readable without JavaScript. */
export default async function HeroCopy() {
  const t = await getTranslations();
  return (
    <div className="hx-copy">
      <p className="hx-eyebrow"><span className="hx-rule" aria-hidden="true" /><span className="hx-eyebrow-text">{t('Montclair, CA · Landscape & Concrete')}</span></p>
      <h1 id="hero-title" className="hx-title">
        <span className="hx-line"><span>{t('Bringing Outdoor')}</span></span>{' '}
        <span className="hx-line"><span>{t('Spaces to Life')}</span></span>
      </h1>
      <p className="hx-lede">{t('Thoughtful landscaping, refined craftsmanship, and a personal process from concept to completion.')}</p>
      <div className="hx-actions">
        <Link className="hx-button" href="/our-work">{t('View Our Work')} <ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" /></Link>
        <Link className="hx-link" href="/contact">{t('Start Your Project')} <ArrowRight size={17} strokeWidth={1.7} aria-hidden="true" /></Link>
      </div>
    </div>
  );
}
