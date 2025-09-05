"use client";
import { useRouter } from "next/navigation";

const Homepage = () => {
  const router = useRouter();

  const handleRedirectToAnalysePage = () => {
    router.push("/analyse");
  };

  const handleRedirectToQuizPage = () => {
    router.push("/quiz");
  };
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-orange-100">
      <div className="flex gap-5">
        <button
          onClick={handleRedirectToAnalysePage}
          className="inline-flex items-center gap-3 px-10 py-4 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
          style={{ background: "linear-gradient(135deg, #ffe052, #ff933d)" }}
        >
          Créer les fiches de révisions
        </button>
        <button
          onClick={handleRedirectToQuizPage}
          className="inline-flex items-center gap-3 px-10 py-4 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
          style={{ background: "linear-gradient(135deg, #ffe052, #ff933d)" }}
        >
          Créer un quiz
        </button>
      </div>
    </main>
  );
};

export default Homepage;
