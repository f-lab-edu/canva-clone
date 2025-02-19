import { useEffect, useState } from "react";
import { DrawTool, useDrawStore } from "../../../store/draw.store";

const BLUE_PEN: DrawTool = {
  color: "#0000FF",
  width: 1,
  transparency: 100,
};
const RED_PEN: DrawTool = {
  color: "#FF0000",
  width: 3,
  transparency: 100,
};
const YELLOW_PEN: DrawTool = {
  color: "#FFFF00",
  width: 5,
  transparency: 50,
};

function DrawPalette() {
  const [strokeWidth, setStrokeWidth] = useState<number>(1);
  const [transparency, setTransparency] = useState<number>(100);

  const isActive = useDrawStore((state) => state.isActive);
  const setActiveTool = useDrawStore((state) => state.setActiveTool);
  const inActiveTool = useDrawStore((state) => state.inActiveTool);
  const activedTool = useDrawStore((state) => state.activedTool);
  const changeWidth = useDrawStore((state) => state.changeWidth);
  const changeTransparency = useDrawStore((state) => state.changeTransparency);

  const toggleIsDrawing = (tool: DrawTool) => {
    if (isActive && activedTool === tool) return inActiveTool();
    setActiveTool(tool);
  };
  const handleChangeStrokeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value < 1) return;

    setStrokeWidth(value);

    if (isActive) changeWidth(value);
  };
  const handleChangeStrokeTransparency = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(e.target.value);
    setTransparency(value);

    if (value < 1) return;

    if (isActive) changeTransparency(value);
  };

  useEffect(() => {
    if (!activedTool) return;
    setStrokeWidth(activedTool.width);
    setTransparency(activedTool.transparency);
  }, [activedTool]);

  return (
    <div className="overflow-hidden flex flex-col gap-3 w-full h-full justify-center">
      <h4 className="font-bold mb-4">Drawing Pens</h4>
      <button
        className={`${
          isActive && activedTool!.color === BLUE_PEN.color
            ? "ml-[-15px]"
            : "ml-[-40px]"
        }`}
        onClick={() => toggleIsDrawing(BLUE_PEN)}
      >
        <img
          src="https://wbqryjgwbnmvgjsgksvg.supabase.co/storage/v1/object/public/images/pens/blue-pen.img.svg"
          alt=""
        />
      </button>
      <button
        className={`${
          isActive && activedTool!.color === RED_PEN.color
            ? "ml-[-15px]"
            : "ml-[-40px]"
        }`}
        onClick={() => toggleIsDrawing(RED_PEN)}
      >
        <img
          src="https://wbqryjgwbnmvgjsgksvg.supabase.co/storage/v1/object/public/images/pens/red-pen.img.svg"
          alt=""
        />
      </button>
      <button
        className={`${
          isActive && activedTool!.color === YELLOW_PEN.color
            ? "ml-[-15px]"
            : "ml-[-40px]"
        }`}
        onClick={() => toggleIsDrawing(YELLOW_PEN)}
      >
        <img
          src="https://wbqryjgwbnmvgjsgksvg.supabase.co/storage/v1/object/public/images/pens/yellow-pen.img.svg"
          alt=""
        />
      </button>
      <div className="flex flex-col mt-10">
        <label htmlFor="stroke-weight" className="font-bold">
          Stroke Weight
        </label>

        <div className="flex flex-row justify-between gap-2">
          <input
            className="border w-full"
            type="range"
            id="stroke=weight"
            value={strokeWidth}
            onChange={(e) => handleChangeStrokeWidth(e)}
          />
          <span className="w-10 p-1 border border-gray-400 rounded-lg flex justify-center items-center">
            {strokeWidth}
          </span>
        </div>
      </div>
      <div className="flex flex-col mt-10">
        <label htmlFor="transparency" className="font-bold">
          Transparency
        </label>
        <div className="flex flex-row justify-between gap-2">
          <input
            className="border w-full"
            type="range"
            id="transparency"
            value={transparency}
            onChange={(e) => handleChangeStrokeTransparency(e)}
          />
          <span className="w-10 p-1 border border-gray-400 rounded-lg flex justify-center items-center">
            {transparency}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DrawPalette;
