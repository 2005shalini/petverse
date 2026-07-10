import { useState, useEffect, useCallback } from "react";
import { getStoredConversations, saveStoredConversations } from "@/mock/community";
import { publishEvent } from "@/utils/events";

export function useMessaging() {
  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const list = getStoredConversations();
    setConversations(list);
    if (list.length > 0) {
      setActiveConvId(list[0].id);
    }
  }, []);

  const selectConversation = useCallback((id) => {
    setActiveConvId(id);
  }, []);

  const activeConversation = conversations.find((c) => c.id === activeConvId) || null;

  const sendMessage = useCallback((text, mediaUrl = null) => {
    if (!text.trim() && !mediaUrl) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: "me",
      text,
      mediaUrl,
      timestamp: new Date().toISOString(),
      status: "sent"
    };

    setConversations((prev) => {
      const updated = prev.map((c) => {
        if (c.id === activeConvId) {
          const messages = [...c.messages, newMessage];
          return { ...c, messages };
        }
        return c;
      });
      saveStoredConversations(updated);
      return updated;
    });

    // Simulate Message Delivery status change
    setTimeout(() => {
      setConversations((prev) => {
        const updated = prev.map((c) => {
          if (c.id === activeConvId) {
            const messages = c.messages.map((m) =>
              m.id === newMessage.id ? { ...m, status: "delivered" } : m
            );
            return { ...c, messages };
          }
          return c;
        });
        saveStoredConversations(updated);
        return updated;
      });
    }, 800);

    // Simulate Reply & Typing Indicators
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const autoResponse = {
        id: `msg-reply-${Date.now()}`,
        sender: "them",
        text: `Thanks for reaching out! We have received your inquiry. One of our team members will get back to you shortly. 🐾`,
        timestamp: new Date().toISOString(),
        status: "read"
      };

      setConversations((prev) => {
        const updated = prev.map((c) => {
          if (c.id === activeConvId) {
            const messages = [...c.messages, autoResponse].map((m) =>
              m.sender === "me" ? { ...m, status: "read" } : m
            );
            return { ...c, messages };
          }
          return c;
        });
        saveStoredConversations(updated);
        return updated;
      });

      // Fire social/messaging notification on event bus
      publishEvent({
        type: "MESSAGE_RECEIVED",
        category: "community",
        title: `Message from ${activeConversation?.participant.name || "Shelter"}`,
        description: "Thanks for reaching out! We have received your inquiry...",
        priority: "low",
        action: "/community/messages"
      });
    }, 2500);
  }, [activeConvId, activeConversation]);

  const deleteConversation = useCallback((id) => {
    setConversations((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      saveStoredConversations(updated);
      if (activeConvId === id && updated.length > 0) {
        setActiveConvId(updated[0].id);
      }
      return updated;
    });
  }, [activeConvId]);

  return {
    conversations,
    activeConvId,
    activeConversation,
    isTyping,
    selectConversation,
    sendMessage,
    deleteConversation
  };
}
export default useMessaging;
