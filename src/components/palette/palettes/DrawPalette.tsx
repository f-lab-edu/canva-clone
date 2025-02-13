import { DrawTool, useDrawStore } from "../../../store/draw.store";

function DrawPalette() {
  const setActiveTool = useDrawStore((state) => state.setActiveTool);
  const inActiveTool = useDrawStore((state) => state.inActiveTool);

  const handleClickStartDraw = () => {
    const tool: DrawTool = {
      color: "black",
      width: 1,
    };
    setActiveTool(tool);
  };
  const handleClickStopDraw = () => inActiveTool();

  return (
    <div>
      <button onClick={handleClickStartDraw}>start draw</button>
      <br />
      <button onClick={handleClickStopDraw}>stop draw</button>
    </div>
  );
}

export default DrawPalette;
