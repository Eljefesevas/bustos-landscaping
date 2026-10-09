import type {Metadata} from 'next';
import Navigation from '@/components/Navigation';
import {Footer} from '@/components/Sections';
import {DM_Sans,Cormorant_Garamond} from 'next/font/google';
import {SITE_URL} from '@/lib/site';
import './globals.css';
const sans=DM_Sans({subsets:['latin'],variable:'--font-sans',display:'swap'});
const display=Cormorant_Garamond({subsets:['latin'],weight:['400','500','600'],style:['normal','italic'],variable:'--font-display',display:'swap'});
const description='Family-owned landscaping, concrete, hardscaping, lawn maintenance and outdoor transformations. Based in Montclair, California. Free estimates available.';
const shareImage={url:'/og-image.jpg',width:1200,height:630,alt:'A Bustos Landscaping backyard project: artificial turf set into a scored concrete patio'};
export const metadata:Metadata={metadataBase:new URL(SITE_URL),title:{default:'Bustos Landscaping | Landscaping & Concrete in Montclair, CA',template:'%s | Bustos Landscaping'},description,openGraph:{type:'website',siteName:'Bustos Landscaping',locale:'en_US',description,images:[shareImage]},twitter:{card:'summary_large_image',images:[shareImage.url]},robots:{index:false,follow:false}};
const business={'@context':'https://schema.org','@type':'HomeAndConstructionBusiness',name:'Bustos Landscaping',url:SITE_URL,logo:`${SITE_URL}/assets/brand/bustos-logo-lockup.png`,image:`${SITE_URL}/og-image.jpg`,telephone:['+19094557980','+19285036277'],email:'bustoslandscaping@gmail.com',areaServed:'Montclair, California and surrounding communities; availability confirmed by phone',openingHours:'Mo-Fr 07:00-21:00',sameAs:['https://www.instagram.com/bustos.landscaping/?hl=en','https://www.tiktok.com/@jblandscape']};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" className={`${sans.variable} ${display.variable}`}><body><a className="skip-link" href="#main">Skip to content</a><Navigation/>{children}<Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(business)}}/></body></html>}
