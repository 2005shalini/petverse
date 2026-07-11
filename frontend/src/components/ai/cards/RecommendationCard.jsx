import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Star, Heart } from "lucide-react";

export default function RecommendationCard({
  title = "",
  description = "",
  confidence = 95,
  reasoning = "",
  actionLabel = "",
  onAction = () => {},
  accent = "emerald"
}) {
  const accentClasses = {
    emerald: {
      btn: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10",
      pill: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    indigo: {
      btn: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/10",
      pill: "bg-indigo-50 text-indigo-700 border-indigo-200"
    },
    rose: {
      btn: "bg-rose-600 hover:bg-rose-700 shadow-rose-600/10",
      pill: "bg-rose-50 text-rose-700 border-rose-200"
    }
  };

  const style = accentClasses[accent] || accentClasses.emerald;

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "0 12px 24px -4px rgba(0,0,0,0.04)" }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-slate-50 text-slate-500">
            <Sparkles size={11} className="text-amber-500 animate-pulse" />
            <span>AI Recommendation</span>
          </div>
          <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${style.pill}`}>
            {confidence}% Match Score
          </span>
        </div>

        {/* Content */}
        <div className="space-y-1">
          <h4 className="text-base font-black text-slate-800 tracking-tight">{title}</h4>
          <p className="text-xs font-semibold text-slate-500 leading-relaxed">{description}</p>
        </div>

        {/* Reasoning box */}
        {reasoning && (
          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-3.5 text-xs">
            <span className="font-extrabold text-slate-400 block uppercase tracking-wider text-[9px] mb-1">
              Reasoning & Factors
            </span>
            <p className="font-semibold text-slate-600 leading-relaxed">{reasoning}</p>
          </div>
        )}

        {/* Action button */}
        {actionLabel && (
          <button
            onClick={onAction}
            className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3 text-xs font-extrabold text-white transition-all shadow-md ${style.btn}`}
          >
            <span>{actionLabel}</span>
            <ArrowRight size={13} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
