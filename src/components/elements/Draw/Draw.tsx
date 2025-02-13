/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useCanvasStore } from "../../../store/canvas.store";
import { useDrawStore } from "../../../store/draw.store";
import { DrawType } from "../../../type/draw.type";
import ElementWrapper from "../ElementWrapper/ElementWrapper";

interface DrawProps {
  draw: DrawType;
}

function Draw({ draw }: DrawProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const updateElement = useCanvasStore((state) => state.updateElement);

  const tool = useDrawStore((state) => state.activedTool);
  const isActive = useDrawStore((state) => state.isActive);

  const initCanvas = () => {
    if (!canvasRef || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");

    if (!canvasCtx || !isActive || !tool) return;

    canvas.width = draw.size.width;
    canvas.height = draw.size.height;

    canvasCtx.strokeStyle = draw.style.color;
    canvasCtx.lineWidth = draw.style.width;
    contextRef.current = canvasCtx;

    setCtx(canvasCtx);
  };

  useEffect(() => {
    if (ctx) return;
    initCanvas();
  }, [ctx]);

  useEffect(() => {
    if (!ctx || draw.points.length === 0) return;

    const minX = Math.min(...draw.points.map((p) => p.x));
    const minY = Math.min(...draw.points.map((p) => p.y));

    ctx.beginPath();

    ctx.moveTo(draw.points[0].x - minX, draw.points[0].y - minY);
    draw.points.forEach(({ x, y }) => ctx.lineTo(x - minX, y - minY));

    ctx.strokeStyle = draw.style.color;
    ctx.lineWidth = draw.style.width;
    ctx.stroke();
  }, [ctx, draw]);

  return (
    <ElementWrapper element={draw}>
      <canvas ref={canvasRef} />
    </ElementWrapper>
  );
}

export default Draw;
