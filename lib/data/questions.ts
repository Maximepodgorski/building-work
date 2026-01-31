export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

// Seeded mock data for French well-being quiz questions
export const WELL_BEING_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "Quelle est la meilleure façon de faire une pause mentale au travail ?",
    options: [
      "Consulter les réseaux sociaux",
      "Marcher quelques minutes à l'extérieur",
      "Continuer à travailler sur un autre projet",
      "Regarder ses emails"
    ],
    correctIndex: 1
  },
  {
    id: "q2",
    question: "À quelle fréquence devriez-vous vous éloigner de votre écran ?",
    options: [
      "Toutes les 20-30 minutes",
      "Une fois par jour",
      "Uniquement pendant le déjeuner",
      "Jamais, cela ralentit la productivité"
    ],
    correctIndex: 0
  },
  {
    id: "q3",
    question: "Quel signe indique que vous devez mieux définir vos limites ?",
    options: [
      "Vous vous sentez énergisé après le travail",
      "Vous vérifiez vos emails le soir et le week-end",
      "Vous prenez toutes vos pauses",
      "Vous refusez les réunions non essentielles"
    ],
    correctIndex: 1
  },
  {
    id: "q4",
    question: "Quelle pratique aide à réduire le stress lié au travail ?",
    options: [
      "Travailler plus vite pour finir plus tôt",
      "Sauter le déjeuner pour gagner du temps",
      "Pratiquer la respiration profonde pendant 2-3 minutes",
      "Reporter ses tâches au lendemain"
    ],
    correctIndex: 2
  },
  {
    id: "q5",
    question: "Quelle est la meilleure façon de terminer votre journée de travail ?",
    options: [
      "Fermer votre ordinateur immédiatement",
      "Planifier les priorités du lendemain et faire le point",
      "Envoyer un dernier lot d'emails",
      "Continuer à travailler jusqu'à être totalement épuisé"
    ],
    correctIndex: 1
  }
];

export function getQuestions(): QuizQuestion[] {
  return WELL_BEING_QUESTIONS;
}
