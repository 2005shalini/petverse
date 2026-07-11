import React from "react";

export default function PetContextCard({ activePet }) {
  if (!activePet) return null;

  // Calculate age safely
  const getAge = (birthDate) => {
    if (!birthDate) return "Unknown age";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age <= 0 ? "Under 1 year" : `${age} year${age !== 1 ? "s" : ""} old`;
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Pet Context</p>
      
      <div className="flex items-center gap-3.5">
        <img
          src={activePet.profileImage || activePet.image}
          alt={activePet.name}
          className="h-12 w-12 rounded-2xl object-cover border border-slate-100 shadow-sm"
        />
        <div className="flex-1 min-w-0">
          <p className="font-black text-slate-800 leading-none">{activePet.name}</p>
          <p className="text-[11px] font-semibold text-slate-400 mt-1 truncate">{activePet.breed}</p>
          <span className="inline-block mt-1 text-[10px] font-bold text-slate-500">
            {getAge(activePet.birthDate)} · {activePet.gender}
          </span>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-3 grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-400">
        <div>
          <span>Weight:</span>
          <span className="text-slate-700 block text-xs font-extrabold mt-0.5">
            {activePet.weight || "--"}
          </span>
        </div>
        <div>
          <span>Microchip:</span>
          <span className="text-slate-700 block text-xs font-extrabold mt-0.5 truncate">
            {activePet.microchip || "Not logged"}
          </span>
        </div>
      </div>
    </div>
  );
}
