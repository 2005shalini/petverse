import React from "react";
import { Link } from "react-router-dom";
import { X, Check, HeartPulse, Bot, ShoppingBag, MessageSquare, Heart, Bell } from "lucide-react";
import { motion } from "framer-motion";

const ICONS = {
  HeartPulse: { icon: HeartPulse, color: "text-rose-500 bg-rose-50 border-rose-100" },
  Bot: { icon: Bot, color: "text-amber-500 bg-amber-50 border-amber-100" },
  ShoppingBag: { icon: ShoppingBag, color: "text-cyan-500 bg-cyan-50 border-cyan-100" },
  MessageSquare: { icon: MessageSquare, color: "text-blue-500 bg-blue-50 border-blue-100" },
  Heart: { icon: Heart, color: "text-emerald-500 bg-emerald-50 border-emerald-100" },
  Bell: { icon: Bell, color: "text-slate-500 bg-slate-50 border-slate-100" }
};

export default function NotificationCard({ notification, onRead, onDelete }) {
  const iconConfig = ICONS[notification.icon] || ICONS.Bell;
  const Icon = iconConfig.icon;

  const priorityBorders = {
    high: "border-l-4 border-l-rose-500",
    medium: "border-l-4 border-l-amber-500",
    low: ""
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`
        relative
        flex
        items-start
        gap-4
        p-5
        rounded-[24px]
        border
        border-slate-200/60
        bg-white
        transition
        hover:shadow-sm
        ${priorityBorders[notification.priority]}
        ${!notification.isRead ? "bg-slate-50/50" : ""}
      `}
    >
      {/* Read Status circle */}
      {!notification.isRead && (
        <span className="absolute top-5 left-2 h-2 w-2 rounded-full bg-emerald-500" />
      )}

      {/* Category Icon */}
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${iconConfig.color}`}>
        <Icon size={20} />
      </div>

      {/* Info content */}
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-start justify-between gap-4">
          <span className="font-bold text-slate-800 text-sm">{notification.title}</span>
          <span className="text-[10px] text-slate-400 font-bold shrink-0 mt-0.5">
            {new Date(notification.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed font-semibold mt-1">
          {notification.description}
        </p>

        {/* Action Link button */}
        {notification.action && (
          <Link
            to={notification.action}
            onClick={() => !notification.isRead && onRead(notification.id)}
            className="inline-flex items-center gap-1.5 mt-3 text-xs font-black text-emerald-600 hover:text-emerald-700 transition"
          >
            Take Action →
          </Link>
        )}
      </div>

      {/* Card Actions */}
      <div className="flex gap-1.5 shrink-0 self-start">
        {!notification.isRead && (
          <button
            onClick={() => onRead(notification.id)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition"
            title="Mark as Read"
          >
            <Check size={14} />
          </button>
        )}
        <button
          onClick={() => onDelete(notification.id)}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
          title="Delete Notification"
        >
          <X size={14} />
        </button>
      </div>
    </motion.div>
  );
}
