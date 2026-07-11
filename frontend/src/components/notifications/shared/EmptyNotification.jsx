import React from "react";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function EmptyNotification({ title = "All Caught Up!", description = "No new notifications. Your pet's profile is fully optimized and up to date." }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-slate-200/50 bg-white rounded-[30px] shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 shadow-inner mb-4">
        <ShieldCheck size={28} />
      </div>
      <h4 className="font-bold text-slate-800 text-base flex items-center gap-1.5 justify-center">
        {title}
        <Sparkles size={14} className="text-yellow-400" />
      </h4>
      <p className="text-xs text-slate-400 font-semibold leading-relaxed mt-2 max-w-xs mx-auto">
        {description}
      </p>
    </div>
  );
}
