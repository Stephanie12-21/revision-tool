"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  BookOpen,
  Brain,
  FileText,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleRedirectToAnalysePage = () => {
    router.push("/analyse");
  };

  const handleRedirectToQuizPage = () => {
    router.push("/quiz");
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="py-24 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6 text-base font-medium">
            IA Éducative Avancée
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 leading-tight">
            Révolutionnez vos <span className="text-primary">révisions</span>{" "}
            avec l&apos;IA
          </h1>
          <p className="text-xl text-muted-foreground text-pretty mb-10 max-w-2xl mx-auto leading-relaxed">
            Analysez vos documents instantanément et créez des quiz
            personnalisés. Notre IA transforme n&apos;importe quel contenu en
            outils d&apos;apprentissage efficaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="text-lg px-8 py-6 group shadow-lg hover:shadow-xl transition-all"
              onClick={handleRedirectToAnalysePage}
            >
              <FileText className="mr-2 h-5 w-5" />
              Créer des fiches de révision
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 group bg-background hover:bg-muted/50 transition-all"
              onClick={handleRedirectToQuizPage}
            >
              <Brain className="mr-2 h-5 w-5" />
              Générer un quiz
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Fonctionnalités puissantes pour votre réussite
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Des outils intelligents conçus pour optimiser votre apprentissage
              et maximiser vos résultats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md">
              <CardHeader className="p-8">
                <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <FileText className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl mb-3">
                  Analyse de documents
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Importez PDF, Word, PowerPoint et plus. Notre IA extrait
                  automatiquement les concepts clés.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md">
              <CardHeader className="p-8">
                <div className="h-14 w-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                  <Brain className="h-7 w-7 text-secondary" />
                </div>
                <CardTitle className="text-xl mb-3">
                  Quiz intelligents
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Génération automatique de questions adaptées à votre niveau et
                  à vos objectifs d&apos;apprentissage.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md">
              <CardHeader className="p-8">
                <div className="h-14 w-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <BookOpen className="h-7 w-7 text-accent" />
                </div>
                <CardTitle className="text-xl mb-3">
                  Fiches de révision
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Création automatique de résumés structurés et de fiches mémo
                  pour une révision efficace.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t  text-base py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center text-muted-foreground">
            <p className="text-base mb-2">
              &copy; {new Date().getFullYear()} RevisionTools.
            </p>
            <p className="text-sm">
              Conçu et développé par{" "}
              <a
                href="https://stephanie-maminiaina.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary  hover:text-primary/80 font-medium inline-flex items-center gap-1 transition-colors hover:underline"
              >
                Stéphanie MAMINIAINA
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
