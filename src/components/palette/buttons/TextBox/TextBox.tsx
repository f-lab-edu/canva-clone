import useTextBox from "../../../../hook/TextBox.hook";
import { TextBoxType } from "../../../../type/textBox.type";
import ResizingButtonList from "./ResizingButtonList";

interface TextBoxProps {
  pageId: number;
  textBox: TextBoxType;
}

function TextBox({ pageId, textBox }: TextBoxProps) {
  const {
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
  } = useTextBox({ pageId, textBox });

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
