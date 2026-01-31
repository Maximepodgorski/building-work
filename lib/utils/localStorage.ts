// localStorage utilities with error handling and quota management

const MAX_ENTRIES = 50;

export interface FeedbackEntry {
  sessionId: string;
  rating: number;
  comment?: string;
  timestamp: string;
}

export interface ScoreEntry {
  sessionId: string;
  score: number;
  totalQuestions: number;
  timestamp: string;
}

export function saveFeedback(feedback: FeedbackEntry): boolean {
  try {
    const existing = getFeedbackHistory();
    const updated = [feedback, ...existing].slice(0, MAX_ENTRIES);
    localStorage.setItem("building-work-feedback", JSON.stringify(updated));
    return true;
  } catch (error) {
    if (error instanceof Error && error.name === "QuotaExceededError") {
      // Prune old entries and retry
      try {
        const pruned = [feedback];
        localStorage.setItem("building-work-feedback", JSON.stringify(pruned));
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
}

export function getFeedbackHistory(): FeedbackEntry[] {
  try {
    const data = localStorage.getItem("building-work-feedback");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveScore(score: ScoreEntry): boolean {
  try {
    const existing = getScoreHistory();
    const updated = [score, ...existing].slice(0, MAX_ENTRIES);
    localStorage.setItem("building-work-scores", JSON.stringify(updated));
    return true;
  } catch (error) {
    if (error instanceof Error && error.name === "QuotaExceededError") {
      try {
        const pruned = [score];
        localStorage.setItem("building-work-scores", JSON.stringify(pruned));
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
}

export function getScoreHistory(): ScoreEntry[] {
  try {
    const data = localStorage.getItem("building-work-scores");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getUserTotalScore(): number {
  const scores = getScoreHistory();
  return scores.reduce((sum, entry) => sum + entry.score, 0);
}

export function getUserGamesPlayed(): number {
  return getScoreHistory().length;
}
