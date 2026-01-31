import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  userId: string;
  name: string | null;
  department: string | null;

  // Actions
  setUser: (name: string, department: string) => void;
  clearUser: () => void;
}

function generateUserId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: generateUserId(),
      name: null,
      department: null,

      setUser: (name, department) => set({ name, department }),

      clearUser: () => set({
        userId: generateUserId(),
        name: null,
        department: null
      })
    }),
    {
      name: "building-work-user"
    }
  )
);
