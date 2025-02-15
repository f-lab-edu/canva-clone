import { Element } from "./element.type";

export interface TextStyle {
  size: string;
  weight: number;
}

export interface TextBoxType extends Element {
  content: string;
  textStyle: TextStyle;
}
