"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface UploadButtonProps {
  file: File | null;
  loading: boolean;
  onUpload: () => void;
}

export default function UploadAnalyseButton({
  file,
  loading,
  onUpload,
}: UploadButtonProps) {
  const disabled = !file || loading;

  return (
    <Button
      onClick={onUpload}
      disabled={disabled}
      className="text-lg px-8 py-6 group shadow-lg hover:shadow-xl transition-all"
    >
      {loading ? (
        <>
          <Loader2 className="h-6 w-6 animate-spin" />
          Analyse en cours...
        </>
      ) : (
        <>Analyser le document</>
      )}
    </Button>
  );
}
