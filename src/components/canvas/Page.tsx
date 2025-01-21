import { PageType } from "../../type/page";
import DrawArea from "./DrawArea";
import PageHeader from "./PageHeader";

interface PageProps {
  page: PageType;
  addPage: (page: PageType | null) => void;
  copyPage: (pastePageId: number) => void;
  removePage: (removePageId: number) => void;
  getPageLength: () => number;
}

function Page({
  page,
  addPage,
  copyPage,
  removePage,
  getPageLength,
}: PageProps) {
  return (
    <article className="w-full flex flex-col justify-center items-center gap-y-2">
      <PageHeader
        page={page}
        addPage={addPage}
        copyPage={copyPage}
        removePage={removePage}
        getPageLength={getPageLength}
      />
      <DrawArea />
    </article>
  );
}

export default Page;
