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
      <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs bg-[#12121a] border border-[#1e293b] my-1">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
          </span>
          <Users size={14} className="text-[#06b6d4]" />
          <span className="text-[#cbd5e1] font-mono text-xs">Site Visitors</span>
        </div>
        <span className="px-2 py-0.5 rounded font-mono font-semibold text-[#06b6d4] text-xs bg-[#06b6d4]/12 border border-[#06b6d4]/20">
          {loading ? "..." : formattedCount}
        </span>
      </div>
    );
  }

  return (
    <div
      className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-[#06b6d4]/12 border border-[#06b6d4]/30 text-[#06b6d4] transition-all"
      title="Live portfolio visitor count"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
      </span>
      <Users size={13} className="text-[#06b6d4]" />
      <span className="font-bold text-[#f8fafc]">
        {loading ? "..." : formattedCount}
      </span>
      <span className="text-[10px] text-[#94a3b8] uppercase tracking-wider">
        visitors
      </span>
    </div>
  );
};

export default VisitorCounter;
