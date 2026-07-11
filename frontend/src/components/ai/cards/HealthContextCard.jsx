import React from "react";
import { Link } from "react-router-dom";
import { HeartPulse, Stethoscope, ShieldCheck, Pill } from "lucide-react";

export default function HealthContextCard({ activePet, healthState = "Healthy", healthScore = 90 }) {
  if (!activePet) return null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Pet Wellness Ring</h4>
          <p className="text-sm font-black text-slate-800 mt-0.5">{activePet.name}'s Health Profile</p>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider ${
          healthScore >= 85 ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"
        }`}>
          {healthState}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <HeartPulse size={16} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Health Index</span>
            <span className="text-sm font-black text-slate-800">{healthScore}%</span>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
            <Stethoscope size={16} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Species</span>
            <span className="text-sm font-black text-slate-800">{activePet.species || "Dog"}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Link
          to="/health"
          className="flex-1 rounded-xl border border-slate-200 bg-white py-2 text-center text-[10px] font-extrabold text-slate-600 transition hover:bg-slate-50"
        >
          Health Dashboard
        </Link>
        <Link
          to="/health/records"
          className="flex-1 rounded-xl bg-slate-900 py-2 text-center text-[10px] font-extrabold text-white transition hover:bg-slate-800"
        >
          View Records
        </Link>
      </div>
    </div>
  );
}
