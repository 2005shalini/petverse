import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Hash, Flame } from "lucide-react";
import DashboardLayout from "@/components/dashboard/layout";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import PostCard from "@/components/community/cards/PostCard";
import { useCommunity } from "@/hooks/useCommunity";

const TRENDS = [
  { tag: "#VetVisit", count: "2.4k posts" },
  { tag: "#DogTraining", count: "1.8k posts" },
  { tag: "#CatLife", count: "982 posts" },
  { tag: "#ProTips", count: "650 posts" },
  { tag: "#GoldenRetriever", count: "510 posts" }
];

export default function TrendingPage() {
  const { posts, likePost, bookmarkPost } = useCommunity();
  const [selectedTag, setSelectedTag] = useState("#VetVisit");

  const filteredPosts = posts.filter((p) =>
    p.content.toLowerCase().includes(selectedTag.toLowerCase())
  );

  return (
    <DashboardLayout pageTitle="Trending Topics" pageDescription="Explore popular tags and join trending conversations.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side - Trending list (Span 1) */}
        <div className="space-y-6">
          {/* Back to feed shortcut */}
          <Link
            to="/community"
            className="flex items-center gap-2 font-bold text-slate-800 text-sm hover:text-emerald-600 transition text-left"
          >
            <ArrowLeft size={16} />
            Back to feed
          </Link>

          <GlassCard className="p-6 text-left" hover={false}>
            <div className="flex items-center gap-2 mb-6 font-bold text-slate-800">
              <Flame size={18} className="text-orange-500" />
              <span>Trending Hashtags</span>
            </div>
            
            <div className="space-y-2">
              {TRENDS.map((t) => (
                <button
                  key={t.tag}
                  onClick={() => setSelectedTag(t.tag)}
                  className={`
                    w-full
                    flex
                    items-center
                    justify-between
                    px-4
                    py-3
                    rounded-xl
                    transition
                    outline-none
                    font-bold
                    text-sm
                    ${
                      selectedTag === t.tag
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : "hover:bg-slate-50 text-slate-600"
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    <Hash size={14} className="text-slate-400" />
                    {t.tag}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{t.count}</span>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Side - Filtered Posts feed (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between text-left">
            <h3 className="text-lg font-black text-slate-800">
              Discussions in {selectedTag}
            </h3>
            <span className="text-xs text-slate-400 font-semibold">
              {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""} found
            </span>
          </div>

          <div className="space-y-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={likePost}
                  onBookmark={bookmarkPost}
                />
              ))
            ) : (
              <div className="rounded-[24px] border border-slate-200 bg-white p-12 text-center text-slate-400 font-semibold">
                No active posts found with this tag. Create a post and add {selectedTag} to start!
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
