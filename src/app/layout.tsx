import type {Metadata} from 'next';
import Navigation from '@/components/Navigation';
import {Footer} from '@/components/Sections';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL('http://localhost:3000'),title:{default:'Bustos Landscaping | Built to Last. Designed to Impress.',template:'%s | Bustos Landscaping'},description:'Family-owned landscaping, concrete, hardscaping, lawn maintenance and outdoor transformations. Based in Montclair, California. Free estimates available.',robots:{index:false,follow:false}};
const business={'@context':'https://schema.org','@type':'HomeAndConstructionBusiness',name:'Bustos Landscaping',foundingDate:'2011',telephone:['+19094557980','+19285036277'],email:'bustoslandscaping@gmail.com',areaServed:'Montclair, California and surrounding communities; availability confirmed by phone',openingHours:'Mo-Fr 07:00-21:00',sameAs:['https://www.instagram.com/bustos.landscaping/?hl=en','https://www.tiktok.com/@jblandscape']};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Navigation/>{children}<Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(business)}}/></body></html>}
