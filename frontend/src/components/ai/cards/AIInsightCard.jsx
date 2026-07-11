import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, HelpCircle, Activity } from "lucide-react";

export default function AIInsightCard({ title = "", description = "", type = "info", severity = "low", children }) {
  const styles = {
    critical: {
      border: "border-rose-200 bg-rose-50/50",
      icon: AlertCircle,
      iconColor: "text-rose-500",
      badge: "bg-rose-100 text-rose-700"
    },
    warning: {
      border: "border-amber-200 bg-amber-50/50",
      icon: AlertCircle,
      iconColor: "text-amber-500",
      badge: "bg-amber-100 text-amber-700"
    },
    success: {
      border: "border-emerald-200 bg-emerald-50/50",
      icon: CheckCircle,
      iconColor: "text-emerald-500",
      badge: "bg-emerald-100 text-emerald-700"
    },
    info: {
      border: "border-indigo-200 bg-indigo-50/50",
      icon: Activity,
      iconColor: "text-indigo-500",
      badge: "bg-indigo-100 text-indigo-700"
    }
  };

  const style = styles[severity] || styles.info;
  const Icon = style.icon;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`rounded-2xl border p-5 transition-all shadow-sm ${style.border}`}
    >
      <div className="flex items-start gap-4">
        <div className={`mt-0.5 flex shrink-0 h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm ${style.iconColor}`}>
          <Icon size={18} />
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-black text-slate-800">{title}</h4>
            <span className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${style.badge}`}>
              {severity} priority
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 leading-relaxed">{description}</p>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
