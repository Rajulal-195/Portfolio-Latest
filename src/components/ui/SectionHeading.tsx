import Reveal from "./Reveal";
export default function SectionHeading({children,eyebrow}:{children:React.ReactNode;eyebrow?:string}){
  return <Reveal className="mb-12 max-w-3xl">{eyebrow&&<p className="mb-3 text-sm font-semibold text-copper"><span className="mr-2 text-lg">/</span>{eyebrow}</p>}<h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">{children}</h2></Reveal>;}
