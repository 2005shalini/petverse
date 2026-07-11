import React from "react";
import { motion } from "framer-motion";

export default function CommentCard({ comment }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100"
    >
      <img
        src={comment.author.avatar}
        alt={comment.author.name}
        className="h-9 w-9 rounded-xl object-cover border border-slate-200"
      />
      <div className="flex-1 text-left">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-800 text-sm">{comment.author.name}</span>
          <span className="text-[10px] text-slate-400 font-semibold">
            {new Date(comment.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-600 leading-relaxed font-medium">
          {comment.content}
        </p>
      </div>
    </motion.div>
  );
}
