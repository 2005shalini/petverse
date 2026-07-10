import React, { useMemo } from "react";
import { CheckSquare, Square, BellRing, Clock, Star, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function ReminderCard({ reminder, onComplete, onSnooze, onDelete }) {
  const isCompleted = reminder.status === "Completed";
  const isMissed = reminder.status === "Missed";

  // Calculate countdown time label
  const countdownLabel = useMemo(() => {
    if (isCompleted) return "Completed";
    const remDateTime = new Date(`${reminder.date}T${convertTo24Hour(reminder.time)}`);
    const diff = remDateTime.getTime() - Date.now();
    
    if (diff < 0) {
      return isMissed ? "Missed Task" : "Overdue Task";
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours === 0) {
      return `Due in ${mins}m`;
    }
    return `Due in ${hours}h ${mins}m`;
  }, [reminder, isCompleted, isMissed]);

  const priorityColor = reminder.priority === "high" ? "border-l-4 border-l-rose-500" : "border-l-4 border-l-amber-500";
  const textStrike = isCompleted ? "line-through text-slate-400" : "text-slate-800";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
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
        ${priorityColor}
        ${isCompleted ? "opacity-75" : ""}
      `}
    >
      {/* Checkbox button */}
      <button
        onClick={() => onComplete(reminder.id)}
        className="text-slate-400 hover:text-emerald-500 transition shrink-0 mt-0.5"
      >
        {isCompleted ? (
          <CheckSquare size={20} className="text-emerald-500 fill-emerald-50" />
        ) : (
          <Square size={20} />
        )}
      </button>

      {/* Info content */}
      <div className="flex-1 min-w-0 text-left">
        <div>
          <span className={`font-bold text-sm ${textStrike}`}>{reminder.title}</span>
          <div className="flex flex-wrap gap-2 mt-1.5">
            <span className="text-[9px] uppercase font-black tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
              {reminder.type}
            </span>
            <span className="text-[9px] uppercase font-black tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600">
              Repeat: {reminder.repeat}
            </span>
            {reminder.pet && (
              <span className="text-[9px] uppercase font-black tracking-wider px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-600">
                Pet: {reminder.pet.name}
              </span>
            )}
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed font-semibold mt-2">
          {reminder.description}
        </p>

        {/* Date / Time summary */}
        <div className="flex gap-4 mt-3 text-[10px] font-bold text-slate-400">
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {reminder.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {reminder.time}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-2 shrink-0 self-start">
        {/* Countdown Badge */}
        <span className={`
          text-[9px]
          font-black
          uppercase
          tracking-wider
          px-2.5
          py-1
          rounded-lg
          ${
            isCompleted
              ? "bg-slate-100 text-slate-400"
              : isMissed || countdownLabel.includes("Overdue")
              ? "bg-rose-50 text-rose-600 border border-rose-100"
              : "bg-amber-50 text-amber-600 border border-amber-100"
          }
        `}>
          {countdownLabel}
        </span>

        {/* Snooze and Delete options */}
        {!isCompleted && (
          <button
            onClick={() => onSnooze(reminder.id)}
            className="flex items-center justify-center gap-1 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200/50 py-1.5 px-2.5 text-[10px] font-black text-slate-500 transition"
          >
            <BellRing size={10} />
            SNOOZE 15m
          </button>
        )}
      </div>
    </motion.div>
  );
}

// Utility helper to convert "10:30 AM" to "10:30"
function convertTo24Hour(timeStr) {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":");
  if (hours === "12") hours = "00";
  if (modifier === "PM") hours = parseInt(hours, 10) + 12;
  return `${hours.toString().padStart(2, "0")}:${minutes}`;
}
