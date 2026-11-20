"use client";
import { useState } from "react";
import { Mail, Phone, Linkedin, Github } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
type F={name:string;email:string;subject:string;message:string};
export default function Contact(){
  const [f,setF]=useState<F>({name:"",email:"",subject:"",message:""});const [err,setErr]=useState<Partial<F>>({});const [note,setNote]=useState("");
  const validate=()=>{const x:Partial<F>={};
    if(f.name.trim().length<2)x.name="Enter your name.";if(!/^\S+@\S+\.\S+$/.test(f.email))x.email="Enter a valid email address.";
    if(f.subject.trim().length<3)x.subject="Enter a subject.";if(f.message.trim().length<10)x.message="Message must be at least 10 characters.";
    setErr(x);return Object.keys(x).length===0;};
  const whatsapp=()=>{if(!validate())return;
    const text=`New portfolio enquiry\nName: ${f.name}\nEmail: ${f.email}\nSubject: ${f.subject}\n\n${f.message}`;
    window.open(`https://wa.me/916378635478?text=${encodeURIComponent(text)}`,"_blank","noopener,noreferrer");
    setNote("WhatsApp is opening with your message prefilled. Press send in WhatsApp to deliver it.");};
  const [sending,setSending]=useState(false);const [hp,setHp]=useState("");
  const submit=async(e:React.FormEvent)=>{e.preventDefault();if(!validate()||sending)return;setSending(true);setNote("");
    try{const r=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...f,website:hp})});
      const d=await r.json().catch(()=>({}));
      if(r.ok){setNote("Message sent. I’ll reply to the email address you provided.");setF({name:"",email:"",subject:"",message:""});}
      else setNote(d.error||"Could not send the message. Please use WhatsApp or email directly.");
    }catch{setNote("Network error. Please check your connection and try again.");}
    setSending(false);};
  const inp="w-full rounded-lg bg-white/60 dark:bg-white/5 border-cu focus:border-copper outline-none transition px-4 py-3 text-ink placeholder:text-muted/60";
  const fld=(k:keyof F,l:string,area=false)=><div><label htmlFor={k} className="text-sm text-muted">{l}</label>{area?<textarea id={k} rows={5} className={inp} value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})} aria-invalid={!!err[k]}/>:<input id={k} type={k==="email"?"email":"text"} className={inp} value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})} aria-invalid={!!err[k]}/>}{err[k]&&<p role="alert" className="text-sm text-red-500 mt-1">{err[k]}</p>}</div>;
  return(<section id="contact" className="px-6 py-24"><div className="mx-auto max-w-6xl"><SectionHeading eyebrow="Contact">Have an Idea? Let’s Build It.</SectionHeading>
  <div className="grid lg:grid-cols-2 gap-12"><div><p className="text-muted max-w-md leading-relaxed">I’m always interested in discussing exciting projects, software engineering opportunities, and ideas that solve real-world problems. Let’s connect and create something meaningful.</p>
   <ul className="mt-8 space-y-4"><li><a className="flex gap-3 hover:text-copper hover:translate-x-1 transition" href="mailto:rajulal0747@gmail.com"><Mail className="text-copper"/>rajulal0747@gmail.com</a></li><li><a className="flex gap-3 hover:text-copper hover:translate-x-1 transition" href="tel:+916378635478"><Phone className="text-copper"/>+91 6378635478</a></li><li><a className="flex gap-3 hover:text-copper hover:translate-x-1 transition" href="https://linkedin.com/in/rajulal-a3812018b" target="_blank" rel="noreferrer"><Linkedin className="text-copper"/>LinkedIn</a></li><li><a className="flex gap-3 hover:text-copper hover:translate-x-1 transition" href="https://github.com/Rajulal-195" target="_blank" rel="noreferrer"><Github className="text-copper"/>GitHub</a></li></ul><p className="text-muted mt-6">Jaipur, Rajasthan, India</p></div>
  <form onSubmit={submit} noValidate className="glass rounded-3xl p-6 grid gap-4"><input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={hp} onChange={e=>setHp(e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0"/>{fld("name","Name")}{fld("email","Email")}{fld("subject","Subject")}{fld("message","Message",true)}<div className="flex flex-col sm:flex-row gap-3"><Button type="button" onClick={whatsapp}>Send on WhatsApp</Button></div>{note&&<p role="status" className="text-sm text-copper">{note}</p>}</form></div></div></section>);}
