import { getTranslations } from '@/lib/i18n/server';
import type {Metadata} from 'next';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import {PageHero,CtaBand} from '@/components/interior/Parts';
import {story} from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> { const t = await getTranslations(); const metadata: Metadata = {title:'Our Story',description:'Bustos Landscaping is a family business: two brothers carrying on the landscaping company their father started, since 2011.'}; return { ...metadata, title: t(metadata.title as string), description: t(metadata.description) }; }

const img=(n:string)=>`/assets/work/${n}.jpg`;

const values=[
  ['Family','Carry our father’s legacy forward with care.'],
  ['Quality','Bring dedication and craftsmanship to every outdoor space.'],
  ['Faith','Give thanks to Jesus for the opportunities and blessings along the way.'],
];
const proud='We’re most proud of how far we’ve come as a family. What our dad started, we’ve been able to continue growing through hard work, dedication, and faith in God. Seeing how much our business has grown over the years and knowing we’re carrying on our father’s legacy means everything to us. We’re also grateful for the trust our customers have placed in us and the relationships we’ve built along the way.';
const onTheJob=[
  ['hedge-trimming','Cutting back an overgrown hedge','A crew member cutting back an overgrown hedge in front of a house'],
  ['palm-trimming','Trimming a palm','A crew member secured high on a palm trunk while trimming it'],
  ['turf-patio-pour','Finishing a concrete pour','A crew finishing a large concrete pour beside a house'],
  ['company-truck-trailer','Truck, trailer and loader','A pickup truck towing a trailer loaded with a compact loader'],
];

export default async function Page(){
  const t = await getTranslations();return <main id="main">
  <PageHero eyebrow={t("Our story")} title={t("A family business,")} accent={t("carried forward.")} lede={t("Bustos Landscaping is run by two brothers who learned the trade from their father, took over his business in 2011, and have been building on it ever since.")} image={{src:img('front-yard-loader'),alt:t("A compact loader working on a front lawn beside a driveway, with mountains behind the houses"),caption:t("On the job · project photo")}}/>

  <Reveal>
    <section className="ip-words" aria-labelledby="words-title">
      <div className="ip-words-head" data-reveal>
        <h2 id="words-title">{t("In ")}<em>{t("their own words.")}</em></h2>
      </div>
      <blockquote className="ip-words-quote" data-reveal>
        <p>{t(story)}</p>
        <p className="ip-words-by">{t("The Bustos brothers")}</p>
      </blockquote>
    </section>

    <section className="ip-onjob" aria-labelledby="onjob-title">
      <header className="ip-section-head" data-reveal>
        <h2 id="onjob-title">{t("The work, ")}<em>{t("up close.")}</em></h2>
      </header>
      <div className="ip-onjob-grid">
        {onTheJob.map(([src,caption,alt],i)=><figure key={src} className={`ip-photo ip-onjob-${i}`} data-reveal>
          <Image src={img(src)} alt={t(alt)} fill sizes="(max-width: 860px) 100vw, 40vw"/>
          <figcaption>{t(caption)}</figcaption>
        </figure>)}
      </div>
    </section>

    <section className="ip-proud" aria-labelledby="proud-title">
      <div data-reveal>
        <h2 id="proud-title">{t("What we’re ")}<em>{t("most proud of.")}</em></h2>
        <blockquote><p>{t(proud)}</p></blockquote>
      </div>
      <dl className="ip-values" data-reveal>
        {values.map(([label,d])=><div key={label}><dt>{t(label)}</dt><dd>{t(d)}</dd></div>)}
      </dl>
    </section>

    <CtaBand title={t("We would love to see")} accent={t("your yard.")} text={t("No pressure and no obligation. Tell us a little about the space and what you hope it could be, and we will take it from there.")}/>
  </Reveal>
</main>}
