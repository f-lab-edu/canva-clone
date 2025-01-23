import { FormEvent, MouseEvent, useState } from "react";
import { TextBoxType } from "../../../../type/textBox";

interface TextBoxProps {
  pageId: number;
  textBox: TextBoxType;
  updateTextBox: (pageId: number, textBox: TextBoxType) => void;
}

function TextBox({ pageId, textBox, updateTextBox }: TextBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState(textBox.position);
  const [isActive, setIsActive] = useState(false);

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsActive(false);
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
  // const handleClickGlobal = () => setIsActive(false);
  const handleOnInput = (e: FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText;

    const newContentTextBox = {
      ...textBox,
      content: text,
    };
    updateTextBox(pageId, newContentTextBox);
    // setTextContent(e.currentTarget.innerText);
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
