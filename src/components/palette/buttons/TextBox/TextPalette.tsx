import { useCanvasStore } from "../../../../store/canvas.store";
import { useUndoStore } from "../../../../store/undo.store";
import { HistoryType } from "../../../../type/history.type";
import { TextBoxType } from "../../../../type/textBox.type";

function TextPalette() {
  const addTextBox = useCanvasStore((state) => state.addTextBox);
  const addHistory = useUndoStore((state) => state.addHistoryOfUndo);

  const handleClickAddTextBox = () => {
    const pageId = 123;
    const textBox: TextBoxType = {
      id: Date.now(),
      content: "텍스트를 입력하세요",
      position: {
        x: 150,
        y: 200,
      },
      size: {
        width: 150,
        height: 40,
      },
    };

    addTextBox(pageId, textBox);

    const textBoxHistory: HistoryType = {
      id: textBox.id,
      child: null,
      content: textBox,
    };

    // 동작(CRUD) - PageId - 콘텐츠타입(textBox | chart | element | draw) -> content
    const history: HistoryType = {
      id: 1,
      content: null,
      child: {
        id: pageId,
        content: null,
        child: {
          id: 1,
          content: null,
          child: textBoxHistory,
        },
      },
    };

    addHistory(history);
  };

  return (
    <div>
      <button onClick={handleClickAddTextBox}>add text box</button>
    </div>
  );
}

export default TextPalette;
