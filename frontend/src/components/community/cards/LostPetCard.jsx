import React from "react";
import { AlertCircle, CheckCircle, MapPin, Calendar, Phone, Star } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard/GlassCard";

export default function LostPetCard({ pet, onStatusToggle }) {
  const isLost = pet.status === "Lost";
  const badgeColor = isLost ? "bg-rose-50 text-rose-700 border-rose-100" : "bg-emerald-50 text-emerald-700 border-emerald-100";
  const rewardColor = isLost ? "bg-amber-50 text-amber-700 border-amber-100" : "bg-emerald-50 text-emerald-700 border-emerald-100";

  return (
    <GlassCard className="p-5 flex flex-col justify-between h-full border border-slate-100">
      <div className="space-y-4">
        {/* Cover image */}
        <div className="h-44 -mx-5 -mt-5 relative overflow-hidden bg-slate-100">
          <img
            src={pet.photo}
            alt={pet.petName}
            className="w-full h-full object-cover"
          />
          {/* Status Badge */}
          <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-xl border backdrop-blur-md flex items-center gap-1.5 text-xs font-black uppercase tracking-wider ${badgeColor}`}>
            {isLost ? <AlertCircle size={12} /> : <CheckCircle size={12} />}
            <span>{pet.status}</span>
          </div>

          {/* Reward Label */}
          <div className={`absolute bottom-3 right-3 px-3 py-1.5 rounded-xl border backdrop-blur-md flex items-center gap-1.5 text-xs font-black tracking-wide ${rewardColor}`}>
            <Star size={11} fill="currentColor" />
            <span>{pet.reward}</span>
          </div>
        </div>

        {/* Info detail */}
        <div className="text-left space-y-3">
          <div>
            <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              {pet.petName}
            </h4>
            <span className="text-[10px] uppercase font-bold text-slate-400">
              {pet.color} {pet.breed}
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            {pet.description}
          </p>

          <div className="space-y-2 pt-2 border-t border-slate-50 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-2">
              <MapPin size={12} className="text-slate-400" />
              <span>{pet.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={12} className="text-slate-400" />
              <span>Last seen: {pet.lastSeenDate} ({pet.lastSeenTime})</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={12} className="text-slate-400" />
              <span>Contact: {pet.contact}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action to Toggle Status (for demo) */}
      <button
        onClick={() => onStatusToggle(pet.id)}
        className="mt-6 w-full rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200/50 py-2.5 text-xs font-bold text-slate-600 transition"
      >
        {isLost ? "Mark as Found" : "Mark as Lost"}
      </button>
    </GlassCard>
  );
}
