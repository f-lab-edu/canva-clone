import useHistory from "../../../hook/History.hook";
import { useCanvasStore } from "../../../store/canvas.store";
import { Shapes, ShapeType } from "../../../type/shape.type";

function ElementsPalette() {
  const addElement = useCanvasStore((state) => state.addElement);
  const { buildHistory, addUndoHistory } = useHistory();

  const handleClickAddShape = (shape: Shapes) => {
    const newShape: ShapeType = {
      id: Date.now(),
      color: "#111111",
      pageId: 123,
      position: {
        x: 150,
        y: 150,
      },
      size: {
        width: 100,
        height: 100,
      },
      shape,
      type: "shape",
    };

    addElement(newShape);
    addHistory(newShape);
  };
  const addHistory = (shape: ShapeType) => {
    const history = buildHistory("create", null, shape);
    addUndoHistory(history);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full gap-5">
      <button
        onClick={() => handleClickAddShape("rect")}
        className="border-gray-400 border"
      >
        <div className="w-[90px] aspect-square bg-blue-400 m-1" />
      </button>
      <button
        onClick={() => handleClickAddShape("circle")}
        className="border-gray-400 border"
      >
        <div className="w-[90px] aspect-square bg-blue-400 m-1 rounded-full" />
      </button>
      <button
        onClick={() => handleClickAddShape("triangle")}
        className="border-gray-400 border"
      >
        <div className="w-[90px] aspect-square m-1 border-solid border-b-[90px] border-l-[45px] border-r-[45px] border-r-transparent border-l-transparent border-b-blue-400" />
      </button>
    </div>
  );
}

export default ElementsPalette;
