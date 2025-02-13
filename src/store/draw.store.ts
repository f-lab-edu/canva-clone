import { create } from "zustand";

export type Colors = "black" | "red" | "blue" | "yellow";

export type DrawTool = {
  width: number;
  color: Colors;
};

interface DrawStoreType {
  isActive: boolean;
  activedTool: DrawTool | null;
  setActiveTool: (tool: DrawTool) => void;
  inActiveTool: () => void;
  changeColor: (color: "black" | "red" | "blue") => void;
  changeWidth: (width: number) => void;
}

export const useDrawStore = create<DrawStoreType>((set) => ({
  isActive: false,
  activedTool: null,
  setActiveTool: (tool: DrawTool) =>
    set({
      activedTool: tool,
      isActive: true,
    }),
  inActiveTool: () =>
    set({
      activedTool: null,
      isActive: false,
    }),
  changeColor: (color: Colors) =>
    set((state) => {
      if (!state.isActive || !state.activedTool) return state;

      return {
        activedTool: { ...state.activedTool, color },
      };
    }),
  changeWidth: (width: number) =>
    set((state) => {
      if (!state.isActive || !state.activedTool) return state;

      return {
        activedTool: { ...state.activedTool, width },
      };
    }),
}));
