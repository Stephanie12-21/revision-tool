"use client";

import { useEffect, useState } from "react";

interface QuizQuestion {
  question: string;
  answer: string;
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("quizQuestions");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) setQuestions(parsed);
      } catch (err) {
        console.error("Erreur lors de la lecture des questions:", err);
      }
    }
  }, []);

  if (!questions.length)
    return <p className="p-8">Aucune question disponible.</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Quiz</h1>
      {questions.map((q, i) => (
        <div key={i} className="mb-4">
          <p className="font-semibold mb-1">{q.question}</p>
          <input
            type="text"
            placeholder="Votre réponse"
            className="mt-1 px-3 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      ))}
    </div>
  );
}
