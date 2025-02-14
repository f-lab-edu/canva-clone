import { useEffect } from "react";
import { useCanvasStore } from "../../store/canvas.store";
import { PageType } from "../../type/page.type";
import Page from "./Page";

function Canvas() {
  const pageList = useCanvasStore((state) => state.pageList);
  const setCurrentPageId = useCanvasStore((state) => state.setCurrentPageId);

  const handleScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    const scrollHeight = e.currentTarget.scrollHeight - 700;
    const nowScroll = Math.floor(e.currentTarget.scrollTop);
    const pageScrollPoint = scrollHeight / pageList.length;

    let nowPageCnt = -1;

    for (let i = 0; i < pageList.length; i++) {
      if (nowScroll >= pageScrollPoint * i) {
        nowPageCnt += 1;
      }
    }

    const currentPageId = pageList[nowPageCnt].id;
    setCurrentPageId(currentPageId);
  };

  useEffect(() => {
    if (pageList.length !== 1) return;

    const currentPageId = pageList[0].id;
    setCurrentPageId(currentPageId);
  }, []);

  return (
    <section
      className="w-full h-full overflow-y-auto flex flex-col justify-start items-center gap-y-10 py-5"
      onScroll={handleScroll}
    >
      {pageList.map((page: PageType) => (
        <Page key={page.id} page={page} />
      ))}
    </section>
  );
}

export default Canvas;
