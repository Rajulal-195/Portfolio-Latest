"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import TreeModel from "./TreeModel";
import Particles from "./Particles";

function Fallback(){return(<div className="absolute inset-0 flex items-center justify-center"><svg viewBox="0 0 200 240" className="h-4/5 opacity-80" aria-hidden><path d="M100 230V120M100 150L60 100M100 130L145 80M60 100L40 60M145 80L170 45M100 120L100 40" stroke="#C47A45" strokeWidth="5" strokeLinecap="round" fill="none"/>{[[40,60],[170,45],[100,40],[60,100],[145,80]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="10" fill="#E5AD7D"/>)}</svg></div>);}

export default function TreeScene() {
  const [ok, setOk] = useState<boolean|null>(null); const [mobile, setMobile] = useState(false);
  useEffect(() => {
    setMobile(window.innerWidth < 768);
    try { const c = document.createElement("canvas"); setOk(!!(c.getContext("webgl2") || c.getContext("webgl"))); } catch { setOk(false); }
  }, []);
  if (ok === null) return null;
  if (!ok) return <Fallback/>;
  return (
    <Canvas dpr={[1, mobile ? 1.25 : 1.75]} camera={{ position: [0, .3, 8], fov: 45 }} aria-label="Interactive 3D copper tree" style={{ touchAction: "pan-y" }}>
      <ambientLight intensity={.5} color="#FFF3E8"/>
      <pointLight position={[3,3,4]} intensity={40} color="#E5AD7D"/>
      <pointLight position={[-4,-1,-3]} intensity={18} color="#C47A45"/>
      <Suspense fallback={null}><TreeModel mobile={mobile}/><Particles count={mobile?60:160}/></Suspense>
    </Canvas>
  );
}
