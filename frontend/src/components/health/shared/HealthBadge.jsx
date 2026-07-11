import React from "react";

/**
 * HealthBadge — Unified status badge for all health domain states.
 *
 * Props:
 *  - status   "Completed" | "Active" | "Upcoming" | "Overdue" | "Cancelled" |
 *             "Scheduled" | "Expired" | "Normal" | "Abnormal" | "Pending" | "Past"
 *  - size     "xs" | "sm" (default "sm")
 *  - className extra classes
 */

const STATUS_STYLES = {
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Active:    "bg-blue-50 text-blue-700 border-blue-200",
  Upcoming:  "bg-cyan-50 text-cyan-700 border-cyan-200",
  Scheduled: "bg-cyan-50 text-cyan-700 border-cyan-200",
  Overdue:   "bg-rose-50 text-rose-700 border-rose-200",
  Cancelled: "bg-slate-100 text-slate-500 border-slate-200",
  Expired:   "bg-orange-50 text-orange-700 border-orange-200",
  Normal:    "bg-emerald-50 text-emerald-700 border-emerald-200",
  Abnormal:  "bg-rose-50 text-rose-700 border-rose-200",
  Elevated:  "bg-amber-50 text-amber-700 border-amber-200",
  Pending:   "bg-amber-50 text-amber-700 border-amber-200",
  Past:      "bg-slate-100 text-slate-500 border-slate-200",
  "Vaccination Due": "bg-amber-50 text-amber-700 border-amber-200",
  Default:   "bg-slate-100 text-slate-600 border-slate-200"
};

export default function HealthBadge({ status = "Default", size = "sm", className = "" }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Default;
  const sizeClass = size === "xs"
    ? "px-2 py-0.5 text-[9px]"
    : "px-2.5 py-1 text-[10px]";

  return (
    <span
      className={`
        inline-flex items-center rounded-full border font-bold uppercase tracking-wider
        ${sizeClass} ${style} ${className}
      `}
    >
      {status}
    </span>
  );
}
