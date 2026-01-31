"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";

interface QuestionCardProps {
  question: string;
  options: string[];
  onAnswer: (selectedIndex: number) => void;
  disabled?: boolean;
  correctIndex?: number; // For showing correct answer after selection
  selectedIndex?: number | null; // Controlled state for showing results
}

export default function QuestionCard({
  question,
  options,
  onAnswer,
  disabled = false,
  correctIndex,
  selectedIndex: externalSelectedIndex
}: QuestionCardProps) {
  const [internalSelectedIndex, setInternalSelectedIndex] = useState<number | null>(null);
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  // Use external state if provided (for showing results), otherwise use internal
  const selectedIndex = externalSelectedIndex !== undefined ? externalSelectedIndex : internalSelectedIndex;
  const isAnswered = selectedIndex !== null;

  const handleSelect = (index: number) => {
    if (disabled || isAnswered) return;

    setInternalSelectedIndex(index);
    setAnimatingIndex(index);
    setTimeout(() => setAnimatingIndex(null), 200);
    onAnswer(index);
  };

  const getOptionState = (index: number) => {
    if (!isAnswered) return "default";
    if (selectedIndex === index && correctIndex !== undefined) {
      return index === correctIndex ? "correct" : "incorrect";
    }
    if (correctIndex !== undefined && index === correctIndex) {
      return "correct-answer";
    }
    return "unselected";
  };

  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const state = getOptionState(index);

        return (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={disabled || isAnswered}
            className={cn(
              "touch-target w-full px-6 py-4 rounded-2xl text-left font-semibold",
              "border-2 answer-option relative bg-white shadow-md",
              "transition-all duration-200",
              state === "default" && "border-white hover:border-vibrant-purple hover:shadow-lg hover:scale-[1.02]",
              state === "correct" && "answer-option-selected-correct shadow-xl scale-[1.02]",
              state === "incorrect" && "border-vibrant-red shadow-lg",
              state === "correct-answer" && "answer-option-correct-answer shadow-lg",
              state === "unselected" && "border-white opacity-60",
              "disabled:cursor-not-allowed",
              animatingIndex === index && "animate-spring-fill"
            )}
            aria-pressed={selectedIndex === index}
            aria-label={`Option ${index + 1}: ${option}`}
          >
            <span className="flex items-center gap-4">
              <span className={cn(
                "flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold",
                state === "correct" && "border-white bg-vibrant-green text-white",
                state === "incorrect" && "border-vibrant-red text-vibrant-red",
                state === "correct-answer" && "border-vibrant-green text-vibrant-green bg-vibrant-green/10",
                state === "default" && "border-gray-300 text-gray-700",
                state === "unselected" && "border-gray-200 text-gray-400"
              )}>
                {state === "correct" ? "✓" : state === "incorrect" ? "✗" : String.fromCharCode(65 + index)}
              </span>
              <span className={cn(
                "flex-1",
                state === "correct" && "text-gray-900",
                state === "incorrect" && "text-gray-900",
                state === "correct-answer" && "text-vibrant-green",
                state === "default" && "text-gray-900",
                state === "unselected" && "text-gray-500"
              )}>{option}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
