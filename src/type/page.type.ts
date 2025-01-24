import { TextBoxType } from "./textBox.type";

export interface PageType {
  id: number;
  title: string;
  textBoxs: TextBoxType[];
}
