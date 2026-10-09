import type {Metadata} from 'next';
import {PageIntro,Services,Contact} from '@/components/Sections';
import Reveal from '@/components/Reveal';
export const metadata:Metadata={title:'Our Services',description:'Complete Outdoor Solutions, Built Around Your Vision.'};
export default function Page(){return <main id="main"><PageIntro label="Bustos Landscaping" title={'Our Services'} text={'Complete Outdoor Solutions, Built Around Your Vision.'}/><Reveal><Services full/><Contact/></Reveal></main>}
