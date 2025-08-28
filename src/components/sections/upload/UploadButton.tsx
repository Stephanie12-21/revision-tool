"use client";
import { Loader2 } from "lucide-react";

interface UploadButtonProps {
  file: File | null;
  loading: boolean;
  onUpload: () => void;
}

export default function UploadButton({
  file,
  loading,
  onUpload,
}: UploadButtonProps) {
  const disabled = !file || loading;

  return (
    <button
      onClick={onUpload}
      disabled={disabled}
      className="inline-flex items-center gap-3 px-10 py-4 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
      style={{ background: "linear-gradient(135deg, #ffe052, #ff933d)" }}
    >
      {loading ? (
        <>
          <Loader2 className="h-6 w-6 animate-spin" />
          Analyse en cours...
        </>
      ) : (
        <>Analyser le document</>
      )}
    </button>
  );
}
