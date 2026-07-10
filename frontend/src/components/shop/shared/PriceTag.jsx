import React from "react";

export default function PriceTag({ price = 0, discount = 0, size = "sm" }) {
  const finalPrice = discount ? price * (1 - discount / 100) : price;

  const sizeClasses = {
    xs: "text-xs font-black",
    sm: "text-sm font-black",
    md: "text-base font-black",
    lg: "text-xl font-black",
    xl: "text-2xl font-black"
  };

  const originalSizeClasses = {
    xs: "text-[9px]",
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
    xl: "text-base"
  };

  return (
    <div className="flex items-center gap-1.5 font-bold">
      <span className={`text-slate-900 ${sizeClasses[size]}`}>
        ${finalPrice.toFixed(2)}
      </span>
      {discount > 0 && (
        <>
          <span className={`text-slate-400 line-through ${originalSizeClasses[size]}`}>
            ${price.toFixed(2)}
          </span>
          <span className="rounded bg-rose-50 border border-rose-100 px-1 py-0.5 text-[9px] font-black uppercase text-rose-600">
            {discount}% OFF
          </span>
        </>
      )}
    </div>
  );
}
