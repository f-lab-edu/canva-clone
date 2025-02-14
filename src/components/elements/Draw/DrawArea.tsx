import { useEffect, useRef, useState } from "react";
import useHistory from "../../../hook/History.hook";
import { useCanvasStore } from "../../../store/canvas.store";
import { useDrawStore } from "../../../store/draw.store";
import { DrawType } from "../../../type/draw.type";
import { Position } from "../../../type/element.type";

function DrawArea() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState<DrawType | null>(null);

  const addElement = useCanvasStore((state) => state.addElement);
  const currentPageId = useCanvasStore((state) => state.currentPageId);

  const tool = useDrawStore((state) => state.activedTool);
  const isActive = useDrawStore((state) => state.isActive);

  const { addUndoHistory, buildHistory } = useHistory();

  const handleMouseDown = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isActive || !tool || !currentPageId) return;

    const { offsetX, offsetY } = nativeEvent;
    const line: DrawType = {
      id: Date.now(),
      pageId: currentPageId,
      position: { x: 0, y: 0 },
      size: { width: 0, height: 0 },
      points: [{ x: offsetX, y: offsetY }],
      style: tool,
      type: "draw",
    };

    setCurrentLine(line);
    setIsDrawing(true);
  };
  const handleMouseUp = () => {
    if (!isActive) return;
    if (currentLine) {
      const minX = Math.min(...currentLine.points.map((p) => p.x));
      const minY = Math.min(...currentLine.points.map((p) => p.y));
      const maxX = Math.max(...currentLine.points.map((p) => p.x));
      const maxY = Math.max(...currentLine.points.map((p) => p.y));

      const element: DrawType = {
        ...currentLine,
        size: {
          width: maxX - minX,
          height: maxY - minY,
        },
        position: {
          x: minX,
          y: minY,
        },
      };
      addElement(element);
      addHistory(element);
    }

    setIsDrawing(false);
    setCurrentLine(null);
    setContext(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !currentLine || !isActive) return;

    const { offsetX, offsetY } = e.nativeEvent;

    const point = { x: offsetX, y: offsetY };
    setCurrentLine((prevCurrentLine) => {
      if (!prevCurrentLine || !prevCurrentLine.points) return prevCurrentLine;

      return {
        ...prevCurrentLine,
        points: [...prevCurrentLine.points, point],
      };
    });
    drawLine(point);
  };

  const drawLine = (point: Position) => {
    if (context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      if (!isDrawing) {
        context.beginPath();
        context.moveTo(point.x, point.y);
      } else {
        context.lineTo(point.x, point.y);
        context.stroke();
      }
    }
  };

  const initCanvas = () => {
    if (!canvasRef || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");

    if (!canvasCtx || !isActive || !tool) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    canvasCtx.strokeStyle = tool.color;
    canvasCtx.lineWidth = tool.width;
    canvasCtx.globalAlpha = tool.transparency / 100;

    contextRef.current = canvasCtx;

    setContext(canvasCtx);
  };

  const addHistory = (lineElement: DrawType) => {
    const history = buildHistory("create", null, lineElement);
    addUndoHistory(history);
  };

  useEffect(() => {
    if (context) return;
    initCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  return (
    <canvas
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      className="w-full h-full absolute top-0 left-0 z-10"
      ref={canvasRef}
    />
  );
}

export default DrawArea;
