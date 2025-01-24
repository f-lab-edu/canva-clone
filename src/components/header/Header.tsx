import { LuRedo2, LuUndo2 } from "react-icons/lu";
import { useCanvasStore } from "../../store/canvas.store";
import { useHistoryStore } from "../../store/history.store";
import { PageType } from "../../type/page.type";
import { TextBoxType } from "../../type/textBox.type";

function Header() {
  const undo = useHistoryStore((state) => state.undo);

  const removePageById = useCanvasStore((state) => state.removePage);
  const updatePageByPage = useCanvasStore((state) => state.updatePage);
  const addPage = useCanvasStore((state) => state.addPage);

  const removedTextBox = useCanvasStore((state) => state.removeTextBox);
  const addTextBox = useCanvasStore((state) => state.addTextBox);
  const updateTextBox = useCanvasStore((state) => state.updateTextBox);

  const handleClickUndo = () => {
    const lastHistory = undo();

    if (!lastHistory) return;

    /**
     * 1. delete(create)
     * 2. modify(modify)
     * 3. create(delete)
     */
    const actionType = lastHistory.id as 1 | 2 | 3;

    if (!lastHistory.child) return;

    /** Page Depth */
    const pageHistory = lastHistory.child;
    const pageId = pageHistory.id;

    // 페이지에 관한 동작
    if (pageHistory.content && !pageHistory.child) {
      const pageContent = pageHistory.content as PageType;
      console.log(pageContent);
      undoProcess(
        actionType,
        () => removePageById(pageContent),
        () => updatePageByPage(pageContent),
        () => addPage(pageContent)
      );

      return;
    }

    /** Content of Page Depth */
    console.log(lastHistory);
    const contentType = pageHistory.child!;
    const contentHistory = contentType.child!;
    if (contentHistory.content && !contentHistory.child) {
      /**
       * 1. text box
       * 2. chart
       * 3. element
       * 4. draw
       */
      if (contentType.id === 1) {
        const textBoxContent = contentHistory.content as TextBoxType;
        undoProcess(
          actionType,
          () => removedTextBox(pageId, textBoxContent),
          () => updateTextBox(pageId, textBoxContent),
          () => addTextBox(pageId, textBoxContent)
        );
      }

      return;
    }
  };
  const undoProcess = (
    actionType: 1 | 2 | 3,
    removeFun: () => void,
    updateFun: () => void,
    addFun: () => void
  ) => {
    // 삭제(생성)
    if (actionType === 1) removeFun();
    // 재수정(수정)
    else if (actionType === 2) updateFun();
    // 재생성(삭제)
    else if (actionType === 3) addFun();
  };
  const handleClickRedo = () => {};

  return (
    <section className="bg-white w-full h-16 px-7 flex flex-row justify-start items-center gap-x-10">
      Canva
      <article className="flex flex-row gap-x-5">
        <button onClick={handleClickUndo}>
          <LuUndo2 size={30} className="border p-1 rounded-md border-black" />
        </button>
        <button onClick={handleClickRedo}>
          <LuRedo2 size={30} className="border p-1 rounded-md border-black" />
        </button>
      </article>
    </section>
  );
}

export default Header;
