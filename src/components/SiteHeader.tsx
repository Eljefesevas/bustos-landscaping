"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Phone } from 'lucide-react';
import { LanguageToggle, useTranslations } from '@/components/LanguageProvider';
import MobileMenu, { MenuButton } from '@/components/MobileMenu';
import { phones } from '@/lib/data';
import './site-header.css';

export const links = [['Home', '/'], ['Services', '/services'], ['Work', '/our-work'], ['Our Story', '/about'], ['Contact', '/contact']];
export const estimateHref = '/contact#phone-options';

/*
  Transparent over the homepage hero, condensing into a blurred bar after ~40px of scroll.
  Hides while scrolling down and returns on scroll up, but stays visible while the mobile
  menu is open or keyboard focus is inside it. Inner pages start in the solid state.
*/
export default function SiteHeader() {
  const t = useTranslations();
  const path = usePathname();
  const home = path === '/';
  const header = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  // The menu remembers the route it was opened on, so navigating anywhere closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === path;

  useEffect(() => {
    let last = window.scrollY, frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - last) > 6) { setHidden(y > last && y > 160); last = y; }
    };
    update();
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, []);

  const solid = !home || scrolled;
  const concealed = hidden && !open && !focusInside;
  const phone = phones[0];

  return (
    <>
      <header
        ref={header}
        className={`nav${solid ? ' nav--solid' : ' nav--clear'}${scrolled ? ' nav--condensed' : ''}${concealed ? ' nav--hidden' : ''}${open ? ' nav--menu' : ''}`}
        onFocus={() => setFocusInside(true)}
        onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocusInside(false); }}
      >
        <div className="nav-inner">
          <Link href="/" className="nav-brand" aria-label={t('Bustos Landscaping home')}>
            <span className="nav-mark nav-mark-luxury"><Image src="/assets/brand/bustos-luxury-monogram.png" alt="" width={575} height={410} preload sizes="56px" /></span>
            <span className="nav-name">Bustos Landscaping</span>
          </Link>
          <nav aria-label={t('Main navigation')} className="desktop-links">
            {links.map(([label, url]) => <Link key={url} href={url === '/' ? '/#main' : url} aria-current={path === url ? 'page' : undefined}>{t(label)}</Link>)}
          </nav>
          <div className="nav-actions">
            <LanguageToggle compact className="nav-lang" />
            <span className="nav-divider" aria-hidden="true" />
            {phone && <a className="nav-phone" href={`tel:${phone.value}`}><Phone size={14} aria-hidden="true" /> {phone.label}</a>}
            <Link className="nav-estimate" href={estimateHref}>{t('Free Estimate')} <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="nav-compact">
            <Link className="nav-estimate nav-estimate--compact" href={estimateHref}>{t('Estimate')}</Link>
            <MenuButton open={open} onToggle={() => setOpenOn(open ? null : path)} />
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpenOn(null)} links={links} path={path} />
      {path !== '/contact' && <a className="mobile-call" href={estimateHref}><Phone size={17} aria-hidden="true" /> {t('Call for Free Estimate')}</a>}
    </>
  );
}
