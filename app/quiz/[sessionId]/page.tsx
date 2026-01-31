"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import QuestionCard from "@/components/quiz/QuestionCard";
import Timer from "@/components/quiz/Timer";
import ProgressBar from "@/components/quiz/ProgressBar";
import { useGameStore } from "@/lib/store/gameStore";
import { getQuestions } from "@/lib/data/questions";
import { getSessionByCode } from "@/lib/data/sessions";

const TIMER_DURATION = 30; // seconds per question
const AUTO_ADVANCE_DELAY = 2000; // 2 seconds

export default function QuizPage() {
  const params = useParams();
  const sessionId = params?.sessionId as string;
  const router = useRouter();
  const [playerCount, setPlayerCount] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [selectedAnswer, setSelectedAnswer] = useState<{
    index: number;
    isCorrect: boolean;
  } | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Auto-advance effect when answer is selected
  useEffect(() => {
    if (selectedAnswer === null) return;

    const timeoutId = setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        nextQuestion();
      } else {
        // Quiz complete, navigate to results
        router.push("/resultats");
      }
    }, AUTO_ADVANCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [selectedAnswer, currentQuestion, questions.length, nextQuestion, router]);

  const handleAnswer = (selectedIndex: number) => {
    // Prevent race condition if already answered
    if (selectedAnswer !== null) return;

    const isCorrect = selectedIndex === currentQ.correctIndex;
    setSelectedAnswer({ index: selectedIndex, isCorrect });

    answerQuestion(currentQ.id, selectedIndex, currentQ.correctIndex);
  };

  const handleTimerExpire = () => {
    if (isAnswering || selectedAnswer !== null) return; // Already answered

    // Auto-select no answer (mark as incorrect)
    answerQuestion(currentQ.id, -1, currentQ.correctIndex);
    setSelectedAnswer({ index: -1, isCorrect: false });
  };

  if (!currentQ) {
    return null;
  }

  // Gradient background rotates based on question number
  const gradients = [
    "bg-gradient-purple-blue",
    "bg-gradient-orange-red",
    "bg-gradient-green-teal",
    "bg-gradient-pink-purple",
  ];
  const currentGradient = gradients[currentQuestion % gradients.length];

  return (
    <PageContainer className="bg-white">
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

        {/* Question Card with Gradient Background - Question ONLY */}
        <div className={`${currentGradient} rounded-3xl p-8 mb-6 shadow-2xl transition-all duration-500`}>
          <p className="text-sm font-bold text-white/80 mb-4">
            LEVEL {currentQuestion + 1} ({currentQuestion + 1}/{questions.length})
          </p>
          <h2 className="text-2xl font-bold text-white">
            {currentQ.question}
          </h2>
        </div>

        {/* Answer Options - OUTSIDE gradient card, on white background */}
        <QuestionCard
          key={currentQ.id}
          question={currentQ.question}
          options={currentQ.options}
          onAnswer={handleAnswer}
          disabled={isAnswering}
          correctIndex={selectedAnswer !== null ? currentQ.correctIndex : undefined}
          selectedIndex={selectedAnswer?.index ?? null}
        />
      </div>
    </PageContainer>
  );
}
