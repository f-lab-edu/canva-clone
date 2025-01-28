import { FormEvent, useEffect, useState } from "react";
import { useCanvasStore } from "../store/canvas.store";
import { Position, Size, TextBoxType } from "../type/element.type";
import useHistory from "./History.hook";

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

  const { buildHistory, addUndoHistory } = useHistory();

  const handleMouseUp = () => {
    setIsDragging(false);

    if (text !== textBox.content) addTextBoxContentHistory();

    if (localSize !== textBox.size) addTextBoxSizeAndPositionHistory();
    else setTextBoxSize(textBox.position, localSize);
  };
  const addTextBoxSizeAndPositionHistory = () => {
    const history = buildHistory(2, null, pageId, textBox);
    addUndoHistory(history);

    const newSizeTextBox: TextBoxType = {
      ...textBox,
      size: localSize,
      position,
    };

    updateTextBox(pageId, newSizeTextBox);
  };
  const addTextBoxContentHistory = () => {
    const history = buildHistory(2, null, pageId, textBox);
    addUndoHistory(history);
    const newContentTextBox: TextBoxType = {
      ...textBox,
      content: text,
    };

    updateTextBox(pageId, newContentTextBox);
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

  useEffect(() => {
    setPosition(textBox.position);
  }, [textBox.position]);

  useEffect(() => {
    setLocalSize(textBox.size);
  }, [textBox.size]);

  useEffect(() => {
    setText(textBox.content);
  }, [textBox.content]);

  return {
    text,
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
