import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Brain, Lock, ArrowRight } from "lucide-react";

/**
 * AISummaryPlaceholder — Reusable AI feature coming-soon card.
 *
 * Props:
 *  - title       string  e.g. "AI Health Summary"
 *  - description string  e.g. "Powered analysis of your pet's health trends..."
 *  - variant     "default" | "compact" | "banner"
 *  - feature     string  e.g. "risk-analysis" | "growth-prediction" | "reminder"
 */

const FEATURE_CONTENT = {
  "health-summary": {
    gradient: "from-violet-500/10 via-indigo-500/10 to-cyan-500/10",
    border: "border-violet-200",
    badge: "bg-violet-100 text-violet-700 border-violet-200",
    icon: "text-violet-500",
    glow: "shadow-violet-500/10"
  },
  "risk-analysis": {
    gradient: "from-rose-500/10 via-orange-500/10 to-amber-500/10",
    border: "border-rose-200",
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    icon: "text-rose-500",
    glow: "shadow-rose-500/10"
  },
  "growth-prediction": {
    gradient: "from-emerald-500/10 via-teal-500/10 to-cyan-500/10",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: "text-emerald-500",
    glow: "shadow-emerald-500/10"
  },
  reminder: {
    gradient: "from-amber-500/10 via-orange-500/10 to-yellow-500/10",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    icon: "text-amber-500",
    glow: "shadow-amber-500/10"
  },
  default: {
    gradient: "from-slate-100 via-slate-50 to-white",
    border: "border-slate-200",
    badge: "bg-slate-100 text-slate-600 border-slate-200",
    icon: "text-slate-400",
    glow: "shadow-slate-200/50"
  }
};

export default function AISummaryPlaceholder({
  title = "AI Health Intelligence",
  description = "Advanced diagnostics, risk analysis, and proactive health recommendations powered by PetVerse AI.",
  variant = "default",
  feature = "default"
}) {
  const style = FEATURE_CONTENT[feature] || FEATURE_CONTENT.default;

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`relative overflow-hidden rounded-2xl border ${style.border} bg-gradient-to-r ${style.gradient} p-4`}
      >
        <div className="flex items-center gap-3">
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white/80 shadow-sm ${style.icon}`}>
            <Brain size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">{title}</p>
            <p className="text-xs text-slate-500 truncate">{description}</p>
          </div>
          <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${style.badge}`}>
            Coming Soon
          </span>
        </div>
      </motion.div>
    );
  }

  if (variant === "banner") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`relative overflow-hidden rounded-[28px] border ${style.border} bg-gradient-to-r ${style.gradient} p-6 shadow-lg ${style.glow}`}
      >
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/30 blur-2xl" />
        <div className="pointer-events-none absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-white/20 blur-2xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/70 shadow-sm backdrop-blur ${style.icon}`}>
              <Sparkles size={22} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-base font-black text-slate-800">{title}</h4>
                <span className={`rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${style.badge}`}>
                  Coming Soon
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-600 leading-relaxed max-w-lg">{description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Lock size={13} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-400">Unlocks with PetVerse Pro</span>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default card variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative overflow-hidden rounded-[28px] border ${style.border} bg-gradient-to-br ${style.gradient} p-6`}
    >
      {/* Decorative blur */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/40 blur-2xl" />

      <div className="relative space-y-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 backdrop-blur shadow-sm ${style.icon}`}>
              <Brain size={20} />
            </div>
            <div>
              <span className={`rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${style.badge}`}>
                AI Feature · Coming Soon
              </span>
            </div>
          </div>
          <Sparkles size={16} className={`${style.icon} opacity-50`} />
        </div>

        {/* Content */}
        <div className="space-y-1">
          <h4 className="text-base font-black text-slate-800">{title}</h4>
          <p className="text-sm font-semibold text-slate-600 leading-relaxed">{description}</p>
        </div>

        {/* Locked preview bars */}
        <div className="space-y-2">
          {[80, 65, 90].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`h-2 rounded-full bg-white/50`} style={{ width: `${w}%` }} />
              <Lock size={9} className="text-slate-300" />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
          <Lock size={11} />
          <span>Unlocks with PetVerse Pro Plan</span>
          <ArrowRight size={11} />
        </div>
      </div>
    </motion.div>
  );
}
