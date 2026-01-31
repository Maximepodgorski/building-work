"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import PageContainer from "@/components/layout/PageContainer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useGameStore } from "@/lib/store/gameStore";
import { saveFeedback } from "@/lib/utils/localStorage";
import { sanitizeComment } from "@/lib/utils/sanitize";

const EMOJI_SCALE = [
  { emoji: "😞", label: "Très mal", value: 1 },
  { emoji: "😕", label: "Mal", value: 2 },
  { emoji: "😐", label: "Neutre", value: 3 },
  { emoji: "🙂", label: "Bien", value: 4 },
  { emoji: "😄", label: "Très bien", value: 5 }
];

export default function FeedbackPage() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const { sessionId } = useGameStore();
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === null) {
      setError("Veuillez sélectionner votre ressenti");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Save feedback
    const success = saveFeedback({
      sessionId: sessionId || "unknown",
      rating,
      comment: comment ? sanitizeComment(comment) : undefined,
      timestamp: new Date().toISOString()
    });

    if (success) {
      setIsConfirmed(true);

      // Auto-navigate to home after 3 seconds
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } else {
      setError("Erreur lors de la sauvegarde. Veuillez réessayer.");
      setIsSubmitting(false);
    }
  };

  if (isConfirmed) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, type: "spring" }}
            className="text-center"
          >
            <div className="text-6xl mb-4">✓</div>
            <h1 className="text-2xl font-bold text-primary mb-2">
              Merci pour votre retour !
            </h1>
            <p className="text-secondary">
              Redirection vers l&apos;accueil...
            </p>
          </motion.div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Vibrant gradient background */}
      <div className="fixed inset-0 bg-gradient-pink-purple -z-10" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
        className="max-w-2xl mx-auto py-6"
      >
        <h1 className="text-2xl font-bold text-white drop-shadow-lg mb-6 text-center">
          Comment vous sentez-vous au travail aujourd&apos;hui ?
        </h1>

        <Card variant="elevated" className="bg-white shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Emoji Scale */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-4">
                Votre ressenti <span className="text-accent-negative">*</span>
              </label>

              <div className="flex justify-between gap-2">
                {EMOJI_SCALE.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setRating(item.value)}
                    className={`touch-target flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                      rating === item.value
                        ? "border-primary bg-primary/5 scale-110"
                        : "border-gray-300 hover:border-gray-400 hover:bg-background-light"
                    }`}
                    aria-label={item.label}
                    aria-pressed={rating === item.value}
                  >
                    <span className="text-3xl" role="img" aria-label={item.label}>
                      {item.emoji}
                    </span>
                    <span className="text-xs text-secondary font-medium">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              {error && (
                <p className="mt-2 text-sm text-accent-negative" role="alert">
                  {error}
                </p>
              )}
            </div>

            {/* Comment (optional) */}
            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-semibold text-primary mb-2"
              >
                Commentaire (optionnel)
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Partagez vos pensées..."
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary transition-colors resize-none"
                aria-label="Commentaire optionnel sur votre ressenti au travail"
              />
              <p className="mt-1 text-xs text-secondary text-right">
                {comment.length}/500
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/")}
                className="flex-1"
                disabled={isSubmitting}
              >
                Passer
              </Button>
              <Button
                type="submit"
                variant="gamified"
                className="flex-1"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? "Envoi..." : "Soumettre"}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </PageContainer>
  );
}
