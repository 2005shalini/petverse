import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Sparkles, MapPin, Heart } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import { motion } from "framer-motion";

export default function AdoptionCard({ pet, calculateAICompatibility }) {
  const aiMatch = useMemo(() => {
    return calculateAICompatibility ? calculateAICompatibility(pet) : { score: 85 };
  }, [pet, calculateAICompatibility]);

  const genderColor = pet.gender === "Male" ? "bg-cyan-50 text-cyan-700" : "bg-rose-50 text-rose-700";

  return (
    <GlassCard className="p-5 flex flex-col justify-between h-full relative group">
      {/* AI compatibility score pill */}
      <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 text-white rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-lg border border-white/20 text-xs font-black uppercase tracking-wider">
        <Sparkles size={11} fill="white" />
        <span>{aiMatch.score}% AI Match</span>
      </div>

      <div className="space-y-4">
        {/* Cover gallery */}
        <div className="h-48 -mx-5 -mt-5 relative overflow-hidden bg-slate-100">
          <img
            src={pet.gallery[0]}
            alt={pet.petName}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          {pet.status === "Pending" && (
            <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center text-white font-bold tracking-wider text-sm uppercase">
              Request Sent
            </div>
          )}
        </div>

        {/* Pet description */}
        <div className="text-left">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              {pet.petName}
            </h4>
            <span className={`text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-lg ${genderColor}`}>
              {pet.gender}
            </span>
          </div>

          <p className="text-xs text-slate-400 font-semibold flex items-center gap-1 mt-1">
            <MapPin size={11} />
            {pet.location}
          </p>

          <p className="text-xs text-slate-500 leading-relaxed font-medium mt-3 line-clamp-2">
            {pet.description}
          </p>
        </div>

        {/* Specs Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 rounded-lg px-2.5 py-1">
            {pet.breed}
          </span>
          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 rounded-lg px-2.5 py-1">
            {pet.age}
          </span>
        </div>
      </div>

      {/* Action link */}
      <Link
        to={`/adoption/${pet.id}`}
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 py-3 text-xs font-bold text-white text-center shadow-lg shadow-emerald-100 transition block"
      >
        View Profile Details
      </Link>
    </GlassCard>
  );
}
