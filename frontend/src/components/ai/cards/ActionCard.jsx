import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function ActionCard({
  title = "",
  description = "",
  badge = "Recommended Action",
  to = "#",
  actionLabel = "Proceed"
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/50 via-white to-white p-5 shadow-sm">
      <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-indigo-500/5 blur-xl pointer-events-none" />
      
      <div className="space-y-3.5">
        <div className="inline-flex items-center gap-1 rounded-full border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-indigo-700">
          <Sparkles size={9} />
          <span>{badge}</span>
        </div>

        <div>
          <h4 className="text-sm font-black text-slate-800 tracking-tight leading-snug">{title}</h4>
          <p className="text-xs font-semibold text-slate-500 mt-1 leading-relaxed">{description}</p>
        </div>

        <Link
          to={to}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-[10px] font-extrabold text-white transition hover:bg-slate-800"
        >
          <span>{actionLabel}</span>
          <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  );
}
