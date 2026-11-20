// import SectionHeading from "../ui/SectionHeading";
// import Reveal from "../ui/Reveal";
// const st=[["Understand","Analyze requirements and identify the problem."],["Architect","Plan structure, database schemas, APIs and workflows."],["Develop","Build frontend interfaces and backend functionality."],["Test","Validate functionality, debug issues and improve reliability."],["Deploy & Monitor","Deploy, monitor performance and maintain production systems."]];
// export default function Process(){return(<section id="process" className="px-6 py-24"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Process">How I Turn Ideas Into Products</SectionHeading>
// <ol className="grid gap-6 md:grid-cols-5">{st.map(([t,d],i)=><Reveal key={t} delay={i*.1}><li className="glass relative h-full rounded-2xl p-5 transition hover:-translate-y-1"><p className="font-display text-4xl font-semibold text-copper/30">{String(i+1).padStart(2,"0")}</p><h3 className="font-display text-xl font-semibold">{t}</h3><p className="mt-2 text-sm text-muted">{d}</p></li></Reveal>)}</ol></div></section>);}



"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Activity, Bug, Check, Code2, FlaskConical, Network, Rocket, Search } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

const DURATION = 5; // seconds each step stays active while auto-playing

/* ───────────────────────── Step data ───────────────────────── */
const steps = [
  { title: "Understand", desc: "Analyze requirements and identify the problem.", icon: Search, file: "requirements.md", tags: ["Requirements", "User flows", "Scope"] },
  { title: "Architect", desc: "Plan structure, database schemas, APIs and workflows.", icon: Network, file: "architecture.svg", tags: ["DB schema", "REST APIs", "Workflows"] },
  { title: "Develop", desc: "Build frontend interfaces and backend functionality.", icon: Code2, file: "server.ts", tags: ["Next.js", "Node.js", "PostgreSQL"] },
  { title: "Test", desc: "Validate functionality, debug issues and improve reliability.", icon: FlaskConical, file: "test-run", tags: ["Cypress", "Playwright", "Selenium"] },
  { title: "Deploy & Monitor", desc: "Deploy, monitor performance and maintain production systems.", icon: Rocket, file: "monitor — live", tags: ["AWS", "Vercel", "Grafana"] },
];

/* ───────────────────── Mini animated visuals ───────────────────── */

// 01 — requirements get scanned and ticked off
function UnderstandVisual() {
  const rows: [string, number][] = [["Goals", 88], ["Users", 66], ["Scope", 78], ["Constraints", 52], ["Risks", 70]];
  return (
    <div className="relative overflow-hidden rounded-xl p-1">
      <div className="space-y-3.5">
        {rows.map(([label, w], i) => (
          <div key={label} className="flex items-center gap-3">
            <span className="w-20 text-xs font-semibold text-muted">{label}</span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-copper/10">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-copper2 to-sky-400" initial={{ width: 0 }} animate={{ width: `${w}%` }} transition={{ delay: 0.3 + i * 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} />
            </div>
            <motion.span className="grid h-5 w-5 place-items-center rounded-full bg-copper text-white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9 + i * 0.35, type: "spring", stiffness: 380, damping: 14 }}>
              <Check size={12} strokeWidth={3} />
            </motion.span>
          </div>
        ))}
      </div>
      {/* scanner beam */}
      <motion.div className="pointer-events-none absolute inset-x-0 h-14 bg-gradient-to-b from-transparent via-copper/20 to-transparent" initial={{ top: "-20%" }} animate={{ top: ["-20%", "100%"] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute right-2 text-copper" animate={{ top: ["0%", "78%", "0%"], rotate: [0, 12, -8, 0] }} transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}>
        <Search size={26} />
      </motion.div>
    </div>
  );
}

// 02 — system diagram draws itself, data packets flow along it
function ArchitectVisual() {
  const edges = ["M80 100 H128", "M198 90 C222 90 222 52 244 52", "M198 110 C222 110 222 148 244 148"];
  const nodes: [string, number, number, number][] = [["Client", 10, 80, 70], ["API", 128, 80, 70], ["Database", 244, 32, 76], ["Auth", 244, 128, 76]];
  return (
    <svg viewBox="0 0 330 200" className="w-full" role="img" aria-label="Architecture diagram: client to API, API to database and auth">
      {edges.map((d, i) => (
        <g key={d}>
          <motion.path d={d} className="fill-none stroke-copper" strokeWidth={2} strokeDasharray="5 5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 + i * 0.35, duration: 0.7 }} />
          <circle r="4" className="fill-copper2">
            <animateMotion dur={`${1.8 + i * 0.3}s`} begin={`${1.4 + i * 0.3}s`} repeatCount="indefinite" path={d} />
          </circle>
        </g>
      ))}
      {nodes.map(([label, x, y, w], i) => (
        <motion.g key={label} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} style={{ transformBox: "fill-box", transformOrigin: "center" }} transition={{ delay: i * 0.2, type: "spring", stiffness: 260, damping: 16 }}>
          <rect x={x} y={y} width={w} height={40} rx={12} className="fill-card stroke-copper" strokeWidth={1.5} />
          <text x={x + w / 2} y={y + 25} textAnchor="middle" className="fill-ink" fontSize="12" fontWeight={600}>{label}</text>
        </motion.g>
      ))}
    </svg>
  );
}

// 03 — code types itself out
const K = ({ children }: { children: React.ReactNode }) => <span className="text-copper2 dark:text-copper">{children}</span>;
const S = ({ children }: { children: React.ReactNode }) => <span className="text-emerald-600 dark:text-emerald-400">{children}</span>;
function DevelopVisual() {
  const lines: [number, React.ReactNode][] = [
    [0, <><K>const</K> app = express();</>],
    [0, <>app.get(<S>&quot;/api/ideas&quot;</S>, <K>async</K> (req, res) =&gt; {"{"}</>],
    [1, <><K>const</K> data = <K>await</K> db.idea.findAll();</>],
    [1, <>res.json({"{"} ok: <K>true</K>, data {"}"});</>],
    [0, <>{"});"}</>],
    [0, <>app.listen(<S>3000</S>);</>],
  ];
  return (
    <div className="relative font-mono text-[11.5px] leading-7 sm:text-xs">
      {lines.map(([indent, node], i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="w-4 text-right text-muted/50">{i + 1}</span>
          <motion.div className="whitespace-nowrap" style={{ paddingLeft: indent * 16 }} initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ delay: 0.2 + i * 0.5, duration: 0.5, ease: "easeOut" }}>
            {node}
            {i === lines.length - 1 && <motion.span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-copper" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />}
          </motion.div>
        </div>
      ))}
      <motion.span className="absolute -top-1 right-0 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 font-sans text-[11px] font-semibold text-emerald-600 dark:text-emerald-400" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 3.4, type: "spring" }}>
        <Check size={12} strokeWidth={3} /> Compiled
      </motion.span>
    </div>
  );
}

// 04 — tests run, one bug is caught and fixed
function TestVisual() {
  const tests = [["Unit tests"], ["API contracts"], ["Edge cases", true], ["End-to-end flows"]] as [string, boolean?][];
  return (
    <div>
      <ul className="space-y-2.5">
        {tests.map(([name, bug], i) => {
          const t = 0.3 + i * 0.75;
          return (
            <li key={name} className="flex items-center gap-3 rounded-lg bg-copper/5 px-3 py-2 text-sm font-medium">
              <span className="relative grid h-6 w-6 place-items-center">
                <motion.span className="absolute h-4 w-4 rounded-full border-2 border-copper border-t-transparent" initial={{ opacity: 1, rotate: 0 }} animate={{ opacity: 0, rotate: 720 }} transition={{ rotate: { duration: 0.7, ease: "linear" }, opacity: { delay: t + 0.5, duration: 0.15 } }} />
                {bug && (
                  <motion.span className="absolute text-amber-500" initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 1.2, 1, 1, 0], opacity: [0, 1, 1, 1, 0] }} transition={{ delay: t + 0.5, duration: 1, times: [0, 0.2, 0.3, 0.8, 1] }}>
                    <Bug size={16} />
                  </motion.span>
                )}
                <motion.span className="absolute grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: t + (bug ? 1.5 : 0.6), type: "spring", stiffness: 400, damping: 12 }}>
                  <Check size={12} strokeWidth={3} />
                </motion.span>
              </span>
              <span className="flex-1">{name}</span>
              {bug && <motion.span className="text-[11px] font-semibold text-amber-500" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ delay: t + 0.5, duration: 1.2, times: [0, 0.2, 0.8, 1] }}>bug found → fixing</motion.span>}
            </li>
          );
        })}
      </ul>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-copper/10">
        <motion.div className="h-full rounded-full bg-emerald-500" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 0.3, duration: 3.4, ease: "easeInOut" }} />
      </div>
    </div>
  );
}

// 05 — live monitoring dashboard
function DeployVisual() {
  const line = "M0 120 C30 110 50 130 80 100 S130 62 160 82 S220 40 250 52 S295 28 320 22";
  const gauges = [["CPU", [28, 46, 34]], ["Memory", [52, 60, 55]], ["Latency", [20, 34, 24]]] as [string, number[]][];
  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-xs font-semibold">
        <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
          <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" /></span>
          Live · Healthy
        </span>
        <Activity size={16} className="text-copper" />
      </div>
      <svg viewBox="0 0 320 150" className="w-full overflow-visible">
        <defs>
          <linearGradient id="procArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity=".35" /><stop offset="100%" stopColor="#3b82f6" stopOpacity="0" /></linearGradient>
        </defs>
        {[30, 70, 110].map((y) => <line key={y} x1="0" x2="320" y1={y} y2={y} className="stroke-copper/10" strokeDasharray="4 6" />)}
        <motion.path d={`${line} V150 H0 Z`} fill="url(#procArea)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} />
        <motion.path d={line} className="fill-none stroke-copper" strokeWidth={3} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, ease: "easeInOut" }} />
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
          <circle cx="320" cy="22" r="5" className="fill-copper2" />
          <motion.circle cx="320" cy="22" className="fill-copper/40" animate={{ r: [5, 16], opacity: [0.7, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </motion.g>
      </svg>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {gauges.map(([label, vals]) => (
          <div key={label} className="rounded-lg bg-copper/5 p-2.5">
            <p className="mb-2 text-[11px] font-semibold text-muted">{label}</p>
            <div className="h-1.5 overflow-hidden rounded-full bg-copper/10">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-copper2 to-sky-400" initial={{ width: "10%" }} animate={{ width: vals.map((v) => `${v}%`) }} transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const visuals = [UnderstandVisual, ArchitectVisual, DevelopVisual, TestVisual, DeployVisual];

/* ───────────────────────── Section ───────────────────────── */
export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoplay = inView && !paused && !reduce;
  const last = steps.length - 1;

  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % steps.length), DURATION * 1000);
    return () => clearTimeout(t);
  }, [active, autoplay]);

  const Visual = visuals[active];
  const step = steps[active];

  return (
    <section id="process" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Process">How I Turn Ideas Into Products</SectionHeading>

        <div ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* ── Journey track ── */}
          <Reveal>
            <div className="relative">
              <div className="absolute left-[10%] right-[10%] top-7 h-[3px] -translate-y-1/2 rounded-full bg-copper/15 md:top-8">
                <motion.div className="h-full origin-left rounded-full bg-gradient-to-r from-copper2 to-sky-400" initial={false} animate={{ scaleX: active / last }} transition={{ type: "spring", stiffness: 70, damping: 18 }} />
                <motion.div className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_4px_rgb(var(--brand)/.3),0_0_22px_6px_rgb(var(--brand)/.55)]" initial={false} animate={{ left: `${(active / last) * 100}%` }} transition={{ type: "spring", stiffness: 70, damping: 18 }} />
              </div>

              <ol className="relative grid grid-cols-5">
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  const isActive = i === active;
                  const done = i < active;
                  return (
                    <li key={s.title} className="flex flex-col items-center">
                      <button type="button" onClick={() => setActive(i)} aria-label={`Step ${i + 1}: ${s.title}`} aria-current={isActive ? "step" : undefined} className="group flex flex-col items-center gap-3 outline-none">
                        <motion.span
                          className={`relative grid h-14 w-14 place-items-center rounded-full border transition-colors duration-300 md:h-16 md:w-16 ${isActive ? "border-transparent bg-gradient-to-br from-copper2 to-copper text-white shadow-[0_12px_30px_-8px_rgb(var(--brand)/.8)]" : done ? "border-copper/60 bg-card text-copper" : "border-copper/25 bg-card text-muted group-hover:border-copper group-hover:text-copper"}`}
                          animate={{ scale: isActive ? 1.14 : 1 }}
                          whileHover={{ scale: isActive ? 1.14 : 1.08 }}
                          whileTap={{ scale: 0.94 }}
                          transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        >
                          {isActive && !reduce && <motion.span className="absolute inset-0 rounded-full bg-copper/40" animate={{ scale: [1, 1.7], opacity: [0.5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }} />}
                          {isActive && (
                            <svg viewBox="0 0 64 64" className="absolute -inset-1.5 h-[calc(100%+12px)] w-[calc(100%+12px)] -rotate-90">
                              <motion.circle key={`${active}-${autoplay}`} cx="32" cy="32" r="30" fill="none" className="stroke-copper" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: autoplay ? 0 : 1 }} animate={{ pathLength: 1 }} transition={{ duration: autoplay ? DURATION : 0.3, ease: "linear" }} />
                            </svg>
                          )}
                          <motion.span key={String(isActive)} initial={{ rotate: -30, scale: 0.6 }} animate={{ rotate: 0, scale: 1 }} className="relative">
                            {done ? <Check size={22} strokeWidth={3} /> : <Icon size={22} />}
                          </motion.span>
                        </motion.span>
                        <span className="hidden text-center sm:block">
                          <span className={`block text-[11px] font-semibold tracking-widest transition-colors ${isActive ? "text-copper" : "text-muted/60"}`}>{String(i + 1).padStart(2, "0")}</span>
                          <span className={`block font-display text-sm font-semibold transition-colors md:text-lg ${isActive ? "text-ink" : "text-muted"}`}>{s.title}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>

          {/* ── Active step stage ── */}
          <Reveal delay={0.15} className="mt-12">
            <div className="glass relative overflow-hidden rounded-3xl p-6 md:p-10">
              <motion.div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-copper/20 blur-3xl" animate={{ x: [0, -30, 0], y: [0, 20, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
              <AnimatePresence mode="wait">
                <motion.div key={active} className="relative grid items-center gap-8 md:grid-cols-2 md:gap-12" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} aria-live="polite">
                  <div>
                    <p className="copper-text font-display text-7xl font-semibold leading-none md:text-8xl">{String(active + 1).padStart(2, "0")}</p>
                    <h3 className="mt-4 font-display text-3xl font-semibold md:text-4xl">{step.title}</h3>
                    <p className="mt-3 max-w-md text-base text-muted md:text-lg">{step.desc}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {step.tags.map((tg, i) => (
                        <motion.span key={tg} className="chip text-copper2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.1 }}>{tg}</motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border-cu bg-card/70 p-4 shadow-xl shadow-copper/10 md:p-5">
                    <div className="mb-4 flex items-center gap-1.5 border-b border-copper/10 pb-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                      <span className="ml-3 font-mono text-xs text-muted">{step.file}</span>
                    </div>
                    <div className="min-h-[220px]"><Visual /></div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}