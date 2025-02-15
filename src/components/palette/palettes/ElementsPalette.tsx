import useHistory from "../../../hook/History.hook";
import { useCanvasStore } from "../../../store/canvas.store";
import { Size } from "../../../type/element.type";
import {
  RectangleType,
  Shapes,
  ShapeType,
  TriangleType,
} from "../../../type/shape.type";

function ElementsPalette() {
  const addElement = useCanvasStore((state) => state.addElement);
  const currentPageId = useCanvasStore((state) => state.currentPageId);

  const { buildHistory, addUndoHistory } = useHistory();

  const handleClickAddShape = (
    shape: Shapes,
    size: Size,
    shapeVariant?: string
  ) => {
    if (!currentPageId) return;

    let newShape: RectangleType | TriangleType | ShapeType = {
      id: Date.now(),
      color: "#111111",
      pageId: currentPageId,
      position: {
        x: 150,
        y: 150,
      },
      size,
      shape,
      type: "shape",
    };

    if (shape === "rect") {
      newShape = {
        ...newShape,
        radius: shapeVariant,
      } as unknown as RectangleType;
    } else if (shape === "triangle") {
      const topWidth =
        shapeVariant === "top" ? "0px" : (size.width - 10).toString() + "px";
      const bottomWidth =
        shapeVariant === "bottom" ? "0px" : (size.width - 10).toString() + "px";
      const leftWidth =
        shapeVariant === "right"
          ? "0px"
          : shapeVariant === "left"
          ? (size.width - 10).toString() + "px"
          : ((size.width - 10) / 2).toString() + "px";
      const rightWidth =
        shapeVariant === "left"
          ? "0px"
          : shapeVariant === "right"
          ? (size.width - 10).toString() + "px"
          : ((size.width - 10) / 2).toString() + "px";

      newShape = {
        ...newShape,
        topWidth,
        bottomWidth,
        leftWidth,
        rightWidth,
      } as unknown as TriangleType;
    }

    addElement(newShape);
    addHistory(newShape);
  };
  const addHistory = (shape: ShapeType) => {
    const history = buildHistory("create", null, shape);
    addUndoHistory(history);
  };

  return (
    <section className="flex flex-col justify-center items-start w-full h-full gap-14">
      {/* rectangles */}
      <article className="w-full flex flex-col gap-y-2">
        <h4 className="font-bold">Rectangles</h4>
        <div className="overflow-scroll flex flex-row gap-x-4">
          <button
            onClick={() =>
              handleClickAddShape("rect", { width: 100, height: 100 }, "1rem")
            }
            className="border-gray-400 border p-2 w-[98px] flex justify-center items-center aspect-square h-[98px]"
          >
            <div className="w-[90px] aspect-square bg-blue-400" />
          </button>
          <button
            onClick={() =>
              handleClickAddShape(
                "rect",
                { width: 100, height: 100 },
                "0.75rem"
              )
            }
            className="border-gray-400 border p-2 w-[98px] flex justify-center items-center aspect-square h-[98px]"
          >
            <div className="w-[90px] aspect-square bg-blue-400 rounded-xl" />
          </button>
        </div>
      </article>
      {/* circles */}
      <article className="w-full gap-y-2 flex flex-col">
        <h4 className="font-bold">Circles</h4>
        <div className="overflow-scroll flex flex-row gap-x-4">
          <button
            onClick={() =>
              handleClickAddShape("circle", { width: 100, height: 100 })
            }
            className="border-gray-400 border p-2 w-[98px] flex justify-center items-center aspect-square h-[98px]"
          >
            <div className="w-[90px] aspect-square bg-blue-400 rounded-full" />
          </button>
          <button
            onClick={() =>
              handleClickAddShape("circle", { width: 80, height: 80 })
            }
            className="border-gray-400 border p-2 w-[98px] flex justify-center items-center aspect-square h-[98px]"
          >
            <div className="w-[60px] aspect-square bg-blue-400 rounded-full" />
          </button>
          <button
            onClick={() =>
              handleClickAddShape("circle", { width: 50, height: 50 })
            }
            className="border-gray-400 border p-2 w-[98px] flex justify-center items-center aspect-square h-[98px]"
          >
            <div className="w-[40px] aspect-square bg-blue-400 rounded-full" />
          </button>
          <button
            onClick={() =>
              handleClickAddShape("circle", { width: 30, height: 30 })
            }
            className="border-gray-400 border p-2 w-[98px] flex justify-center items-center aspect-square h-[98px]"
          >
            <div className="w-[20px] aspect-square bg-blue-400 rounded-full" />
          </button>
        </div>
      </article>
      {/* triangles */}
      <article className="w-full flex flex-col gap-y-2">
        <h4 className="font-bold">Triangles</h4>
        <div className=" overflow-scroll flex flex-row gap-x-4">
          <button
            onClick={() =>
              handleClickAddShape(
                "triangle",
                { width: 100, height: 100 },
                "top"
              )
            }
            className="border-gray-400 border p-2 w-[98px] flex justify-center items-center aspect-square h-[98px]"
          >
            <div className="w-[90px] aspect-square border-solid border-b-[90px] border-l-[45px] border-r-[45px] border-r-transparent border-l-transparent border-b-blue-400" />
          </button>
          <button
            onClick={() =>
              handleClickAddShape(
                "triangle",
                { width: 100, height: 100 },
                "bottom"
              )
            }
            className="border-gray-400 border p-2 w-[98px] flex justify-center items-center aspect-square h-[98px]"
          >
            <div className="w-[90px] aspect-square border-solid border-t-[90px] border-l-[45px] border-r-[45px] border-r-transparent border-l-transparent border-t-blue-400" />
          </button>
          <button
            onClick={() =>
              handleClickAddShape(
                "triangle",
                { width: 100, height: 100 },
                "right"
              )
            }
            className="border-gray-400 border p-2 w-[98px] flex justify-center items-center aspect-square h-[98px]"
          >
            <div className="w-[90px] aspect-square border-solid border-b-[90px] border-l-[90px] border-r-transparent border-l-transparent border-b-blue-400" />
          </button>
          <button
            onClick={() =>
              handleClickAddShape(
                "triangle",
                { width: 100, height: 100 },
                "left"
              )
            }
            className="border-gray-400 border p-2 w-[98px] flex justify-center items-center aspect-square h-[98px]"
          >
            <div className="w-[90px] aspect-square border-solid border-b-[90px] border-r-[90px] border-r-transparent border-l-transparent border-b-blue-400" />
          </button>
        </div>
      </article>
    </section>
  );
}

export default ElementsPalette;
