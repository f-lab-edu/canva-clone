export type PaletteType =
  | "Design"
  | "Elements"
  | "Draw"
  | "Text"
  | "Uploads"
  | "Charts"
  | null;

export type ActivePaletteProps = {
  inactivePalette: () => void;
};
