import React from "react";
import { Package, ShieldAlert, Award, Stethoscope, ShoppingBag, Settings, Heart } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Items", icon: Package },
  { id: "Food & Nutrition", label: "Food & Diet", icon: Award },
  { id: "Supplements", label: "Supplements", icon: Heart },
  { id: "Medicine", label: "Medicine", icon: Stethoscope },
  { id: "Toys & Accessories", label: "Toys & Gear", icon: ShoppingBag },
  { id: "Grooming", label: "Grooming", icon: Settings }
];

export default function CategoryFilter({ active = "all", onChange = () => {} }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isActive = active === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`
              flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-2.5 text-xs font-bold transition-all
              ${isActive
                ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-500/5 font-extrabold"
                : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700"
              }
            `}
          >
            <Icon size={13} />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
