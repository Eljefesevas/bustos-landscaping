import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import {HomeIntro,HomeServices,HomeProcess,HomeWork,HomeConsult} from '@/components/home/HomeSections';
export default function Home(){return <main id="main"><Hero/><Reveal><HomeIntro/><HomeServices/><HomeProcess/><HomeWork/><HomeConsult/></Reveal></main>}
