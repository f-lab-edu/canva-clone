import { TextBoxType } from "../../../type/element.type";
import ElementWrapper from "../ElementWrapper/ElementWrapper";

interface TextBoxProps {
  textBox: TextBoxType;
}

function TextBox({ textBox }: TextBoxProps) {
  return <ElementWrapper element={textBox}>{textBox.content}</ElementWrapper>;
}

export default TextBox;
