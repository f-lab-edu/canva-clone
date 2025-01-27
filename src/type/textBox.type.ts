export type TextBoxType = {
  id: number;
  position: Position;
  content: string;
  size: Size;
};

export interface Size {
  size: Size;
  width: number;
  height: number;
}
export interface Position {
  x: number;
  y: number;
}
