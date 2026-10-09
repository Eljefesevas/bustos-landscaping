import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import Reveal from '@/components/Reveal';
import {PageHero,EstimateActions,ProcessSteps,CtaBand,estimateHref} from '@/components/interior/Parts';
import {services} from '@/lib/data';
import {categories} from '@/lib/projects';

export const metadata:Metadata={title:'Our Services',description:'Landscaping and design, lawn maintenance, concrete, pavers and hardscaping, irrigation and turf, and excavation and demolition from Bustos Landscaping in Montclair, California.'};

const img=(n:string)=>`/assets/work/${n}.jpg`;

export default function Page(){return <main id="main">
  <PageHero eyebrow="Services" title="The work around your home," accent="handled with care." lede="From weekly lawn care to a new stamped patio, Bustos Landscaping takes on the whole outdoor project: the planting you see, the hardscape you walk on, and the groundwork underneath." image={{src:img('turf-and-concrete-backyard'),alt:'A rectangle of artificial turf set into a scored concrete patio in a walled backyard',caption:'Concrete patio and turf · project photo'}}>
    <EstimateActions/>
  </PageHero>

  <nav className="ip-index" aria-label="Services on this page">
    <ol>{services.map((s,i)=><li key={s.title}><a href={`#service-${i}`}>{s.title}</a></li>)}</ol>
  </nav>

  <Reveal>
    <div className="ip-services">
      {services.map((s,i)=>{const work=categories.find(c=>c.id===s.work);return <section key={s.title} id={`service-${i}`} className={`ip-service${i%2?' ip-service-flip':''}`} aria-labelledby={`service-${i}-title`}>
        <div className="ip-service-media" data-reveal>
          <figure className="ip-photo ip-service-main"><Image src={img(s.image)} alt={s.alt} fill sizes="(max-width: 860px) 100vw, 50vw"/></figure>
          <figure className="ip-photo ip-service-detail"><Image src={img(s.detail)} alt={s.detailAlt} fill sizes="(max-width: 860px) 45vw, 20vw"/></figure>
        </div>
        <div className="ip-service-copy" data-reveal>
          <h2 id={`service-${i}-title`}>{s.title}</h2>
          <p className="ip-service-lede">{s.description}</p>
          <p>{s.benefit}</p>
          <h3 className="ip-list-label">Includes</h3>
          <ul className="ip-capabilities">{s.items.map(it=><li key={it}>{it}</li>)}</ul>
          {s.unconfirmed&&<p className="ip-unconfirmed">Also listed on our earlier website: {s.unconfirmed.join(', ')}. Call to confirm availability.</p>}
          <div className="ip-service-links">
            <Link className="text-link" href={estimateHref}>Ask about {s.title.toLowerCase()} <ArrowUpRight size={18} aria-hidden="true"/></Link>
            <Link className="text-link ip-link-quiet" href={`/our-work#${s.work}`}>See {work?.label.toLowerCase()} projects <ArrowUpRight size={18} aria-hidden="true"/></Link>
          </div>
        </div>
      </section>})}
    </div>

    <ProcessSteps title="How a project" accent="usually goes." note="Every property is different, so the details change from job to job. Timing and scope are worked out with you once we have seen the space."/>
    <CtaBand title="Not sure which service" accent="you need?" text="Describe the yard and what is bothering you about it. We will help you work out what makes sense, and the estimate is free."/>
  </Reveal>
</main>}
