import type { Metadata, ResolvingMetadata } from 'next';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import {HomeIntro,HomeServices,HomeProcess,HomeWork,HomeConsult} from '@/components/home/HomeSections';
import { SITE_URL } from '@/lib/site';

export async function generateMetadata(
  _props: Record<string, never>,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const inherited = await parent;
  const image = {
    url: new URL('/og-preview.jpg', SITE_URL).toString(),
    width: 1200,
    height: 630,
    alt: 'Bustos Landscaping name and gold BL mark on ivory and forest green with landscape contour lines',
  };

  return {
    openGraph: { ...inherited.openGraph, images: [image] },
    twitter: { ...inherited.twitter, card: 'summary_large_image', images: [image] },
  };
}

export default function Home(){return <main id="main"><Hero/><Reveal><HomeIntro/><HomeServices/><HomeProcess/><HomeWork/><HomeConsult/></Reveal></main>}
