import { create } from "zustand";
import { QuizQuestion } from "@/lib/data/questions";

export interface Answer {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  timestamp: number;
}

interface GameState {
  sessionId: string | null;
  currentQuestion: number;
  score: number;
  answers: Answer[];
  isAnswering: boolean;
  questionStartTime: number;

  // Actions
  startGame: (sessionId: string) => void;
  answerQuestion: (questionId: string, selectedIndex: number, correctIndex: number) => void;
  nextQuestion: () => void;
  resetGame: () => void;
  getTimeElapsed: () => number;
}

export const useGameStore = create<GameState>((set, get) => ({
  sessionId: null,
  currentQuestion: 0,
  score: 0,
  answers: [],
  isAnswering: false,
  questionStartTime: Date.now(),

  startGame: (sessionId) => set({
    sessionId,
    currentQuestion: 0,
    score: 0,
    answers: [],
    isAnswering: false,
    questionStartTime: Date.now()
  }),

  answerQuestion: (questionId, selectedIndex, correctIndex) => {
    const isCorrect = selectedIndex === correctIndex;
    const state = get();

    set({
      answers: [
        ...state.answers,
        {
          questionId,
          selectedIndex,
          isCorrect,
          timestamp: Date.now()
        }
      ],
      score: isCorrect ? state.score + 1 : state.score,
      isAnswering: true
    });
  },

  nextQuestion: () => set((state) => ({
    currentQuestion: state.currentQuestion + 1,
    isAnswering: false,
    questionStartTime: Date.now()
  })),

  resetGame: () => set({
    sessionId: null,
    currentQuestion: 0,
    score: 0,
    answers: [],
    isAnswering: false,
    questionStartTime: Date.now()
  }),

  getTimeElapsed: () => {
    const state = get();
    return Math.floor((Date.now() - state.questionStartTime) / 1000);
  }
}));
