import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AppMode = 'before' | 'after';

interface AppStore {
  mode: AppMode;
  commitmentDone: boolean;

  switchMode: () => void;
  reset: () => void;
  setCommitmentDone: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      mode: 'before',
      commitmentDone: false,

      // Toggle mode AND reset all progress
      switchMode: () =>
        set((s) => ({
          mode: s.mode === 'before' ? 'after' : 'before',
          commitmentDone: false,
        })),

      // Keep mode, reset all progress
      reset: () => set({ commitmentDone: false }),

      setCommitmentDone: () => set({ commitmentDone: true }),
    }),
    { name: 'lms-app-store' },
  ),
);
