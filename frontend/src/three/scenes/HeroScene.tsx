import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Neural particle halo — positioned around the brain sphere on the right
function NeuralParticles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 1500;

  const [geo, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      vel[i * 3]     = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return [g, vel];
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3]     += velocities[i * 3]     * delta * 60;
      arr[i * 3 + 1] += velocities[i * 3 + 1] * delta * 60;
      arr[i * 3 + 2] += velocities[i * 3 + 2] * delta * 60;
      const x = arr[i * 3], y = arr[i * 3 + 1], z = arr[i * 3 + 2];
      const len = Math.sqrt(x * x + y * y + z * z);
      const target = 4.0;
      const pull = (len - target) * 0.003;
      if (len > 0) {
        arr[i * 3]     -= (x / len) * pull;
        arr[i * 3 + 1] -= (y / len) * pull;
        arr[i * 3 + 2] -= (z / len) * pull;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y += delta * 0.05;
  });

  return (
    <points ref={ref} geometry={geo} position={[4.8, 0, -2]}>
      <pointsMaterial
        size={0.05}
        color="#06b6d4"
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function BrainSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.12;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= 0.005;
      wireRef.current.rotation.z += 0.002;
    }
    if (innerRef.current) {
      const scale = 1 + Math.sin(t * 1.5) * 0.06;
      innerRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={[4.8, 0, -2]}>
      <mesh ref={innerRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#1e40af"
          emissive="#3b82f6"
          emissiveIntensity={1.0}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 2]} />
        <meshStandardMaterial
          color="#0c4a6e"
          emissive="#0ea5e9"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.3}
        />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.7, 2]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.4, 0.035, 8, 80]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.45} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0.4, 0]}>
        <torusGeometry args={[3.8, 0.02, 8, 80]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.25} />
      </mesh>
      <pointLight color="#3b82f6" intensity={3} distance={10} />
    </group>
  );
}

function InfiniteGrid() {
  return (
    <gridHelper
      args={[80, 40, "#1e3a5f", "#0f2744"]}
      position={[0, -7, 0]}
    />
  );
}

export function HeroScene() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <BrainSphere />
      <NeuralParticles />
      <InfiniteGrid />
    </group>
  );
}
