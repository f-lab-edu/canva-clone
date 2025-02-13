import { Element } from "./element.type";

export type Shapes = "rect" | "triangle" | "circle";

export interface ShapeType extends Element {
  shape: Shapes;
  color: string;
}
