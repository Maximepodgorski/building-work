"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import PageContainer from "@/components/layout/PageContainer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useGameStore } from "@/lib/store/gameStore";
import { MOCK_PLAYERS, Player } from "@/lib/data/players";
import { saveScore } from "@/lib/utils/localStorage";

export default function ResultsPage() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const { sessionId, score, answers } = useGameStore();
  const [displayScore, setDisplayScore] = useState(0);
  const totalQuestions = answers.length;

  // Mock player rankings including user
  type PlayerWithUser = Player & { isUser?: boolean };
  const [rankings, setRankings] = useState<PlayerWithUser[]>([]);
  const [userRank, setUserRank] = useState(0);

  useEffect(() => {
    if (!sessionId) {
      router.push("/");
      return;
    }

    // Save score to localStorage
    saveScore({
      sessionId,
      score,
      totalQuestions,
      timestamp: new Date().toISOString()
    });

    // Generate mock rankings (top 10 players + user)
    const mockRankings: PlayerWithUser[] = MOCK_PLAYERS.slice(0, 9).map((p) => ({ ...p }));
    const userEntry: PlayerWithUser = {
      id: "current-user",
      name: "Vous",
      department: "Votre équipe",
      avatar: "",
      totalPoints: score,
      gamesPlayed: 1,
      averageScore: score,
      isUser: true
    };

    // Insert user into rankings based on score
    const allRankings = [...mockRankings, userEntry].sort(
      (a, b) => b.totalPoints - a.totalPoints
    );

    const userPosition = allRankings.findIndex((p) => p.isUser) + 1;

    setRankings(allRankings.slice(0, 10));
    setUserRank(userPosition);

    // Animated score counter
    const duration = shouldReduceMotion ? 0 : 1000;
    const increment = score / (duration / 50);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [sessionId, score, totalQuestions, router, shouldReduceMotion]);

  const handleContinue = () => {
    router.push("/feedback");
  };

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        >
          <h1 className="text-3xl font-bold text-primary text-center mb-8">
            Résultats
          </h1>

          {/* Score */}
          <Card variant="elevated" className="mb-6 text-center">
            <p className="text-secondary mb-2">Votre score</p>
            <p className="text-6xl font-bold text-primary mb-2" aria-live="polite">
              {displayScore}/{totalQuestions}
            </p>
            <p className="text-secondary">
              {Math.round((score / totalQuestions) * 100)}% de réponses correctes
            </p>
          </Card>

          {/* Podium - Top 3 */}
          <h2 className="text-xl font-semibold mb-4">Top 3</h2>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {rankings.slice(0, 3).map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : index * 0.1,
                  duration: shouldReduceMotion ? 0 : 0.3
                }}
              >
                <Card
                  variant="elevated"
                  className={`text-center ${player.isUser ? "ring-2 ring-primary" : ""}`}
                >
                  <div className="text-2xl mb-2">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                  </div>
                  <p className="font-semibold text-sm truncate">
                    {player.isUser ? "Vous" : player.name.split(" ")[0]}
                  </p>
                  <p className="text-lg font-bold text-primary">{player.totalPoints}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Full Rankings */}
          <h2 className="text-xl font-semibold mb-4">Classement de la session</h2>
          <Card variant="elevated" className="mb-6">
            <div className="space-y-3">
              {rankings.map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    player.isUser ? "bg-primary/5 border-2 border-primary" : "bg-background-light"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-secondary w-6">
                      #{index + 1}
                    </span>
                    <span className="font-semibold">{player.name}</span>
                  </div>
                  <span className="font-bold text-primary">{player.totalPoints} pts</span>
                </div>
              ))}
            </div>
          </Card>

          <Button onClick={handleContinue} className="w-full">
            Continuer
          </Button>
        </motion.div>
      </div>
    </PageContainer>
  );
}
