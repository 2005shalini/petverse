import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function SuggestedPrompt({ label = "", onClick = () => {} }) {
  return (
    <motion.button
      whileHover={{ y: -1.5, borderColor: "#10b981", color: "#065f46" }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(label)}
      className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition-all hover:bg-emerald-50 shadow-sm"
    >
      <span className="flex-1 text-left line-clamp-1">{label}</span>
      <ChevronRight size={13} className="text-slate-400 shrink-0" />
    </motion.button>
  );
}
