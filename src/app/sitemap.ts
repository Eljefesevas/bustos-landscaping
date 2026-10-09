import type {MetadataRoute} from 'next';
export default function sitemap():MetadataRoute.Sitemap{return ['','/services','/our-work','/about','/contact'].map(path=>({url:`http://localhost:3000${path}`}))}
