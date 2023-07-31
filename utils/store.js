import { create } from "zustand"

export const useStore = create((set) => ({

  stage: 2,
  setStage: (stage) => set({ stage: stage }),

  hasCompletedQuestionnaire: false,
  setHasCompletedQuestionnaire: (bool) => set({ hasCompletedQuestionnaire: bool }),

  hasSwipedProjectCards: false,
  setHasSwipedProjectCards: (bool) => set({ hasSwipedProjectCards: bool }),

}))