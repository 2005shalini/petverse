import React from "react";
import { PawPrint } from "lucide-react";

export default function PetBadge({ pet, className = "" }) {
  if (!pet) return null;

  return (
    <div className={`inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700 ${className}`}>
      {pet.image ? (
        <img src={pet.image} alt={pet.name} className="h-4 w-4 rounded-md object-cover" />
      ) : (
        <PawPrint size={12} className="text-emerald-500" />
      )}
      <span>{pet.name}</span>
      {pet.breed && (
        <span className="text-emerald-500/80 font-normal">({pet.breed})</span>
      )}
    </div>
  );
}
