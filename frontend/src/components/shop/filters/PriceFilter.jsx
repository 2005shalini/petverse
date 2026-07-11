import React from "react";
import { DollarSign } from "lucide-react";

export default function PriceFilter({ maxPrice = 150, onChange = () => {} }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-black text-slate-800 uppercase tracking-wider">Price Range Limit</span>
        <span className="font-extrabold text-slate-700">${maxPrice} max</span>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="range"
          min="5"
          max="150"
          step="5"
          value={maxPrice}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="flex-1 accent-emerald-500 cursor-pointer"
        />
      </div>

      <div className="flex justify-between text-[10px] font-bold text-slate-400">
        <span>$5</span>
        <span>$150+</span>
      </div>
    </div>
  );
}
