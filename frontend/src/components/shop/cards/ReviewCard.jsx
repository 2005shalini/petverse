import React from "react";
import { Star } from "lucide-react";

export default function ReviewCard({ review }) {
  if (!review) return null;

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-extrabold text-slate-800">{review.author}</span>
        <span className="text-[10px] font-semibold text-slate-400">
          {new Date(review.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      </div>

      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={11}
            className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}
          />
        ))}
      </div>

      <p className="text-xs font-semibold text-slate-500 leading-relaxed">
        {review.comment}
      </p>
    </div>
  );
}
