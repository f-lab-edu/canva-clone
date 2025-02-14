import { useEffect, useState } from "react";
import { useCanvasStore } from "../store/canvas.store";
import { useDrawStore } from "../store/draw.store";
import { useHistoryStore } from "../store/history.store";
import { Element, Position, Size } from "../type/element.type";
import useHistory from "./History.hook";

interface ElementHookProps {
  element: Element;
}

function useElement({ element }: ElementHookProps) {
  const [localSize, setLocalSize] = useState(element.size);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [localPos, setLocalPos] = useState(element.position);
  const [isActive, setIsActive] = useState(false);

  const updateElement = useCanvasStore((state) => state.updateElement);
  const setCurrentElementId = useCanvasStore(
    (state) => state.setCurrentElementId
  );

  const isDrawActive = useDrawStore((state) => state.isActive);

  const addHistory = useHistoryStore((state) => state.addHistory);
  const { buildHistory } = useHistory();

  const handleMouseUp = () => {
    if (isDrawActive) return;
    setIsDragging(false);

    if (localSize !== element.size) addHistoryOfElementSize();
    else setElementSize(element.position, localSize);
  };

  const addHistoryOfElementSize = () => {
    const history = buildHistory("modify", null, element);
    addHistory(history, true);

    const newElement: Element = {
      ...element,
      size: localSize,
      position: localPos,
    };
    updateElement(newElement);
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDrawActive) return;

    setIsDragging(true);
    setOffset({
      x: e.clientX - localPos.x,
      y: e.clientY - localPos.y,
    });
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging || isDrawActive) return;

    setLocalPos({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
    setIsActive(true);
  };
  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (isDrawActive) return;

    setIsActive(true);
  };
  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (isDrawActive) return;
    setIsActive(false);

    setElementSize(element.position, localSize);
  };
  const setElementSize = (position: Position, size: Size) => {
    const newElement: Element = {
      ...element,
      position,
      size,
    };

    updateElement(newElement);
  };
  const handleClick = () => {
    if (isDrawActive) return;
    setCurrentElementId(element.id);
    setIsActive(true);
  };

  useEffect(() => {
    setLocalPos(element.position);
  }, [element.position]);

  useEffect(() => {
    setLocalSize(element.size);
  }, [element.size]);

  return {
    localPos,
    setLocalPos,
    setElementSize,
    localSize,
    setLocalSize,
    isActive,
    handleClick,
    handleMouseDown,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
    handleMouseUp,
  };
}

export default useElement;
