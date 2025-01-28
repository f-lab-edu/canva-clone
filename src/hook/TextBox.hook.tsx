import { FormEvent, useEffect, useState } from "react";
import { useCanvasStore } from "../store/canvas.store";
import { Position, Size, TextBoxType } from "../type/element.type";
import useHistory from "./History.hook";

interface TextBoxHookProps {
  textBox: TextBoxType;
}

function useTextBox({ textBox }: TextBoxHookProps) {
  const [text, setText] = useState(textBox.content);
  const [localSize, setLocalSize] = useState(textBox.size);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [localPos, setLocalPos] = useState(textBox.position);
  const [isActive, setIsActive] = useState(false);

  const updateTextBox = useCanvasStore((state) => state.updateElement);

  const { buildHistory, addUndoHistory } = useHistory();

  const handleMouseUp = () => {
    setIsDragging(false);

    if (localSize !== textBox.size) addTextBoxSizeAndPositionHistory();
    else setTextBoxSize(textBox.position, localSize);
  };
  const addTextBoxSizeAndPositionHistory = () => {
    const history = buildHistory("modify", null, textBox);
    addUndoHistory(history);

    const newSizeTextBox: TextBoxType = {
      ...textBox,
      size: localSize,
      position: localPos,
    };
    updateTextBox(newSizeTextBox);
  };
  const addTextBoxContentHistory = () => {
    const history = buildHistory("modify", null, textBox);
    console.log(textBox);
    addUndoHistory(history);

    const newContentTextBox: TextBoxType = {
      ...textBox,
      content: text,
    };
    updateTextBox(newContentTextBox);
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - localPos.x,
      y: e.clientY - localPos.y,
    });
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging) return;

    setLocalPos({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
    setIsActive(true);
  };
  const handleOnInput = (e: FormEvent<HTMLDivElement>) => {
    const newText = e.currentTarget.innerText;
    setText(newText);
  };
  const handleBlur = () => {
    console.log("== handle blur ==\n", text, textBox.content);
    if (text !== textBox.content) addTextBoxContentHistory();
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

    updateTextBox(newTextBox);
  };

  useEffect(() => {
    setLocalPos(textBox.position);
  }, [textBox.position]);

  useEffect(() => {
    setLocalSize(textBox.size);
  }, [textBox.size]);

  useEffect(() => {
    setText(textBox.content);
  }, [textBox.content]);

  return {
    text,
    localPos,
    setLocalPos,
    setTextBoxSize,
    localSize,
    setLocalSize,
    isActive,
    handleMouseDown,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
    handleMouseUp,
    handleBlur,
    handleOnInput,
  };
}

export default useTextBox;
