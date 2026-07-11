import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import UserAvatar from "../shared/UserAvatar";
import LocationBadge from "../shared/LocationBadge";
import PetBadge from "../shared/PetBadge";
import MediaGallery from "../shared/MediaGallery";
import ReactionBar from "../shared/ReactionBar";

export default function PostCard({
  post,
  onLike,
  onBookmark,
  onShare,
  currentUserId = "usr-current"
}) {
  const isLiked = post.likes.includes(currentUserId);
  const isBookmarked = post.bookmarks.includes(currentUserId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full"
    >
      <GlassCard className="p-6 md:p-8" hover={true}>
        {/* Author Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <UserAvatar
            name={post.author.name}
            avatar={post.author.avatar}
            role={post.author.role}
          />
          <div className="flex flex-wrap gap-2">
            <PetBadge pet={post.pet} />
            <LocationBadge text={post.location} />
          </div>
        </div>

        {/* Post Text Content */}
        <p className="mt-5 text-sm md:text-base text-slate-700 leading-relaxed font-medium text-left">
          {post.content}
        </p>

        {/* Media Gallery */}
        <MediaGallery images={post.images} videos={post.videos} />

        {/* Footer info (Timestamp) */}
        <div className="mt-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <span>{new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
        </div>

        {/* Reaction Bar */}
        <ReactionBar
          likesCount={post.likes.length}
          commentsCount={post.comments.length}
          sharesCount={post.shares}
          isLiked={isLiked}
          isBookmarked={isBookmarked}
          onLike={() => onLike(post.id)}
          onBookmark={() => onBookmark(post.id)}
          onShare={() => onShare && onShare(post.id)}
          onCommentClick={() => {}} // Custom click or navigation
        />
        
        {/* Comment view shortcut */}
        <div className="mt-4 border-t border-slate-100 pt-3 flex justify-between items-center">
          <Link
            to={`/community/post/${post.id}`}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition"
          >
            View discussions ({post.comments.length} comments) →
          </Link>
        </div>
      </GlassCard>
    </motion.div>
  );
}
