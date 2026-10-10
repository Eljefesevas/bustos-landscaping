import { getTranslations } from '@/lib/i18n/server';
import type {Metadata} from 'next';
import {Phone,MessageCircle,Mail,Clock} from 'lucide-react';
import Reveal from '@/components/Reveal';
import {PageHero} from '@/components/interior/Parts';
import EstimateForm from '@/components/interior/EstimateForm';
import {phones} from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> { const t = await getTranslations(); const metadata: Metadata = {title:'Request an Estimate',description:'Call, text or email Bustos Landscaping to talk about your project. Free estimates in Montclair, California and nearby communities.'}; return { ...metadata, title: t(metadata.title as string), description: t(metadata.description) }; }

const EMAIL='bustoslandscaping@gmail.com';
// Communities listed on the owner's original website (bustoslandscaping.net).
const areas=['Montclair','Ontario','Upland','Rancho Cucamonga','Chino','Chino Hills','Pomona','La Verne','San Dimas','Glendora','Covina','Walnut','Fontana'];
const next=[
  ['You reach out','Call, text, email, or use the form on this page to write the email for you.'],
  ['We get back to you','We reply as soon as we can to talk through the project and, if it makes sense, arrange a time to see the property.'],
  ['You get an estimate','Estimates are free within our service area. Take your time with it; there is no obligation.'],
];

export default async function Page(){
  const t = await getTranslations();return <main id="main">
  <PageHero eyebrow={t("Contact")} title={t("Let’s talk about")} accent={t("your yard.")} lede={t("The first step is a short conversation. Tell us what you have in mind, even if it is only a rough idea, and we will help you work out what comes next.")} image={{src:'/assets/work/walls-edging-sod-5.jpg',alt:t("A sweeping concrete path with brick bands meeting a green lawn"),caption:t("Concrete path and new lawn · project photo")}}/>

  <Reveal>
    <section className="ip-contact" id="phone-options" aria-labelledby="contact-title">
      <div className="ip-contact-direct" data-reveal>
        <h2 id="contact-title">{t("Reach us ")}<em>{t("directly.")}</em></h2>
        <ul className="ip-direct">
          {phones.map(p=><li key={p.value}>
            <span className="ip-direct-label">{t("Call or text")}</span>
            <a className="ip-direct-number" href={`tel:${p.value}`}>{p.label}</a>
            <span className="ip-direct-actions">
              <a href={`tel:${p.value}`}><Phone size={16} aria-hidden="true"/> {t("Call")}</a>
              <a href={`sms:${p.value}`}><MessageCircle size={16} aria-hidden="true"/> {t("Text")}</a>
            </span>
          </li>)}
          <li>
            <span className="ip-direct-label">{t("Email")}</span>
            <a className="ip-direct-email" href={`mailto:${EMAIL}`}><Mail size={18} aria-hidden="true"/> {EMAIL}</a>
          </li>
          <li>
            <span className="ip-direct-label">{t("Hours")}</span>
            <span className="ip-direct-hours"><Clock size={18} aria-hidden="true"/> {t("Monday–Friday, 7:00 AM–9:00 PM")}</span>
          </li>
        </ul>
      </div>
      <div className="ip-contact-form" data-reveal>
        <h2>{t("Or describe ")}<em>{t("the project.")}</em></h2>
        <EstimateForm/>
      </div>
    </section>

    <section className="ip-next" aria-labelledby="next-title">
      <h2 id="next-title" data-reveal>{t("What happens ")}<em>{t("next.")}</em></h2>
      <ol>{next.map(([label,d],i)=><li key={label} data-reveal><span className="ip-process-n" aria-hidden="true">{t(String(i+1).padStart(2,'0'))}</span><h3>{t(label)}</h3><p>{t(d)}</p></li>)}</ol>
    </section>

    <section className="ip-area" aria-labelledby="area-title">
      <div data-reveal>
        <h2 id="area-title">{t("Where ")}<em>{t("we work.")}</em></h2>
        <p>{t("Based in Montclair, California, serving residential and commercial properties in the surrounding communities, including:")}</p>
      </div>
      <div data-reveal>
        <ul className="ip-area-list">{areas.map(a=><li key={a}>{a}</li>)}</ul>
        <p className="ip-area-note">{t("Not on the list? Call and we will confirm availability for your property.")}</p>
      </div>
    </section>
  </Reveal>
</main>}
