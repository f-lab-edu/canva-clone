import {
  RectangleType,
  ShapeType,
  TriangleType,
} from "../../../type/shape.type";
import ElementWrapper from "../ElementWrapper/ElementWrapper";

interface ShapeProps {
  shape: ShapeType;
}

function Shape({ shape }: ShapeProps) {
  const getElement = () => {
    if (shape.shape === "triangle") {
      const triangle = shape as unknown as TriangleType;

      const borderStyle = "solid";

      const borderTopColor =
        triangle.bottomWidth === "0px" ? shape.color : "transparent";
      const borderBottomColor =
        triangle.bottomWidth === "0px" ? "transparent" : shape.color;

      const borderColor = `${borderTopColor} transparent ${borderBottomColor} transparent`;
      const borderWidth = `${triangle.topWidth} ${triangle.leftWidth} ${triangle.bottomWidth} ${triangle.rightWidth}`;

      const style = {
        borderStyle,
        borderColor,
        borderWidth,
      };

      return <div style={style} />;
    } else if (shape.shape === "circle") {
      const style = {
        width: shape.size.width,
        height: shape.size.height - 15,
        background: shape.color,
        borderRadius: "100%",
      };

      return <div style={style} />;
    } else if (shape.shape === "rect") {
      const rectangle = shape as unknown as RectangleType;

      const style = {
        width: shape.size.width - 10,
        height: shape.size.height - 10,
        background: shape.color,
        borderRadius: rectangle.radius,
      };
      console.log(rectangle, shape);

      return <div style={style} />;
    }
  };

  return (
    <ElementWrapper element={shape}>
      <div className="w-full h-full flex justify-center items-center">
        {getElement()}
      </div>
    </ElementWrapper>
  );
}

export default Shape;
