import React from "react";
import { motion } from "framer-motion";
import AIAvatar from "../shared/AIAvatar";

export default function TypingIndicator() {
  return (
    <div className="flex gap-4">
      <AIAvatar size="sm" animate={false} />
      <div className="flex-1 space-y-1.5">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <span>VetCare AI</span>
          <span>·</span>
          <span>Typing...</span>
        </div>
        <div className="inline-block rounded-3xl rounded-tl-none border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-2 w-2 rounded-full bg-slate-300"
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
