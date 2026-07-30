import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Procedural starfield + ambient environment
export function Environment3D() {
  const starsRef = useRef<THREE.Points>(null!);

  const starGeometry = useMemo(() => {
    const count = 6000;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 80 + Math.random() * 120;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random() * 1.5 + 0.3;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.005;
      starsRef.current.rotation.x += delta * 0.001;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.15} color="#0f172a" />
      <directionalLight position={[10, 20, 10]} intensity={0.6} color="#3b82f6" />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#06b6d4" />
      <pointLight position={[0, 10, 0]} intensity={1.5} color="#3b82f6" distance={60} />
      <fog attach="fog" args={["#030712", 40, 180]} />

      <points ref={starsRef} geometry={starGeometry}>
        <pointsMaterial
          size={0.18}
          color="#e0f2fe"
          transparent
          opacity={0.75}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <mesh position={[40, 10, -60]}>
        <sphereGeometry args={[12, 8, 8]} />
        <meshBasicMaterial color="#1e3a5f" transparent opacity={0.08} />
      </mesh>
      <mesh position={[-50, -15, -80]}>
        <sphereGeometry args={[18, 8, 8]} />
        <meshBasicMaterial color="#1e1b4b" transparent opacity={0.07} />
      </mesh>
    </group>
  );
}
