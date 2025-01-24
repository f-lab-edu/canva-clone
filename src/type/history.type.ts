import { PageType } from "./page.type";
import { TextBoxType } from "./textBox.type";

export type HistoryType = {
  id: number;
  child: HistoryType | null;
  content: UndoType | null;
};
export type UndoType = TextBoxType | PageType;
