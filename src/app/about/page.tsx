import type {Metadata} from 'next';
import {PageIntro,Contact,Story,Equipment} from '@/components/Sections';
import Reveal from '@/components/Reveal';
import Timeline from '@/components/Timeline';
export const metadata:Metadata={title:'A family legacy. A lasting foundation.',description:'Rooted in family, hard work, and gratitude. Since 2011.'};
export default function Page(){return <main id="main"><PageIntro label="Bustos Landscaping" title={'A family legacy. A lasting foundation.'} text={'Rooted in family, hard work, and gratitude. Since 2011.'}/><Reveal><Story full/><Timeline/><Equipment/><Contact/></Reveal></main>}
