import { useState } from "react";
import { Position, Size, TextBoxType } from "../../../../type/textBox.type";

interface ResizingButtonProps {
  direction: {
    x: string;
    y: string;
  };
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  textBox: TextBoxType;
  localSize: Size;
  setLocalSize: React.Dispatch<React.SetStateAction<Size>>;
  setTextBoxSize: (position: Position, size: Size) => void;
}

function ResizingButton({
  direction,
  position,
  setPosition,
  textBox,
  localSize,
  setLocalSize,
  setTextBoxSize,
}: ResizingButtonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseUp = () => {
    setIsDragging(false);

    setTextBoxSize(textBox.position, localSize);
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
      textBox.size.width + (direction.x === "right" ? deltaX : -deltaX)
    );
    const newHeight = Math.max(
      50,
      textBox.size.height + (direction.y === "bottom" ? deltaY : -deltaY)
    );

    const newPosition = {
      x: position.x,
      y: position.y,
    };
    if (direction.x === "left") {
      newPosition.x = newPosition.x - (newWidth - localSize.width);
      if (direction.y === "top") {
        newPosition.y = newPosition.y - (newHeight - localSize.height);
      }
    } else if (direction.x === "right" && direction.y === "top") {
      newPosition.y = newPosition.y - (newHeight - localSize.height);
    }
    setPosition(newPosition);

    setLocalSize({ width: newWidth, height: newHeight });
  };

  return (
    <div
      style={{
        width: `${localSize.width + 10}px`,
        height: `${localSize.height + 10}px`,
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
