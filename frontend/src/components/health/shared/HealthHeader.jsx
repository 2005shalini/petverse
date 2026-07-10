import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

/**
 * HealthHeader — Reusable page header for all Health domain pages.
 *
 * Props:
 *  - pets          Array of pet objects
 *  - selectedPetId Currently selected pet ID
 *  - onChangePet   Callback(petId)
 *  - accentColor   Tailwind color name e.g. "emerald" | "rose" | "indigo"
 *  - actionLabel   Text for the primary CTA button (optional)
 *  - onAction      Callback for primary CTA (optional)
 *  - actionIcon    Lucide icon component (optional, defaults to Plus)
 */
export default function HealthHeader({
  pets = [],
  selectedPetId = "",
  onChangePet = () => {},
  accentColor = "emerald",
  actionLabel,
  onAction,
  actionIcon: ActionIcon = Plus,
  extraContent
}) {
  const colorMap = {
    emerald: {
      selected: "border-emerald-500 bg-emerald-50 text-emerald-700",
      btn: "from-emerald-500 to-cyan-500 shadow-emerald-500/20 hover:shadow-emerald-500/30"
    },
    rose: {
      selected: "border-rose-500 bg-rose-50 text-rose-700",
      btn: "from-rose-500 to-red-500 shadow-rose-500/20 hover:shadow-rose-500/30"
    },
    indigo: {
      selected: "border-indigo-500 bg-indigo-50 text-indigo-700",
      btn: "from-indigo-500 to-violet-500 shadow-indigo-500/20 hover:shadow-indigo-500/30"
    },
    teal: {
      selected: "border-teal-500 bg-teal-50 text-teal-700",
      btn: "from-teal-500 to-emerald-500 shadow-teal-500/20 hover:shadow-teal-500/30"
    },
    amber: {
      selected: "border-amber-500 bg-amber-50 text-amber-700",
      btn: "from-amber-500 to-orange-500 shadow-amber-500/20 hover:shadow-amber-500/30"
    }
  };

  const colors = colorMap[accentColor] || colorMap.emerald;

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Pet Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {pets.map((p) => {
          const isSelected = p.id === selectedPetId;
          return (
            <motion.button
              key={p.id}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onChangePet(p.id)}
              className={`
                flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-bold transition-all shrink-0
                ${isSelected ? colors.selected : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}
              `}
            >
              {(p.profileImage || p.image) && (
                <img
                  src={p.profileImage || p.image}
                  alt={p.name}
                  className="h-6 w-6 rounded-full object-cover border border-slate-200"
                />
              )}
              <span>{p.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Right side: extra content + primary action */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {extraContent}
        {actionLabel && onAction && (
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onAction}
            className={`
              inline-flex items-center justify-center gap-2 rounded-2xl
              bg-gradient-to-r ${colors.btn}
              px-6 py-3 font-bold text-white shadow-lg transition-all hover:shadow-xl
            `}
          >
            <ActionIcon size={17} />
            <span>{actionLabel}</span>
          </motion.button>
        )}
      </div>
    </div>
  );
}
