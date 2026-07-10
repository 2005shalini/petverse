import React from "react";
import { motion } from "framer-motion";
import {
  Pill,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Activity
} from "lucide-react";
import HealthBadge from "../shared/HealthBadge";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

/**
 * MedicationTimeline — Medication-specific chronological feed.
 *
 * Props:
 *  - medications  Array of medication objects from health records
 */
export default function MedicationTimeline({ medications = [] }) {
  if (medications.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-2xl bg-slate-50 border border-dashed border-slate-200">
        <div className="text-center">
          <Pill className="mx-auto mb-2 text-slate-300" size={28} />
          <p className="text-sm font-semibold text-slate-400">No medication history found.</p>
        </div>
      </div>
    );
  }

  // Sort by startDate descending
  const sorted = [...medications].sort(
    (a, b) => new Date(b.startDate || b.date || 0) - new Date(a.startDate || a.date || 0)
  );

  return (
    <div className="relative pl-6 border-l-2 border-slate-100 space-y-6 py-2">
      {sorted.map((med, idx) => {
        const isCompleted = med.completed;
        const isMissed = med.missed;

        const StatusIcon = isCompleted ? CheckCircle2 : isMissed ? XCircle : Clock;
        const dotColor = isCompleted
          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
          : isMissed
            ? "bg-rose-50 text-rose-600 border-rose-200"
            : "bg-indigo-50 text-indigo-600 border-indigo-200";

        const status = isCompleted ? "Completed" : isMissed ? "Cancelled" : "Active";

        return (
          <motion.div
            key={`${med.name}-${idx}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.4) }}
            className="relative group"
          >
            {/* Timeline dot */}
            <div
              className={`
                absolute -left-[35px] top-2 flex h-6 w-6 items-center justify-center
                rounded-full border-2 bg-white shadow-sm transition-transform duration-200 group-hover:scale-110
                ${dotColor}
              `}
            >
              <StatusIcon size={11} />
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500">
                    <Pill size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800">{med.name}</p>
                    <p className="text-[10px] font-semibold text-slate-400">{med.dosage} · {med.frequency}</p>
                  </div>
                </div>
                <HealthBadge status={status} size="xs" />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                  <Activity size={11} className="text-slate-400" />
                  <span>Duration: {med.duration || "—"}</span>
                </div>
                {med.startDate && (
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                    <Calendar size={11} className="text-slate-400" />
                    <span>Started: {formatDate(med.startDate)}</span>
                  </div>
                )}
                {med.endDate && (
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 col-span-2">
                    <Calendar size={11} className="text-slate-400" />
                    <span>Ended: {formatDate(med.endDate)}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
