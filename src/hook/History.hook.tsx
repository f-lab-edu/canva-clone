import { useCanvasStore } from "../store/canvas.store";
import { useRedoStore } from "../store/redo.store";
import { useUndoStore } from "../store/undo.store";
import { HistoryType } from "../type/history.type";
import { PageType } from "../type/page.type";
import { TextBoxType } from "../type/textBox.type";

function useHistory() {
  const { undo, history: undoHistory, addHistoryOfUndo } = useUndoStore();
  const { redo, history: redoHistory, addHistoryOfRedo } = useRedoStore();

  const removePageById = useCanvasStore((state) => state.removePage);
  const updatePageByPage = useCanvasStore((state) => state.updatePage);
  const addPage = useCanvasStore((state) => state.addPage);

  const removedTextBox = useCanvasStore((state) => state.removeTextBox);
  const addTextBox = useCanvasStore((state) => state.addTextBox);
  const updateTextBox = useCanvasStore((state) => state.updateTextBox);

  const addUndoHistory = (history: HistoryType) => addHistoryOfUndo(history);

  const buildHistory = (
    undoType: 1 | 2 | 3,
    childPage: PageType | null,
    pageId: number,
    childTextBox: TextBoxType | null
  ): HistoryType => {
    const history: HistoryType = {
      id: undoType,
      child: null,
      content: null,
    };
    if (childPage) {
      const childHistory: HistoryType = {
        id: childPage.id,
        child: null,
        content: childPage,
      };
      history.child = childHistory;

      return history;
    }

    const childPageOfHistory: HistoryType = {
      id: pageId,
      child: null,
      content: null,
    };
    history.child = childPageOfHistory;

    if (childTextBox) {
      const childTextBoxOfHistory = {
        id: pageId,
        child: null,
        content: childTextBox,
      };
      const childContentType = {
        id: 1,
        child: childTextBoxOfHistory,
        content: null,
      };
      childPageOfHistory.child = childContentType;

      return history;
    }

    return history;
  };

  const historyProcess = (isUndo: boolean) => {
    const lastHistory = isUndo ? undo() : redo();

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
      const history = {
        ...lastHistory,
        id: actionType === 2 ? actionType : actionType === 1 ? 3 : 1,
      };

      excuteHistory(
        actionType,
        () => removePageById(pageContent),
        () => updatePageByPage(pageContent),
        () => addPage(pageContent),
        history,
        isUndo ? addHistoryOfRedo : addHistoryOfUndo
      );

      return;
    }

    /** Content of Page Depth */
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

        const history = {
          ...lastHistory,
          id: actionType === 2 ? actionType : actionType === 1 ? 3 : 1,
        };

        excuteHistory(
          actionType,
          () => removedTextBox(pageId, textBoxContent),
          () => updateTextBox(pageId, textBoxContent),
          () => addTextBox(pageId, textBoxContent),
          history,
          isUndo ? addHistoryOfRedo : addHistoryOfUndo
        );
      }

      return;
    }
  };
  const excuteHistory = (
    actionType: 1 | 2 | 3,
    removeFun: () => void,
    updateFun: () => void,
    addFun: () => void,
    history: HistoryType,
    addHistory: (history: HistoryType) => void
  ) => {
    // 삭제(생성)
    if (actionType === 1) removeFun();
    // 재수정(수정)
    else if (actionType === 2) updateFun();
    // 재생성(삭제)
    else if (actionType === 3) addFun();

    addHistory(history);
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
