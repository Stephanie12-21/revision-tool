"use client";

import UploadQuizButton from "@/components/sections/upload/UploadQuizButton";
import UploadZone from "@/components/sections/upload/UploadZone";
import axios from "axios";
import { useState } from "react";

interface QuizQuestion {
  question: string;
  reponses: { texte: string; correct?: boolean; explication?: string }[];
}

const QuizList = ({
  quiz,
  selectedAnswers,
  setSelectedAnswers,
  showCorrection = false,
}: {
  quiz: QuizQuestion[];
  selectedAnswers: string[];
  setSelectedAnswers: (answers: string[]) => void;
  showCorrection?: boolean;
}) => {
  const handleSelect = (questionIndex: number, answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  return (
    <div className="mt-6 md:mt-10 space-y-4 md:space-y-6">
      <h2 className="text-xl md:text-2xl font-semibold text-foreground text-balance">
        Quiz généré :
      </h2>
      <ul className="space-y-4 md:space-y-6">
        {quiz.map((q, i) => (
          <li
            key={i}
            className="p-3 md:p-4 rounded-xl bg-card shadow border border-border"
          >
            <p className="font-medium text-card-foreground text-base md:text-base leading-relaxed text-pretty">
              <span className="font-semibold">Q{i + 1}:</span> {q.question}
            </p>
            <div className="mt-2 md:mt-3 space-y-1.5 md:space-y-2">
              {q.reponses.map((r, j) => {
                const isSelected = selectedAnswers[i] === r.texte;
                const isCorrect = r.correct;

                // Classe pour la correction
                let labelClass =
                  "flex items-center gap-2 md:gap-3 cursor-pointer p-2 rounded-lg hover:bg-muted/50 transition-colors";
                if (showCorrection && isSelected) {
                  labelClass += isCorrect
                    ? " font-semibold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30"
                    : " font-semibold text-red-700 dark:text-red-400 line-through bg-red-100 dark:bg-red-900/30";
                } else if (showCorrection && isCorrect) {
                  labelClass +=
                    " font-semibold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30";
                }

                return (
                  <label key={j} className={labelClass}>
                    {!showCorrection && (
                      <input
                        type="radio"
                        name={`question-${i}`}
                        value={r.texte}
                        checked={isSelected}
                        onChange={() => handleSelect(i, r.texte)}
                        className="accent-primary flex-shrink-0 h-3 w-3 md:h-4 md:w-4 "
                      />
                    )}
                    <span className="text-base md:text-base leading-relaxed text-pretty">
                      {r.texte}
                    </span>
                  </label>
                );
              })}
            </div>
            {showCorrection && (
              <div className="mt-3 md:mt-4 p-3 bg-accent/10 rounded-lg border border-accent/30">
                {q.reponses.map(
                  (r, idx) =>
                    r.correct &&
                    r.explication && (
                      <p
                        key={idx}
                        className="font-medium text-accent-foreground text-base md:text-base leading-relaxed"
                      >
                        <span className="font-semibold underline">
                          Explication de la réponse
                        </span>{" "}
                        : {r.explication}
                      </p>
                    )
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const QuizPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showCorrection, setShowCorrection] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleGenerateQuiz = async () => {
    if (!file) {
      setError("Veuillez insérer un document.");
      return;
    }

    setLoading(true);
    setError(null);
    setShowCorrection(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("/api/quiz", formData);

      if (data.questions) {
        setQuiz(data.questions);
        setSelectedAnswers(Array(data.questions.length).fill(""));
      } else {
        setError("Aucune question générée. Vérifiez le fichier.");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckQuiz = () => {
    setShowCorrection(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Générateur de Quiz
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <UploadZone
          file={file}
          setFile={setFile}
          dragActive={dragActive}
          setDragActive={setDragActive}
        />

        <div className="flex justify-center mt-6 md:mt-8">
          <UploadQuizButton
            file={file}
            loading={loading}
            onUpload={handleGenerateQuiz}
          />
        </div>

        {error && (
          <div className="mt-4 md:mt-6 p-3 md:p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-destructive font-medium text-center text-base md:text-base">
              {error}
            </p>
          </div>
        )}

        {quiz.length > 0 && (
          <>
            <QuizList
              quiz={quiz}
              selectedAnswers={selectedAnswers}
              setSelectedAnswers={setSelectedAnswers}
              showCorrection={showCorrection}
            />

            {!showCorrection && (
              <div className="flex justify-center mt-6 md:mt-8">
                <button
                  onClick={handleCheckQuiz}
                  className="w-full max-w-xs md:w-auto px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground font-semibold rounded-lg shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-200 text-base md:text-base"
                >
                  Corriger le quiz
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default QuizPage;
