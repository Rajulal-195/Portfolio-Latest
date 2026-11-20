// import { Layers,Server,LayoutDashboard,Sparkles } from "lucide-react";
// import SectionHeading from "../ui/SectionHeading";
// import Reveal from "../ui/Reveal";
// import Tilt from "../ui/Tilt";
// const s=[[Layers,"Full-Stack Web Development","Complete web applications using React, Next.js, Node.js, Express.js, MongoDB and PostgreSQL."],[Server,"Backend & API Development","Secure REST APIs, authentication, authorization, database architecture and integrations."],[LayoutDashboard,"SaaS & Dashboard Development","Scalable SaaS products, admin panels, management dashboards and business workflows."],[Sparkles,"AI-Assisted Development","AI-assisted coding, prompt engineering, debugging, refactoring and documentation."]] as const;
// export default function Services(){return(<section id="services" className="px-6 py-24"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Services">What I Can Build</SectionHeading>
// <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{s.map(([I,t,d],i)=><Reveal key={t} delay={i*.08}><Tilt className="glass group h-full rounded-2xl p-6"><span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-copper/10 text-copper transition group-hover:scale-110 group-hover:bg-copper group-hover:text-white"><I/></span><h3 className="mb-2 font-display text-xl font-semibold">{t}</h3><p className="text-sm leading-relaxed text-muted">{d}</p></Tilt></Reveal>)}</div></div></section>);}



"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Layers, LayoutDashboard, Lock, Server, Sparkles } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

const DURATION = 6; // seconds each card stays open while auto-playing (desktop)

/* ───────────── helpers ───────────── */
function useIsLg() {
  const [v, setV] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width:1024px)");
    const f = () => setV(m.matches);
    f();
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  return v;
}

// mounts children only once they scroll into view, so entrance animations are actually seen
function Lazy({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-60px" });
  return <div ref={ref}>{seen && children}</div>;
}

/* ───────────── animated visuals ───────────── */

// 01 — Full-stack: UI / API / Data layers drop in and float, data flows through
function StackVisual() {
  const layers = [
    { label: "UI", sub: "React · Next.js", cy: 48 },
    { label: "API", sub: "Node · Express", cy: 102 },
    { label: "Data", sub: "MongoDB · PostgreSQL", cy: 156 },
  ];
  const W = 150, H = 64, CX = 110;
  return (
    <svg viewBox="0 0 400 210" className="mx-auto h-[210px] w-full" role="img" aria-label="Full-stack layers: UI, API and data">
      <defs>
        <linearGradient id="svcFace" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#60a5fa" stopOpacity=".35" /><stop offset="100%" stopColor="#2563eb" stopOpacity=".15" /></linearGradient>
      </defs>
      {[...layers].reverse().map((l, k) => {
        const i = layers.length - 1 - k; // draw bottom first
        const { cy } = l;
        return (
          <motion.g key={l.label} initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: k * 0.35, type: "spring", stiffness: 140, damping: 14 }}>
            <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.2 + i * 0.35 }}>
              <path d={`M${CX - W / 2} ${cy} L${CX} ${cy + H / 2} L${CX + W / 2} ${cy} L${CX + W / 2} ${cy + 9} L${CX} ${cy + H / 2 + 9} L${CX - W / 2} ${cy + 9} Z`} className="fill-copper/30" />
              <path d={`M${CX} ${cy - H / 2} L${CX + W / 2} ${cy} L${CX} ${cy + H / 2} L${CX - W / 2} ${cy} Z`} fill="url(#svcFace)" className="stroke-copper" strokeWidth={1.5} strokeLinejoin="round" />
            </motion.g>
            <motion.g initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + k * 0.35 }}>
              <line x1={CX + W / 2 + 6} x2={CX + W / 2 + 38} y1={cy + 4} y2={cy + 4} className="stroke-copper/40" strokeDasharray="3 3" />
              <text x={CX + W / 2 + 46} y={cy} className="fill-ink" fontSize="15" fontWeight={700}>{l.label}</text>
              <text x={CX + W / 2 + 46} y={cy + 17} className="fill-muted" fontSize="11">{l.sub}</text>
            </motion.g>
          </motion.g>
        );
      })}
      <line x1={CX} x2={CX} y1={50} y2={160} className="stroke-copper/50" strokeDasharray="3 5" />
      <circle r="4.5" className="fill-copper2">
        <animateMotion dur="2s" begin="1.4s" repeatCount="indefinite" path={`M${CX} 48 V158`} />
      </circle>
      <circle r="4.5" className="fill-sky-400">
        <animateMotion dur="2s" begin="2.4s" repeatCount="indefinite" path={`M${CX} 158 V48`} />
      </circle>
    </svg>
  );
}

// 02 — Backend: requests hit the API, auth & role checks respond
function ApiVisual() {
  const rows: [string, string, string, string, boolean][] = [
    ["POST", "/auth/login", "200", "JWT issued", true],
    ["GET", "/admin/users", "403", "role: user", false],
    ["GET", "/admin/users", "200", "role: admin", true],
    ["POST", "/orders", "201", "validated", true],
  ];
  return (
    <div className="rounded-xl bg-bg/60 p-4 font-mono text-[11.5px] sm:text-xs">
      <div className="mb-3 flex items-center justify-between font-sans text-[11px] font-semibold text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-emerald-500/60" /><span className="relative h-2 w-2 rounded-full bg-emerald-500" /></span>
          auth middleware active
        </span>
        <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-copper"><Lock size={14} /></motion.span>
      </div>
      <div className="space-y-2">
        {rows.map(([m, path, code, note, ok], i) => (
          <motion.div key={i} className="flex items-center gap-2 rounded-lg bg-copper/5 px-2.5 py-2" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.65, duration: 0.4 }}>
            <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${m === "POST" ? "bg-copper/15 text-copper2 dark:text-copper" : "bg-sky-500/15 text-sky-600 dark:text-sky-400"}`}>{m}</span>
            <span className="flex-1 truncate text-ink">{path}</span>
            <span className="hidden text-muted sm:inline">{note}</span>
            <motion.span className={`rounded-full px-2 py-0.5 font-bold ${ok ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-red-500/15 text-red-500"}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 + i * 0.65, type: "spring", stiffness: 400, damping: 12 }}>{code}</motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 03 — SaaS: mini admin dashboard with sparklines, bars and a workflow
function DashboardVisual() {
  const bars = [40, 62, 50, 78, 58, 88, 68, 96, 80, 92];
  const spark = ["M0 20 C10 18 14 8 24 12 S40 4 60 6", "M0 14 C12 22 20 10 30 14 S46 18 60 8", "M0 22 C14 16 22 18 32 10 S48 12 60 3"];
  const flow = ["New", "Review", "Approved"];
  return (
    <div className="flex gap-3 rounded-xl bg-bg/60 p-3">
      <div className="flex w-8 flex-col gap-2 pt-1">
        {[0, 1, 2, 3].map((i) => <motion.span key={i} className={`h-6 w-6 rounded-lg ${i === 0 ? "bg-copper" : "bg-copper/15"}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} />)}
      </div>
      <div className="min-w-0 flex-1 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {["Users", "Orders", "Revenue"].map((l, i) => (
            <div key={l} className="rounded-lg bg-copper/5 p-2">
              <p className="text-[10px] font-semibold text-muted">{l}</p>
              <svg viewBox="0 0 60 26" className="mt-1 h-6 w-full overflow-visible">
                <motion.path d={spark[i]} className="fill-none stroke-copper" strokeWidth={2} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 + i * 0.2, duration: 1.2 }} />
              </svg>
            </div>
          ))}
        </div>
        <div className="flex h-20 items-end gap-1.5 rounded-lg bg-copper/5 px-2 pt-2">
          {bars.map((b, i) => (
            <motion.div key={i} className="flex h-full flex-1 origin-bottom items-end" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.5 + i * 0.07, type: "spring", stiffness: 120, damping: 14 }}>
              <motion.div className="w-full origin-bottom rounded-t bg-gradient-to-t from-copper2 to-sky-400" style={{ height: `${b}%` }} animate={{ scaleY: [1, 0.78, 1] }} transition={{ duration: 3.2, repeat: Infinity, delay: 1.5 + i * 0.12, ease: "easeInOut" }} />
            </motion.div>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          {flow.map((f, i) => (
            <div key={f} className="flex flex-1 items-center gap-1.5">
              <span className="relative flex-1 overflow-hidden rounded-full bg-copper/10 py-1 text-center text-[10px] font-bold text-muted">
                <motion.span className="absolute inset-0 bg-copper" animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 3, times: [0, 0.1, 0.33, 0.43], repeat: Infinity, delay: 1 + i }} />
                <motion.span className="relative" animate={{ color: ["#64748b", "#ffffff", "#ffffff", "#64748b"] }} transition={{ duration: 3, times: [0, 0.1, 0.33, 0.43], repeat: Infinity, delay: 1 + i }}>{f}</motion.span>
              </span>
              {i < flow.length - 1 && <span className="text-copper/50">›</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 04 — AI-assisted: prompt typed, diff appears
function AiVisual() {
  const diff: [string, string, string, number][] = [
    ["-", "const calc = (a, b) => a + b * 2;", "bg-red-500/10 text-red-500", 1.7],
    ["+", "/** Adds a to double b. */", "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", 2.3],
    ["+", "const calc = (a: number, b: number) =>", "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", 2.7],
    ["+", "  a + b * 2;", "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", 3.1],
  ];
  return (
    <div className="relative space-y-3">
      <div className="flex items-center gap-2.5 rounded-xl bg-copper/10 px-3 py-2.5">
        <motion.span animate={{ rotate: [0, 20, -10, 0], scale: [1, 1.2, 1] }} transition={{ duration: 2.4, repeat: Infinity }} className="text-copper"><Sparkles size={16} /></motion.span>
        <motion.span className="overflow-hidden whitespace-nowrap text-xs font-semibold sm:text-sm" initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ delay: 0.2, duration: 1.2, ease: "linear" }}>
          Refactor calc() and add docs
        </motion.span>
        <motion.span className="h-4 w-1.5 bg-copper" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }} />
      </div>
      <div className="space-y-1 rounded-xl bg-bg/60 p-3 font-mono text-[11px] sm:text-xs">
        {diff.map(([sign, text, cls, d], i) => (
          <motion.div key={i} className={`flex gap-2 whitespace-pre rounded px-2 py-1 ${cls}`} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: d, duration: 0.35 }}>
            <span className="font-bold">{sign}</span><span className={i === 0 ? "line-through decoration-red-500/60" : ""}>{text}</span>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Refactored", "Documented", "Debugged"].map((t, i) => (
          <motion.span key={t} className="inline-flex items-center gap-1 rounded-full bg-copper/10 px-2.5 py-1 text-[11px] font-semibold text-copper2 dark:text-copper" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 3.6 + i * 0.15, type: "spring", stiffness: 300, damping: 14 }}>
            <Check size={11} strokeWidth={3} />{t}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ───────────── data ───────────── */
const services = [
  { icon: Layers, title: "Full-Stack Web Development", desc: "Complete web applications using React, Next.js, Node.js, Express.js, MongoDB and PostgreSQL.", tags: ["React", "Next.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL"], Visual: StackVisual },
  { icon: Server, title: "Backend & API Development", desc: "Secure REST APIs, authentication, authorization, database architecture and integrations.", tags: ["REST APIs", "Authentication", "Authorization", "Integrations"], Visual: ApiVisual },
  { icon: LayoutDashboard, title: "SaaS & Dashboard Development", desc: "Scalable SaaS products, admin panels, management dashboards and business workflows.", tags: ["SaaS", "Admin panels", "Dashboards", "Workflows"], Visual: DashboardVisual },
  { icon: Sparkles, title: "AI-Assisted Development", desc: "AI-assisted coding, prompt engineering, debugging, refactoring and documentation.", tags: ["Prompt engineering", "Debugging", "Refactoring", "Docs"], Visual: AiVisual },
];

const maskStyle: React.CSSProperties = {
  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  maskComposite: "exclude",
};

/* ───────────── section ───────────── */
export default function Services() {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { amount: 0.4 });
  const reduce = useReducedMotion();
  const isLg = useIsLg();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoplay = isLg && inView && !paused && !reduce;

  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % services.length), DURATION * 1000);
    return () => clearTimeout(t);
  }, [active, autoplay]);

  return (
    <section id="services" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Services">What I Can Build</SectionHeading>

        <div ref={wrap} className="grid gap-5 sm:grid-cols-2 lg:flex lg:h-[580px] lg:gap-4" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {services.map(({ icon: Icon, title, desc, tags, Visual }, i) => {
            const open = i === active; // only meaningful on lg
            const showBody = !isLg || open;
            return (
              <motion.div
                key={title}
                role="button"
                tabIndex={0}
                aria-expanded={open}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative min-w-0 cursor-pointer rounded-3xl outline-none transition-[flex] duration-700 ease-[cubic-bezier(.22,1,.36,1)] lg:h-full ${open ? "lg:flex-[3.3]" : "lg:flex-1"}`}
              >
                {/* spinning gradient border (active, desktop) */}
                <span aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden rounded-3xl p-[1.5px] transition-opacity duration-500 ${open ? "lg:opacity-100" : ""} opacity-0`} style={maskStyle}>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="aspect-square w-[220%] shrink-0 bg-[conic-gradient(from_0deg,transparent_0_55%,rgb(var(--brand))_80%,#60a5fa_100%)]" style={{ animation: "spin 5s linear infinite" }} />
                  </span>
                </span>

                <div className={`glass relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-shadow duration-500 ${open ? "lg:shadow-[0_24px_60px_-20px_rgb(var(--brand)/.55)]" : ""}`}>
                  {/* cursor spotlight */}
                  <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgb(var(--brand) / .16), transparent 60%)" }} />

                  {/* header */}
                  <div className="relative flex items-start justify-between">
                    <span className={`relative grid h-12 w-12 place-items-center rounded-xl transition-colors duration-300 ${open ? "bg-gradient-to-br from-copper2 to-copper text-white lg:shadow-lg" : "bg-copper/10 text-copper group-hover:bg-copper group-hover:text-white"}`}>
                      {open && !reduce && <motion.span aria-hidden className="absolute inset-0 rounded-xl bg-copper/40" animate={{ scale: [1, 1.6], opacity: [0.5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }} />}
                      <motion.span className="relative" animate={open ? { rotate: [0, -10, 10, 0] } : { rotate: 0 }} transition={{ duration: 0.8 }}><Icon /></motion.span>
                    </span>
                    <span className={`font-display text-5xl font-semibold leading-none transition-colors duration-500 ${open ? "text-copper/25" : "text-copper/10"}`}>{String(i + 1).padStart(2, "0")}</span>
                  </div>

                  {/* title + description */}
                  <div className={`relative mt-5 ${!open ? "lg:mt-auto" : ""}`}>
                    <h3 className={`font-display font-semibold leading-tight transition-[font-size] duration-500 text-xl ${open ? "lg:text-3xl" : "lg:text-lg"}`}>{title}</h3>
                    <p className={`mt-2 text-sm leading-relaxed text-muted lg:text-base ${!open ? "lg:hidden" : ""}`}>{desc}</p>
                    {!open && <p className="mt-3 hidden items-center gap-1 text-xs font-semibold text-copper lg:flex">Explore <ArrowUpRight size={14} /></p>}
                  </div>

                  {/* animated body */}
                  {showBody && (
                    <motion.div className="relative mt-6 flex-1" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: isLg ? 0.25 : 0, duration: 0.5 }}>
                      <div className="rounded-2xl border-cu bg-card/60 p-3 sm:p-4">
                        <Lazy key={`${i}-${isLg ? active : "m"}`}><Visual /></Lazy>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {tags.map((t, k) => (
                          <motion.span key={t} className="chip text-copper2" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + k * 0.07 }}>{t}</motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* autoplay progress */}
                  {open && autoplay && <motion.span key={active} aria-hidden className="absolute bottom-0 left-0 hidden h-[3px] bg-gradient-to-r from-copper2 to-sky-400 lg:block" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: DURATION, ease: "linear" }} />}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border-cu px-6 py-5 text-center sm:flex-row sm:text-left" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-display text-lg font-semibold">Have an idea in mind? <span className="copper-text">Let&apos;s build it together.</span></p>
          <a href="#contact" className="btn btn-solid">Start a project <ArrowUpRight size={16} /></a>
        </motion.div>
      </div>
    </section>
  );
}