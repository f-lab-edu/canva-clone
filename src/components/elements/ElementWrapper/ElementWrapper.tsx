import { PropsWithChildren } from "react";
import useElement from "../../../hook/element.hook";
import useTextBox from "../../../hook/TextBox.hook";
import { Element, TextBoxType } from "../../../type/element.type";
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
      className="w-full h-full relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      <div
        className={`absolute p-2 resize cursor-auto select-text outline-none ${
          isActive && "border border-gray-400 border-dashed"
        }`}
        style={{
          width: `${element.type !== "draw" ? `${localSize.width}px` : "100%"}`,
          height: `${
            element.type !== "draw" ? `${localSize.height}px` : "100%"
          }`,
          left: `${localPos.x}px`,
          top: `${localPos.y}px`,
        }}
        contentEditable
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
