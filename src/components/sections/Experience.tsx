"use client";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { experience } from "@/data/experience";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
export default function Experience(){return(<section id="experience" className="px-6 py-24"><div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_280px]"><div><SectionHeading eyebrow="My Experience">Where I’ve Built My Experience</SectionHeading>
<ol className="relative ml-3">{<motion.span initial={{scaleY:0}} whileInView={{scaleY:1}} viewport={{once:true}} transition={{duration:1.4}} style={{originY:0}} className="absolute left-0 top-2 h-[calc(100%-1rem)] w-0.5 bg-gradient-to-b from-blue-600 to-blue-200"/>}
 {experience.map((e,n)=><li key={e.company} className="relative pb-10 pl-9"><span className="absolute -left-[7px] top-2 flex h-4 w-4"><span className="absolute h-full w-full animate-ping rounded-full bg-copper/60"/><span className="h-4 w-4 rounded-full bg-copper"/></span>
  <Reveal delay={n*.1} x={30} y={0}><div className="glass rounded-2xl p-6 transition hover:-translate-y-1"><p className="text-sm text-copper">{e.period} · {e.location}</p><h3 className="mt-1 font-display text-2xl font-semibold">{e.role}</h3><p className="mb-4 text-muted">{e.company}</p>
  <ul className="list-disc space-y-2 pl-5 text-sm text-muted marker:text-copper">{e.points.map(p=><li key={p}>{p}</li>)}</ul></div></Reveal></li>)}</ol></div>
 <Reveal delay={.2} className="self-center"><div className="glass float rounded-3xl p-6 text-center"><Rocket className="mx-auto mb-3 text-copper" size={32}/><p className="font-display text-xl font-semibold">Always open to new opportunities!</p><p className="mb-5 mt-2 text-sm text-muted">Let’s build something great together.</p><Button href="#contact">Contact Me</Button></div></Reveal></div></section>);}
