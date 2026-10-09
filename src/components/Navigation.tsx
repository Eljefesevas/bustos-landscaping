"use client";
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import Image from 'next/image';
import {Menu,X,ArrowUpRight,Phone} from 'lucide-react';
export const links=[['Services','/services'],['Work','/our-work'],['Our Story','/about'],['Contact','/contact']];
const estimate='/contact#phone-options';
export default function Navigation(){
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
  return <><header ref={header} className={`nav ${scrolled?'compact':''}`}><Link href="/" className="nav-brand" aria-label="Bustos Landscaping home"><span className="nav-mark"><Image src="/assets/brand/bustos-monogram.png" alt="" width={580} height={449} priority sizes="56px"/></span><span className="nav-name">Bustos Landscaping</span></Link><nav aria-label="Main navigation" className="desktop-links">{links.map(([label,url])=><Link key={url} href={url} aria-current={path===url?'page':undefined}>{label}</Link>)}</nav><Link className="nav-estimate" href={estimate}>Request an Estimate <ArrowUpRight size={17} aria-hidden="true"/></Link><button ref={toggle} type="button" className="menu-toggle" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(!open)}>{open?<X aria-hidden="true"/>:<Menu aria-hidden="true"/>}</button>{open&&<nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">{[['Home','/'],...links].map(([label,url])=><Link key={url} href={url} aria-current={path===url?'page':undefined} onClick={()=>setOpen(false)}>{label}</Link>)}<Link className="mobile-menu-cta" href={estimate} onClick={()=>setOpen(false)}>Request an Estimate</Link></nav>}</header>{path!=='/contact'&&<a className="mobile-call" href="/contact#phone-options"><Phone size={17} aria-hidden="true"/> Call for Free Estimate</a>}</>}
