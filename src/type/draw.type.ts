import { DrawTool } from "../store/draw.store";
import { Element, Position } from "./element.type";

export type Points = Position[];

export interface DrawType extends Element {
  points: Points;
  style: DrawTool;
}
