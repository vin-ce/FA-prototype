import { create } from "zustand"

export const useStore = create((set) => ({

  stage: 1,
  setStage: (stage) => set({ stage: stage }),

  hasCompletedQuestionnaire: false,
  setHasCompletedQuestionnaire: (bool) => set({ hasCompletedQuestionnaire: bool }),

  hasSwipedProjectCards: false,
  setHasSwipedProjectCards: (bool) => set({ hasSwipedProjectCards: bool }),

  hasNotSeenProgressPopUp: true,
  setHasNotSeenProgressPopUp: (bool) => set({ hasNotSeenProgressPopUp: bool }),

  hasCompletedReflections: false,
  setHasCompletedReflections: (bool) => set({ hasCompletedReflections: bool }),

  isProfile: false,
  setIsProfile: (bool) => set({ isProfile: bool }),


}))