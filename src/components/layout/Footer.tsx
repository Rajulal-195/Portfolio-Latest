import { Github,Linkedin,Mail } from "lucide-react";
import { profile } from "@/data/profile";
export default function Footer(){return(<footer className="glass !rounded-none !border-x-0 !border-b-0 px-6 py-8"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
  <a href="#home" className="flex items-center gap-2 font-display text-lg font-semibold"><span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-blue-700 to-blue-400 text-xs text-white">R</span>Raju Lal</a>
  <div className="flex gap-4 text-copper">{[[Github,profile.github,"GitHub"],[Linkedin,profile.linkedin,"LinkedIn"],[Mail,`mailto:${profile.email}`,"Email"]].map(([I,h,l]:any)=><a key={l} href={h} aria-label={l} target="_blank" rel="noreferrer" className="transition hover:-translate-y-1"><I size={20}/></a>)}</div>
  <ul className="flex flex-wrap justify-center gap-5 text-sm text-muted">{["Home","About","Skills","Projects","Contact"].map(l=><li key={l}><a className="hover:text-copper" href={`#${l.toLowerCase()}`}>{l}</a></li>)}</ul>
  <p className="text-xs text-muted">© 2026 Raju Lal. All rights reserved.</p></div></footer>);}
