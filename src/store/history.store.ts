import { create } from "zustand";
import { HistoryType } from "../type/history.type";

interface HistoryStore {
  redoHistory: HistoryType[];
  undoHistory: HistoryType[];
  addHistory: (history: HistoryType, isUndo: boolean) => void;
  getLastHistoryByIsUndo: (isUndo: boolean) => HistoryType | null;
}

// 동작(CRUD) - PageId - 콘텐츠타입(textBox | chart | element | draw) -> content
export const useHistoryStore = create<HistoryStore>((set) => ({
  redoHistory: [],
  undoHistory: [],
  addHistory: (history: HistoryType, isUndo: boolean) =>
    set((state) => ({
      redoHistory: isUndo ? state.redoHistory : [...state.redoHistory, history],
      undoHistory: isUndo ? [...state.undoHistory, history] : state.undoHistory,
    })),
  getLastHistoryByIsUndo: (isUndo: boolean) => {
    let lastHistory = null;

    set((state) => {
      const returnData = {
        redoHistory: isUndo
          ? state.redoHistory
          : state.redoHistory.slice(0, -1),
        undoHistory: isUndo
          ? state.undoHistory.slice(0, -1)
          : state.undoHistory,
      };
      lastHistory = isUndo
        ? state.undoHistory[state.undoHistory.length - 1]
        : state.redoHistory[state.redoHistory.length - 1];

      return returnData;
    });

    return lastHistory;
  },
}));
