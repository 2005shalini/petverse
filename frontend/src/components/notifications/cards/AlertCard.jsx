import React from "react";
import { AlertTriangle, Sparkles, Heart } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard/GlassCard";

export default function AlertCard({ alertData, onDismiss }) {
  const isHigh = alertData.priority === "high";

  return (
    <GlassCard
      className={`
        p-5
        border
        ${isHigh ? "border-rose-100 bg-rose-50/30" : "border-amber-100 bg-amber-50/30"}
      `}
      hover={true}
    >
      <div className="flex gap-4 items-start text-left">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          isHigh ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600"
        }`}>
          <AlertTriangle size={18} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <span className="font-bold text-slate-800 text-sm">{alertData.title}</span>
            {isHigh && (
              <span className="text-[8px] font-black uppercase tracking-widest bg-rose-100 text-rose-700 px-2 py-0.5 rounded-md">
                Critical Alert
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 font-semibold leading-relaxed mt-1">
            {alertData.description}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
