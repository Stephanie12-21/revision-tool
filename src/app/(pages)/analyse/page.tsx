"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FileText, HelpCircle } from "lucide-react";

import { formatQuestions, formatFicheContent } from "@/lib/formatters";
import UploadZone from "@/components/sections/upload/UploadZone";
import UploadAnalyseButton from "@/components/sections/upload/UploadAnalyseButton";
import GlobalCards from "@/components/sections/card/GlobalCards";
import FicheCard from "@/components/sections/card/FicheCards";
import FullscreenModal from "@/components/sections/fullscreen/FullscreenModal";

type FichePart = {
  titre: string;
  resume: string;
  points: string;
  numero_page?: number | null;
};

type ApiResult = {
  resume: string;
  questions: { generales: string; detaillees: string };
  fiche: string | FichePart[];
};

interface CardState {
  resume: boolean;
  questionsGenerales: boolean;
  questionsDetaillees: boolean;
  [key: string]: boolean;
}

export default function Analyse() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ApiResult>({
    resume: "",
    questions: { generales: "", detaillees: "" },
    fiche: [],
  });
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const [expandedCards, setExpandedCards] = useState<CardState>({
    resume: true,
    questionsGenerales: true,
    questionsDetaillees: true,
  });

  const [fullscreenModal, setFullscreenModal] = useState({
    isOpen: false,
    title: "",
    content: "",
    icon: null as React.ReactNode,
  });

  const toggleCard = (cardId: string) =>
    setExpandedCards((prev) => ({ ...prev, [cardId]: !prev[cardId] }));

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/api/analyser", formData);
      const payload = res.data ?? {
        resume: "",
        questions: { generales: "", detaillees: "" },
        fiche: [],
      };
      setResult(payload);

      const sheets = parseRevisionSheets(payload.fiche);
      const ficheStates: { [key: string]: boolean } = {};
      sheets.forEach((_, i) => (ficheStates[`fiche-${i}`] = true));
      setExpandedCards((prev) => ({ ...prev, ...ficheStates }));
    } catch (err) {
      console.error(err);
      setResult({
        resume: "❌ Erreur lors de l'analyse",
        questions: { generales: "❌ Erreur", detaillees: "❌ Erreur" },
        fiche: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const parseRevisionSheets = (fiche: string | FichePart[]) => {
    if (!fiche) return [];
    if (Array.isArray(fiche)) {
      return fiche.map((f) => ({
        title: f.titre ?? "Sans titre",
        content: `${f.resume ?? ""}${f.points ?? ""}`,
        page: typeof f.numero_page === "number" ? f.numero_page : null,
      }));
    }
    const parts = String(fiche).split(/<h2[^>]*>/);
    const sheets: { title: string; content: string; page: number | null }[] =
      [];
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      const titleMatch = part.match(/^([^<]+)<\/h2>/);
      const pageMatch = part.match(/data-page="(\d+)"/);
      if (titleMatch) {
        sheets.push({
          title: titleMatch[1].trim(),
          content: part.replace(/^[^<]+<\/h2>/, "").trim(),
          page: pageMatch ? parseInt(pageMatch[1], 10) : null,
        });
      }
    }
    return sheets;
  };

  const sheets = parseRevisionSheets(result.fiche);
  const hasResults =
    !!result.resume ||
    !!result.questions.generales ||
    !!result.questions.detaillees ||
    sheets.length > 0;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && fullscreenModal.isOpen) closeFullscreen();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [fullscreenModal.isOpen]);

  const openFullscreen = (
    title: string,
    content: string,
    icon: React.ReactNode
  ) => setFullscreenModal({ isOpen: true, title, content, icon });
  const closeFullscreen = () =>
    setFullscreenModal({ isOpen: false, title: "", content: "", icon: null });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/5">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Analyseur de Documents
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <UploadZone
          file={file}
          setFile={setFile}
          dragActive={dragActive}
          setDragActive={setDragActive}
        />
        <div className="flex justify-center mt-8 gap-4">
          <UploadAnalyseButton
            file={file}
            loading={loading}
            onUpload={handleUpload}
          />
        </div>

        {hasResults && (
          <section className="mt-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-8 flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              Résultats
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <GlobalCards
                id="resume"
                title="Résumé"
                rawTitle="Résumé"
                icon={<FileText className="h-6 w-6 text-primary" />}
                isOpen={expandedCards.resume}
                onToggle={toggleCard}
                onFullscreen={openFullscreen}
                content={result.resume}
              />
              <GlobalCards
                id="questionsGenerales"
                title="Questions Générales"
                rawTitle="Questions Générales"
                icon={<HelpCircle className="h-6 w-6 text-secondary" />}
                isOpen={expandedCards.questionsGenerales}
                onToggle={toggleCard}
                onFullscreen={openFullscreen}
                content={formatQuestions(result.questions.generales)}
                className="[&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mb-2"
              />
              <GlobalCards
                id="questionsDetaillees"
                title="Questions Détaillées"
                rawTitle="Questions Détaillées"
                icon={<HelpCircle className="h-6 w-6 text-accent" />}
                isOpen={expandedCards.questionsDetaillees}
                onToggle={toggleCard}
                onFullscreen={openFullscreen}
                content={formatQuestions(result.questions.detaillees)}
                className="[&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mb-2"
              />
            </div>

            {sheets.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {sheets.map((s, i) => (
                  <FicheCard
                    key={i}
                    id={`fiche-${i}`}
                    title={s.title}
                    page={s.page}
                    isOpen={expandedCards[`fiche-${i}`]}
                    onToggle={toggleCard}
                    onFullscreen={openFullscreen}
                    content={formatFicheContent(s.content)}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <FullscreenModal {...fullscreenModal} onClose={closeFullscreen} />
    </div>
  );
}
