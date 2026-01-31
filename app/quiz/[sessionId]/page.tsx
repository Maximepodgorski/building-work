"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import QuestionCard from "@/components/quiz/QuestionCard";
import Timer from "@/components/quiz/Timer";
import ProgressBar from "@/components/quiz/ProgressBar";
import { useGameStore } from "@/lib/store/gameStore";
import { getQuestions } from "@/lib/data/questions";
import { getSessionByCode } from "@/lib/data/sessions";

const TIMER_DURATION = 30; // seconds per question
const AUTO_ADVANCE_DELAY = 2000; // 2 seconds

export default function QuizPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = use(params);
  const router = useRouter();
  const [playerCount, setPlayerCount] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [selectedAnswer, setSelectedAnswer] = useState<{
    index: number;
    isCorrect: boolean;
  } | null>(null);

  const { currentQuestion, score, isAnswering, answerQuestion, nextQuestion } = useGameStore();
  const questions = getQuestions();
  const currentQ = questions[currentQuestion];

  useEffect(() => {
    // Validate session
    const session = getSessionByCode(sessionId);
    if (!session) {
      router.push("/");
      return;
    }

    setPlayerCount(session.playerCount);
  }, [sessionId, router]);

  useEffect(() => {
    // Reset question start time when moving to next question
    setQuestionStartTime(Date.now());
    setSelectedAnswer(null);
  }, [currentQuestion]);

  const handleAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === currentQ.correctIndex;
    setSelectedAnswer({ index: selectedIndex, isCorrect });

    answerQuestion(currentQ.id, selectedIndex, currentQ.correctIndex);

    // Auto-advance after delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        nextQuestion();
      } else {
        // Quiz complete, navigate to results
        router.push("/resultats");
      }
    }, AUTO_ADVANCE_DELAY);
  };

  const handleTimerExpire = () => {
    if (isAnswering) return; // Already answered

    // Auto-select no answer (mark as incorrect)
    answerQuestion(currentQ.id, -1, currentQ.correctIndex);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        nextQuestion();
      } else {
        router.push("/resultats");
      }
    }, AUTO_ADVANCE_DELAY);
  };

  if (!currentQ) {
    return null;
  }

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-primary">Quiz Bien-être</h1>
            <span className="text-sm text-secondary" aria-live="polite">
              {playerCount} joueurs en ligne
            </span>
          </div>

          <ProgressBar current={currentQuestion + 1} total={questions.length} />
          <Timer
            duration={TIMER_DURATION}
            startTime={questionStartTime}
            onExpire={handleTimerExpire}
          />
        </div>

        {/* Question */}
        <QuestionCard
          question={currentQ.question}
          options={currentQ.options}
          onAnswer={handleAnswer}
          disabled={isAnswering}
        />

        {/* Feedback */}
        {selectedAnswer && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              selectedAnswer.isCorrect
                ? "bg-accent-positive/10 border-2 border-accent-positive"
                : "bg-accent-negative/10 border-2 border-accent-negative"
            }`}
            role="alert"
            aria-live="assertive"
          >
            <p
              className={`font-semibold ${
                selectedAnswer.isCorrect ? "text-accent-positive" : "text-accent-negative"
              }`}
            >
              {selectedAnswer.isCorrect ? "✓ Bonne réponse !" : "✗ Mauvaise réponse"}
            </p>
            {!selectedAnswer.isCorrect && (
              <p className="text-sm text-secondary mt-1">
                La bonne réponse était : {currentQ.options[currentQ.correctIndex]}
              </p>
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
