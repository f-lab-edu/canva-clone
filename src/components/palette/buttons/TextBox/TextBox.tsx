import useTextBox from "../../../../hook/TextBox.hook";
import { TextBoxType } from "../../../../type/element.type";
import ResizingButtonList from "./ResizingButtonList";

interface TextBoxProps {
  textBox: TextBoxType;
}

function TextBox({ textBox }: TextBoxProps) {
  const {
    localPos,
    setLocalPos,
    localSize,
    setLocalSize,
    setTextBoxSize,
    isActive,
    handleMouseDown,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
    handleMouseUp,
    handleBlur,
    handleOnInput,
  } = useTextBox({ textBox });

  return (
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
          width: `${localSize.width}px`,
          height: `${localSize.height}px`,
          left: `${localPos.x}px`,
          top: `${localPos.y}px`,
        }}
        contentEditable
        suppressContentEditableWarning
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onBlur={handleBlur}
        onInput={handleOnInput}
      >
        {isActive && (
          <ResizingButtonList
            textBox={textBox}
            localSize={localSize}
            setLocalSize={setLocalSize}
            localPos={localPos}
            setLocalPos={setLocalPos}
            setTextBoxSize={setTextBoxSize}
          />
        )}
        {textBox.content}
      </div>
    </div>
  );
}

export default TextBox;
