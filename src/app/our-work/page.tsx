import type {Metadata} from 'next';
import {PageIntro,Contact} from '@/components/Sections';
import Gallery from '@/components/Gallery';
import Reveal from '@/components/Reveal';
export const metadata:Metadata={title:'Our Work',description:'Quality You Can See. Explore the possibilities for your outdoor space.'};
export default function Page(){return <main id="main"><PageIntro label="Bustos Landscaping" title={'Our Work'} text={'Quality You Can See. Explore the possibilities for your outdoor space.'}/><Reveal><section className="section"><p className="asset-disclosure">All images are temporary illustrated demonstration concepts, not completed Bustos Landscaping projects.</p><Gallery/></section><Contact/></Reveal></main>}
