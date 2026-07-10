import React from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

export default function AIAvatar({ size = "md", animate = true }) {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-11 w-11 text-sm",
    lg: "h-14 w-14 text-base"
  };

  const iconSizes = {
    sm: 15,
    md: 20,
    lg: 26
  };

  return (
    <div className="relative">
      {animate && (
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.4, 0.15] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 blur-sm`}
        />
      )}
      <div
        className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/20 border border-white/10 ${sizeClasses[size]}`}
      >
        <Bot size={iconSizes[size]} />
        <span className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
        </span>
      </div>
    </div>
  );
}
