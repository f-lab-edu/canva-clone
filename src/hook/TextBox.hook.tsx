import { FormEvent, useState } from "react";
import { useCanvasStore } from "../store/canvas.store";
import { useUndoStore } from "../store/undo.store";
import { HistoryType } from "../type/history.type";
import { Position, Size, TextBoxType } from "../type/textBox.type";

interface TextBoxHookProps {
  pageId: number;
  textBox: TextBoxType;
}

function useTextBox({ pageId, textBox }: TextBoxHookProps) {
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

    console.log("handleMouseUp");
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
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
    console.log("handleMouseLeave");
    setTextBoxSize(textBox.position, localSize);
  };
  const setTextBoxSize = (position: Position, size: Size) => {
    const newTextBox: TextBoxType = {
      ...textBox,
      position,
      size,
    };
    updateTextBox(pageId, newTextBox);
  };
  return {
    position,
    setPosition,
    setTextBoxSize,
    localSize,
    setLocalSize,
    isActive,
    handleMouseDown,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
    handleMouseUp,
    handleOnInput,
  };
}

export default useTextBox;
