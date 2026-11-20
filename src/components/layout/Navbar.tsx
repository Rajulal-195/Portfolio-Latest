"use client";
import { useEffect,useState } from "react";
import { motion,useScroll,useSpring } from "framer-motion";
import { Menu,X,Moon,Sun,Send } from "lucide-react";
const links=["Home","About","Skills","Projects","Live Sites","Experience","Contact"],id=(l:string)=>l==="Live Sites"?"live":l.toLowerCase();
export default function Navbar(){
  const [scrolled,setScrolled]=useState(false),[open,setOpen]=useState(false),[active,setActive]=useState("home"),[dark,setDark]=useState(false);
  const {scrollYProgress}=useScroll(),w=useSpring(scrollYProgress,{stiffness:120,damping:25});
  useEffect(()=>{setDark(document.documentElement.classList.contains("dark"));const f=()=>setScrolled(scrollY>30);f();addEventListener("scroll",f,{passive:true});
    const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&setActive(e.target.id)),{rootMargin:"-45% 0px -50% 0px"});
    links.forEach(l=>{const el=document.getElementById(id(l));el&&io.observe(el)});return()=>{removeEventListener("scroll",f);io.disconnect()}},[]);
  const toggle=()=>{const d=!dark;setDark(d);document.documentElement.classList.toggle("dark",d);try{localStorage.setItem("theme",d?"dark":"light")}catch{}};
  return(<header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled||open?"glass !rounded-none !border-x-0 !border-t-0":""}`}>
    <motion.div className="absolute left-0 top-0 h-0.5 w-full origin-left bg-gradient-to-r from-blue-600 to-sky-400" style={{scaleX:w}}/>
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4" aria-label="Primary">
      <a href="#home" className="flex items-center gap-2 font-display text-xl font-semibold"><span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blue-700 to-blue-400 text-sm text-white shadow-lg shadow-blue-500/40">R</span>Raju Lal</a>
      <ul className="hidden items-center gap-8 text-sm font-medium lg:flex">{links.map(l=><li key={l} className="relative"><a href={`#${id(l)}`} aria-current={active===id(l)?"true":undefined} className={`transition ${active===id(l)?"text-copper":"text-muted hover:text-ink"}`}>{l}</a>
        {active===id(l)&&<motion.span layoutId="nav-ul" className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded bg-copper"/>}</li>)}</ul>
      <div className="flex items-center gap-3"><a href="#contact" className="btn btn-solid hidden !px-4 !py-2 sm:inline-flex">Hire Me <Send size={14}/></a>
        <button onClick={toggle} aria-label="Toggle theme" className="glass grid h-10 w-10 place-items-center rounded-full transition hover:rotate-12">{dark?<Sun size={18}/>:<Moon size={18}/>}</button>
        <button className="lg:hidden" onClick={()=>setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open?<X/>:<Menu/>}</button></div></nav>
    {open&&<ul className="grid gap-4 px-6 pb-6 lg:hidden">{links.map(l=><li key={l}><a onClick={()=>setOpen(false)} href={`#${id(l)}`} className="text-lg">{l}</a></li>)}</ul>}</header>);}
