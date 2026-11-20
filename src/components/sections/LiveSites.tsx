"use client";
import { useEffect,useState } from "react";
import { AnimatePresence,motion } from "framer-motion";
import { ExternalLink,Globe,X,CheckCircle2,Info } from "lucide-react";
import { liveSites } from "@/data/live";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
const Live=()=><span className="chip text-xs text-emerald-600 dark:text-emerald-400"><span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-emerald-500/70"/><span className="h-2 w-2 rounded-full bg-emerald-500"/></span>Live</span>;
const Icon=()=><span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-700 to-sky-400 text-white shadow-lg shadow-blue-500/40"><Globe size={26}/></span>;
const Visit=({url,name}:{url:string;name:string})=><a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${name} live site`} onClick={e=>e.stopPropagation()} className="btn btn-solid !px-5 !py-2.5 shrink-0">Visit Live Site <ExternalLink size={14}/></a>;
const list={show:{transition:{staggerChildren:.07,delayChildren:.25}}},item={hidden:{opacity:0,x:-16},show:{opacity:1,x:0}};
export default function LiveSites(){
  const [sel,setSel]=useState<number|null>(null),s=sel!==null?liveSites[sel]:null;
  useEffect(()=>{const k=(e:KeyboardEvent)=>e.key==="Escape"&&setSel(null);addEventListener("keydown",k);return()=>removeEventListener("keydown",k)},[]);
  return(<section id="live" className="px-6 py-24"><div className="mx-auto max-w-6xl"><SectionHeading eyebrow="Live Websites">See My Work Running Live</SectionHeading>
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{liveSites.map((x,i)=><Reveal key={x.url} delay={i*.12}>
   <motion.div layoutId={`card-${i}`} whileHover={{y:-8,scale:1.015}} whileTap={{scale:.98}} role="button" tabIndex={0} aria-label={`View details of ${x.name}`} onClick={()=>setSel(i)} onKeyDown={e=>e.key==="Enter"&&setSel(i)} className="group relative cursor-pointer overflow-hidden rounded-3xl p-[2px] shadow-xl shadow-blue-500/10" style={{borderRadius:24}}>
    <span aria-hidden className="absolute -inset-[100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{background:"conic-gradient(from 0deg,transparent 0 60%,#60a5fa,#2563eb,transparent)",animation:"spin 3.5s linear infinite"}}/>
    <div className="glass relative h-full overflow-hidden !bg-card/90 p-7" style={{borderRadius:22}}>
     <span aria-hidden className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-copper/20 blur-2xl transition-transform duration-700 group-hover:scale-150"/>
     <div className="relative flex items-start justify-between"><motion.span className="float" whileHover={{rotate:360}} transition={{duration:.8}}><Icon/></motion.span><Live/></div>
     <h3 className="relative mt-5 font-display text-2xl font-semibold">{x.name}</h3><p className="relative text-sm text-copper">{x.tag}</p>
     <p className="relative mt-3 text-sm leading-relaxed text-muted">{x.desc}</p>
     <ul className="relative mt-4 flex flex-wrap gap-2">{x.tech.map(t=><li key={t} className="rounded-full bg-copper/10 px-3 py-1 text-xs text-copper2 transition group-hover:bg-copper/20">{t}</li>)}</ul>
     <div className="relative mt-6 flex flex-wrap items-center gap-3 border-t border-copper/15 pt-4"><button onClick={e=>{e.stopPropagation();setSel(i)}} className="btn btn-ghost !px-4 !py-2.5">View Details</button><Visit url={x.url} name={x.name}/></div></div></motion.div></Reveal>)}</div>
  <AnimatePresence>{s&&sel!==null&&<motion.div key="bd" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[60] grid place-items-center bg-slate-900/60 p-4 backdrop-blur-sm" onClick={()=>setSel(null)}>
   <motion.div layoutId={`card-${sel}`} role="dialog" aria-modal="true" aria-label={s.name} onClick={e=>e.stopPropagation()} className="relative max-h-[90vh] w-full max-w-3xl overflow-auto bg-card p-8 shadow-2xl" style={{borderRadius:28}}>
    <button onClick={()=>setSel(null)} aria-label="Close" className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-copper/10 text-copper transition hover:rotate-90 hover:bg-copper hover:text-white"><X size={18}/></button>
    <motion.div variants={list} initial="hidden" animate="show">
     <motion.div variants={item} className="flex items-center gap-4"><Icon/><div><h3 className="font-display text-3xl font-semibold copper-text">{s.name}</h3><p className="text-sm text-copper">{s.tag}</p></div></motion.div>
     <motion.p variants={item} className="mt-5 leading-relaxed text-muted">{s.overview}</motion.p>
     {s.sections.map(sec=><div key={sec.title}><motion.h4 variants={item} className="mt-6 font-semibold text-copper">{sec.title}</motion.h4><ul className="mt-3 space-y-2">{sec.items.map(f=><motion.li variants={item} key={f} className="flex items-start gap-2 text-sm text-muted"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-copper"/>{f}</motion.li>)}</ul></div>)}
     <motion.h4 variants={item} className="mt-6 font-semibold text-copper">Tech stack</motion.h4><motion.ul variants={item} className="mt-3 flex flex-wrap gap-2">{s.tech.map(t=><li key={t} className="rounded-full bg-copper/10 px-3 py-1 text-xs text-copper2">{t}</li>)}</motion.ul>
     {s.note&&<motion.p variants={item} className="mt-4 flex items-center gap-2 text-xs text-muted"><Info size={14} className="shrink-0 text-copper"/>{s.note}</motion.p>}
     <motion.div variants={item} className="mt-8 flex flex-wrap gap-3"><Visit url={s.url} name={s.name}/><button onClick={()=>setSel(null)} className="btn btn-ghost !py-2.5">Close</button></motion.div></motion.div></motion.div></motion.div>}</AnimatePresence></div></section>);}
