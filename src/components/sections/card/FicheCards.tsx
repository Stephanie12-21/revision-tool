"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import GlobalCards from "./GlobalCards";

interface FicheCardProps {
  id: string;
  title: string; // brut reçu du backend (peut contenir <h2>, <i>, etc.)
  page?: number | null;
  isOpen: boolean;
  onToggle: (id: string) => void;
  onFullscreen: (title: string, content: string, icon: React.ReactNode) => void;
  content: string;
}

export default function FicheCard({
  id,
  title,
  page,
  isOpen,
  onToggle,
  onFullscreen,
  content,
}: FicheCardProps) {
  return (
    <GlobalCards
      id={id}
      rawTitle={title} // brut pour fullscreen
      title={
        <div className="flex items-center gap-2">
          <span dangerouslySetInnerHTML={{ __html: title }} />
          <span className="text-muted-foreground">(Page {page ?? "—"})</span>
        </div>
      }
      icon={<BookOpen className="h-5 w-5 text-orange-600" />}
      isOpen={isOpen}
      onToggle={onToggle}
      onFullscreen={onFullscreen}
      content={content}
    />
  );
}
