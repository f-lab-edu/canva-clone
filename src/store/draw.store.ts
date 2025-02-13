import { create } from "zustand";

export type DrawTool = {
  width: number;
  color: "black" | "red" | "blue";
};

interface DrawStoreType {
  isActive: boolean;
  activedTool: DrawTool | null;
  setActiveTool: (tool: DrawTool) => void;
  inActiveTool: () => void;
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
}));
