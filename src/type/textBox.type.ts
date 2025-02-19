import { Element } from "./element.type";

export interface TextStyle {
  size: string;
  weight: number;
  color: string;
}

export interface TextBoxType extends Element {
  content: string;
  textStyle: TextStyle;
}
