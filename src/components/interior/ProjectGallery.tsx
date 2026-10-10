"use client";
import { useTranslations } from '@/components/LanguageProvider';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Images, X } from 'lucide-react';
import { categories, type Category, type Project } from '@/lib/projects';

type Filter = Category | 'all';
const isFilter = (v: string): v is Filter => categories.some(c => c.id === v);

/* Filterable project archive with a keyboard-accessible lightbox per project. */
export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const t = useTranslations();
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<Project | null>(null);
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  // Deep links such as /our-work#concrete preselect a category.
  useEffect(() => {
    const read = () => { const h = window.location.hash.slice(1); if (isFilter(h)) setFilter(h); };
    read();
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);

  const choose = (f: Filter) => {
    setFilter(f);
    history.replaceState(null, '', f === 'all' ? window.location.pathname : `#${f}`);
  };

  const show = (p: Project, el: HTMLButtonElement) => {
    opener.current = el; setOpen(p); setIndex(0);
  };
  // Open after the project's content has rendered so focus lands inside the dialog.
  useEffect(() => { if (open && dialog.current && !dialog.current.open) dialog.current.showModal(); }, [open]);
  const close = () => dialog.current?.close();
  const step = (d: number) => open && setIndex(i => (i + d + open.photos.length) % open.photos.length);

  const visible = projects.filter(p => filter === 'all' || p.category === filter);
  const photo = open?.photos[index];

  return (
    <div className="ip-gallery">
      <div className="ip-filters" role="group" aria-label={t("Filter projects by type")}>
        {categories.map(c => {
          const count = c.id === 'all' ? projects.length : projects.filter(p => p.category === c.id).length;
          return (
            <button key={c.id} type="button" aria-pressed={filter === c.id} onClick={() => choose(c.id)}>
              {t(c.label)} <span className="ip-filter-count">{count}</span>
            </button>
          );
        })}
      </div>
      <p className="ip-sr" aria-live="polite">{visible.length} {t("projects shown")}</p>

      <ul className="ip-projects">
        {visible.map((p, i) => {
          const cover = p.comparison?.after ?? p.photos[p.photos.length - 1];
          return (
            <li key={p.id} className={i % 5 === 0 ? 'ip-project ip-project-wide' : 'ip-project'}>
              <button type="button" className="ip-project-button" onClick={e => show(p, e.currentTarget)} aria-haspopup="dialog">
                <span className="ip-photo ip-project-image">
                  <Image src={cover.src} alt={t(cover.alt)} fill sizes={i % 5 === 0 ? '(max-width: 860px) 100vw, 66vw' : '(max-width: 860px) 100vw, 33vw'} />
                  <span className="ip-project-count"><Images size={15} aria-hidden="true" /> {p.photos.length} {t("photos · ")}{t(categories.find(c => c.id === p.category)?.label)}</span>
                </span>
                <span className="ip-project-meta">
                  <span className="ip-project-title">{t(p.title)}</span>
                  <span className="ip-project-summary">{t(p.summary)}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialog}
        className="ip-lightbox"
        aria-labelledby="ip-lightbox-title"
        onClose={() => { setOpen(null); opener.current?.focus(); }}
        onClick={e => { if (e.target === dialog.current) close(); }}
        onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); step(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); } }}
      >
        {open && photo && (
          <div className="ip-lightbox-inner">
            <header className="ip-lightbox-head">
              <div>
                <h2 id="ip-lightbox-title">{t(open.title)}</h2>
                <p>{t(open.summary)}</p>
              </div>
              <button type="button" className="ip-icon-button" onClick={close} aria-label={t("Close project photos")}><X size={20} /></button>
            </header>
            <figure className="ip-lightbox-figure">
              <div className="ip-lightbox-image"><Image src={photo.src} alt={t(photo.alt)} fill sizes="90vw" /></div>
              <figcaption><span>{t(photo.caption)}</span><span aria-live="polite">{t("Photo ")}{index + 1} {t("of ")}{open.photos.length}</span></figcaption>
            </figure>
            {open.photos.length > 1 && (
              <div className="ip-lightbox-nav">
                <button type="button" className="ip-icon-button" onClick={() => step(-1)} aria-label={t("Previous photo")}><ArrowLeft size={20} /></button>
                <div className="ip-thumbs">
                  {open.photos.map((ph, i) => (
                    <button key={ph.src} type="button" className="ip-thumb" aria-label={`${t("Show photo")} ${i + 1}: ${t(ph.caption)}`} aria-current={i === index} onClick={() => setIndex(i)}>
                      <Image src={ph.src} alt="" fill sizes="80px" />
                    </button>
                  ))}
                </div>
                <button type="button" className="ip-icon-button" onClick={() => step(1)} aria-label={t("Next photo")}><ArrowRight size={20} /></button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </div>
  );
}
