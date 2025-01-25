import { FormEvent, MouseEvent, useRef, useState } from "react";
import { useCanvasStore } from "../../../../store/canvas.store";
import { useUndoStore } from "../../../../store/undo.store";
import { HistoryType } from "../../../../type/history.type";
import { TextBoxType } from "../../../../type/textBox.type";
import ResizingButtonList from "./ResizingButtonList";

interface TextBoxProps {
  pageId: number;
  textBox: TextBoxType;
}

function TextBox({ pageId, textBox }: TextBoxProps) {
  const textBoxRef = useRef(null);
  const [text, setText] = useState(textBox.content);
  const [localSize, setLocalSize] = useState(textBox.size);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState(textBox.position);
  const [isActive, setIsActive] = useState(false);

  const updateTextBox = useCanvasStore((state) => state.updateTextBox);
  const addHistory = useUndoStore((state) => state.addHistoryOfUndo);

  const handleMouseUp = () => {
    setIsDragging(false);

    setTextBoxSize(textBox.position, localSize);
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
  const handleOnInput = (e: FormEvent<HTMLDivElement>) => {
    const newText = e.currentTarget.innerText;
    setText(newText);
  };
  const handleMouseEnter = () => setIsActive(true);
  const handleMouseLeave = () => {
    setIsActive(false);

    setTextBoxSize(textBox.position, localSize);
  };
  const setTextBoxSize = (
    position: { x: number; y: number },
    size: { width: number; height: number }
  ) => {
    const newTextBox: TextBoxType = {
      ...textBox,
      position,
      size,
    };
    updateTextBox(pageId, newTextBox);
  };

  return (
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
          width: `${localSize.width}px`,
          height: `${localSize.height}px`,
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        contentEditable
        suppressContentEditableWarning
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onInput={handleOnInput}
      >
        {isActive && (
          <ResizingButtonList
            textBox={textBox}
            localSize={localSize}
            setLocalSize={setLocalSize}
            position={position}
            setPosition={setPosition}
            setTextBoxSize={setTextBoxSize}
          />
        )}
        {textBox.content}
      </div>
    </div>
  );
}

export default TextBox;
