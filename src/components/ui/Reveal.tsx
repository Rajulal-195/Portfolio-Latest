"use client";
import { motion } from "framer-motion";
export default function Reveal({children,delay=0,y=30,x=0,className=""}:{children:React.ReactNode;delay?:number;y?:number;x?:number;className?:string}){
  return <motion.div className={className} initial={{opacity:0,y,x}} whileInView={{opacity:1,y:0,x:0}} viewport={{once:true,margin:"-60px"}} transition={{duration:.75,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>;}
