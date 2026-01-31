"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { normalizeSessionCode, isValidSessionCode } from "@/lib/data/sessions";
import { useGameStore } from "@/lib/store/gameStore";
import { getUserGamesPlayed, getUserTotalScore } from "@/lib/utils/localStorage";

export default function HomePage() {
  const router = useRouter();
  const [sessionCode, setSessionCode] = useState("");
  const [error, setError] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const errorToastRef = useRef<HTMLDivElement>(null);

  const gamesPlayed = typeof window !== "undefined" ? getUserGamesPlayed() : 0;
  const totalScore = typeof window !== "undefined" ? getUserTotalScore() : 0;

  useEffect(() => {
    // Focus management: focus toast when error appears
    if (error && errorToastRef.current) {
      errorToastRef.current.focus();
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!sessionCode.trim()) {
      setError("Veuillez entrer un code de session");
      inputRef.current?.focus();
      return;
    }

    setIsValidating(true);
    setError("");

    // Simulate validation delay
    setTimeout(() => {
      const normalized = normalizeSessionCode(sessionCode);

      if (isValidSessionCode(normalized)) {
        useGameStore.getState().startGame(normalized);
        router.push(`/quiz/${normalized.toLowerCase()}`);
      } else {
        setError("Code de session invalide. Veuillez réessayer.");
        setIsValidating(false);
        inputRef.current?.focus();
      }
    }, 300);
  };

  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Building Work
        </h1>
        <p className="text-secondary mb-8 text-center">
          Quiz bien-être au travail
        </p>

        <Card className="w-full max-w-md mb-6" variant="elevated">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              ref={inputRef}
              label="Code de session"
              placeholder="Ex: ABC123"
              value={sessionCode}
              onChange={(e) => setSessionCode(e.target.value)}
              error={error}
              disabled={isValidating}
              autoCapitalize="characters"
              autoComplete="off"
              aria-label="Entrez votre code de session"
            />

            <Button
              type="submit"
              variant="gamified"
              className="w-full"
              disabled={isValidating}
              aria-busy={isValidating}
            >
              {isValidating ? "Validation..." : "Rejoindre la partie"}
            </Button>
          </form>
        </Card>

        {/* Error toast with focus management */}
        {error && (
          <div
            ref={errorToastRef}
            role="alert"
            aria-live="assertive"
            tabIndex={-1}
            className="outline-none"
          >
            <div className="bg-accent-negative/10 border border-accent-negative text-accent-negative px-4 py-3 rounded-lg">
              {error}
            </div>
          </div>
        )}

        {/* Quick leaderboard preview */}
        {gamesPlayed > 0 && (
          <Card className="w-full max-w-md mt-6">
            <h2 className="text-lg font-semibold mb-3">Vos statistiques</h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{gamesPlayed}</p>
                <p className="text-sm text-secondary">Parties jouées</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{totalScore}</p>
                <p className="text-sm text-secondary">Points totaux</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
