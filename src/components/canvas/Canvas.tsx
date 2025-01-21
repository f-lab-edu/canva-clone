import { PageType } from "../../type/page";
import useCanvas from "./Canvas.hooks";
import Page from "./Page";

function Canvas() {
  const { pageList, addPage, copyPageById, removePageById, getPageLength } =
    useCanvas();

  return (
    <section className="w-full h-full flex flex-col justify-start gap-y-10 overflow-y-auto py-12">
      {pageList.map((page: PageType) => (
        <Page
          page={page}
          addPage={addPage}
          copyPage={copyPageById}
          removePage={removePageById}
          getPageLength={getPageLength}
        />
      ))}
    </section>
  );
}

export default Canvas;
