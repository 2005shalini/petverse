import React from "react";

export default function NotificationBadge({ count, className = "" }) {
  if (!count || count <= 0) return null;

  return (
    <span className={`
      absolute
      -top-1
      -right-1
      flex
      h-5
      min-w-[20px]
      items-center
      justify-center
      rounded-full
      bg-emerald-500
      px-1
      text-[9px]
      font-black
      text-white
      border-2
      border-white
      ${className}
    `}>
      {count > 99 ? "99+" : count}
    </span>
  );
}
