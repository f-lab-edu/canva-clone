import { TextBoxType } from "./textBox";

export interface PageType {
  id: number;
  title: string;
  textBoxs: TextBoxType[];
}
