import React from "react";
import { HeartPulse, Bot, ShoppingBag, MessageSquare, Heart, Bell } from "lucide-react";

export default function NotificationIcon({ name, size = 18, className = "" }) {
  const icons = {
    HeartPulse,
    Bot,
    ShoppingBag,
    MessageSquare,
    Heart,
    Bell
  };

  const IconComp = icons[name] || Bell;
  return <IconComp size={size} className={className} />;
}
