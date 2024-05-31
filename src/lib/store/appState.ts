import { create } from "zustand";
import { MessagesType } from "../types/collections";

interface AppState {
  startDelete: boolean;
  startUpdate: boolean;
  selectedMessage: MessagesType | null;
}

interface AppStateActions {
  setStartDelete: () => void;
  setStartUpdate: () => void;
  setSelectedMessage: (message: MessagesType | null) => void;
}

export const useAppState = create<AppState & AppStateActions>((set) => ({
  startDelete: false,
  startUpdate: false,
  selectedMessage: null,
  setStartDelete: () =>
    set((state) => ({
      startDelete: !state.startDelete,
    })),
  setStartUpdate: () =>
    set((state) => ({
      startUpdate: !state.startUpdate,
    })),
  setSelectedMessage: (message) =>
    set((state) => ({
      selectedMessage: message ? message : null,
    })),
}));
