import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

// Lazy-load the 3D canvas — avoids blocking initial paint
const PortfolioCanvas = lazy(() =>
  import("@/three/PortfolioCanvas").then((m) => ({ default: m.PortfolioCanvas }))
);

const Index = () => {
  // Disable 3D on devices that prefer reduced motion
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="min-h-screen" style={{ background: "#030712" }}>
      {/* ── 3D Canvas (fixed background) ─────────────────────── */}
      {!prefersReduced && (
        <Suspense fallback={null}>
          <PortfolioCanvas />
        </Suspense>
      )}

      {/* ── HTML Overlay ──────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          pointerEvents: "auto",
        }}
      >
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <FooterSection />
      </div>
    </div>
  );
};

export default Index;
