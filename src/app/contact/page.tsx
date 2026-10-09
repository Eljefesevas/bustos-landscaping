import type {Metadata} from 'next';
import {Phone,MessageCircle,Mail,Clock} from 'lucide-react';
import Reveal from '@/components/Reveal';
import {PageHero} from '@/components/interior/Parts';
import EstimateForm from '@/components/interior/EstimateForm';
import {phones} from '@/lib/data';

export const metadata:Metadata={title:'Request an Estimate',description:'Call, text or email Bustos Landscaping to talk about your project. Free estimates in Montclair, California and nearby communities.'};

const EMAIL='bustoslandscaping@gmail.com';
// Communities listed on the owner's original website (bustoslandscaping.net).
const areas=['Montclair','Ontario','Upland','Rancho Cucamonga','Chino','Chino Hills','Pomona','La Verne','San Dimas','Glendora','Covina','Walnut','Fontana'];
const next=[
  ['You reach out','Call, text, email, or use the form on this page to write the email for you.'],
  ['We get back to you','We reply as soon as we can to talk through the project and, if it makes sense, arrange a time to see the property.'],
  ['You get an estimate','Estimates are free within our service area. Take your time with it; there is no obligation.'],
];

export default function Page(){return <main id="main">
  <PageHero eyebrow="Contact" title="Let’s talk about" accent="your yard." lede="The first step is a short conversation. Tell us what you have in mind, even if it is only a rough idea, and we will help you work out what comes next." image={{src:'/assets/work/walls-edging-sod-5.jpg',alt:'A sweeping concrete path with brick bands meeting a green lawn',caption:'Concrete path and new lawn · project photo'}}/>

  <Reveal>
    <section className="ip-contact" id="phone-options" aria-labelledby="contact-title">
      <div className="ip-contact-direct" data-reveal>
        <h2 id="contact-title">Reach us <em>directly.</em></h2>
        <ul className="ip-direct">
          {phones.map(p=><li key={p.value}>
            <span className="ip-direct-label">Call or text</span>
            <a className="ip-direct-number" href={`tel:${p.value}`}>{p.label}</a>
            <span className="ip-direct-actions">
              <a href={`tel:${p.value}`}><Phone size={16} aria-hidden="true"/> Call</a>
              <a href={`sms:${p.value}`}><MessageCircle size={16} aria-hidden="true"/> Text</a>
            </span>
          </li>)}
          <li>
            <span className="ip-direct-label">Email</span>
            <a className="ip-direct-email" href={`mailto:${EMAIL}`}><Mail size={18} aria-hidden="true"/> {EMAIL}</a>
          </li>
          <li>
            <span className="ip-direct-label">Hours</span>
            <span className="ip-direct-hours"><Clock size={18} aria-hidden="true"/> Monday–Friday, 7:00 AM–9:00 PM</span>
          </li>
        </ul>
      </div>
      <div className="ip-contact-form" data-reveal>
        <h2>Or describe <em>the project.</em></h2>
        <EstimateForm/>
      </div>
    </section>

    <section className="ip-next" aria-labelledby="next-title">
      <h2 id="next-title" data-reveal>What happens <em>next.</em></h2>
      <ol>{next.map(([t,d],i)=><li key={t} data-reveal><span className="ip-process-n" aria-hidden="true">{String(i+1).padStart(2,'0')}</span><h3>{t}</h3><p>{d}</p></li>)}</ol>
    </section>

    <section className="ip-area" aria-labelledby="area-title">
      <div data-reveal>
        <h2 id="area-title">Where <em>we work.</em></h2>
        <p>Based in Montclair, California, serving residential and commercial properties in the surrounding communities, including:</p>
      </div>
      <div data-reveal>
        <ul className="ip-area-list">{areas.map(a=><li key={a}>{a}</li>)}</ul>
        <p className="ip-area-note">Not on the list? Call and we will confirm availability for your property.</p>
      </div>
    </section>
  </Reveal>
</main>}
