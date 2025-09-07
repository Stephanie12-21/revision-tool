"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GlobalCardsProps {
  id: string;
  title: React.ReactNode;
  rawTitle: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: (id: string) => void;
  onFullscreen: (title: string, content: string, icon: React.ReactNode) => void;
  content: string;
  className?: string;
}

export default function GlobalCards({
  id,
  title,
  rawTitle,
  icon,
  onToggle,
  onFullscreen,
  className,
  content,
}: GlobalCardsProps) {
  return (
    <Card className="group shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
      <CardHeader
        className="flex flex-row items-center justify-between cursor-pointer"
        onClick={() => onToggle(id)}
      >
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-100">{icon}</div>
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition"
            onClick={(e) => {
              e.stopPropagation();
              // On envoie bien le titre brut (string) au fullscreen
              onFullscreen(rawTitle, content, icon);
            }}
          >
            <Maximize2 className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent
        className={`max-h-64 overflow-y-auto prose prose-slate ${className}`}
      >
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </CardContent>
    </Card>
  );
}
