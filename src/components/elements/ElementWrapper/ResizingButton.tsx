import { useState } from "react";
import { Element, Position, Size } from "../../../type/element.type";

interface ResizingButtonProps {
  direction: {
    x: string;
    y: string;
  };
  localPos: Position;
  setLocalPos: React.Dispatch<React.SetStateAction<Position>>;
  element: Element;
  localSize: Size;
  setLocalSize: React.Dispatch<React.SetStateAction<Size>>;
  setElementSize: (position: Position, size: Size) => void;
}

function ResizingButton({
  direction,
  localPos,
  setLocalPos,
  element,
  localSize,
  setLocalSize,
  setElementSize,
}: ResizingButtonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseUp = () => {
    setIsDragging(false);

    setElementSize(element.position, localSize);
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsDragging(true);
    setOffset({
      x: e.clientX,
      y: e.clientY,
    });
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!isDragging) return;

    const deltaX = e.clientX - offset.x;
    const deltaY = e.clientY - offset.y;
    const newWidth = Math.max(
      50,
      element.size.width + (direction.x === "right" ? deltaX : -deltaX)
    );
    const newHeight = Math.max(
      50,
      element.size.height + (direction.y === "bottom" ? deltaY : -deltaY)
    );

    const newPosition = {
      x: localPos.x,
      y: localPos.y,
    };
    if (direction.x === "left") {
      newPosition.x = newPosition.x - (newWidth - localSize.width);
      if (direction.y === "top") {
        newPosition.y = newPosition.y - (newHeight - localSize.height);
      }
    } else if (direction.x === "right" && direction.y === "top") {
      newPosition.y = newPosition.y - (newHeight - localSize.height);
    }
    setLocalPos(newPosition);

    const size = { width: newWidth, height: newHeight } as Size;

    setLocalSize(size);
  };

  return (
    <div
      style={{
        width: `${
          element.type !== "draw"
            ? `${localSize.width + 10}px`
            : "calc(100% + 10px)"
        }`,
        height: `${
          element.type !== "draw"
            ? `${localSize.height + 10}px`
            : "calc(100% + 10px)"
        }`,
        left: "-5px",
        top: "-5px",
      }}
      className="absolute"
      onMouseLeave={() => {
        setIsDragging(false);
      }}
    >
      <div
        style={{
          left: direction.x === "left" ? "4px" : "null",
          right: direction.x === "left" ? "null" : "5px",
          top: direction.y === "top" ? "4px" : "null",
          bottom: direction.y === "top" ? "null" : "4px",
        }}
        className="absolute w-2 h-2"
        contentEditable={false}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          onMouseDown={handleMouseDown}
          contentEditable={false}
          style={{
            left: direction.x === "left" ? "-3px" : "null",
            right: direction.x === "left" ? "null" : "-3px",
            top: direction.y === "top" ? "-3px" : "null",
            bottom: direction.y === "top" ? "null" : "-3px",
          }}
          className="absolute border border-black w-2 h-2 rounded-sm bg-white z-10 select-none"
        />
      </div>
    </div>
  );
}

export default ResizingButton;
