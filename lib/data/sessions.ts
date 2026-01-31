export interface GameSession {
  id: string;
  code: string;
  createdAt: Date;
  playerCount: number;
}

// Mock valid session codes
export const VALID_SESSION_CODES = ["ABC123", "DEF456", "GHI789", "JKL012"];

export function isValidSessionCode(code: string): boolean {
  return VALID_SESSION_CODES.includes(code.toUpperCase());
}

export function normalizeSessionCode(code: string): string {
  return code.toUpperCase().trim();
}

export function getSessionByCode(code: string): GameSession | null {
  const normalized = normalizeSessionCode(code);
  if (!isValidSessionCode(normalized)) {
    return null;
  }

  return {
    id: `session-${normalized.toLowerCase()}`,
    code: normalized,
    createdAt: new Date(),
    playerCount: Math.floor(Math.random() * 10) + 5 // 5-15 players
  };
}
