export interface Element {
  pageId: number;
  id: number;
  position: Position;
  size: Size;
  type: "textBox" | "chart" | "draw" | "shape";
}

export interface Size {
  width: number;
  height: number;
}
export interface Position {
  x: number;
  y: number;
}
