import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Phone } from 'lucide-react';
import { phones } from '@/lib/data';
import './home.css';

const W = '/assets/work';
const estimate = '/contact#phone-options';

/* 1 — Introduction: who we are, set as an editorial spread */
export function HomeIntro() {
  return (
    <section className="hm-intro" aria-labelledby="hm-intro-title">
      <div className="hm-intro-copy" data-reveal>
        <p className="eyebrow">A second-generation family business</p>
        <h2 id="hm-intro-title">A landscape is personal. <em>So is our approach.</em></h2>
        <p className="hm-lede">
          Bustos Landscaping is a family business. In 2011 two brothers took over the landscaping company their father built, and they have been growing it with the same hard work he taught them.
        </p>
        <p>
          Before we suggest anything, we would like to hear how you use your yard: where the kids play, what you see from the kitchen window, what you want to stop worrying about. The work should fit the way you live.
        </p>
        <Link className="text-link" href="/about">Read our story <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>

      <figure className="hm-intro-image hm-photo" data-reveal>
        <Image src={`${W}/backyard-lawn-patio.jpg`} alt="A backyard with a freshly cut lawn, a wide concrete patio and a new planting strip along an iron fence" fill sizes="(max-width: 860px) 100vw, 42vw" />
        <figcaption>Lawn and concrete patio · project photo</figcaption>
      </figure>

      <dl className="hm-facts" data-reveal>
        <div><dt>Based in</dt><dd>Montclair, California</dd></div>
        <div><dt>We work on</dt><dd>Residential &amp; commercial properties</dd></div>
        <div><dt>Estimates</dt><dd>Free within our service area</dd></div>
      </dl>
    </section>
  );
}

/* 2 — Services: image-led, architectural, numbered */
const featured = [
  { n: '01', title: 'Landscaping & Design', text: 'Planting, rock and mulch, cleanups, and designs grounded in how you use the space.', img: 'drought-tolerant-front-yard.jpg', alt: 'A front yard of decomposed granite and river rock planted with a young palm and drought-tolerant shrubs', anchor: 0, cls: 'hm-svc-a' },
  { n: '02', title: 'Concrete', text: 'Patios, walkways, driveways and stamped finishes, poured for everyday use.', img: 'stamped-concrete-entry.jpg', alt: 'A curved stamped-concrete entry patio meeting a green lawn in front of a stucco house', anchor: 2, cls: 'hm-svc-b' },
  { n: '03', title: 'Pavers & Hardscaping', text: 'Paver paths, block and retaining walls that give a yard its structure.', img: 'brick-paver-walkway.jpg', alt: 'A red brick paver walkway in a herringbone pattern running beside a low planted wall', anchor: 3, cls: 'hm-svc-c' },
  { n: '04', title: 'Irrigation & Turf', text: 'Sprinkler systems and repair, sod, and artificial turf.', img: 'new-lawn-irrigation.jpg', alt: 'Sprinklers watering a newly laid lawn bordered by a curved concrete edge', anchor: 4, cls: 'hm-svc-d' },
];
const more = [
  { n: '05', title: 'Lawn Maintenance', text: 'Mowing, trimming of trees and bushes, and recurring care.', anchor: 1 },
  { n: '06', title: 'Excavation & Demolition', text: 'Grading, demolition and site preparation for what comes next.', anchor: 5 },
];

export function HomeServices() {
  return (
    <section className="hm-services" aria-labelledby="hm-services-title">
      <header className="hm-head" data-reveal>
        <p className="eyebrow">What we do</p>
        <h2 id="hm-services-title">The whole yard, <em>from the ground up.</em></h2>
        <p>Landscaping, hardscape and the groundwork underneath it, handled by the same family business.</p>
      </header>

      <div className="hm-svc-grid">
        {featured.map(s => (
          <Link key={s.n} href={`/services#service-${s.anchor}`} className={`hm-svc ${s.cls}`} data-reveal>
            <span className="hm-svc-image hm-photo">
              <Image src={`${W}/${s.img}`} alt={s.alt} fill sizes="(max-width: 860px) 100vw, 50vw" />
            </span>
            <span className="hm-svc-meta">
              <span className="hm-num">{s.n}</span>
              <span className="hm-svc-title">{s.title} <ArrowUpRight size={20} aria-hidden="true" /></span>
              <span className="hm-svc-text">{s.text}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="hm-svc-more" data-reveal>
        <ul>
          {more.map(s => (
            <li key={s.n}>
              <Link href={`/services#service-${s.anchor}`}>
                <span className="hm-num">{s.n}</span>
                <span className="hm-svc-title">{s.title}</span>
                <span className="hm-svc-text">{s.text}</span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <Link className="button" href="/services">See every service <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

/* 3 — Process: what working together feels like (general by design; owners to review) */
const steps = [
  ['A conversation', 'Call, text or email and tell us what you have in mind. A rough idea is a perfectly good place to start.'],
  ['A visit and a plan', 'We look at the property with you, talk through what is possible, and put together an estimate you can think over.'],
  ['The work', 'Our crew does the work and keeps you in the loop if anything on site changes the plan.'],
  ['A final walkthrough', 'We walk the finished space with you, so you know it is done the way you wanted.'],
];

export function HomeProcess() {
  return (
    <section className="hm-process" aria-labelledby="hm-process-title">
      <div className="hm-process-intro" data-reveal>
        <p className="eyebrow">Working together</p>
        <h2 id="hm-process-title">What to expect, <em>start to finish.</em></h2>
        <p>Every property is different, so the details change from job to job. The rhythm stays the same.</p>
        <figure className="hm-process-image hm-photo">
          <Image src={`${W}/grading-in-progress.jpg`} alt="A compact loader grading bare soil in a side yard before new work begins" fill sizes="(max-width: 860px) 100vw, 34vw" />
          <figcaption>Grading in progress · project photo</figcaption>
        </figure>
      </div>
      <ol className="hm-steps">
        {steps.map(([title, text], i) => (
          <li key={title} data-reveal>
            <span className="hm-step-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* 4 — Work: real photographs from the company archive */
const work = [
  ['turf-and-concrete-backyard.jpg', 'Artificial turf framed by a concrete patio', 'A backyard with a rectangle of artificial turf set into a scored concrete patio, palms beyond the block wall', 'hm-w-a'],
  ['stamped-concrete-pool-deck.jpg', 'Stamped concrete pool deck', 'A stamped flagstone-pattern concrete deck surrounding a backyard pool', 'hm-w-b'],
  ['sod-and-paver-yard.jpg', 'New sod with large-format pavers', 'A newly laid sod lawn beside a checkerboard path of grey and white pavers, hills in the distance', 'hm-w-c'],
  ['concrete-walkway-new-sod.jpg', 'Concrete walkway and new sod', 'A fresh concrete walkway with a brick edge running between a new front lawn and a planting bed', 'hm-w-d'],
];

export function HomeWork() {
  return (
    <section className="hm-work" aria-labelledby="hm-work-title">
      <header className="hm-head hm-head-split" data-reveal>
        <div>
          <p className="eyebrow">Our work</p>
          <h2 id="hm-work-title">Photographs from <em>real projects.</em></h2>
        </div>
        <p>From the Bustos Landscaping project archive: real yards, not staged or stock.</p>
      </header>
      <div className="hm-work-grid">
        {work.map(([img, caption, alt, cls]) => (
          <figure key={img} className={`hm-work-item ${cls}`} data-reveal>
            <span className="hm-photo"><Image src={`${W}/${img}`} alt={alt} fill sizes="(max-width: 860px) 100vw, 60vw" /></span>
            <figcaption>{caption}</figcaption>
          </figure>
        ))}
      </div>
      <Link className="text-link hm-work-link" href="/our-work">View our work <ArrowUpRight size={18} aria-hidden="true" /></Link>
    </section>
  );
}

/* 5 — Consultation: the close */
const areas = ['Montclair', 'Ontario', 'Upland', 'Rancho Cucamonga', 'Chino', 'Chino Hills', 'Pomona', 'La Verne', 'San Dimas', 'Glendora', 'Covina', 'Walnut', 'Fontana'];

export function HomeConsult() {
  return (
    <section className="hm-consult" aria-labelledby="hm-consult-title">
      <div className="hm-consult-bg" aria-hidden="true">
        <Image src={`${W}/new-lawn-irrigation.jpg`} alt="" fill sizes="(max-width: 860px) 100vw, 60vw" />
      </div>
      <div className="hm-consult-inner">
        <div className="hm-consult-copy" data-reveal>
          <p className="eyebrow">Free estimates</p>
          <h2 id="hm-consult-title">Tell us about your yard. <em>We&apos;ll take it from there.</em></h2>
          <p>Whether it is a weekly mow or a full backyard, the first step is the same: a short conversation about what you want. No pressure, and no obligation.</p>
          <div className="actions">
            <Link className="button cream" href={estimate}>Request an Estimate <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <a className="button outline" href={`tel:${phones[0].value}`}><Phone size={17} aria-hidden="true" /> {phones[0].label}</a>
          </div>
        </div>
        <aside className="hm-consult-card" data-reveal aria-label="Service area">
          <h3 className="hm-areas-label">Serving Montclair and nearby communities, including</h3>
          <ul className="hm-areas">{areas.map(a => <li key={a}>{a}</li>)}</ul>
          <p className="hm-areas-note">Not on the list? Call and we&apos;ll confirm availability for your property.</p>
        </aside>
      </div>
    </section>
  );
}
