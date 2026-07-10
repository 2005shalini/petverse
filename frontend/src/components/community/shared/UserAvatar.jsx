import React from "react";

export default function UserAvatar({ name, avatar, role, size = "md", className = "" }) {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-11 w-11 text-sm",
    lg: "h-14 w-14 text-base",
    xl: "h-20 w-20 text-xl"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative shrink-0 rounded-2xl overflow-hidden border border-slate-200/50 bg-slate-100 ${sizeClasses[size]}`}>
        {avatar ? (
          <img src={avatar} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-bold text-slate-500 uppercase">
            {name ? name.substring(0, 2) : "PV"}
          </div>
        )}
      </div>
      {name && (
        <div className="text-left">
          <p className="font-semibold text-slate-800 leading-tight">{name}</p>
          {role && <p className="text-xs text-slate-500 font-medium mt-0.5">{role}</p>}
        </div>
      )}
    </div>
  );
}
