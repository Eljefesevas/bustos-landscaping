import type {Metadata} from 'next';
import {PageIntro,Contact,ServiceArea} from '@/components/Sections';
import Reveal from '@/components/Reveal';
export const metadata:Metadata={title:'Let’s build something lasting.',description:'A conversation is the first step toward a better outdoor space.'};
export default function Page(){return <main id="main"><PageIntro label="Bustos Landscaping" title={'Let’s build something lasting.'} text={'A conversation is the first step toward a better outdoor space.'}/><Reveal><Contact/><ServiceArea/></Reveal></main>}
