import React, { useState } from "react";
import { Plus, Bot, MessageSquare, Trash2, Edit2, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ConversationSidebar({
  conversations = [],
  activeId = "",
  onSelect = () => {},
  onCreate = () => {},
  onDelete = () => {},
  onRename = () => {}
}) {
  const [editingId, setEditingId] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const startRename = (e, id, title) => {
    e.stopPropagation();
    setEditingId(id);
    setEditTitle(title);
  };

  const saveRename = (e, id) => {
    e.stopPropagation();
    if (editTitle.trim()) {
      onRename(id, editTitle);
    }
    setEditingId("");
  };

  const cancelRename = (e) => {
    e.stopPropagation();
    setEditingId("");
  };

  return (
    <div className="flex h-full flex-col bg-white border-r border-slate-200">
      {/* Header action */}
      <div className="p-4 border-b border-slate-100">
        <button
          onClick={onCreate}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3 text-xs font-black text-white shadow-md hover:bg-slate-800 transition-all"
        >
          <Plus size={14} />
          <span>New Chat</span>
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin">
        {conversations.length === 0 ? (
          <div className="py-8 text-center text-slate-400">
            <MessageSquare className="mx-auto mb-2 opacity-50" size={20} />
            <p className="text-xs font-bold">No chats yet</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {conversations.map((c) => {
              const isActive = c.id === activeId;
              const isEditing = c.id === editingId;

              return (
                <motion.div
                  key={c.id}
                  layout
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => !isEditing && onSelect(c)}
                  className={`group relative flex items-center justify-between rounded-xl px-3 py-3 cursor-pointer transition-all border ${
                    isActive
                      ? "bg-emerald-50 border-emerald-100 text-emerald-700 font-extrabold"
                      : "border-transparent text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <MessageSquare size={14} className={isActive ? "text-emerald-600" : "text-slate-400"} />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveRename(e, c.id)}
                        className="w-full bg-white border border-slate-200 px-1.5 py-0.5 rounded text-xs outline-none font-bold text-slate-800 focus:border-emerald-400"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold leading-tight">{c.title}</p>
                        <p className="truncate text-[10px] text-slate-400 font-semibold mt-0.5">{c.lastMessage}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions overlay */}
                  {!isEditing && (
                    <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 bg-gradient-to-l from-slate-50 group-hover:from-slate-50 pl-3 transition-opacity">
                      <button
                        onClick={(e) => startRename(e, c.id, c.title)}
                        className="p-1 rounded text-slate-400 hover:text-slate-600 transition"
                      >
                        <Edit2 size={11} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(c.id);
                        }}
                        className="p-1 rounded text-slate-400 hover:text-rose-600 transition"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  )}

                  {isEditing && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => saveRename(e, c.id)}
                        className="p-0.5 rounded bg-emerald-100 text-emerald-700"
                      >
                        <Check size={11} />
                      </button>
                      <button
                        onClick={cancelRename}
                        className="p-0.5 rounded bg-slate-100 text-slate-600"
                      >
                        <X size={11} />
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
