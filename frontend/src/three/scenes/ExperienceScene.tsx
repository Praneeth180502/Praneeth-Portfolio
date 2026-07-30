import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function EnergyRing({ position, color, delay }: {
  position: [number, number, number];
  color: string;
  delay: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime + delay;
    const scale = 1 + (t % 2) * 0.6;
    const opacity = Math.max(0, 1 - (t % 2) * 0.8);
    if (ref.current) {
      ref.current.scale.setScalar(scale);
      (ref.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
  });

  return (
    <mesh ref={ref} position={position} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.35, 0.025, 8, 40]} />
      <meshBasicMaterial color={color} transparent opacity={1} />
    </mesh>
  );
}

function TimelineNode({ y, color }: { y: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.7 + Math.sin(state.clock.elapsedTime * 1.5 + y) * 0.3;
    }
  });

  return (
    <group position={[0, y, 0]}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} />
      </mesh>
      <pointLight color={color} intensity={1.2} distance={4} />
      <EnergyRing position={[0, 0, 0]} color={color} delay={y} />
    </group>
  );
}

export function ExperienceScene() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[5, -50, -2]}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 10, 8]} />
        <meshStandardMaterial color="#1e3a5f" emissive="#3b82f6" emissiveIntensity={0.4} />
      </mesh>

      <TimelineNode y={3}  color="#3b82f6" />
      <TimelineNode y={0}  color="#06b6d4" />
      <TimelineNode y={-3} color="#8b5cf6" />

      {[3, 0, -3].map((y, i) => (
        <mesh key={i} position={[1, y, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, 2, 6]} />
          <meshBasicMaterial
            color={i === 0 ? "#3b82f6" : i === 1 ? "#06b6d4" : "#8b5cf6"}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}
