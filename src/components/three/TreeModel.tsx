"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function rng(seed:number){return()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646;};}

export default function TreeModel({ mobile }: { mobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const leaves = useRef<THREE.InstancedMesh>(null);
  const { branches, leafData } = useMemo(() => {
    const r = rng(42); const branches: {a:THREE.Vector3;b:THREE.Vector3;r:number}[] = []; const leafData: THREE.Vector3[] = [];
    const maxDepth = mobile ? 5 : 6;
    const grow = (p: THREE.Vector3, dir: THREE.Vector3, len: number, rad: number, d: number) => {
      const end = p.clone().addScaledVector(dir, len);
      branches.push({ a: p, b: end, r: rad });
      if (d >= maxDepth) { for (let i = 0; i < (mobile ? 6 : 10); i++) leafData.push(end.clone().add(new THREE.Vector3(r()-.5, r()-.5, r()-.5).multiplyScalar(.7))); return; }
      const n = d < 2 ? 3 : 2;
      for (let i = 0; i < n; i++) {
        const nd = dir.clone().applyAxisAngle(new THREE.Vector3(r()-.5, 0, r()-.5).normalize(), .35 + r()*.5)
          .applyAxisAngle(new THREE.Vector3(0,1,0), r()*Math.PI*2).normalize();
        nd.y = Math.max(nd.y, -.1);
        grow(end, nd.normalize(), len * (.72 + r()*.08), rad * .68, d + 1);
      }
    };
    grow(new THREE.Vector3(0,-2.4,0), new THREE.Vector3(0,1,0), 1.3, .17, 0);
    return { branches, leafData };
  }, [mobile]);

  const geos = useMemo(() => branches.map(({a,b,r}) => {
    const len = a.distanceTo(b); const g = new THREE.CylinderGeometry(r*.7, r, len, mobile?5:8);
    const m = new THREE.Matrix4().compose(a.clone().add(b).multiplyScalar(.5),
      new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), b.clone().sub(a).normalize()), new THREE.Vector3(1,1,1));
    g.applyMatrix4(m); return g;
  }), [branches, mobile]);
  const trunk = useMemo(() => { const arr = geos; let total = 0; arr.forEach(g=>total+=g.attributes.position.count); return arr; }, [geos]);

  useMemo(() => {}, []);
  useFrame(({ pointer, clock }) => {
    if (group.current) {
      group.current.rotation.y += (pointer.x * .6 - group.current.rotation.y) * .04;
      group.current.rotation.x += (-pointer.y * .12 - group.current.rotation.x) * .04;
      group.current.rotation.z = Math.sin(clock.elapsedTime * .5) * .012;
    }
    const m = leaves.current; if (!m) return;
    const o = new THREE.Object3D(); const t = clock.elapsedTime;
    leafData.forEach((p,i)=>{ o.position.set(p.x+Math.sin(t*.8+i)*.03, p.y+Math.cos(t*.7+i*1.3)*.03, p.z);
      o.rotation.set(i, i*.5, t*.2+i); o.scale.setScalar(.07+((i*37)%10)/200); o.updateMatrix(); m.setMatrixAt(i, o.matrix); });
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={group} position={[0,.2,0]}>
      {trunk.map((g,i)=>(<mesh key={i} geometry={g}><meshStandardMaterial color="#C47A45" metalness={.75} roughness={.4}/></mesh>))}
      <instancedMesh ref={leaves} args={[undefined, undefined, leafData.length]}>
        <octahedronGeometry args={[1,0]}/><meshStandardMaterial color="#E5AD7D" emissive="#C47A45" emissiveIntensity={.9} metalness={.4} roughness={.5}/>
      </instancedMesh>
    </group>
  );
}
