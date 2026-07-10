import React from "react";
import { MapPin } from "lucide-react";

export default function LocationBadge({ text, className = "" }) {
  if (!text) return null;

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-xl bg-slate-100/80 px-3 py-1.5 text-xs font-semibold text-slate-600 backdrop-blur-sm border border-slate-200/45 ${className}`}>
      <MapPin size={13} className="text-emerald-500" />
      <span>{text}</span>
    </div>
  );
}
