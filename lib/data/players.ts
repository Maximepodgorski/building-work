export interface Player {
  id: string;
  name: string;
  department: string;
  avatar: string;
  totalPoints: number;
  gamesPlayed: number;
  averageScore: number;
}

// Seeded random generation for consistent mock data
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const FIRST_NAMES = [
  "Sophie", "Antoine", "Marie", "Lucas", "Emma", "Thomas", "Léa", "Hugo",
  "Chloé", "Nathan", "Camille", "Alexandre", "Julie", "Maxime", "Sarah",
  "Nicolas", "Laura", "Pierre", "Manon", "Vincent"
];

const LAST_NAMES = [
  "Martin", "Bernard", "Dubois", "Thomas", "Robert", "Richard", "Petit",
  "Durand", "Leroy", "Moreau", "Simon", "Laurent", "Lefebvre", "Michel",
  "Garcia", "David", "Bertrand", "Roux", "Vincent", "Fournier"
];

const DEPARTMENTS = [
  "Ressources Humaines",
  "Marketing",
  "Développement",
  "Design",
  "Ventes",
  "Support Client",
  "Finance",
  "Operations"
];

export function generateMockPlayers(count: number = 50): Player[] {
  const players: Player[] = [];

  for (let i = 0; i < count; i++) {
    const seed = i + 1000; // Fixed seed for consistency
    const firstName = FIRST_NAMES[Math.floor(seededRandom(seed) * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(seededRandom(seed + 1) * LAST_NAMES.length)];
    const department = DEPARTMENTS[Math.floor(seededRandom(seed + 2) * DEPARTMENTS.length)];
    const gamesPlayed = Math.floor(seededRandom(seed + 3) * 20) + 1;
    const averageScore = Math.floor(seededRandom(seed + 4) * 5);
    const totalPoints = gamesPlayed * averageScore;

    players.push({
      id: `player-${i + 1}`,
      name: `${firstName} ${lastName}`,
      department,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`,
      totalPoints,
      gamesPlayed,
      averageScore
    });
  }

  // Sort by total points descending
  return players.sort((a, b) => b.totalPoints - a.totalPoints);
}

export const MOCK_PLAYERS = generateMockPlayers(50);
