import { PageType } from "../../type/page";
import { TextBoxType } from "../../type/textBox";
import DrawArea from "./DrawArea";
import PageHeader from "./PageHeader";

interface PageProps {
  page: PageType;
  addPage: (page: PageType | null) => void;
  copyPageById: (pastePageId: number) => void;
  removePageById: (removePageId: number) => void;
  getPageLength: () => number;
  updateTextBox: (pageId: number, textBox: TextBoxType) => void;
}

function Page({
  page,
  addPage,
  copyPageById,
  removePageById,
  getPageLength,
  updateTextBox,
}: PageProps) {
  return (
    <article className="w-full flex flex-col justify-center items-center gap-y-2">
      <PageHeader
        page={page}
        addPage={addPage}
        copyPageById={copyPageById}
        removePageById={removePageById}
        getPageLength={getPageLength}
      />
      <DrawArea page={page} updateTextBox={updateTextBox} />
    </article>
  );
}

export default Page;
