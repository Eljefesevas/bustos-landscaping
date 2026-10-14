import { getLanguage, getTranslations } from '@/lib/i18n/server';
import { LanguageProvider } from '@/components/LanguageProvider';
import type {Metadata} from 'next';
import SiteHeader from '@/components/SiteHeader';
import {Footer} from '@/components/Sections';
import {DM_Sans,Cormorant_Garamond,Marcellus} from 'next/font/google';
import {SITE_URL} from '@/lib/site';
import './globals.css';
const sans=DM_Sans({subsets:['latin'],variable:'--font-sans',display:'swap'});
const marcellus=Marcellus({subsets:['latin'],weight:'400',variable:'--font-marcellus',display:'swap'});
const display=Cormorant_Garamond({subsets:['latin'],weight:['400','500','600'],style:['normal','italic'],variable:'--font-display',display:'swap'});
const description='Family-owned landscaping, concrete, hardscaping, lawn maintenance and outdoor transformations. Based in Montclair, California. Free estimates available.';
const shareImage={url:'/og-image.jpg',width:1200,height:630,alt:'A Bustos Landscaping backyard project: artificial turf set into a scored concrete patio'};
const baseMetadata:Metadata={metadataBase:new URL(SITE_URL),title:{default:'Bustos Landscaping | Landscaping & Concrete in Montclair, CA',template:'%s | Bustos Landscaping'},description,openGraph:{type:'website',siteName:'Bustos Landscaping',locale:'en_US',description,images:[shareImage]},twitter:{card:'summary_large_image',images:[shareImage.url]},robots:{index:false,follow:false}};
const business={'@context':'https://schema.org','@type':'HomeAndConstructionBusiness',name:'Bustos Landscaping',url:SITE_URL,logo:`${SITE_URL}/assets/brand/bustos-logo-lockup.png`,image:`${SITE_URL}/og-image.jpg`,telephone:['+19094557980','+19285036277'],email:'bustoslandscaping@gmail.com',areaServed:'Montclair, California and surrounding communities; availability confirmed by phone',openingHours:'Mo-Fr 07:00-21:00',sameAs:['https://www.instagram.com/bustos.landscaping/?hl=en','https://www.tiktok.com/@jblandscape']};
export default async function RootLayout({children}:Readonly<{children:React.ReactNode}>){const language = await getLanguage(); const t = await getTranslations(); return <html lang={language} className={`${sans.variable} ${display.variable} ${marcellus.variable}`}><body><LanguageProvider language={language}><a className="skip-link" href="#main">{t("Skip to content")}</a><SiteHeader/>{children}<Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(business)}}/></LanguageProvider></body></html>}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const language = await getLanguage();
  return { ...baseMetadata,
    title: { default: t('Bustos Landscaping | Landscaping & Concrete in Montclair, CA'), template: '%s | Bustos Landscaping' },
    description: t(description),
    openGraph: { ...baseMetadata.openGraph, locale: language === 'es' ? 'es_MX' : 'en_US', description: t(description), images: [{ ...shareImage, alt: t(shareImage.alt) }] }
  };
}
