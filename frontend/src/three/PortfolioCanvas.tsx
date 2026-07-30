import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment3D } from "./scenes/Environment";
import { HeroScene } from "./scenes/HeroScene";
import { AboutScene } from "./scenes/AboutScene";
import { SkillsScene } from "./scenes/SkillsScene";
import { ProjectsScene } from "./scenes/ProjectsScene";
import { ExperienceScene } from "./scenes/ExperienceScene";
import { ContactScene } from "./scenes/ContactScene";
import { SceneController } from "./SceneController";
import { PostProcessing } from "./PostProcessing";

export function PortfolioCanvas() {
  return (
    <div
      id="portfolio-3d-canvas"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        background: "#030712",
        pointerEvents: "none",
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
        }}
        camera={{ position: [0, 0, 18], fov: 60, near: 0.1, far: 1000 }}
        style={{ background: "#030712" }}
      >
        <Suspense fallback={null}>
          <SceneController>
            <Environment3D />
            <HeroScene />
            <AboutScene />
            <SkillsScene />
            <ProjectsScene />
            <ExperienceScene />
            <ContactScene />
          </SceneController>
          <PostProcessing degraded={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
