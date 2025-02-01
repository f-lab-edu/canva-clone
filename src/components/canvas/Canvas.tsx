import { useCanvasStore } from "../../store/canvas.store";
import { PageType } from "../../type/page.type";
import Page from "./Page";

function Canvas() {
  const pageList = useCanvasStore((state) => state.pageList);

  return (
    <section className="w-full h-full overflow-y-auto flex flex-col justify-center items-center gap-y-10 py-5">
      {pageList.map((page: PageType) => (
        <Page key={page.id} page={page} />
      ))}
    </section>
  );
}

export default Canvas;
