import { useState, useCallback } from "react";
import { getStoredPosts, saveStoredPosts } from "@/mock/community";
import { publishEvent } from "@/utils/events";

export function usePosts(postId) {
  const [post, setPost] = useState(() => {
    const allPosts = getStoredPosts();
    return allPosts.find((p) => p.id === postId) || null;
  });

  const refreshPost = useCallback(() => {
    const allPosts = getStoredPosts();
    const found = allPosts.find((p) => p.id === postId) || null;
    setPost(found);
  }, [postId]);

  const addComment = useCallback((commentText) => {
    if (!commentText.trim()) return;

    const activeUser = {
      name: "Shreyash Sharma",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
    };

    const newComment = {
      id: `c-${Date.now()}`,
      author: activeUser,
      content: commentText,
      createdAt: new Date().toISOString()
    };

    const allPosts = getStoredPosts();
    const updatedPosts = allPosts.map((p) => {
      if (p.id === postId) {
        const comments = [...p.comments, newComment];

        if (p.author.id !== "usr-current") {
          // Trigger event notifications
          publishEvent({
            type: "SOCIAL_COMMENT",
            category: "community",
            title: "New Comment Notification",
            description: `You commented: "${commentText.substring(0, 30)}..." on ${p.author.name}'s post.`,
            priority: "low",
            action: `/community/post/${postId}`
          });
        }

        return { ...p, comments };
      }
      return p;
    });

    saveStoredPosts(updatedPosts);
    const updatedPost = updatedPosts.find((p) => p.id === postId) || null;
    setPost(updatedPost);

    return newComment;
  }, [postId]);

  const sharePost = useCallback(() => {
    const allPosts = getStoredPosts();
    const updatedPosts = allPosts.map((p) => {
      if (p.id === postId) {
        return { ...p, shares: p.shares + 1 };
      }
      return p;
    });

    saveStoredPosts(updatedPosts);
    refreshPost();

    publishEvent({
      type: "SOCIAL_SHARE",
      category: "community",
      title: "Post Shared",
      description: "You shared a community post to your connections.",
      priority: "low",
      action: `/community/post/${postId}`
    });
  }, [postId, refreshPost]);

  return {
    post,
    addComment,
    sharePost,
    refreshPost
  };
}
export default usePosts;
