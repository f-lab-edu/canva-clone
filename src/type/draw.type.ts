import { Element } from "./element.type";

export interface DrawType extends Element {
  ref: React.MutableRefObject<HTMLCanvasElement | null> | null;
}
