"use client";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";
import Tilt from "./Tilt";
const hues=[["#1d4ed8","#60a5fa"],["#0ea5e9","#6366f1"],["#4f46e5","#22d3ee"],["#2563eb","#a78bfa"]];
export default function ProjectCard({p,n,onOpen}:{p:Project;n:number;onOpen:()=>void}){
  const [a,b]=hues[n%4],[title,sub]=p.name.split(" – ");
  return(<Tilt><button onClick={onOpen} aria-label={`Open details for ${p.name}`} className="group glass w-full overflow-hidden rounded-3xl p-3 text-left transition-shadow hover:shadow-2xl">
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl" style={{background:`linear-gradient(135deg,${a},${b})`}} aria-hidden>
      <div className="absolute inset-3 rounded-xl bg-white/15 p-3 backdrop-blur-sm transition-transform duration-700 group-hover:scale-105">
        <div className="mb-2 flex gap-1.5">{[0,1,2].map(i=><i key={i} className="h-2 w-2 rounded-full bg-white/70"/>)}</div>
        <div className="grid grid-cols-3 gap-2">{Array.from({length:6}).map((_,i)=><div key={i} className="float h-10 rounded-md bg-white/25" style={{animationDelay:`${i*.4}s`}}/>)}</div></div>
      <span className="absolute bottom-3 right-4 font-display text-6xl font-semibold text-white/30">{title[0]}</span></div>
    <div className="p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="font-display text-xl font-semibold">{title}</h3><p className="text-sm text-muted">{sub??p.tech.slice(0,3).join(" · ")}</p></div>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-copper/10 text-copper transition group-hover:rotate-45 group-hover:bg-copper group-hover:text-white"><ArrowUpRight size={18}/></span></div>
      <p className="mt-3 line-clamp-2 text-sm text-muted">{p.short}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">{p.tech.slice(0,4).map(t=><li key={t} className="rounded-full bg-copper/10 px-2.5 py-1 text-xs text-copper2">{t}</li>)}</ul></div></button></Tilt>);}
