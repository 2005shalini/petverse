import { useState, useCallback, useEffect } from "react";
import { getStoredConversations, saveStoredConversations } from "@/mock/ai";

export function useConversation(activePetId) {
  const [conversations, setConversations] = useState([]);

  // Load initially
  useEffect(() => {
    setConversations(getStoredConversations());
  }, []);

  const petConversations = conversations.filter(c => !activePetId || c.petId === activePetId);

  const createConversation = useCallback((title, petId, petName) => {
    const newConv = {
      id: `conv-${Date.now()}`,
      title: title || "New Conversation",
      petId: petId || "general",
      petName: petName || "System",
      lastMessage: "No messages yet.",
      timestamp: new Date().toISOString(),
      messages: []
    };

    setConversations(prev => {
      const updated = [newConv, ...prev];
      saveStoredConversations(updated);
      return updated;
    });

    return newConv;
  }, []);

  const deleteConversation = useCallback((id) => {
    setConversations(prev => {
      const updated = prev.filter(c => c.id !== id);
      saveStoredConversations(updated);
      return updated;
    });
  }, []);

  const updateConversationMessages = useCallback((id, messages, lastMessage) => {
    setConversations(prev => {
      const updated = prev.map(c => {
        if (c.id === id) {
          return {
            ...c,
            messages,
            lastMessage: lastMessage || c.lastMessage,
            timestamp: new Date().toISOString()
          };
        }
        return c;
      });
      saveStoredConversations(updated);
      return updated;
    });
  }, []);

  const renameConversation = useCallback((id, newTitle) => {
    setConversations(prev => {
      const updated = prev.map(c => (c.id === id ? { ...c, title: newTitle } : c));
      saveStoredConversations(updated);
      return updated;
    });
  }, []);

  return {
    conversations,
    petConversations,
    createConversation,
    deleteConversation,
    updateConversationMessages,
    renameConversation
  };
}
