import { FormEvent, MouseEvent, useRef, useState } from "react";
import { useCanvasStore } from "../../../../store/canvas.store";
import { useHistoryStore } from "../../../../store/history.store";
import { HistoryType } from "../../../../type/history.type";
import { TextBoxType } from "../../../../type/textBox.type";

interface TextBoxProps {
  pageId: number;
  textBox: TextBoxType;
}

function TextBox({ pageId, textBox }: TextBoxProps) {
  const textBoxRef = useRef(null);
  const [text, setText] = useState(textBox.content);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState(textBox.position);
  const [isActive, setIsActive] = useState(false);
  const updateTextBox = useCanvasStore((state) => state.updateTextBox);
  const addHistory = useHistoryStore((state) => state.addHistory);

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsActive(false);

    if (text === textBox.content) return;

    const newContentTextBox: TextBoxType = {
      ...textBox,
      content: text,
    };

    updateTextBox(pageId, newContentTextBox);

    const textBoxHistory: HistoryType = {
      id: textBox.id,
      child: null,
      content: textBox,
    };
    const history: HistoryType = {
      id: 2,
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
  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setIsActive(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
    setIsActive(true);
  };
  const handleClickTextBox = (e: MouseEvent) => {
    e.stopPropagation();
    setIsActive(true);
  };
  const handleOnInput = (e: FormEvent<HTMLDivElement>) => {
    const newText = e.currentTarget.innerText;
    setText(newText);
  };

  return (
    // <div
    //   className="w-[100vw] h-[100vh] absolute left-0 top-0"
    //   onClick={handleClickGlobal}
    // >
    <div
      className="w-full h-full relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        ref={textBoxRef}
        className={`absolute p-2 resize cursor-auto select-text outline-none ${
          isActive && "border border-gray-400 border-dashed"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        contentEditable
        suppressContentEditableWarning
        onMouseDown={handleMouseDown}
        onClick={handleClickTextBox}
        onInput={handleOnInput}
      >
        {textBox.content}
      </div>
    </div>
    // </div>
  );
}

export default TextBox;
