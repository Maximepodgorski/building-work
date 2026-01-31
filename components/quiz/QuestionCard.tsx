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

  // Use external state if provided (for showing results), otherwise use internal
  const selectedIndex = externalSelectedIndex !== undefined ? externalSelectedIndex : internalSelectedIndex;
  const isAnswered = selectedIndex !== null;

  const handleSelect = (index: number) => {
    if (disabled || isAnswered) return;

    setInternalSelectedIndex(index);
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
    <Card variant="elevated" className="w-full bg-white">
      <h2 className="text-xl font-bold text-primary mb-6">
        {question}
      </h2>

      <div className="space-y-3">
        {options.map((option, index) => {
          const state = getOptionState(index);

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={disabled || isAnswered}
              className={cn(
                "touch-target w-full px-6 py-4 rounded-xl text-left font-medium",
                "border-2 answer-option relative",
                state === "default" && "border-gray-300 bg-white hover:border-vibrant-purple hover:bg-purple-50",
                state === "correct" && "answer-option-selected-correct shadow-lg",
                state === "incorrect" && "answer-option-selected-incorrect bg-white",
                state === "correct-answer" && "answer-option-correct-answer",
                state === "unselected" && "border-gray-200 bg-gray-50 opacity-60",
                "disabled:cursor-not-allowed"
              )}
              aria-pressed={selectedIndex === index}
              aria-label={`Option ${index + 1}: ${option}`}
            >
              <span className="flex items-center gap-3">
                <span className={cn(
                  "flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold",
                  state === "correct" && "border-white bg-white/20 text-white",
                  state !== "correct" && "border-current"
                )}>
                  {state === "correct" ? "✓" : state === "incorrect" ? "✗" : String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
