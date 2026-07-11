import React from "react";
import { Star } from "lucide-react";

export default function RatingFilter({ activeRating = 0, onChange = () => {} }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
      <span className="text-xs font-black text-slate-800 uppercase tracking-wider block">Minimum Rating</span>
      
      <div className="flex flex-col gap-1.5">
        {[4, 3, 0].map((stars) => {
          const isActive = activeRating === stars;
          return (
            <button
              key={stars}
              onClick={() => onChange(stars)}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold border transition ${
                isActive
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700 font-extrabold"
                  : "bg-white border-transparent text-slate-500 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    className={i < (stars || 5) ? "fill-amber-400 text-amber-400" : "text-slate-200"}
                  />
                ))}
              </div>
              <span>{stars === 0 ? "Any rating" : `& up (${stars}.0+)`}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
