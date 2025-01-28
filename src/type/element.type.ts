export interface Element {
  pageId: number;
  id: number;
  position: Position;
  size: Size;
  type: "textBox" | "chart";
}

export interface TextBoxType extends Element {
  content: string;
}

export interface Size {
  width: number;
  height: number;
}
export interface Position {
  x: number;
  y: number;
}
