import { useRef, useEffect, createContext, useContext, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Waypoints spaced vertically along Y axis corresponding to document scroll sections
const SECTION_WAYPOINTS = [
  { id: "hero",       position: [0, 0, 18],     target: [0, 0, 0]      },
  { id: "about",      position: [0, -25, 18],   target: [0, -25, 0]    },
  { id: "experience", position: [0, -50, 18],   target: [0, -50, 0]    },
  { id: "skills",     position: [0, -75, 18],   target: [0, -75, 0]    },
  { id: "projects",   position: [0, -100, 18],  target: [0, -100, 0]   },
  { id: "contact",    position: [0, -125, 18],  target: [0, -125, 0]   },
];

interface SceneContextValue {
  scrollProgress: number;
  sectionIndex: number;
  mouseNorm: { x: number; y: number };
}

const SceneContext = createContext<SceneContextValue>({
  scrollProgress: 0,
  sectionIndex: 0,
  mouseNorm: { x: 0, y: 0 },
});

export const useSceneContext = () => useContext(SceneContext);

export function SceneController({ children }: { children: React.ReactNode }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(...SECTION_WAYPOINTS[0].position as [number,number,number]));
  const targetLook = useRef(new THREE.Vector3(...SECTION_WAYPOINTS[0].target as [number,number,number]));
  const currentLook = useRef(new THREE.Vector3(...SECTION_WAYPOINTS[0].target as [number,number,number]));
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [ctx, setCtx] = useState<SceneContextValue>({ scrollProgress: 0, sectionIndex: 0, mouseNorm: { x: 0, y: 0 } });

  useEffect(() => {
    const sectionIds = SECTION_WAYPOINTS.map(w => w.id);

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
      scrollRef.current = progress;

      // Continuous camera Y calculation based on smooth scroll progress
      // Total Y distance from 0 to -125
      const currentY = -progress * 125;
      targetPos.current.set(0, currentY, 18);
      targetLook.current.set(0, currentY, 0);

      // Determine active section index
      let activeIndex = 0;
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5) activeIndex = i;
      }

      setCtx({ scrollProgress: progress, sectionIndex: activeIndex, mouseNorm: mouseRef.current });
    };

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  useFrame((_, delta) => {
    const lerpFactor = 1 - Math.pow(0.04, delta);

    // Smooth camera lerp along Y axis
    camera.position.lerp(targetPos.current, lerpFactor);

    // Subtle mouse parallax
    camera.position.x += mouseRef.current.x * 0.3;

    // Smooth look-at lerp
    currentLook.current.lerp(targetLook.current, lerpFactor);
    camera.lookAt(currentLook.current);
  });

  return <SceneContext.Provider value={ctx}>{children}</SceneContext.Provider>;
}
