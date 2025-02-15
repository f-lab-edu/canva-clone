import { TextBoxType } from "../../../type/textBox.type";
import ElementWrapper from "../ElementWrapper/ElementWrapper";

interface TextBoxProps {
  textBox: TextBoxType;
}

function TextBox({ textBox }: TextBoxProps) {
  const getStyle = () => {
    const style = {
      fontSize: textBox.textStyle.size,
      fontWeight: textBox.textStyle.weight,
    };
    return style;
  };

  return (
    <ElementWrapper element={textBox}>
      <div style={getStyle()}>{textBox.content}</div>
    </ElementWrapper>
  );
}

export default TextBox;
