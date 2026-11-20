"use client";
import { useEffect,useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight,Download,MapPin,Briefcase } from "lucide-react";
import Button from "../ui/Button";
import { profile } from "@/data/profile";
const words="Building Digital Experiences That Grow Into Something".split(" "),roles=["Full-Stack Developer","MERN & PERN Engineer","AI-Assisted Builder"];
function Typed(){const [i,setI]=useState(0),[t,setT]=useState(""),[del,setDel]=useState(false);
  useEffect(()=>{const r=roles[i];const id=setTimeout(()=>{if(!del){setT(r.slice(0,t.length+1));if(t.length+1===r.length)setTimeout(()=>setDel(true),1400)}else{setT(r.slice(0,t.length-1));if(t.length<=1){setDel(false);setI((i+1)%roles.length)}}},del?35:75);return()=>clearTimeout(id)},[t,del,i]);
  return <span className="text-copper2">{t}<span className="ml-0.5 inline-block w-0.5 bg-copper" style={{animation:"blink 1s step-end infinite"}}>&nbsp;</span></span>;}
function Art(){return(<div className="relative mx-auto aspect-square w-full max-w-[520px]" style={{perspective:900}} aria-hidden>
  <div className="absolute inset-[6%] rounded-full" style={{border:"16px solid rgb(var(--brand)/.28)",boxShadow:"inset 0 0 40px rgba(96,165,250,.5),0 0 50px rgba(59,130,246,.35)",animation:"r1 14s linear infinite"}}/>
  <div className="absolute inset-[14%] rounded-full" style={{border:"12px solid rgb(var(--brand)/.35)",boxShadow:"inset 0 0 30px rgba(147,197,253,.6),0 0 40px rgba(59,130,246,.3)",animation:"r2 18s linear infinite"}}/>
  <div className="absolute inset-[3%] rounded-full" style={{border:"3px solid rgb(var(--brand)/.2)",animation:"r1 26s linear infinite reverse"}}/>
  <div className="float absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{background:"radial-gradient(circle at 30% 28%,#fff,#bfdbfe 35%,#3b82f6 85%)",boxShadow:"inset -12px -16px 30px rgba(30,64,175,.45),0 30px 60px -10px rgba(37,99,235,.55)"}}/>
  {[["8%","12%",36,"float"],["84%","30%",50,"float2"],["70%","78%",30,"float"],["12%","68%",22,"float2"]].map(([l,t,s,c],i)=><span key={i} className={`${c} absolute rounded-full`} style={{left:l,top:t,width:s as number,height:s as number,background:"radial-gradient(circle at 30% 28%,#fff,#93c5fd 45%,#2563eb)",boxShadow:"0 10px 24px -4px rgba(37,99,235,.55)"}}/>)}</div>);}
export default function Hero(){return(
<section id="home" className="relative min-h-screen px-6 pb-16 pt-28"><div className="mx-auto grid min-h-[80vh] max-w-7xl items-center gap-8 lg:grid-cols-2">
 <div><motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="chip mb-5 text-copper2"><span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-copper opacity-60"/><span className="h-2 w-2 rounded-full bg-copper"/></span><Typed/></motion.p>
  <h1 className="font-display text-4xl font-semibold leading-[1.08] sm:text-5xl xl:text-6xl">{words.map((w,i)=><motion.span key={i} className="mr-[.25em] inline-block" initial={{opacity:0,y:30,rotateX:-60}} animate={{opacity:1,y:0,rotateX:0}} transition={{delay:.15+i*.08,duration:.7,ease:[.22,1,.36,1]}}>{w}</motion.span>)}
   <motion.span className="grad-text inline-block" initial={{opacity:0,scale:.6}} animate={{opacity:1,scale:1}} transition={{delay:.9,type:"spring",stiffness:160}}>Bigger.</motion.span></h1>
  <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.1}} className="mt-5 max-w-xl text-lg leading-relaxed text-muted">A Full-Stack Developer crafting fast, modern and scalable web applications with the MERN &amp; PERN stack.</motion.p>
  <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:1.3}} className="mt-8 flex flex-col gap-3 sm:flex-row"><Button href="#projects">View My Work <ArrowRight size={16}/></Button><Button href={profile.resume} download="Raju-Lal-Resume.pdf" variant="ghost"><Download size={16}/>Download Resume</Button></motion.div>
  <motion.ul initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:1.5}} className="mt-8 flex flex-wrap gap-3 text-sm">
   <li className="chip !px-4 !py-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-copper/10 text-copper"><MapPin size={14}/></span>{profile.location}</li>
   <li className="chip !px-4 !py-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-copper/10 text-copper"><Briefcase size={14}/></span>2+ Years Experience</li>
   <li className="chip !px-4 !py-2 text-copper2"><span className="relative flex h-2.5 w-2.5"><span className="absolute h-full w-full animate-ping rounded-full bg-emerald-500/70"/><span className="h-2.5 w-2.5 rounded-full bg-emerald-500"/></span>Available for opportunities</li></motion.ul></div>
 <motion.div initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}} transition={{duration:1,delay:.3}}><Art/></motion.div></div></section>);}
