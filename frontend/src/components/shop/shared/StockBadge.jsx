import React from "react";

export default function StockBadge({ stock = 0 }) {
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= 5;

  const style = isOutOfStock
    ? "bg-rose-50 text-rose-700 border-rose-100"
    : isLowStock
      ? "bg-amber-50 text-amber-700 border-amber-100 animate-pulse"
      : "bg-emerald-50 text-emerald-700 border-emerald-100";

  const label = isOutOfStock ? "Out of stock" : isLowStock ? `Only ${stock} left` : "In stock";

  return (
    <span className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${style}`}>
      {label}
    </span>
  );
}
