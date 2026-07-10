import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Receipt,
  FileSignature,
  Download,
  Eye,
  User,
  Calendar
} from "lucide-react";

const CATEGORY_CONFIG = {
  Certificate: {
    icon: ShieldCheck,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700"
  },
  "Lab Result": {
    icon: FlaskConical,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    badge: "bg-violet-100 text-violet-700"
  },
  Prescription: {
    icon: FileSignature,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    badge: "bg-indigo-100 text-indigo-700"
  },
  "Medical Report": {
    icon: Stethoscope,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    badge: "bg-cyan-100 text-cyan-700"
  },
  Invoice: {
    icon: Receipt,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700"
  },
  "Discharge Summary": {
    icon: FileText,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    badge: "bg-rose-100 text-rose-700"
  }
};

function getConfig(category) {
  return CATEGORY_CONFIG[category] || {
    icon: FileText,
    color: "text-slate-600",
    bg: "bg-slate-50",
    border: "border-slate-200",
    badge: "bg-slate-100 text-slate-600"
  };
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

/**
 * MedicalDocumentCard — Premium document card
 *
 * Props:
 *  - document    { id, name, category, uploadDate, doctor, clinic, fileSize, description, url }
 *  - onPreview   callback(document)
 *  - variant     "grid" | "list"
 */
export default function MedicalDocumentCard({ document, onPreview, variant = "grid" }) {
  if (!document) return null;

  const config = getConfig(document.category);
  const Icon = config.icon;
  const fileName = document.name || "Unnamed Document";
  const baseName = fileName.replace(/\.[^/.]+$/, "");

  const handleDownload = (e) => {
    e.stopPropagation();
    // Simulate download — would link to real file URL
    const link = window.document.createElement("a");
    link.href = document.url || "#";
    link.download = fileName;
    link.click();
  };

  if (variant === "list") {
    return (
      <motion.div
        whileHover={{ backgroundColor: "#f8fafc" }}
        className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-slate-300"
      >
        {/* Icon + Name */}
        <div className="flex items-center gap-3 min-w-0">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.bg} ${config.color}`}>
            <Icon size={18} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-800">{baseName}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${config.badge}`}>
                {document.category}
              </span>
              {document.fileSize && (
                <span className="text-[10px] font-semibold text-slate-400">{document.fileSize}</span>
              )}
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          {document.doctor && (
            <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
              <User size={11} />
              <span>{document.doctor}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-400">
            <Calendar size={11} />
            <span>{formatDate(document.uploadDate)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onPreview && onPreview(document)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <Eye size={13} />
            <span>Preview</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-1.5 text-[11px] font-bold text-white transition hover:bg-slate-800"
          >
            <Download size={13} />
            <span>Download</span>
          </button>
        </div>
      </motion.div>
    );
  }

  // Grid variant (default)
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 16px 40px -8px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.2 }}
      className={`group relative overflow-hidden rounded-[24px] border ${config.border} bg-white p-5 shadow-sm cursor-pointer transition-all`}
      onClick={() => onPreview && onPreview(document)}
    >
      {/* Top row: icon + category badge */}
      <div className="flex items-start justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${config.bg} ${config.color}`}>
          <Icon size={20} />
        </div>
        <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${config.badge}`}>
          {document.category}
        </span>
      </div>

      {/* File name */}
      <div className="mt-4 space-y-1">
        <p className="text-sm font-black text-slate-800 leading-snug line-clamp-2">{baseName}</p>
        {document.description && (
          <p className="text-[11px] font-semibold text-slate-500 leading-relaxed line-clamp-2">
            {document.description}
          </p>
        )}
      </div>

      {/* Meta footer */}
      <div className="mt-4 space-y-2 border-t border-slate-100 pt-3">
        {document.doctor && (
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
            <User size={11} className="text-slate-400" />
            <span className="truncate">{document.doctor}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
            <Calendar size={11} />
            <span>{formatDate(document.uploadDate)}</span>
          </div>
          {document.fileSize && (
            <span className="text-[10px] font-bold text-slate-300">{document.fileSize}</span>
          )}
        </div>
      </div>

      {/* Hover action overlay */}
      <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-white/95 p-3 backdrop-blur-sm transition-transform duration-200 group-hover:translate-y-0">
        <button
          onClick={(e) => { e.stopPropagation(); onPreview && onPreview(document); }}
          className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-200"
        >
          <Eye size={13} />
          <span>Preview</span>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleDownload(e); }}
          className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-slate-800"
        >
          <Download size={13} />
          <span>Download</span>
        </button>
      </div>
    </motion.div>
  );
}
