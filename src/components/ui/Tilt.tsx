"use client";
import { motion,useMotionValue,useSpring,useTransform } from "framer-motion";
export default function Tilt({children,className="",max=8}:{children:React.ReactNode;className?:string;max?:number}){
  const x=useMotionValue(0),y=useMotionValue(0),cfg={stiffness:200,damping:18};
  const rx=useSpring(useTransform(y,[-.5,.5],[max,-max]),cfg),ry=useSpring(useTransform(x,[-.5,.5],[-max,max]),cfg);
  return <motion.div className={className} style={{rotateX:rx,rotateY:ry,transformPerspective:900}} whileHover={{y:-6}}
    onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();x.set((e.clientX-r.left)/r.width-.5);y.set((e.clientY-r.top)/r.height-.5)}}
    onMouseLeave={()=>{x.set(0);y.set(0)}}>{children}</motion.div>;}
