"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";

interface QuestionCardProps {
  question: string;
  options: string[];
  onAnswer: (selectedIndex: number) => void;
  disabled?: boolean;
}

export default function QuestionCard({
  question,
  options,
  onAnswer,
  disabled = false
}: QuestionCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (disabled || selectedIndex !== null) return;

    setSelectedIndex(index);
    onAnswer(index);
  };

  return (
    <Card variant="elevated" className="w-full">
      <h2 className="text-xl font-bold text-primary mb-6">
        {question}
      </h2>

      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={disabled || selectedIndex !== null}
            className={cn(
              "touch-target w-full px-6 py-4 rounded-lg text-left font-medium transition-all",
              "border-2",
              selectedIndex === null
                ? "border-gray-300 bg-background hover:border-primary hover:bg-background-light"
                : selectedIndex === index
                ? "border-primary bg-primary text-background"
                : "border-gray-200 bg-gray-50 text-secondary opacity-60",
              "disabled:cursor-not-allowed"
            )}
            aria-pressed={selectedIndex === index}
            aria-label={`Option ${index + 1}: ${option}`}
          >
            <span className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold">
                {String.fromCharCode(65 + index)}
              </span>
              <span>{option}</span>
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}
