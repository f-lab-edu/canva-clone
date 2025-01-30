import { FormEvent, useEffect, useState } from "react";
import { useCanvasStore } from "../store/canvas.store";
import { TextBoxType } from "../type/element.type";
import useHistory from "./History.hook";

interface TextBoxHookProps {
  textBox: TextBoxType | null;
}

function useTextBox({ textBox }: TextBoxHookProps) {
  const [text, setText] = useState(textBox ? textBox.content : "");

  const updateTextBox = useCanvasStore((state) => state.updateElement);

  const { buildHistory, addUndoHistory } = useHistory();

  const addTextBoxContentHistory = () => {
    if (!textBox) return;

    const history = buildHistory("modify", null, textBox);

    addUndoHistory(history);

    const newContentTextBox: TextBoxType = {
      ...textBox,
      content: text,
    };
    updateTextBox(newContentTextBox);
  };

  const handleOnInput = (e: FormEvent<HTMLDivElement>) => {
    const newText = e.currentTarget.innerText;
    setText(newText);
  };
  const handleBlur = () => {
    if (!textBox) return;
    if (text !== textBox.content) addTextBoxContentHistory();
  };

  useEffect(() => {
    if (!textBox) return;
    setText(textBox.content);
  }, [textBox]);

  return {
    text,
    handleBlur,
    handleOnInput,
  };
}

export default useTextBox;
