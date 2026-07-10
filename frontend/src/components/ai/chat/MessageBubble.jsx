import React, { useState } from "react";
import { Copy, RefreshCw, ThumbsUp, ThumbsDown, Check, Sparkles } from "lucide-react";
import AIAvatar from "../shared/AIAvatar";
import MarkdownRenderer from "../shared/MarkdownRenderer";

export default function MessageBubble({ message, onRegenerate }) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(null); // 'like' | 'dislike' | null

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-4 ${isUser ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      {!isUser ? (
        <AIAvatar size="sm" animate={false} />
      ) : (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-200 border border-slate-300 text-slate-600 font-extrabold text-xs">
          U
        </div>
      )}

      {/* Bubble Panel */}
      <div className={`flex-1 max-w-[85%] space-y-1.5`}>
        {/* Username/Label */}
        <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ${isUser ? "justify-end" : ""}`}>
          <span>{isUser ? "You" : "VetCare AI"}</span>
          <span>·</span>
          <span>{message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"}</span>
        </div>

        {/* Text Container */}
        <div
          className={`rounded-3xl px-5 py-4 shadow-sm border ${
            isUser
              ? "bg-slate-900 border-slate-800 text-white rounded-tr-none"
              : "bg-white border-slate-200 text-slate-700 rounded-tl-none"
          }`}
        >
          {isUser ? (
            <p className="text-sm font-semibold leading-relaxed whitespace-pre-wrap">{message.text}</p>
          ) : (
            <div className="space-y-4">
              <MarkdownRenderer content={message.text} />
              
              {/* Locked pro features footer */}
              {message.text.includes("Pro") && (
                <div className="inline-flex items-center gap-1.5 rounded-xl bg-violet-50 text-violet-700 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider border border-violet-100">
                  <Sparkles size={11} className="text-violet-500 animate-pulse" />
                  <span>PetVerse Pro Exclusive Preview</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions Row */}
        {!isUser && (
          <div className="flex items-center gap-3 pl-1">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[10px] font-extrabold text-slate-400 hover:text-slate-600 transition"
            >
              {copied ? (
                <>
                  <Check size={11} className="text-emerald-500" />
                  <span className="text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={11} />
                  <span>Copy</span>
                </>
              )}
            </button>
            {onRegenerate && (
              <button
                onClick={() => onRegenerate(message.text)}
                className="flex items-center gap-1 text-[10px] font-extrabold text-slate-400 hover:text-slate-600 transition"
              >
                <RefreshCw size={11} />
                <span>Regenerate</span>
              </button>
            )}
            <div className="flex items-center gap-1 ml-2 border-l border-slate-200 pl-3">
              <button
                onClick={() => setLiked(liked === "like" ? null : "like")}
                className={`p-1 rounded transition ${liked === "like" ? "text-emerald-600 bg-emerald-50" : "text-slate-400 hover:text-slate-600"}`}
              >
                <ThumbsUp size={11} />
              </button>
              <button
                onClick={() => setLiked(liked === "dislike" ? null : "dislike")}
                className={`p-1 rounded transition ${liked === "dislike" ? "text-rose-600 bg-rose-50" : "text-slate-400 hover:text-slate-600"}`}
              >
                <ThumbsDown size={11} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
