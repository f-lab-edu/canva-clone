import { create } from "zustand";
import { HistoryType } from "../type/history.type";

interface HistoryStore {
  history: HistoryType[];
  addHistory: (history: HistoryType) => void;
  undo: () => HistoryType | null;
}

// 동작(CRUD) - PageId - 콘텐츠타입(textBox | chart | element | draw) -> content
export const useHistoryStore = create<HistoryStore>((set) => ({
  history: [],
  addHistory: (history: HistoryType) =>
    set((state) => ({
      history: [...state.history, history],
    })),
  undo: () => {
    let lastHistory = null;
    set((state) => {
      const returnData = {
        history: state.history.slice(0, -1),
      };
      lastHistory = state.history[state.history.length - 1];

      // 마지막 요소 삭제
      return returnData;
    });

    return lastHistory;
  },
}));
