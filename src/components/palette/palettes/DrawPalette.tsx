import useHistory from "../../../hook/History.hook";
import { useCanvasStore } from "../../../store/canvas.store";
import { DrawType } from "../../../type/draw.type";

function DrawPalette() {
  const addElement = useCanvasStore((state) => state.addElement);

  const { addUndoHistory, buildHistory } = useHistory();

  const handleClickAddDraw = () => {
    const pageId = 123;
    const drawElement: DrawType = {
      id: Date.now(),
      pageId,
      position: {
        x: 0,
        y: 0,
      },
      size: {
        width: 0,
        height: 0,
      },
      type: "draw",
      ref: null,
    };

    addElement(drawElement);

    addHistory(drawElement);
  };

  const addHistory = (drawElement: DrawType) => {
    const history = buildHistory("create", null, drawElement);
    addUndoHistory(history);
  };

  return (
    <div>
      <button onClick={handleClickAddDraw}>add draw</button>
    </div>
  );
}

export default DrawPalette;
