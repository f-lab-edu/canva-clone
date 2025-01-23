import { PageType } from "../../type/page";
import { TextBoxType } from "../../type/textBox";
import Page from "./Page";

interface CanvasProps {
  pageList: PageType[];
  addPage: (page: PageType | null) => void;
  copyPageById: (pastePageId: number) => void;
  removePageById: (removePageId: number) => void;
  getPageLength: () => number;
  updateTextBox: (pageId: number, textBox: TextBoxType) => void;
}

function Canvas({
  pageList,
  addPage,
  copyPageById,
  removePageById,
  getPageLength,
  updateTextBox,
}: CanvasProps) {
  return (
    <section className="w-full h-full flex flex-col justify-start gap-y-10 overflow-y-auto py-12">
      {pageList.map((page: PageType, index: number) => (
        <Page
          key={index}
          page={page}
          addPage={addPage}
          copyPageById={copyPageById}
          removePageById={removePageById}
          getPageLength={getPageLength}
          updateTextBox={updateTextBox}
        />
      ))}
    </section>
  );
}

export default Canvas;
