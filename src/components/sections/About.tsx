"use client";
import Image from "next/image";
import { Briefcase,MapPin,Mail,Github,Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import Counter from "../ui/Counter";
import Tilt from "../ui/Tilt";
import { profile,techIcons } from "@/data/profile";
import { projects } from "@/data/projects";
const info=[[MapPin,profile.location,"#about"],[Mail,profile.email,`mailto:${profile.email}`],[Github,profile.github.replace("https://",""),profile.github],[Linkedin,profile.linkedin.replace("https://",""),profile.linkedin]] as const;
const stats=[[2,"+","Years Experience"],[projects.length,"","Featured Projects"],[20,"+","Technologies"]] as const;
export default function About(){return(<section id="about" className="px-6 py-24"><div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,420px)_1fr]">
 <Reveal x={-40} y={0}><Tilt max={6}><div className="relative mx-auto max-w-sm">
  <div className="absolute -inset-4 rounded-[2.2rem] border-2 border-dashed border-copper/30" style={{animation:"spin 40s linear infinite"}}/>
  <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-200 to-blue-500 p-2 shadow-2xl shadow-blue-500/30"><Image src="/raju.jpg" alt="Raju Lal, Full-Stack Developer" width={869} height={854} priority className="aspect-[4/4.4] w-full rounded-[1.6rem] object-cover object-top"/></div>
  <div className="glass float absolute -bottom-5 -right-3 flex items-center gap-3 rounded-2xl px-4 py-3"><Briefcase className="text-copper"/><p className="text-sm font-semibold leading-tight">2+ Years<br/><span className="font-normal text-muted">Experience</span></p></div></div></Tilt></Reveal>
 <div><SectionHeading eyebrow="About Me">Let’s Build Something Amazing Together.</SectionHeading>
  <Reveal delay={.1}><div className="max-w-2xl space-y-4 leading-relaxed text-muted"><p className="text-ink">I’m a Full-Stack Developer with 2+ years of experience building production-ready web applications, SaaS platforms, dashboards and location-driven products using MERN and PERN technologies.</p>
   <p>I work across the full lifecycle: frontend, backend architecture, REST APIs, database design, authentication, testing, deployment and monitoring. I love solving problems, writing clean code and creating user-friendly digital products.</p></div></Reveal>
  <div className="mt-8 grid max-w-2xl grid-cols-3 gap-4">{stats.map(([n,s,l],i)=><Reveal key={l} delay={.15+i*.1}><div className="glass rounded-2xl p-4 text-center"><p className="font-display text-3xl font-semibold text-copper"><Counter to={n} suffix={s}/></p><p className="text-xs text-muted">{l}</p></div></Reveal>)}</div>
  <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">{info.map(([I,t,h],i)=><Reveal key={t} delay={.2+i*.07}><a href={h} target={h.startsWith("http")?"_blank":undefined} rel="noreferrer" className="glass group flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition hover:-translate-y-1 hover:border-copper"><I size={18} className="shrink-0 text-copper transition group-hover:scale-125"/><span className="truncate">{t}</span></a></Reveal>)}</div>
  <div className="mt-6 flex flex-wrap gap-2">{techIcons.slice(0,6).map(([n,s,inv],i)=><motion.span key={n} initial={{opacity:0,scale:.7}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:.3+i*.06}} className="chip"><img src={`https://cdn.simpleicons.org/${s}`} alt="" width={16} height={16} className={inv?"dark:invert":""}/>{n}</motion.span>)}</div></div></div></section>);}
