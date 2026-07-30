import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
    ],
    exclude: ["lovable-tagger"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "three-core":    ["three"],
          "three-fiber":   ["@react-three/fiber"],
          "three-drei":    ["@react-three/drei"],
          "gsap":          ["gsap"],
          "vendor-react":  ["react", "react-dom"],
          "framer":        ["framer-motion"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
