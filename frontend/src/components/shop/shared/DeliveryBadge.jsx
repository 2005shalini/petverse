import React from "react";
import { Truck } from "lucide-react";

export default function DeliveryBadge({ freeShipping = false }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500">
      <Truck size={12} className="text-emerald-500" />
      <span>{freeShipping ? "Free 2-day delivery" : "Standard shipping"}</span>
    </span>
  );
}
