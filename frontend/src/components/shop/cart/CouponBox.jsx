import React, { useState } from "react";
import { Tag, Check } from "lucide-react";

export default function CouponBox({ onApply, currentCode = "" }) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleApply = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    const ok = onApply(code);
    setStatus(ok ? "success" : "error");
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
      <div className="flex items-center gap-2">
        <Tag size={14} className="text-slate-400" />
        <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Promotional Coupons</span>
      </div>

      <form onSubmit={handleApply} className="flex gap-2">
        <input
          type="text"
          placeholder="e.g. PETVERSE10"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setStatus(null);
          }}
          className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-emerald-400 bg-slate-50 focus:bg-white transition"
        />
        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
        >
          Apply
        </button>
      </form>

      {status === "success" && (
        <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
          <Check size={11} />
          <span>Coupon applied successfully!</span>
        </p>
      )}

      {status === "error" && (
        <p className="text-[10px] font-bold text-rose-600">
          Invalid promo code. Try **PETVERSE10** or **PROACTIVE20**.
        </p>
      )}

      {currentCode && status !== "error" && (
        <p className="text-[10px] font-bold text-slate-400">
          Active coupon: <strong className="text-slate-700">{currentCode}</strong>
        </p>
      )}
    </div>
  );
}
