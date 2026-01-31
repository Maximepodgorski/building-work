import { create } from "zustand";
import { Player, MOCK_PLAYERS } from "@/lib/data/players";

export type TimeFilter = "all" | "week" | "month";

interface LeaderboardState {
  players: Player[];
  filter: TimeFilter;

  // Actions
  setFilter: (filter: TimeFilter) => void;
  getFilteredPlayers: () => Player[];
}

export const useLeaderboardStore = create<LeaderboardState>((set, get) => ({
  players: MOCK_PLAYERS,
  filter: "all",

  setFilter: (filter) => set({ filter }),

  getFilteredPlayers: () => {
    const { players, filter } = get();

    // In v1 with mock data, all filters return same data
    // In future, this would filter by timestamp
    return players;
  }
}));
