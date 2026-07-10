import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function OrderSummary({
  subtotal = 0,
  discount = 0,
  shipping = 0,
  total = 0,
  checkoutPath = "/shop/checkout",
  actionLabel = "Proceed to Checkout"
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
      <h4 className="text-base font-black text-slate-800 tracking-tight">Order Summary</h4>
      
      <div className="space-y-2 border-b border-slate-100 pb-3 text-xs font-semibold text-slate-500">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="text-slate-800 font-extrabold">${subtotal.toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-rose-600">
            <span>Coupon Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-slate-800 font-extrabold">
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-baseline border-b border-slate-100 pb-3">
        <span className="text-sm font-black text-slate-800">Total Price</span>
        <span className="text-xl font-black text-slate-900">${total.toFixed(2)}</span>
      </div>

      {actionLabel && (
        <Link
          to={checkoutPath}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3 text-xs font-black text-white hover:bg-slate-800 shadow-md hover:shadow-lg transition-all"
        >
          <span>{actionLabel}</span>
          <ArrowRight size={13} />
        </Link>
      )}

      <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-400">
        <ShieldCheck size={12} className="text-emerald-500" />
        <span>Secure Checkout · Guaranteed safety</span>
      </div>
    </div>
  );
}
