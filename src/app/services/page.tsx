import { getTranslations } from '@/lib/i18n/server';
import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import Reveal from '@/components/Reveal';
import {PageHero,EstimateActions,ProcessSteps,CtaBand,estimateHref} from '@/components/interior/Parts';
import {services} from '@/lib/data';
import {categories} from '@/lib/projects';

export async function generateMetadata(): Promise<Metadata> { const t = await getTranslations(); const metadata: Metadata = {title:'Our Services',description:'Landscaping and design, lawn maintenance, concrete, pavers and hardscaping, irrigation and turf, and excavation and demolition from Bustos Landscaping in Montclair, California.'}; return { ...metadata, title: t(metadata.title as string), description: t(metadata.description) }; }

const img=(n:string)=>`/assets/work/${n}.jpg`;

export default async function Page(){
  const t = await getTranslations();return <main id="main">
  <PageHero eyebrow={t("Services")} title={t("The work around your home,")} accent={t("handled with care.")} lede={t("From weekly lawn care to a new stamped patio, Bustos Landscaping takes on the whole outdoor project: the planting you see, the hardscape you walk on, and the groundwork underneath.")} image={{src:img('turf-and-concrete-backyard'),alt:t("A rectangle of artificial turf set into a scored concrete patio in a walled backyard"),caption:t("Concrete patio and turf · project photo")}}>
    <EstimateActions/>
  </PageHero>

  <nav className="ip-index" aria-label={t("Services on this page")}>
    <ol>{services.map((s,i)=><li key={s.title}><a href={`#service-${i}`}>{t(s.title)}</a></li>)}</ol>
  </nav>

  <Reveal>
    <div className="ip-services">
      {services.map((s,i)=>{const work=categories.find(c=>c.id===s.work);return <section key={s.title} id={`service-${i}`} className={`ip-service${i%2?' ip-service-flip':''}`} aria-labelledby={`service-${i}-title`}>
        <div className="ip-service-media" data-reveal>
          <figure className="ip-photo ip-service-main"><Image src={img(s.image)} alt={t(s.alt)} fill sizes="(max-width: 860px) 100vw, 50vw"/></figure>
          <figure className="ip-photo ip-service-detail"><Image src={img(s.detail)} alt={t(s.detailAlt)} fill sizes="(max-width: 860px) 45vw, 20vw"/></figure>
        </div>
        <div className="ip-service-copy" data-reveal>
          <h2 id={`service-${i}-title`}>{t(s.title)}</h2>
          <p className="ip-service-lede">{t(s.description)}</p>
          <p>{t(s.benefit)}</p>
          <h3 className="ip-list-label">{t("Includes")}</h3>
          <ul className="ip-capabilities">{s.items.map(it=><li key={it}>{t(it)}</li>)}</ul>
          {s.unconfirmed&&<p className="ip-unconfirmed">{t("Also listed on our earlier website: ")}{s.unconfirmed.map(item => t(item)).join(', ')}{t(". Call to confirm availability.")}</p>}
          <div className="ip-service-links">
            <Link className="text-link" href={estimateHref}>{t("Ask about ")}{t(s.title).toLowerCase()} <ArrowUpRight size={18} aria-hidden="true"/></Link>
            <Link className="text-link ip-link-quiet" href={`/our-work#${s.work}`}>{t("See {category} projects").replace("{category}", t(work?.label ?? "").toLowerCase())} <ArrowUpRight size={18} aria-hidden="true"/></Link>
          </div>
        </div>
      </section>})}
    </div>

    <ProcessSteps title={t("How a project")} accent={t("usually goes.")} note={t("Every property is different, so the details change from job to job. Timing and scope are worked out with you once we have seen the space.")}/>
    <CtaBand title={t("Not sure which service")} accent={t("you need?")} text={t("Describe the yard and what is bothering you about it. We will help you work out what makes sense, and the estimate is free.")}/>
  </Reveal>
</main>}
