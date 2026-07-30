import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PROJECT_COLORS = [
  "#3b82f6", "#06b6d4", "#8b5cf6", "#10b981",
  "#f59e0b", "#ef4444", "#ec4899", "#6366f1",
];

function HolographicPanel({
  position,
  rotation,
  color,
  index,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const edgeRef = useRef<THREE.LineSegments>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + index * 0.7) * 0.15;
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.08 + Math.sin(t + index) * 0.04;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh ref={meshRef}>
        <planeGeometry args={[2.4, 1.6]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.08}
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments ref={edgeRef}>
        <edgesGeometry args={[new THREE.PlaneGeometry(2.4, 1.6)]} />
        <lineBasicMaterial color={color} transparent opacity={0.8} />
      </lineSegments>
      {[[-1.2, -0.8], [1.2, -0.8], [-1.2, 0.8], [1.2, 0.8]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.01]}>
          <circleGeometry args={[0.04, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[2.35, 0.015]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export function ProjectsScene() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.15;
    }
  });

  const panels = PROJECT_COLORS.map((color, i) => {
    const total = PROJECT_COLORS.length;
    const angle = ((i / (total - 1)) - 0.5) * Math.PI * 0.9;
    const radius = 6;
    const x = Math.sin(angle) * radius;
    const z = -Math.cos(angle) * radius + 2;
    const rotY = -angle;
    return {
      position: [x, (i % 2 === 0 ? 0.5 : -0.7), z] as [number, number, number],
      rotation: [0, rotY, 0] as [number, number, number],
      color,
      index: i,
    };
  });

  return (
    <group ref={groupRef} position={[0, -100, -3]}>
      {panels.map((p, i) => (
        <HolographicPanel key={i} {...p} />
      ))}
      <pointLight position={[0, 0, 0]} color="#3b82f6" intensity={2} distance={15} />
    </group>
  );
}
