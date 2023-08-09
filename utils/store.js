import { create } from "zustand"

export const useStore = create((set) => ({

  userId: null,
  setUserId: (id) => set({ userId: id }),

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

  hasSeenPractice: false,
  setHasSeenPractice: (bool) => set({ hasSeenPractice: bool }),

  hasRegisteredProject: false,
  setHasRegisteredProject: (bool) => set({ hasRegisteredProject: bool }),

  isTutorial: true,
  setIsTutorial: (bool) => set({ isTutorial: bool }),

}))