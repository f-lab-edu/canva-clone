import { useCanvasStore } from "../store/canvas.store";
import { useHistoryStore } from "../store/history.store";
import { Element } from "../type/element.type";
import { HistoryType } from "../type/history.type";
import { PageType } from "../type/page.type";

function useHistory() {
  const { getLastHistoryByIsUndo, redoHistory, undoHistory, addHistory } =
    useHistoryStore();

  const removePageById = useCanvasStore((state) => state.removePage);
  const updatePageByPage = useCanvasStore((state) => state.updatePage);
  const addPage = useCanvasStore((state) => state.addPage);

  const removedElement = useCanvasStore((state) => state.removeElement);
  const addElement = useCanvasStore((state) => state.addElement);
  const updatedElement = useCanvasStore((state) => state.updateElement);

  const getElementById = useCanvasStore((state) => state.getElementById);

  const addUndoHistory = (history: HistoryType) => addHistory(history, true);

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
    const lastHistory = getLastHistoryByIsUndo(isUndo);

    if (!lastHistory) return;

    const actionType = lastHistory.undoType as "create" | "modify" | "delete";

    // 페이지에 관한 동작
    if (lastHistory.content && lastHistory.type === "page") {
      const content = lastHistory.content as PageType;
      excuteHistory(
        actionType,
        () => (isUndo ? removePageById(content) : addPage(content)),
        () => updatePageByPage(content),
        () => (isUndo ? addPage(content) : removePageById(content)),
        () => addHistory(lastHistory, !isUndo)
      );
      return;
    } else {
      const content = lastHistory.content as Element;

      const history: HistoryType = buildHistory(
        actionType,
        null,
        getElementById(content.pageId, content.id)
      );

      excuteHistory(
        actionType,
        () => (isUndo ? removedElement(content) : addElement(content)),
        () => updatedElement(content),
        () => (isUndo ? addElement(content) : removedElement(content)),
        () => addHistory(history, !isUndo)
      );
      return;
    }
  };
  const excuteHistory = (
    actionType: "create" | "modify" | "delete",
    removeFun: () => void,
    updateFun: () => void,
    addFun: () => void,
    addHistory: () => void
  ) => {
    // 삭제(생성)
    if (actionType === "create") removeFun();
    // 재수정(수정)
    else if (actionType === "modify") updateFun();
    // 재생성(삭제)
    else if (actionType === "delete") addFun();

    addHistory();
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
