import Button from "../../cva/Button/Button";
import { useCanvasStore } from "../../store/canvas.store";
import { useHistoryStore } from "../../store/history.store";
import { HistoryType } from "../../type/history.type";
import { PageType } from "../../type/page.type";

interface PageHeaderProps {
  page: PageType;
}

function PageHeader({ page }: PageHeaderProps) {
  const pageList = useCanvasStore((state) => state.pageList);
  const addPage = useCanvasStore((state) => state.addPage);
  const copyPageById = useCanvasStore((state) => state.copyPageById);
  const removePage = useCanvasStore((state) => state.removePage);
  const addHistory = useHistoryStore((state) => state.addHistory);

  const handleClickAddPage = () => {
    const newPage = addPage(null);
    if (!newPage) return;
    addHistoryAtStore(1, newPage);
  };
  const handleClickPastePage = () => {
    const newPage = copyPageById(page.id);
    if (!newPage) return;
    addHistoryAtStore(1, newPage);
  };
  const handleClickRemovePage = () => {
    removePage(page);

    addHistoryAtStore(3, page);
  };
  const addHistoryAtStore = (undoType: 1 | 2 | 3, childPage: PageType) => {
    const pageHistory: HistoryType = {
      id: page.id,
      child: null,
      content: childPage,
    };
    const history: HistoryType = {
      id: undoType,
      content: null,
      child: pageHistory,
    };

    addHistory(history);
  };

  return (
    <div className="w-[80%] flex flex-row justify-between">
      <h3>
        <span className="text-base">{page.title}</span>
        <span className="text-sm text-gray-500"> - Add page title</span>
      </h3>
      <section className="flex flex-row gap-x-2">
        {pageList.length !== 1 && (
          <Button
            className="flex flex-col items-center justify-center gap-1"
            imgSrc="/src/assets/remove-page.icon.svg"
            imgAlt="remove page icon"
            imgClassName="w-6 h-6 aspect-square"
            onClick={handleClickRemovePage}
          />
        )}
        <Button
          className="flex flex-col items-center justify-center gap-1"
          imgSrc="/src/assets/page-paste.icon.svg"
          imgAlt="paste page icon"
          imgClassName="w-6 h-6 aspect-square"
          onClick={handleClickPastePage}
        />
        <Button
          className="flex flex-col items-center justify-center gap-1"
          imgSrc="/src/assets/add-page.icon.svg"
          imgAlt="add page icon"
          imgClassName="w-6 h-6 aspect-square"
          onClick={handleClickAddPage}
        />
      </section>
    </div>
  );
}

export default PageHeader;
