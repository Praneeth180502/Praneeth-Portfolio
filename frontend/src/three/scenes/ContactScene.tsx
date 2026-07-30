import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function VortexParticles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 1200;

  const [geo, angles, radii, spd] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const ang = new Float32Array(count);
    const rad = new Float32Array(count);
    const s = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      ang[i] = Math.random() * Math.PI * 2;
      rad[i] = Math.random() * 3 + 0.3;
      s[i] = (Math.random() * 0.5 + 0.3) * (Math.random() > 0.5 ? 1 : -1);
      const y = (Math.random() - 0.5) * 6;
      const taper = 1 - Math.abs(y) / 3;
      positions[i * 3]     = Math.cos(ang[i]) * rad[i] * taper;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(ang[i]) * rad[i] * taper;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return [g, ang, rad, s];
  }, []);

  useFrame((state, delta) => {
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      angles[i] += spd[i] * delta;
      const y = arr[i * 3 + 1];
      const taper = Math.max(0, 1 - Math.abs(y) / 3);
      arr[i * 3]     = Math.cos(angles[i]) * radii[i] * taper;
      arr[i * 3 + 2] = Math.sin(angles[i]) * radii[i] * taper;
      arr[i * 3 + 1] += delta * 0.15 * (spd[i] > 0 ? 1 : -1);
      if (arr[i * 3 + 1] > 3) arr[i * 3 + 1] = -3;
      if (arr[i * 3 + 1] < -3) arr[i * 3 + 1] = 3;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y += delta * 0.1;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.06}
        color="#3b82f6"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SocialOrb({ angle, color, radius }: { angle: number; color: string; radius: number }) {
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.4 + angle;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 1.5 + angle) * 0.3;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
      </mesh>
      <pointLight color={color} intensity={0.8} distance={2.5} />
    </group>
  );
}

export function ContactScene() {
  const socialColors = ["#3b82f6", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b"];

  return (
    <group position={[0, -125, -2]}>
      <VortexParticles />
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={3} transparent opacity={0.7} />
      </mesh>
      <pointLight color="#3b82f6" intensity={6} distance={10} />
      <pointLight color="#06b6d4" intensity={3} distance={15} />
      {socialColors.map((color, i) => (
        <SocialOrb key={i} angle={(i / socialColors.length) * Math.PI * 2} color={color} radius={2.5 + (i % 2) * 0.6} />
      ))}
    </group>
  );
}
