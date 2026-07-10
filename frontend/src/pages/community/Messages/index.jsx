import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Send, Image as ImageIcon, Smile, Award, ArrowLeft } from "lucide-react";
import DashboardLayout from "@/components/dashboard/layout";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import MessageCard from "@/components/community/cards/MessageCard";
import { useMessaging } from "@/hooks/useMessaging";

export default function MessagesPage() {
  const {
    conversations,
    activeConvId,
    activeConversation,
    isTyping,
    selectConversation,
    sendMessage
  } = useMessaging();

  const [messageText, setMessageText] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scroll chat window to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation, isTyping]);

  const handleSendSubmit = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    sendMessage(messageText);
    setMessageText("");
  };

  return (
    <DashboardLayout pageTitle="Messages" pageDescription="Communicate directly with vets, shelters, and other pet parents.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[75vh] border border-slate-200/60 rounded-[30px] overflow-hidden bg-white/60 backdrop-blur-xl">
        
        {/* Left conversations panel */}
        <div className="border-r border-slate-100 flex flex-col h-full bg-white/40">
          <div className="p-4 border-b border-slate-100 flex items-center gap-2">
            <Link
              to="/community"
              className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-slate-100 text-slate-500 transition mr-1 lg:hidden"
            >
              <ArrowLeft size={16} />
            </Link>
            <span className="font-bold text-slate-800 text-base">Conversations</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {conversations.length > 0 ? (
              conversations.map((conv) => (
                <MessageCard
                  key={conv.id}
                  conversation={conv}
                  isActive={conv.id === activeConvId}
                  onClick={() => selectConversation(conv.id)}
                />
              ))
            ) : (
              <p className="text-xs text-slate-400 font-semibold text-center mt-12">
                No active conversations.
              </p>
            )}
          </div>
        </div>

        {/* Right chat screen pane */}
        <div className="lg:col-span-2 flex flex-col h-full bg-white justify-between">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3 text-left">
                  <img
                    src={activeConversation.participant.avatar}
                    alt={activeConversation.participant.name}
                    className="h-10 w-10 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5 leading-none">
                      {activeConversation.participant.name}
                      <Award size={14} className="text-emerald-500" />
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold mt-1 block">
                      {activeConversation.participant.role} • {activeConversation.participant.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Message History logs */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {activeConversation.messages.map((msg) => {
                  const isMe = msg.sender === "me";
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[70%]
                          rounded-[20px]
                          px-4
                          py-3
                          text-sm
                          font-medium
                          text-left
                          whitespace-pre-line
                          ${
                            isMe
                              ? "bg-slate-800 text-white rounded-br-sm shadow-sm"
                              : "bg-slate-50 border border-slate-100 text-slate-700 rounded-bl-sm"
                          }
                        `}
                      >
                        <p>{msg.text}</p>
                        {msg.mediaUrl && (
                          <img
                            src={msg.mediaUrl}
                            alt="attachment"
                            className="mt-2 rounded-xl max-h-[150px] object-cover"
                          />
                        )}
                        <span
                          className={`
                            block
                            text-[9px]
                            font-semibold
                            mt-1.5
                            text-right
                            ${isMe ? "text-white/60" : "text-slate-400"}
                          `}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Simulated Typing indicator bubble */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-50 border border-slate-100 rounded-[20px] rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Text Area Form input panel */}
              <form onSubmit={handleSendSubmit} className="p-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => sendMessage("", "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80")}
                  className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 text-slate-400 hover:text-slate-600 transition outline-none"
                >
                  <ImageIcon size={18} />
                </button>
                
                <input
                  type="text"
                  placeholder="Type your message, ask a question..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="
                    flex-1
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-emerald-400
                    focus:bg-white
                  "
                />

                <button
                  type="submit"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md hover:opacity-95 transition shrink-0"
                >
                  <Send size={16} />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 space-y-2">
              <span className="font-bold text-slate-800 text-base">Select a Conversation</span>
              <p className="text-xs text-slate-400 leading-normal max-w-xs">
                Click any chat thread in the sidebar list to view medical consultations, shelter responses or social messages.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
