import { getTranslations } from '@/lib/i18n/server';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Phone } from 'lucide-react';
import { phones } from '@/lib/data';
import './interior.css';

export const estimateHref = '/contact#phone-options';

type Img = { src: string; alt: string; caption?: string };

/* Editorial page opening shared by every interior page */
export async function PageHero({ eyebrow, title, accent, lede, image, children }: { eyebrow: string; title: string; accent?: string; lede: string; image: Img; children?: React.ReactNode }) {
  const t = await getTranslations();
  return (
    <section className="ip-hero" aria-labelledby="page-title">
      <div className="ip-hero-copy">
        <p className="eyebrow">{t(eyebrow)}</p>
        <h1 id="page-title">{t(title)}{accent && <> <em>{t(accent)}</em></>}</h1>
        <p className="ip-hero-lede">{t(lede)}</p>
        {children}
      </div>
      <figure className="ip-hero-image ip-photo">
        <Image src={image.src} alt={t(image.alt)} fill priority sizes="(max-width: 860px) 100vw, 45vw" />
        {image.caption && <figcaption>{t(image.caption)}</figcaption>}
      </figure>
    </section>
  );
}

export async function EstimateActions({ light = false }: { light?: boolean }) {
  const t = await getTranslations();
  return (
    <div className="actions">
      <Link className={`button${light ? ' cream' : ''}`} href={estimateHref}>{t("Request an Estimate ")}<ArrowUpRight size={18} aria-hidden="true" /></Link>
      <a className={`button ${light ? 'outline' : 'ip-button-quiet'}`} href={`tel:${phones[0].value}`}><Phone size={17} aria-hidden="true" /> {phones[0].label}</a>
    </div>
  );
}

/* Closing invitation used at the foot of interior pages */
export async function CtaBand({ title, accent, text }: { title: string; accent: string; text: string }) {
  const t = await getTranslations();
  return (
    <section className="ip-cta" aria-labelledby="ip-cta-title">
      <div className="ip-cta-inner" data-reveal>
        <h2 id="ip-cta-title">{t(title)} <em>{t(accent)}</em></h2>
        <p>{t(text)}</p>
        <EstimateActions light />
      </div>
    </section>
  );
}

/* How a project usually goes: general on purpose, for the owners to review */
export const processSteps = [
  ['A conversation', 'Call, text or email and tell us what you have in mind. A rough idea is a perfectly good place to start.'],
  ['A visit and a plan', 'We look at the property with you, talk through what is possible, and put together a free estimate you can think over.'],
  ['The work', 'Our crew does the work and keeps you in the loop if anything on site changes the plan.'],
  ['A final walkthrough', 'We walk the finished space with you, so you know it is done the way you wanted.'],
];

export async function ProcessSteps({ title, accent, note }: { title: string; accent: string; note: string }) {
  const t = await getTranslations();
  return (
    <section className="ip-process" aria-labelledby="ip-process-title">
      <div className="ip-process-head" data-reveal>
        <h2 id="ip-process-title">{t(title)} <em>{t(accent)}</em></h2>
        <p>{t(note)}</p>
      </div>
      <ol className="ip-process-steps">
        {processSteps.map(([label, d], i) => (
          <li key={label} data-reveal>
            <span className="ip-process-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <h3>{t(label)}</h3>
            <p>{t(d)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
