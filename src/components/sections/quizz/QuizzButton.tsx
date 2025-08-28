"use client";

interface QuizButtonProps {
  file: File | null;
  loading: boolean;
  quizQuestions: { question: string; answer: string }[];
  onGenerate: () => void;
}

export default function QuizButton({
  file,
  loading,
  onGenerate,
}: QuizButtonProps) {
  const disabled = !file || loading;

  return (
    <button
      disabled={disabled}
      onClick={onGenerate}
      className="inline-flex items-center gap-3 px-10 py-4 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
      style={{ background: "linear-gradient(135deg, #ffe052, #ff933d)" }}
    >
      Générer un quiz
    </button>
  );
}
