import Button from "../../cva/Button/Button";
import useHistory from "../../hook/History.hook";
import { useCanvasStore } from "../../store/canvas.store";
import { PageType } from "../../type/page.type";

interface PageHeaderProps {
  page: PageType;
}

function PageHeader({ page }: PageHeaderProps) {
  const pageList = useCanvasStore((state) => state.pageList);
  const addPage = useCanvasStore((state) => state.addPage);
  const copyPageById = useCanvasStore((state) => state.copyPageById);
  const removePage = useCanvasStore((state) => state.removePage);
  const { addUndoHistory, buildHistory } = useHistory();

  const handleClickAddPage = () => {
    const newPage = addPage(null);
    if (!newPage) return;

    const history = buildHistory("create", newPage, null);
    addUndoHistory(history);
  };
  const handleClickPastePage = () => {
    const newPage = copyPageById(page.id);
    if (!newPage) return;

    const history = buildHistory("create", newPage, null);
    addUndoHistory(history);
  };
  const handleClickRemovePage = () => {
    removePage(page);

    const history = buildHistory("delete", page, null);
    addUndoHistory(history);
  };

  return (
    <div className="w-full flex flex-row justify-between">
      <h3>
        <span className="text-base">{page.title}</span>
        <span className="text-sm text-gray-500"> - Add page title</span>
      </h3>
      <section className="flex flex-row gap-x-2">
        {pageList.length !== 1 && (
          <Button
            className="flex flex-col items-center justify-center gap-1"
            imgSrc="https://wbqryjgwbnmvgjsgksvg.supabase.co/storage/v1/object/public/images/pages/add-page.icon.svg"
            imgAlt="remove page icon"
            imgClassName="w-6 h-6 aspect-square"
            onClick={handleClickRemovePage}
          />
        )}
        <Button
          className="flex flex-col items-center justify-center gap-1"
          imgSrc="https://wbqryjgwbnmvgjsgksvg.supabase.co/storage/v1/object/public/images/pages/page-paste.icon.svg"
          imgAlt="paste page icon"
          imgClassName="w-6 h-6 aspect-square"
          onClick={handleClickPastePage}
        />
        <Button
          className="flex flex-col items-center justify-center gap-1"
          imgSrc="https://wbqryjgwbnmvgjsgksvg.supabase.co/storage/v1/object/public/images/pages/remove-page.icon.svg"
          imgAlt="add page icon"
          imgClassName="w-6 h-6 aspect-square"
          onClick={handleClickAddPage}
        />
      </section>
    </div>
  );
}

export default PageHeader;
