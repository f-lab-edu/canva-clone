import { useEffect, useState } from "react";
import { DrawTool, useDrawStore } from "../../../store/draw.store";

const BLUE_PEN: DrawTool = {
  color: "blue",
  width: 1,
};
const RED_PEN: DrawTool = {
  color: "red",
  width: 3,
};
const YELLOW_PEN: DrawTool = {
  color: "yellow",
  width: 5,
};

function DrawPalette() {
  const [strokeWidth, setStrokeWidth] = useState<number>(1);

  const isActive = useDrawStore((state) => state.isActive);
  const setActiveTool = useDrawStore((state) => state.setActiveTool);
  const inActiveTool = useDrawStore((state) => state.inActiveTool);
  const changeColor = useDrawStore((state) => state.changeColor);
  const activedTool = useDrawStore((state) => state.activedTool);
  const changeWidth = useDrawStore((state) => state.changeWidth);

  const toggleIsDrawing = (tool: DrawTool) => {
    if (isActive && activedTool === tool) return inActiveTool();
    setActiveTool(tool);
  };
  const handleChangeStrokeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setStrokeWidth(value);

    if (isActive) changeWidth(value);
  };
  const handleChangeColor = () => {};

  useEffect(() => {
    if (!activedTool) return;
    setStrokeWidth(activedTool.width);
  }, [activedTool]);

  return (
    <div className="overflow-hidden flex flex-col gap-3 w-full">
      <button
        className={`${
          isActive && activedTool!.color === "blue"
            ? "ml-[-15px]"
            : "ml-[-40px]"
        }`}
        onClick={() => toggleIsDrawing(BLUE_PEN)}
      >
        <img src="/src/assets/pens/blue-pen.img.svg" alt="" />
      </button>
      <button
        className={`${
          isActive && activedTool!.color === "red" ? "ml-[-15px]" : "ml-[-40px]"
        }`}
        onClick={() => toggleIsDrawing(RED_PEN)}
      >
        <img src="/src/assets/pens/red-pen.img.svg" alt="" />
      </button>
      <button
        className={`${
          isActive && activedTool!.color === "yellow"
            ? "ml-[-15px]"
            : "ml-[-40px]"
        }`}
        onClick={() => toggleIsDrawing(YELLOW_PEN)}
      >
        <img src="/src/assets/pens/yellow-pen.img.svg" alt="" />
      </button>
      <div className="flex flex-col">
        <label htmlFor="stroke">width</label>
        <input
          className="border"
          type="range"
          id="stroke"
          value={strokeWidth}
          onChange={(e) => handleChangeStrokeWidth(e)}
        />
      </div>
    </div>
  );
}

export default DrawPalette;
