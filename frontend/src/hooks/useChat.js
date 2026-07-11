import { useState, useCallback, useEffect } from "react";
import { aiResponseTemplates } from "@/mock/ai";

export function useChat(activeConversation, onUpdateMessages) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Sync messages with active conversation
  useEffect(() => {
    if (activeConversation) {
      setMessages(activeConversation.messages || []);
    } else {
      setMessages([]);
    }
  }, [activeConversation]);

  const triggerBotResponse = useCallback((userText, pet, healthContext) => {
    setIsTyping(true);

    setTimeout(() => {
      let responseText = "";
      const text = userText.toLowerCase();
      const petName = pet?.name || "your pet";

      if (text.includes("health") || text.includes("summary")) {
        responseText = aiResponseTemplates.healthSummary(pet, healthContext?.latestRecord);
      } else if (text.includes("vaccin") || text.includes("vax") || text.includes("shot")) {
        responseText = aiResponseTemplates.vaccinationStatus(pet, healthContext?.vaccinations || []);
      } else if (text.includes("diet") || text.includes("nutrit") || text.includes("feed") || text.includes("eat")) {
        responseText = aiResponseTemplates.nutritionAdvice(pet, healthContext?.nutritionInfo);
      } else if (text.includes("weight") || text.includes("grow")) {
        responseText = aiResponseTemplates.weightAnalysis(pet, healthContext?.weightHistory || []);
      } else {
        responseText = aiResponseTemplates.generic(userText, petName);
      }

      const botMessage = {
        id: `msg-bot-${Date.now()}`,
        role: "assistant",
        text: responseText,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => {
        const next = [...prev, botMessage];
        if (activeConversation && onUpdateMessages) {
          onUpdateMessages(activeConversation.id, next, botMessage.text.substring(0, 60) + "...");
        }
        return next;
      });

      setIsTyping(false);
    }, 1500);
  }, [activeConversation, onUpdateMessages]);

  const sendMessage = useCallback((text, pet, healthContext) => {
    if (!text.trim()) return;

    const userMessage = {
      id: `msg-user-${Date.now()}`,
      role: "user",
      text: text,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => {
      const next = [...prev, userMessage];
      if (activeConversation && onUpdateMessages) {
        onUpdateMessages(activeConversation.id, next, userMessage.text);
      }
      return next;
    });

    triggerBotResponse(text, pet, healthContext);
  }, [activeConversation, onUpdateMessages, triggerBotResponse]);

  return {
    messages,
    isTyping,
    sendMessage,
    setMessages
  };
}
