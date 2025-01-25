import { Position, Size, TextBoxType } from "../../../../type/textBox.type";
import ResizingButton from "./ResizingButton";

interface ResizingButtonListProps {
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  textBox: TextBoxType;
  localSize: Size;
  setLocalSize: React.Dispatch<React.SetStateAction<Size>>;
  setTextBoxSize: (position: Position, size: Size) => void;
}

function ResizingButtonList({
  position,
  setPosition,
  textBox,
  localSize,
  setLocalSize,
  setTextBoxSize,
}: ResizingButtonListProps) {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => {
        let direction = null;
        if (index === 0) direction = { x: "left", y: "top" };
        else if (index === 1) direction = { x: "left", y: "bottom" };
        else if (index === 2) direction = { x: "right", y: "top" };
        else direction = { x: "right", y: "bottom" };

        return (
          <ResizingButton
            key={index}
            localSize={localSize}
            setLocalSize={setLocalSize}
            direction={direction}
            position={position}
            setPosition={setPosition}
            setTextBoxSize={setTextBoxSize}
            textBox={textBox}
          />
        );
      })}
    </>
  );
}

export default ResizingButtonList;
