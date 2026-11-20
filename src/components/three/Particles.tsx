"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
export default function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const pos = useMemo(() => { const a = new Float32Array(count*3); for (let i=0;i<count;i++){ const t=Math.random()*6.28, rad=1.5+Math.random()*3; a[i*3]=Math.cos(t)*rad; a[i*3+1]=(Math.random()-.5)*6; a[i*3+2]=Math.sin(t)*rad; } return a; }, [count]);
  useFrame((_, d) => { if (ref.current) { ref.current.rotation.y += d*.05; } });
  return (<points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3}/></bufferGeometry>
    <pointsMaterial color="#E5AD7D" size={.045} transparent opacity={.75} depthWrite={false} sizeAttenuation/></points>);
}
