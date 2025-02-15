import { PropsWithChildren } from "react";
import useElement from "../../../hook/element.hook";
import useTextBox from "../../../hook/TextBox.hook";
import { Element } from "../../../type/element.type";
import { TextBoxType } from "../../../type/textBox.type";
import ResizingButtonList from "./ResizingButtonList";

interface ElementWrapper {
  element: Element;
}

function ElementWrapper({
  element,
  children,
}: PropsWithChildren<ElementWrapper>) {
  const {
    localPos,
    setLocalPos,
    localSize,
    setLocalSize,
    isActive,
    setElementSize,
    handleClick,
    handleMouseDown,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
    handleMouseUp,
  } = useElement({ element });

  const { handleBlur, handleOnInput } = useTextBox({
    textBox: element.type === "textBox" ? (element as TextBoxType) : null,
  });

  return (
    <div
      className={`absolute left-0 top-0 ${isActive && "w-full h-full"}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
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
        contentEditable={element.type === "textBox"}
        suppressContentEditableWarning
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...(element.type === "textBox" && {
          onBlur: handleBlur,
          onInput: handleOnInput,
        })}
      >
        {isActive && (
          <ResizingButtonList
            element={element}
            localSize={localSize}
            setLocalSize={setLocalSize}
            localPos={localPos}
            setLocalPos={setLocalPos}
            setElementSize={setElementSize}
          />
        )}
        {children}
      </div>
    </div>
  );
}

export default ElementWrapper;
