import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Bot } from "lucide-react";

export default function SummaryCard({ title = "Analysis summary", description = "", children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm overflow-hidden space-y-3">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Bot size={17} />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-800">{title}</h4>
            {description && <p className="text-[10px] font-semibold text-slate-400 mt-0.5">{description}</p>}
          </div>
        </div>
        <div className="text-slate-400 hover:text-slate-600 transition">
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Collapsible Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 pt-3 space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
