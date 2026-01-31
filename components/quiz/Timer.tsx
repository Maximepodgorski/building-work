"use client";

import { useState, useEffect } from "react";

interface TimerProps {
  duration: number; // seconds
  onExpire: () => void;
  startTime: number; // timestamp when timer started
}

export default function Timer({ duration, onExpire, startTime }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [hasAnnounced10s, setHasAnnounced10s] = useState(false);
  const [hasAnnounced5s, setHasAnnounced5s] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, duration - elapsed);
      setTimeLeft(remaining);

      if (remaining === 0) {
        onExpire();
      }
    };

    calculateTimeLeft(); // Initial calculation

    const interval = setInterval(calculateTimeLeft, 100);

    return () => clearInterval(interval);
  }, [duration, startTime, onExpire]);

  // Screen reader announcements at key intervals
  useEffect(() => {
    if (timeLeft === 10 && !hasAnnounced10s) {
      setHasAnnounced10s(true);
    }
    if (timeLeft === 5 && !hasAnnounced5s) {
      setHasAnnounced5s(true);
    }
  }, [timeLeft, hasAnnounced10s, hasAnnounced5s]);

  const percentage = (timeLeft / duration) * 100;
  const isLow = timeLeft <= 5;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-secondary">Temps restant</span>
        <span
          className={`text-lg font-bold ${isLow ? "text-accent-negative" : "text-primary"}`}
          aria-live="polite"
        >
          {timeLeft}s
        </span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-100 ${
            isLow ? "bg-accent-negative" : "bg-primary"
          }`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={timeLeft}
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-label={`${timeLeft} secondes restantes`}
        />
      </div>

      {/* Screen reader announcements */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {timeLeft === 10 && "10 secondes restantes"}
        {timeLeft === 5 && "5 secondes restantes"}
        {timeLeft === 0 && "Temps écoulé"}
      </div>
    </div>
  );
}
