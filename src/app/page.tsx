import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import Gallery from '@/components/Gallery';
import {Trust,Services,SectionTitle,Story,Equipment,Reviews,ServiceArea,Contact} from '@/components/Sections';
export default function Home(){return <main id="main"><Hero/><Reveal><Trust/><Services/><section className="section work-section" id="our-work"><SectionTitle label="02 / Possibilities, made visible" title="Our Work" text="Quality You Can See."/><p className="asset-disclosure">Temporary illustrated concepts throughout this preview. Actual project photography coming soon.</p><Gallery/></section><Story/><Equipment/><Reviews/><ServiceArea/><Contact/></Reveal></main>}
