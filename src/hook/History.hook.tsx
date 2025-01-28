import { useCanvasStore } from "../store/canvas.store";
import { useRedoStore } from "../store/redo.store";
import { useUndoStore } from "../store/undo.store";
import { Element } from "../type/element.type";
import { HistoryType } from "../type/history.type";
import { PageType } from "../type/page.type";

function useHistory() {
  const { undo, history: undoHistory, addHistoryOfUndo } = useUndoStore();
  const { redo, history: redoHistory, addHistoryOfRedo } = useRedoStore();

  const removePageById = useCanvasStore((state) => state.removePage);
  const updatePageByPage = useCanvasStore((state) => state.updatePage);
  const addPage = useCanvasStore((state) => state.addPage);

  const removedElement = useCanvasStore((state) => state.removeElement);
  const addElement = useCanvasStore((state) => state.addElement);
  const updatedElement = useCanvasStore((state) => state.updateElement);

  const getElementById = useCanvasStore((state) => state.getElementById);

  const addUndoHistory = (history: HistoryType) => addHistoryOfUndo(history);

  const buildHistory = (
    undoType: "create" | "modify" | "delete",
    page: PageType | null,
    element: Element | null
  ): HistoryType => {
    let content = null;

    if (page) content = page;
    else content = element;

    const history: HistoryType = {
      id: Date.now(),
      undoType: undoType,
      type: page ? "page" : "element",
      content: content!,
    };

    return history;
  };

  const historyProcess = (isUndo: boolean) => {
    console.log(`${isUndo ? "== undo ==" : "== redo =="}`);
    console.log("undo history", undoHistory);
    console.log("redo history", redoHistory);

    const lastHistory = isUndo ? undo() : redo();

    console.log("lastHistory: ", lastHistory);

    if (!lastHistory) return;

    const actionType = lastHistory.undoType as "create" | "modify" | "delete";

    console.log(lastHistory.content);

    // 페이지에 관한 동작
    if (lastHistory.content && lastHistory.type === "page") {
      const content = lastHistory.content as PageType;
      excuteHistory(
        actionType,
        () => (isUndo ? removePageById(content) : addPage(content)),
        () => updatePageByPage(content),
        () => (isUndo ? addPage(content) : removePageById(content)),
        lastHistory,
        isUndo ? addHistoryOfRedo : addHistoryOfUndo
      );
      return;
    } else {
      const content = lastHistory.content as Element;

      const history: HistoryType = buildHistory(
        actionType,
        null,
        getElementById(content.pageId, content.id)
      );

      console.log(
        `${isUndo ? "if clicked undo: " : "if clicked redo"}`,
        lastHistory
      );

      excuteHistory(
        actionType,
        () => (isUndo ? removedElement(content) : addElement(content)),
        () => updatedElement(content),
        () => (isUndo ? addElement(content) : removedElement(content)),
        history,
        isUndo ? addHistoryOfRedo : addHistoryOfUndo
      );
      return;
    }
  };
  const excuteHistory = (
    actionType: "create" | "modify" | "delete",
    removeFun: () => void,
    updateFun: () => void,
    addFun: () => void,
    history: HistoryType | null,
    addHistory: (history: HistoryType) => void
  ) => {
    // 삭제(생성)
    if (actionType === "create") removeFun();
    // 재수정(수정)
    else if (actionType === "modify") updateFun();
    // 재생성(삭제)
    else if (actionType === "delete") addFun();

    if (history) addHistory(history);
  };

  return {
    undoHistory,
    redoHistory,
    buildHistory,
    addUndoHistory,
    historyProcess,
  };
}

export default useHistory;
