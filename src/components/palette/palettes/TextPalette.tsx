import useHistory from "../../../hook/History.hook";
import { useCanvasStore } from "../../../store/canvas.store";
import { TextBoxType, TextStyle } from "../../../type/textBox.type";

function TextPalette() {
  const addTextBox = useCanvasStore((state) => state.addElement);
  const currentPageId = useCanvasStore((state) => state.currentPageId);

  const { buildHistory, addUndoHistory } = useHistory();

  const handleClickAddTextBox = (textStyle: TextStyle) => {
    if (!currentPageId) return;

    const textBox: TextBoxType = {
      id: Date.now(),
      content: "텍스트를 입력하세요",
      pageId: currentPageId,
      type: "textBox",
      size: {
        width: 150,
        height: 40,
      },
      position: {
        x: 150,
        y: 200,
      },
      textStyle,
    };

    addTextBox(textBox);

    const history = buildHistory("create", null, textBox);

    addUndoHistory(history);
  };

  return (
    <section className="h-full w-full flex flex-col gap-y-5">
      <h4 className="font-bold">Default text styles</h4>
      <article className="flex flex-col gap-y-5 justify-center items-start">
        <button
          className="text-3xl font-bold p-2 border border-gray-400 w-full text-start"
          onClick={() => handleClickAddTextBox({ size: "30px", weight: 700 })}
        >
          Add a heading
        </button>
        <button
          className="text-xl font-semibold p-2 border border-gray-400 w-full  text-start"
          onClick={() => handleClickAddTextBox({ size: "20px", weight: 600 })}
        >
          Add a subheading
        </button>
        <button
          className="text-base font-light p-2 border border-gray-400 w-full  text-start"
          onClick={() => handleClickAddTextBox({ size: "16px", weight: 300 })}
        >
          Add a body text
        </button>
      </article>
    </section>
  );
}

export default TextPalette;
