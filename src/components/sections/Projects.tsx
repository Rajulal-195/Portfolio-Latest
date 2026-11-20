"use client";
import { useEffect,useState } from "react";
import { AnimatePresence,motion } from "framer-motion";
import { X } from "lucide-react";
import { projects } from "@/data/projects";
import VideoPlayer from "../ui/VideoPlayer";
import ProjectCard from "../ui/ProjectCard";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
export default function Projects(){
  const [i,setI]=useState<number|null>(null),p=i!==null?projects[i]:null;
  useEffect(()=>{const k=(e:KeyboardEvent)=>e.key==="Escape"&&setI(null);addEventListener("keydown",k);return()=>removeEventListener("keydown",k)},[]);
  return(<section id="projects" className="px-6 py-24"><div className="mx-auto max-w-6xl"><SectionHeading eyebrow="My Projects">Featured Projects</SectionHeading>
  <div className="grid gap-8 md:grid-cols-2">{projects.map((x,n)=><Reveal key={x.name} delay={(n%2)*.12}><ProjectCard p={x} n={n} onOpen={()=>setI(n)}/></Reveal>)}</div>
  <AnimatePresence>{p&&<motion.div key="m" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} role="dialog" aria-modal="true" aria-label={p.name} className="fixed inset-0 z-[60] grid place-items-center bg-slate-900/60 p-4 backdrop-blur-sm" onClick={()=>setI(null)}>
   <motion.div initial={{opacity:0,y:40,scale:.94}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:.96}} transition={{type:"spring",stiffness:220,damping:24}} className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl bg-card p-8 shadow-2xl" onClick={e=>e.stopPropagation()}>
    <button className="absolute right-4 top-4 transition hover:rotate-90" onClick={()=>setI(null)} aria-label="Close"><X/></button>
    {p.video&&<VideoPlayer key={p.name} src={p.video} title={p.name}/>}
    <h3 className="font-display pr-8 text-3xl font-semibold copper-text">{p.name}</h3><p className="mt-3 text-muted">{p.short}</p>
    <h4 className="mt-6 font-semibold text-copper">Key features</h4><ul className="mt-2 list-disc space-y-1 pl-5 text-muted marker:text-copper">{p.features.map(f=><li key={f}>{f}</li>)}</ul>
    {p.impact&&<><h4 className="mt-6 font-semibold text-copper">Impact</h4><p className="mt-2 text-muted">{p.impact}</p></>}
    <ul className="mt-6 flex flex-wrap gap-2">{p.tech.map(t=><li key={t} className="rounded-full bg-copper/10 px-3 py-1 text-xs text-copper2">{t}</li>)}</ul>
    <div className="mt-6 flex gap-3"><button disabled={i===0} onClick={()=>setI(i!-1)} className="btn btn-ghost !py-2 disabled:opacity-30">Previous</button><button disabled={i===projects.length-1} onClick={()=>setI(i!+1)} className="btn btn-solid !py-2 disabled:opacity-30">Next</button></div>
   </motion.div></motion.div>}</AnimatePresence></div></section>);}
