import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

/**
 * StatisticCard — Reusable metric display card.
 *
 * Props:
 *  - label       string  e.g. "Health Score"
 *  - value       string | number  e.g. "94" or "3 Active"
 *  - unit        string (optional)  e.g. "%" or "kg"
 *  - trend       "up" | "down" | "flat" | null
 *  - trendValue  string  e.g. "+2.3 from last month"
 *  - icon        Lucide component
 *  - iconColor   Tailwind color class e.g. "text-emerald-500"
 *  - iconBg      Tailwind bg class e.g. "bg-emerald-50"
 *  - loading     boolean
 *  - className   string (extra Tailwind classes)
 */
export default function StatisticCard({
  label = "Metric",
  value = "--",
  unit = "",
  trend = null,
  trendValue = "",
  icon: Icon,
  iconColor = "text-emerald-500",
  iconBg = "bg-emerald-50",
  loading = false,
  className = ""
}) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up"
    ? "text-emerald-600 bg-emerald-50"
    : trend === "down"
      ? "text-rose-600 bg-rose-50"
      : "text-slate-500 bg-slate-100";

  if (loading) {
    return (
      <div className={`rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm animate-pulse ${className}`}>
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-slate-100" />
          <div className="space-y-2 flex-1">
            <div className="h-3 w-24 rounded bg-slate-100" />
            <div className="h-6 w-16 rounded bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2 }}
      className={`rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition-all ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black tracking-tight text-slate-800">{value}</span>
            {unit && <span className="text-sm font-bold text-slate-400">{unit}</span>}
          </div>
          {trendValue && (
            <div className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${trendColor}`}>
              <TrendIcon size={10} />
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`}>
            <Icon size={20} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
