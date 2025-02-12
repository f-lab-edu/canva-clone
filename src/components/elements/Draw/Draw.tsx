import { useEffect, useRef, useState } from "react";
import { useCanvasStore } from "../../../store/canvas.store";
import { DrawType } from "../../../type/draw.type";
import ElementWrapper from "../ElementWrapper/ElementWrapper";

interface DrawProps {
  draw: DrawType;
}

function Draw({ draw }: DrawProps) {
  const canvasRef = useRef(draw.ref ? draw.ref.current : null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const updateElement = useCanvasStore((state) => state.updateElement);

  const startDrawing = () => setIsDrawing(true);
  const finishDrawing = () => setIsDrawing(false);
  const drawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;

    const { offsetX, offsetY } = nativeEvent;

    if (!isDrawing) {
      context.beginPath();
      context.moveTo(offsetX, offsetY);
    } else {
      context.lineTo(offsetX, offsetY);
      context.stroke();
    }
  };
  const handleFocusOut = () => {};

  useEffect(() => {
    if (!canvasRef || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    context.strokeStyle = "black";
    context.lineWidth = 1;
    contextRef.current = context;

    setContext(context);
  }, []);

  return (
    <ElementWrapper element={draw}>
      <canvas
        onBlur={handleFocusOut}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={drawing}
        onMouseLeave={finishDrawing}
        className="w-full h-full"
        ref={canvasRef}
      />
    </ElementWrapper>
  );
}

export default Draw;
