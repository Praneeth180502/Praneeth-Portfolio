import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SKILL_NODES = [
  { position: [0, 2.5, 0]    as [number,number,number], color: "#3b82f6", size: 0.3 },
  { position: [1.5, 1.8, 1]  as [number,number,number], color: "#3b82f6", size: 0.22 },
  { position: [-1.5, 1.8, 1] as [number,number,number], color: "#3b82f6", size: 0.2 },
  { position: [2, 1, -0.5]   as [number,number,number], color: "#3b82f6", size: 0.18 },
  { position: [-2, 1, -0.5]  as [number,number,number], color: "#3b82f6", size: 0.18 },
  { position: [0, 0, 2.5]    as [number,number,number], color: "#06b6d4", size: 0.28 },
  { position: [1.5, 0, 1.8]  as [number,number,number], color: "#06b6d4", size: 0.2 },
  { position: [-1.5, 0, 1.8] as [number,number,number], color: "#06b6d4", size: 0.2 },
  { position: [2.5, 0.5, 0]  as [number,number,number], color: "#06b6d4", size: 0.18 },
  { position: [0, -2.5, 0]   as [number,number,number], color: "#8b5cf6", size: 0.32 },
  { position: [1.5, -2, 0.8] as [number,number,number], color: "#8b5cf6", size: 0.22 },
  { position: [-1.5, -2, 0.8]as [number,number,number], color: "#8b5cf6", size: 0.2 },
  { position: [0, -1.5, -2]  as [number,number,number], color: "#8b5cf6", size: 0.2 },
  { position: [-2.5, -0.5, 0]as [number,number,number], color: "#10b981", size: 0.22 },
  { position: [-2, -1.5, 1]  as [number,number,number], color: "#10b981", size: 0.18 },
  { position: [-1, -1, 2]    as [number,number,number], color: "#10b981", size: 0.16 },
  { position: [2, -1.5, -1]  as [number,number,number], color: "#f59e0b", size: 0.2 },
  { position: [1, -1, -2.2]  as [number,number,number], color: "#f59e0b", size: 0.17 },
  { position: [3, 0, 0.5]    as [number,number,number], color: "#f59e0b", size: 0.16 },
];

function ConnectionLines() {
  const lines = useMemo(() => {
    const result: THREE.Line[] = [];
    const threshold = 2.5;
    for (let i = 0; i < SKILL_NODES.length; i++) {
      for (let j = i + 1; j < SKILL_NODES.length; j++) {
        const a = new THREE.Vector3(...SKILL_NODES[i].position);
        const b = new THREE.Vector3(...SKILL_NODES[j].position);
        if (a.distanceTo(b) < threshold) {
          const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
          const mat = new THREE.LineBasicMaterial({ color: "#1e3a5f", transparent: true, opacity: 0.4 });
          result.push(new THREE.Line(geo, mat));
        }
      }
    }
    return result;
  }, []);

  return (
    <group>
      {lines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  );
}

export function SkillsScene() {
  const groupRef = useRef<THREE.Group>(null!);
  const nodeRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.06;
    }
    nodeRefs.current.forEach((node, i) => {
      if (node) {
        const mat = node.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.6 + Math.sin(t * 1.5 + i * 0.8) * 0.4;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, -75, -4]}>
      <ConnectionLines />
      {SKILL_NODES.map((node, i) => (
        <group key={i}>
          <mesh
            position={node.position}
            ref={(el) => { if (el) nodeRefs.current[i] = el; }}
          >
            <sphereGeometry args={[node.size, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.7}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
          <pointLight position={node.position} color={node.color} intensity={0.4} distance={2} />
        </group>
      ))}
    </group>
  );
}
