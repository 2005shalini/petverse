import React from "react";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";

export default function TimelineCard({ event, isLast }) {
  const isHigh = event.priority === "high";

  return (
    <div className="flex gap-4 text-left">
      {/* Visual Dot & Connector line */}
      <div className="flex flex-col items-center shrink-0">
        <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
          isHigh
            ? "border-rose-300 bg-rose-50 text-rose-500"
            : "border-emerald-300 bg-emerald-50 text-emerald-500"
        }`}>
          {isHigh ? <AlertCircle size={14} /> : <CheckCircle size={14} />}
        </div>
        {!isLast && <div className="w-0.5 bg-slate-200/80 flex-1 min-h-[30px]" />}
      </div>

      {/* Info details */}
      <div className="flex-1 pb-6">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-800 text-sm">{event.title}</span>
          <span className="text-[10px] text-slate-400 font-semibold">
            {new Date(event.timestamp).toLocaleDateString([], { month: "short", day: "numeric" })}
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed font-semibold mt-1">
          {event.description}
        </p>
      </div>
    </div>
  );
}
