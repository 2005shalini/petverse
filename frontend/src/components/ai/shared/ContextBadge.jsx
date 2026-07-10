import React from "react";
import { Sparkles } from "lucide-react";

export default function ContextBadge({ petName = "" }) {
  if (!petName) return null;
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-700 shadow-sm shadow-emerald-500/5">
      <Sparkles size={11} className="text-emerald-500 animate-pulse" />
      <span>Analyzing {petName}'s History</span>
    </div>
  );
}
