import React from "react";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { motion } from "framer-motion";

export default function ReactionBar({
  likesCount = 0,
  commentsCount = 0,
  sharesCount = 0,
  isLiked = false,
  isBookmarked = false,
  onLike,
  onCommentClick,
  onShare,
  onBookmark,
  className = ""
}) {
  return (
    <div className={`flex items-center justify-between border-t border-slate-100 pt-4 mt-4 ${className}`}>
      {/* Likes */}
      <button
        onClick={onLike}
        className="flex items-center gap-2 group text-slate-500 hover:text-rose-500 transition-colors text-sm font-semibold"
      >
        <motion.span
          whileTap={{ scale: 1.3 }}
          className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
            isLiked ? "bg-rose-50 text-rose-500" : "bg-slate-50 group-hover:bg-rose-50"
          }`}
        >
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
        </motion.span>
        <span>{likesCount}</span>
      </button>

      {/* Comments */}
      <button
        onClick={onCommentClick}
        className="flex items-center gap-2 group text-slate-500 hover:text-emerald-500 transition-colors text-sm font-semibold"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 group-hover:bg-emerald-50 transition">
          <MessageCircle size={18} />
        </div>
        <span>{commentsCount}</span>
      </button>

      {/* Share */}
      <button
        onClick={onShare}
        className="flex items-center gap-2 group text-slate-500 hover:text-cyan-500 transition-colors text-sm font-semibold"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 group-hover:bg-cyan-50 transition">
          <Share2 size={18} />
        </div>
        <span>{sharesCount}</span>
      </button>

      {/* Bookmark */}
      <button
        onClick={onBookmark}
        className="flex items-center gap-2 group text-slate-500 hover:text-violet-500 transition-colors text-sm font-semibold"
      >
        <motion.span
          whileTap={{ scale: 1.3 }}
          className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
            isBookmarked ? "bg-violet-50 text-violet-500" : "bg-slate-50 group-hover:bg-violet-50"
          }`}
        >
          <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
        </motion.span>
      </button>
    </div>
  );
}
