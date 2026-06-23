import { create } from "zustand";

export type PrototypeRole = "BRAND" | "CREATOR";

type OnboardingState = {
  prototypeRole: PrototypeRole | null;
  beginPrototypeOnboarding: (role: PrototypeRole) => void;
  clearPrototypeOnboarding: () => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  prototypeRole: null,
  beginPrototypeOnboarding: (prototypeRole) => set({ prototypeRole }),
  clearPrototypeOnboarding: () => set({ prototypeRole: null }),
}));
