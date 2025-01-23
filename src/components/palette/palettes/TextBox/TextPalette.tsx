import { TextBoxType } from "../../../../type/textBox";

interface TextPaletteProps {
  addTextBox: (pageId: number, textBox: TextBoxType) => void;
}

function TextPalette({ addTextBox }: TextPaletteProps) {
  const handleClickAddTextBox = () => {
    const textBox: TextBoxType = {
      id: Date.now(),
      content: "텍스트를 입력하세요",
      position: {
        x: 150,
        y: 200,
      },
    };

    addTextBox(123, textBox);
  };

  return (
    <div>
      <button onClick={handleClickAddTextBox}>add text box</button>
    </div>
  );
}

export default TextPalette;
