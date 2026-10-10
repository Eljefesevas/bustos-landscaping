import { getTranslations } from '@/lib/i18n/server';
import type {Metadata} from 'next';
import Reveal from '@/components/Reveal';
import {PageHero,CtaBand} from '@/components/interior/Parts';
import Comparison from '@/components/interior/Comparison';
import ProjectGallery from '@/components/interior/ProjectGallery';
import {projects} from '@/lib/projects';

export async function generateMetadata(): Promise<Metadata> { const t = await getTranslations(); const metadata: Metadata = {title:'Our Work',description:'Real project photographs from Bustos Landscaping: stamped concrete, new sod, drought-tolerant front yards, walkways, tree trimming and grading.'}; return { ...metadata, title: t(metadata.title as string), description: t(metadata.description) }; }

export default async function Page(){
  const t = await getTranslations();
  const compared=projects.filter(p=>p.comparison?.aligned);
  const [lead,...rest]=compared;
  return <main id="main">
    <PageHero eyebrow={t("Our work")} title={t("Real yards,")} accent={t("photographed on the job.")} lede={t("Every photo here comes from a Bustos Landscaping project. Captions describe what you can see; we leave out locations and details we can't confirm.")} image={{src:'/assets/work/sod-and-paver-yard.jpg',alt:t("Newly laid sod beside a checkerboard paver path with hills in the distance"),caption:t("New sod and pavers · project photo")}}/>

    <Reveal>
      <section className="ip-before-after" aria-labelledby="ba-title">
        <header className="ip-section-head" data-reveal>
          <h2 id="ba-title">{t("Before ")}<em>{t("and after.")}</em></h2>
          <p>{t("Each pair was taken from the same spot on the same job. Drag the handle, or use the arrow keys, to compare.")}</p>
        </header>
        {lead?.comparison&&<div className="ip-ba-lead" data-reveal>
          <Comparison before={lead.comparison.before} after={lead.comparison.after} label={lead.title} sizes="(max-width: 860px) 100vw, 75vw"/>
        </div>}
        <div className="ip-ba-pair">
          {rest.map(p=>p.comparison&&<div key={p.id} data-reveal><Comparison before={p.comparison.before} after={p.comparison.after} label={p.title} sizes="(max-width: 860px) 100vw, 45vw"/></div>)}
        </div>
      </section>

      <section className="ip-archive" aria-labelledby="archive-title">
        <header className="ip-section-head" data-reveal>
          <h2 id="archive-title">{t("The project ")}<em>{t("archive.")}</em></h2>
          <p>{projects.length} {t("projects from our photo archive. Open any one to step through its photos from start to finish.")}</p>
        </header>
        <ProjectGallery projects={projects}/>
      </section>

      <CtaBand title={t("Picture your yard")} accent={t("in this archive.")} text={t("Tell us what you have in mind. We will take a look, talk it through with you and put together a free estimate.")}/>
    </Reveal>
  </main>}
