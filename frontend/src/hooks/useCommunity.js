import { useState, useEffect, useCallback } from "react";
import {
  getStoredPosts,
  saveStoredPosts,
  getStoredStories,
  saveStoredStories,
  getStoredLostPets,
  saveStoredLostPets,
  getStoredShelters,
  saveStoredShelters
} from "@/mock/community";
import { publishEvent } from "@/utils/events";

export function useCommunity() {
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [lostPets, setLostPets] = useState([]);
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    setPosts(getStoredPosts());
    setStories(getStoredStories());
    setLostPets(getStoredLostPets());
    setShelters(getStoredShelters());
  }, []);

  const addPost = useCallback((postContent, images = [], location = "", petTag = null) => {
    const activeUser = {
      id: "usr-current",
      name: "Shreyash Sharma",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      role: "Pet Parent"
    };

    const newPost = {
      id: `post-${Date.now()}`,
      author: activeUser,
      pet: petTag ? { id: petTag.id, name: petTag.name, breed: petTag.breed, image: petTag.profileImage } : null,
      content: postContent,
      images,
      videos: [],
      location,
      likes: [],
      comments: [],
      shares: 0,
      bookmarks: [],
      createdAt: new Date().toISOString()
    };

    setPosts((prev) => {
      const updated = [newPost, ...prev];
      saveStoredPosts(updated);
      return updated;
    });

    // Event Bus triggers
    publishEvent({
      type: "SOCIAL_POST",
      category: "community",
      title: "New Post Created",
      description: `You shared a post: "${postContent.substring(0, 40)}..."`,
      priority: "low",
      action: "/community",
      petId: petTag?.id || undefined
    });

    return newPost;
  }, []);

  const likePost = useCallback((postId) => {
    const currentUserId = "usr-current";
    setPosts((prev) => {
      const updated = prev.map((p) => {
        if (p.id === postId) {
          const isLiked = p.likes.includes(currentUserId);
          const likes = isLiked
            ? p.likes.filter((id) => id !== currentUserId)
            : [...p.likes, currentUserId];

          if (!isLiked && p.author.id !== currentUserId) {
            // Social interaction notification event
            publishEvent({
              type: "SOCIAL_LIKE",
              category: "community",
              title: "Social Reaction Received",
              description: `A user liked your post in ${p.location || "Community"}.`,
              priority: "low",
              action: `/community/post/${postId}`
            });
          }

          return { ...p, likes };
        }
        return p;
      });
      saveStoredPosts(updated);
      return updated;
    });
  }, []);

  const bookmarkPost = useCallback((postId) => {
    const currentUserId = "usr-current";
    setPosts((prev) => {
      const updated = prev.map((p) => {
        if (p.id === postId) {
          const isBookmarked = p.bookmarks.includes(currentUserId);
          const bookmarks = isBookmarked
            ? p.bookmarks.filter((id) => id !== currentUserId)
            : [...p.bookmarks, currentUserId];
          return { ...p, bookmarks };
        }
        return p;
      });
      saveStoredPosts(updated);
      return updated;
    });
  }, []);

  const addStory = useCallback((mediaUrl, petName = "") => {
    const newStory = {
      id: `story-${Date.now()}`,
      authorName: "Shreyash Sharma",
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      mediaUrl,
      mediaType: "image",
      petName,
      petBreed: petName ? "My Pet" : ""
    };

    setStories((prev) => {
      const updated = [newStory, ...prev];
      saveStoredStories(updated);
      return updated;
    });

    publishEvent({
      type: "SOCIAL_STORY",
      category: "community",
      title: "Story Shared",
      description: "You posted a new story with your pet.",
      priority: "low",
      action: "/community"
    });
  }, []);

  const reportLostPet = useCallback((lostPetData) => {
    const newLostPet = {
      id: `lost-${Date.now()}`,
      status: "Lost",
      ...lostPetData
    };

    setLostPets((prev) => {
      const updated = [newLostPet, ...prev];
      saveStoredLostPets(updated);
      return updated;
    });

    publishEvent({
      type: "LOST_PET_ALERT",
      category: "community",
      title: `Emergency Alert: Lost Pet`,
      description: `${newLostPet.petName} (a ${newLostPet.breed}) was lost near ${newLostPet.location}. Reward: ${newLostPet.reward}`,
      priority: "high",
      action: "/community/lost-found"
    });
  }, []);

  const toggleLostPetStatus = useCallback((lostPetId) => {
    setLostPets((prev) => {
      const updated = prev.map((pet) => {
        if (pet.id === lostPetId) {
          const nextStatus = pet.status === "Lost" ? "Found" : "Lost";

          if (nextStatus === "Found") {
            publishEvent({
              type: "LOST_PET_FOUND",
              category: "community",
              title: "Happy Reunion!",
              description: `${pet.petName} has been successfully reunited with their family.`,
              priority: "medium",
              action: "/community/lost-found"
            });
          }

          return { ...pet, status: nextStatus };
        }
        return pet;
      });
      saveStoredLostPets(updated);
      return updated;
    });
  }, []);

  return {
    posts,
    stories,
    lostPets,
    shelters,
    addPost,
    likePost,
    bookmarkPost,
    addStory,
    reportLostPet,
    toggleLostPetStatus
  };
}
