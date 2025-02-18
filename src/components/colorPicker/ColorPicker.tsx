import { useEffect, useState } from "react";
import useHistory from "../../hook/History.hook";
import { useCanvasStore } from "../../store/canvas.store";
import { useDrawStore } from "../../store/draw.store";
import { Element } from "../../type/element.type";
import { ShapeType } from "../../type/shape.type";
import { TextBoxType } from "../../type/textBox.type";

function ColorPicker() {
  const [currentElement, setCurrentElement] = useState<Element | null>(null);
  const [currentColor, setCurrentColor] = useState<string | null>(null);

  const currentElementId = useCanvasStore((state) => state.currentElementId);
  const getElementById = useCanvasStore((state) => state.getElementById);
  const updateElement = useCanvasStore((state) => state.updateElement);

  const changeDrawColor = useDrawStore((state) => state.changeColor);
  const activedTool = useDrawStore((state) => state.activedTool);
  const isActive = useDrawStore((state) => state.isActive);

  const { buildHistory, addUndoHistory } = useHistory();

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentElement && !isActive) return;

    const color = e.target.value;

    if (isActive) return changeDrawColor(color);

    switch (currentElement!.type) {
      case "shape":
        changeShapeColor(color);
        break;
      case "textBox":
        changeTextColor(color);
        break;
    }
  };
  const changeShapeColor = (color: string) => {
    const shapeElement = currentElement as ShapeType;

    const newShape = {
      ...shapeElement,
      color,
    };
    updateElement(newShape);

    addHistory();
  };
  const changeTextColor = (color: string) => {
    const textBoxElement = currentElement as TextBoxType;

    const newTextBox: TextBoxType = {
      ...textBoxElement,
      textStyle: {
        ...textBoxElement.textStyle,
        color,
      },
    };
    updateElement(newTextBox);
    addHistory();
  };
  const addHistory = () => {
    const history = buildHistory("modify", null, currentElement);
    addUndoHistory(history);
  };
  const changeCurrentColorByText = (element: TextBoxType) => {
    const color = element.textStyle.color;
    setCurrentColor(color);
  };
  const changeCurrentColorByShape = (element: ShapeType) => {
    const color = element.color;
    setCurrentColor(color);
  };

  useEffect(() => {
    if (!currentElementId) return;

    const element = getElementById(currentElementId);

    if (!element) return;

    setCurrentElement(element);

    if (element.type === "chart") return;

    switch (element.type) {
      case "shape":
        changeCurrentColorByShape(element as ShapeType);
        break;
      case "textBox":
        changeCurrentColorByText(element as TextBoxType);
        break;
    }
  }, [currentElementId]);

  useEffect(() => {
    if (!activedTool) return;

    const toolColor = activedTool!.color;

    setCurrentColor(toolColor);
  }, [isActive, activedTool]);

  return (
    <>
      {((currentElement && currentElement.type !== "chart") || isActive) && (
        <article className="fixed right-5 bottom-5 bg-white w-64 h-24 border border-gray-200 rounded-lg p-4 flex flex-col gap-y-2">
          <strong>Change Color Palette</strong>

          <input
            type="color"
            className="bg-white"
            value={currentColor ? currentColor : "black"}
            onChange={handleChangeColor}
          />
        </article>
      )}
    </>
  );
}

export default ColorPicker;
