import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Mic, X } from "lucide-react";

export default function ChatInput({ onSend, disabled = false }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-slate-100 bg-white p-4">
      <div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-emerald-400 focus-within:bg-white transition-all shadow-sm">
        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask VetCare AI about health history, vaccine schedules, or meal goals..."
          className="flex-1 resize-none bg-transparent py-1 text-sm font-semibold text-slate-700 placeholder-slate-400 outline-none leading-relaxed"
          style={{ maxHeight: 120 }}
          disabled={disabled}
        />

        <div className="flex items-center gap-2 shrink-0 pb-0.5">
          <button
            type="button"
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl transition"
            title="Attach file (mocked)"
          >
            <Paperclip size={16} />
          </button>
          <button
            type="button"
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl transition"
            title="Voice input (mocked)"
          >
            <Mic size={16} />
          </button>
          <button
            type="submit"
            disabled={!text.trim() || disabled}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-md hover:shadow-lg transition-all disabled:opacity-40 disabled:hover:shadow-none"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </form>
  );
}
