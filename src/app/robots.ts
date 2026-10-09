import type {MetadataRoute} from 'next';
import {SITE_URL} from '@/lib/site';
// Indexing stays blocked until the owners approve publication.
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',disallow:'/'},sitemap:`${SITE_URL}/sitemap.xml`}}
