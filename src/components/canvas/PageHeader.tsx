import Button from "../../cva/Button/Button";
import { PageType } from "../../type/page";

interface PageHeaderProps {
  page: PageType;
  addPage: (page: PageType | null) => void;
  copyPageById: (pastePageId: number) => void;
  removePageById: (removePageId: number) => void;
  getPageLength: () => number;
}

function PageHeader({
  page,
  addPage,
  copyPageById,
  removePageById,
  getPageLength,
}: PageHeaderProps) {
  const handleClickAddPage = () => addPage(null);
  const handleClickPastePage = () => copyPageById(page.id);
  const handleClickRemovePage = () => removePageById(page.id);

  return (
    <div className="w-[80%] flex flex-row justify-between">
      <h3>
        <span className="text-base">{page.title}</span>
        <span className="text-sm text-gray-500"> - Add page title</span>
      </h3>
      <section className="flex flex-row gap-x-2">
        {getPageLength() !== 1 && (
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
