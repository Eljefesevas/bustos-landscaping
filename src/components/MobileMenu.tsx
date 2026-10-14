"use client";
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Phone } from 'lucide-react';
import { LanguageToggle, useTranslations } from '@/components/LanguageProvider';
import { phones } from '@/lib/data';

const MENU_ID = 'mobile-menu';
const BUTTON_ID = 'menu-button';

/* Hamburger that morphs into an X; lives in the header above the overlay. */
export function MenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const t = useTranslations();
  return (
    <button id={BUTTON_ID} type="button" className="menu-toggle" aria-label={t(open ? 'Close navigation' : 'Open navigation')} aria-expanded={open} aria-controls={MENU_ID} onClick={onToggle}>
      <span className="menu-icon" aria-hidden="true"><span /><span /></span>
    </button>
  );
}

/*
  Full-screen menu for widths under 900px. While open: page scroll is locked, the rest of the
  page is inert, Tab cycles between the menu and its close button, and Escape closes it and
  returns focus to the menu button.
*/
export default function MobileMenu({ open, onClose, links, path }: { open: boolean; onClose: () => void; links: string[][]; path: string }) {
  const t = useTranslations();
  const panel = useRef<HTMLDivElement>(null);
  const phone = phones[0];
  // Keep the latest close handler without re-running the open/close effect on every parent render.
  const close = useRef(onClose);
  useEffect(() => { close.current = onClose; }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const button = document.getElementById(BUTTON_ID);
    const html = document.documentElement;
    const scrollbar = window.innerWidth - html.clientWidth;
    html.style.overflow = 'hidden';
    if (scrollbar) html.style.paddingRight = `${scrollbar}px`;
    const outside = [...document.querySelectorAll<HTMLElement>('main, footer, .skip-link, .mobile-call, .nav-brand, .nav-compact .nav-estimate')];
    outside.forEach(el => el.setAttribute('inert', ''));
    panel.current?.querySelector<HTMLElement>('a, button')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close.current(); button?.focus(); return; }
      if (e.key !== 'Tab' || !panel.current) return;
      const items = [button, ...panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')].filter(Boolean) as HTMLElement[];
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      html.style.overflow = ''; html.style.paddingRight = '';
      outside.forEach(el => el.removeAttribute('inert'));
    };
  }, [open]);

  if (!open) return null;
  return (
    <div id={MENU_ID} ref={panel} className="mobile-menu" role="dialog" aria-modal="true" aria-label={t('Mobile navigation')}>
      <nav aria-label={t('Main navigation')}>
        <ol className="mobile-menu-links">
          {links.map(([label, url], i) => (
            <li key={url} style={{ '--i': i } as React.CSSProperties}>
              <Link href={url === '/' ? '/#main' : url} aria-current={path === url ? 'page' : undefined} onClick={onClose}>
                <span className="mobile-menu-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>{t(label)}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
      <div className="mobile-menu-foot">
        <div className="mobile-menu-row">
          {phone && <a className="mobile-menu-phone" href={`tel:${phone.value}`}><Phone size={16} aria-hidden="true" /> {phone.label}</a>}
          <LanguageToggle />
        </div>
        <Link className="mobile-menu-cta" href="/contact#phone-options" onClick={onClose}>{t('Get a Free Estimate')} <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </div>
  );
}
