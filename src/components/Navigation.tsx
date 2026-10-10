"use client";
import { LanguageToggle, useTranslations } from '@/components/LanguageProvider';

import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import Image from 'next/image';
import {Menu,X,ArrowUpRight,Phone} from 'lucide-react';
export const links=[['Home','/'],['Services','/services'],['Work','/our-work'],['Our Story','/about'],['Contact','/contact']];
const estimate='/contact#phone-options';
export default function Navigation(){
  const t = useTranslations();
  const path=usePathname();
  // The menu remembers the route it was opened on, so navigating anywhere closes it.
  const[openOn,setOpenOn]=useState<string|null>(null);const open=openOn===path;const setOpen=(v:boolean)=>setOpenOn(v?path:null);
  const[scrolled,setScrolled]=useState(false);
  const toggle=useRef<HTMLButtonElement>(null);const header=useRef<HTMLElement>(null);
  useEffect(()=>{const f=()=>setScrolled(window.scrollY>40);f();window.addEventListener('scroll',f,{passive:true});return()=>window.removeEventListener('scroll',f);},[]);
  // Escape and outside clicks close the open menu; Escape returns focus to the toggle.
  useEffect(()=>{if(!open)return;
    const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape'){setOpenOn(null);toggle.current?.focus();}};
    const onDown=(e:PointerEvent)=>{if(header.current&&!header.current.contains(e.target as Node))setOpenOn(null);};
    document.addEventListener('keydown',onKey);document.addEventListener('pointerdown',onDown);
    return()=>{document.removeEventListener('keydown',onKey);document.removeEventListener('pointerdown',onDown);};},[open]);
  return <><header ref={header} className={`nav ${scrolled?'compact':''}`}><Link href="/" className="nav-brand" aria-label={t("Bustos Landscaping home")}><span className="nav-mark nav-mark-luxury"><Image src="/assets/brand/bustos-luxury-monogram.png" alt="" width={575} height={410} preload sizes="56px"/></span><span className="nav-name">Bustos Landscaping</span></Link><nav aria-label={t("Main navigation")} className="desktop-links">{links.map(([label,url])=><Link key={url} href={url==='/'?'/#main':url} aria-current={path===url?'page':undefined}>{t(label)}</Link>)}</nav><div className="nav-actions"><LanguageToggle className="desktop-language"/><Link className="nav-estimate" href={estimate}>{t("Get a Free Estimate")}<ArrowUpRight size={17} aria-hidden="true"/></Link></div><button ref={toggle} type="button" className="menu-toggle" aria-label={t(open?'Close navigation':'Open navigation')} aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(!open)}>{open?<X aria-hidden="true"/>:<Menu aria-hidden="true"/>}</button>{open&&<nav id="mobile-menu" className="mobile-menu" aria-label={t("Mobile navigation")}>{links.map(([label,url])=><Link key={url} href={url==='/'?'/#main':url} aria-current={path===url?'page':undefined} onClick={()=>setOpen(false)}>{t(label)}</Link>)}<LanguageToggle/><Link className="mobile-menu-cta" href={estimate} onClick={()=>setOpen(false)}>{t("Get a Free Estimate")} <ArrowUpRight size={17} aria-hidden="true"/></Link></nav>}</header>{path!=='/contact'&&<a className="mobile-call" href="/contact#phone-options"><Phone size={17} aria-hidden="true"/> {t("Call for Free Estimate")}</a>}</>}
