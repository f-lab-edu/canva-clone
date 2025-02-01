import useHistory from "../../../hook/History.hook";
import { useCanvasStore } from "../../../store/canvas.store";
import { TextBoxType } from "../../../type/element.type";

function TextPalette() {
  const addTextBox = useCanvasStore((state) => state.addElement);
  const { buildHistory, addUndoHistory } = useHistory();

  const handleClickAddTextBox = () => {
    const pageId = 123;
    const textBox: TextBoxType = {
      id: Date.now(),
      content: "텍스트를 입력하세요",
      pageId: pageId,
      type: "textBox",
      size: {
        width: 150,
        height: 40,
      },
      position: {
        x: 150,
        y: 200,
      },
    };

    addTextBox(textBox);

    const history = buildHistory("create", null, textBox);

    addUndoHistory(history);
  };

  return (
    <div>
      <button onClick={handleClickAddTextBox}>add text box</button>
    </div>
  );
}

export default TextPalette;
