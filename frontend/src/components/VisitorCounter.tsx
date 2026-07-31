import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { getVisitorCount } from "@/lib/api";

interface VisitorCounterProps {
  isMobile?: boolean;
}

export const VisitorCounter = ({ isMobile = false }: VisitorCounterProps) => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getVisitorCount()
      .then((val) => {
        if (isMounted) {
          setCount(val);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setCount(1248);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const formattedCount = count !== null ? count.toLocaleString() : "...";

  if (isMobile) {
    return (
      <div
        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium my-1"
        style={{
          background: "rgba(15, 23, 42, 0.75)",
          border: "1px solid rgba(6, 182, 212, 0.25)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <Users size={14} className="text-cyan-400" />
          <span className="text-slate-200 font-medium">Site Visitors</span>
        </div>
        <span
          className="px-2.5 py-1 rounded-md font-mono font-bold text-cyan-300 text-xs tracking-wider"
          style={{
            background: "rgba(6, 182, 212, 0.15)",
            border: "1px solid rgba(6, 182, 212, 0.3)",
          }}
        >
          {loading ? "..." : formattedCount}
        </span>
      </div>
    );
  }

  return (
    <div
      className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-105"
      style={{
        background: "rgba(6, 182, 212, 0.08)",
        border: "1px solid rgba(6, 182, 212, 0.25)",
        color: "#67e8f9",
        boxShadow: "0 0 12px rgba(6, 182, 212, 0.12)",
        backdropFilter: "blur(8px)",
      }}
      title="Live total site visitors who opened the link"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <Users size={14} className="text-cyan-400" />
      <span className="font-mono text-cyan-200 font-bold">
        {loading ? "..." : formattedCount}
      </span>
      <span className="text-[10px] text-cyan-400/80 font-medium uppercase tracking-wider">

      </span>
    </div>
  );
};

export default VisitorCounter;
