import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import NotificationBadge from "./NotificationBadge";

export default function NotificationBell({ unreadCount, onClick }) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (unreadCount > 0) {
      setShouldAnimate(true);
      const timer = setTimeout(() => setShouldAnimate(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [unreadCount]);

  return (
    <button
      onClick={onClick}
      className="
        relative
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-3
        transition
        hover:border-emerald-300
        hover:bg-emerald-50/50
        outline-none
      "
    >
      <motion.div
        animate={shouldAnimate ? {
          rotate: [0, -15, 15, -10, 10, -5, 5, 0],
          scale: [1, 1.1, 1]
        } : {}}
        transition={{ duration: 0.8 }}
      >
        <Bell size={18} className="text-slate-600" />
      </motion.div>
      <NotificationBadge count={unreadCount} />
    </button>
  );
}
