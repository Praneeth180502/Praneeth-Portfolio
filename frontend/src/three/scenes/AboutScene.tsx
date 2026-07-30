import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DNAHelix() {
  const ref = useRef<THREE.Group>(null!);
  const count = 60;

  const [strand1, strand2, rungs] = useMemo(() => {
    const s1: THREE.Vector3[] = [];
    const s2: THREE.Vector3[] = [];
    const r: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 6;
      const y = (i / count) * 8 - 4;
      const x1 = Math.cos(t) * 1.2;
      const z1 = Math.sin(t) * 1.2;
      const x2 = Math.cos(t + Math.PI) * 1.2;
      const z2 = Math.sin(t + Math.PI) * 1.2;
      s1.push(new THREE.Vector3(x1, y, z1));
      s2.push(new THREE.Vector3(x2, y, z2));
      if (i % 5 === 0) {
        r.push([new THREE.Vector3(x1, y, z1), new THREE.Vector3(x2, y, z2)]);
      }
    }
    return [s1, s2, r];
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={ref} position={[-5.5, 0, -2]}>
      {strand1.map((pos, i) => (
        <mesh key={`s1-${i}`} position={pos}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.8} />
        </mesh>
      ))}
      {strand2.map((pos, i) => (
        <mesh key={`s2-${i}`} position={pos}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.8} />
        </mesh>
      ))}
      {rungs.map(([a, b], i) => {
        const mid = new THREE.Vector3().lerpVectors(a, b, 0.5);
        const len = a.distanceTo(b);
        const dir = new THREE.Vector3().subVectors(b, a).normalize();
        const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        return (
          <mesh key={`rung-${i}`} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.025, 0.025, len, 6]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.6} transparent opacity={0.7} />
          </mesh>
        );
      })}
    </group>
  );
}

function OrbitingOrbs() {
  const groupRef = useRef<THREE.Group>(null!);
  const orbColors = ["#3b82f6", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];
  const orbRefs = useRef<THREE.Group[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
    orbRefs.current.forEach((orb, i) => {
      if (orb) {
        const angle = t * (0.3 + i * 0.05) + (i / 6) * Math.PI * 2;
        const radius = 2.5 + (i % 2) * 0.8;
        orb.position.x = Math.cos(angle) * radius;
        orb.position.z = Math.sin(angle) * radius;
        orb.position.y = Math.sin(t * 0.5 + i) * 0.5;
      }
    });
  });

  return (
    <group ref={groupRef} position={[5, 0, -2]}>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.2, 0.06, 12, 60]} />
        <meshStandardMaterial color="#1e40af" emissive="#3b82f6" emissiveIntensity={0.8} />
      </mesh>
      {orbColors.map((color, i) => (
        <group key={i} ref={(el) => { if (el) orbRefs.current[i] = el; }}>
          <mesh>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
          </mesh>
          <pointLight color={color} intensity={0.8} distance={3} />
        </group>
      ))}
    </group>
  );
}

export function AboutScene() {
  return (
    <group position={[0, -25, 0]}>
      <DNAHelix />
      <OrbitingOrbs />
    </group>
  );
}
