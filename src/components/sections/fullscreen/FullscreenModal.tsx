"use client";
import { X } from "lucide-react";
import type React from "react";

interface FullscreenModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  icon: React.ReactNode;
  onClose: () => void;
}

export default function FullscreenModal({
  isOpen,
  title,
  content,
  icon,
  onClose,
}: FullscreenModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-8 border-b border-amber-200 bg-gradient-to-r from-yellow-50 to-amber-50">
          <div className="flex items-center gap-4">
            <div
              className="p-3 rounded-xl"
              style={{ backgroundColor: "#ffe7c3" }}
            >
              {icon}
            </div>
            <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-3 text-slate-400 hover:text-slate-600 rounded-xl transition-all duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div
            className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
}
