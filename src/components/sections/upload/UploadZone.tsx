"use client";
import { Upload, CheckCircle } from "lucide-react";

interface UploadZoneProps {
  file: File | null;
  dragActive: boolean;
  setFile: (file: File | null) => void;
  setDragActive: (state: boolean) => void;
}

export default function UploadZone({
  file,
  dragActive,
  setFile,
  setDragActive,
}: UploadZoneProps) {
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
        dragActive
          ? "bg-yellow-50 scale-[1.02] shadow-lg"
          : file
          ? "bg-green-50 shadow-md"
          : "border-orange-300 hover:bg-orange-50/50 hover:shadow-md"
      }`}
      style={{
        borderColor: dragActive ? "#ff933d" : file ? "#ffe052" : "#ffe052",
      }}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept=".pdf,.doc,.docx,.txt"
      />

      <div className="flex flex-col items-center gap-4">
        {file ? (
          <>
            <div
              className="p-3 rounded-full"
              style={{ backgroundColor: "#ffe052" }}
            >
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </>
        ) : (
          <>
            <div
              className="p-3 rounded-full"
              style={{ backgroundColor: "#ffe7c3" }}
            >
              <Upload className="h-8 w-8" style={{ color: "#ff933d" }} />
            </div>
            <div>
              <p className="text-lg font-semibold">
                Glissez votre document ici
              </p>
              <p className="text-sm text-muted-foreground">
                ou cliquez pour sélectionner
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Formats supportés: PDF, DOC, DOCX, TXT
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
