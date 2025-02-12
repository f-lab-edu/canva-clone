type DrawTool = {
  width: string;
  color: "black" | "red" | "blue";
};

interface DrawStoreType {
  isActive: boolean;
  activedTool: DrawTool | null;
  setActiveTool: (tool: DrawTool) => void;
  inActiveTool: () => void;
}
