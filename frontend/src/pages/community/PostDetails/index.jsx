import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, Send } from "lucide-react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/layout";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import PostCard from "@/components/community/cards/PostCard";
import CommentCard from "@/components/community/cards/CommentCard";
import { usePosts } from "@/hooks/usePosts";
import { useCommunity } from "@/hooks/useCommunity";

export default function PostDetailsPage() {
  const { id } = useParams();
  const { post, addComment, sharePost } = usePosts(id);
  const { likePost, bookmarkPost } = useCommunity();
  const [commentText, setCommentText] = useState("");

  if (!post) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-slate-500 font-bold">Post not found.</p>
          <Link to="/community" className="text-emerald-500 font-bold mt-2 inline-block">
            Back to feed
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(commentText);
    setCommentText("");
  };

  return (
    <DashboardLayout pageTitle="Post Discussion" pageDescription="Read full details and participate in the discussion.">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Back navigation header */}
        <div className="flex items-center gap-3 text-left">
          <Link
            to="/community"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-600 transition"
          >
            <ArrowLeft size={18} />
          </Link>
          <span className="font-bold text-slate-800">Back to Social Feed</span>
        </div>

        {/* Primary Post Card */}
        <PostCard
          post={post}
          onLike={likePost}
          onBookmark={bookmarkPost}
          onShare={sharePost}
        />

        {/* Comments Header */}
        <div className="flex items-center gap-2 text-left font-bold text-slate-800 border-b border-slate-100 pb-3 mt-8">
          <MessageSquare size={18} className="text-emerald-500" />
          <span>Comments ({post.comments.length})</span>
        </div>

        {/* Create Comment Form */}
        <GlassCard className="p-4" hover={false}>
          <form onSubmit={handleSubmit} className="flex gap-3">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
              alt="me"
              className="h-10 w-10 rounded-xl object-cover"
            />
            <input
              type="text"
              placeholder="Write a comment, share your tips..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="
                flex-1
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                py-2.5
                text-sm
                outline-none
                transition
                focus:border-emerald-400
                focus:bg-white
              "
              required
            />
            <button
              type="submit"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md hover:opacity-95 transition"
            >
              <Send size={16} />
            </button>
          </form>
        </GlassCard>

        {/* Comments list */}
        <div className="space-y-4">
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))
          ) : (
            <p className="text-sm font-semibold text-slate-400 text-center py-6">
              No comments yet. Be the first to start the conversation!
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
