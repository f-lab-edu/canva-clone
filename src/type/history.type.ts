import { Element } from "./element.type";
import { PageType } from "./page.type";

export type HistoryType = {
  id: number;
  undoType: "create" | "modify" | "delete";
  type: "element" | "page";
  content: Element | PageType;
};
