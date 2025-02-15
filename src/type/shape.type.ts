import { Element } from "./element.type";

export type Shapes = "rect" | "triangle" | "circle";

export interface ShapeType extends Element {
  shape: Shapes;
  color: string;
}

export interface RectangleType extends ShapeType {
  radius: string;
}

export interface TriangleType extends ShapeType {
  topWidth: string;
  bottomWidth: string;
  leftWidth: string;
  rightWidth: string;
}
