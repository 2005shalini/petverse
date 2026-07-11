import React from "react";
import { Star, MapPin, Phone, Mail, Award } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard/GlassCard";

export default function ShelterCard({ shelter, onVolunteerClick }) {
  return (
    <GlassCard className="p-6 flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Banner image */}
        <div className="h-32 -mx-6 -mt-6 relative overflow-hidden bg-slate-100">
          <img
            src={shelter.banner}
            alt={shelter.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-sm text-xs font-bold text-slate-800">
            <Star size={12} fill="#eab308" className="text-yellow-500" />
            <span>{shelter.rating} ({shelter.reviewsCount})</span>
          </div>
        </div>

        {/* Shelter logo & details */}
        <div className="flex gap-4">
          <img
            src={shelter.image}
            alt={shelter.name}
            className="h-12 w-12 rounded-2xl object-cover border border-slate-200"
          />
          <div className="text-left">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5 leading-tight">
              {shelter.name}
              <Award size={14} className="text-emerald-500 shrink-0" />
            </h4>
            <p className="text-xs text-slate-400 font-semibold flex items-center gap-1 mt-1">
              <MapPin size={11} />
              {shelter.location.split(",")[0]}
            </p>
          </div>
        </div>

        {/* Contact details */}
        <div className="space-y-1.5 pt-2 text-xs font-semibold text-slate-500 text-left">
          <div className="flex items-center gap-2">
            <Phone size={12} className="text-slate-400" />
            <span>{shelter.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={12} className="text-slate-400" />
            <span>{shelter.email}</span>
          </div>
        </div>

        {/* Volunteer Info */}
        <p className="text-xs text-slate-400 italic text-left pt-2 leading-relaxed">
          {shelter.volunteerInfo}
        </p>
      </div>

      {/* Volunteer Action */}
      <button
        onClick={onVolunteerClick}
        className="mt-6 w-full rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200/50 py-2.5 text-xs font-bold text-slate-600 transition"
      >
        Sign up to Volunteer
      </button>
    </GlassCard>
  );
}
