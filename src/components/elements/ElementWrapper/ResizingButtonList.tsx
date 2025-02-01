import { Element, Position, Size } from "../../../type/element.type";
import ResizingButton from "./ResizingButton";

interface ResizingButtonListProps {
  localPos: Position;
  setLocalPos: React.Dispatch<React.SetStateAction<Position>>;
  element: Element;
  localSize: Size;
  setLocalSize: React.Dispatch<React.SetStateAction<Size>>;
  setElementSize: (position: Position, size: Size) => void;
}

function ResizingButtonList({
  localPos,
  setLocalPos,
  element,
  localSize,
  setLocalSize,
  setElementSize,
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
            localPos={localPos}
            setLocalPos={setLocalPos}
            setElementSize={setElementSize}
            element={element}
          />
        );
      })}
    </>
  );
}

export default ResizingButtonList;
