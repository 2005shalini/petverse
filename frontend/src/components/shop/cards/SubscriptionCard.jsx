import React from "react";
import { Sparkles, Calendar, Check } from "lucide-react";

export default function SubscriptionCard({
  price = 0,
  discountPercent = 10,
  intervalWeeks = 4,
  selected = false,
  onSelect = () => {}
}) {
  const finalPrice = price * (1 - discountPercent / 100);

  return (
    <div
      onClick={onSelect}
      className={`relative rounded-3xl border-2 p-5 cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
        selected
          ? "border-emerald-500 bg-emerald-50/50 shadow-md shadow-emerald-500/5"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-emerald-500" />
            <span className="text-xs font-black text-slate-800">Auto-Ship Delivery</span>
          </div>
          <p className="text-[10px] font-semibold text-slate-400">
            Delivered every {intervalWeeks} weeks
          </p>
        </div>

        {/* Selected circle indicator */}
        <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
          selected ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300 bg-white"
        }`}>
          {selected && <Check size={11} />}
        </div>
      </div>

      <div className="flex items-baseline gap-1.5 border-t border-slate-100 pt-3">
        <span className="text-base font-black text-slate-800">${finalPrice.toFixed(2)}</span>
        <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-100/50 px-1.5 py-0.5 rounded">
          Save {discountPercent}%
        </span>
      </div>
    </div>
  );
}
