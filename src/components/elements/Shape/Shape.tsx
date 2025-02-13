import { ShapeType } from "../../../type/shape.type";
import ElementWrapper from "../ElementWrapper/ElementWrapper";

interface ShapeProps {
  shape: ShapeType;
}

function Shape({ shape }: ShapeProps) {
  const getStyle = () => {
    if (shape.shape === "triangle") {
      const width = shape.size.width - 10;
      return {
        borderStyle: "solid",
        borderColor: `transparent transparent ${shape.color} transparent`,
        borderWidth: `0px ${width / 2}px ${width}px ${shape.size.width / 2}px`,
      };
    } else if (shape.shape === "circle") {
      return {
        width: shape.size.width,
        height: shape.size.height - 15,
        background: shape.color,
        borderRadius: "50%",
      };
    } else if (shape.shape === "rect") {
      return {
        width: shape.size.width - 10,
        height: shape.size.height - 10,
        background: shape.color,
      };
    }
  };

  return (
    <ElementWrapper element={shape}>
      <div className="w-full h-full flex justify-center items-center">
        <div style={getStyle()} />
      </div>
    </ElementWrapper>
  );
}

export default Shape;
