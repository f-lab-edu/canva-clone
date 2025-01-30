import { IoClose } from "react-icons/io5";
import { PaletteType } from "../../type/palette.type";
import ChartsPalette from "./palettes/Chart/ChartsPalette";
import DesignPalette from "./palettes/DesignPalette";
import DrawPalette from "./palettes/DrawPalette";
import ElementsPalette from "./palettes/ElementsPalette";
import TextPalette from "./palettes/TextPalette";
import UploadsPalette from "./palettes/UploadsPalette";

interface ActivedPalette {
  activeType: PaletteType;
  inactivePalette: () => void;
}

function ActivedPalette({ activeType, inactivePalette }: ActivedPalette) {
  const getTargetPalette = () => {
    let targetPalette = null;

    switch (activeType) {
      case "Design":
        targetPalette = <DesignPalette />;
        break;
      case "Elements":
        targetPalette = <ElementsPalette />;
        break;
      case "Text":
        targetPalette = <TextPalette />;
        break;
      case "Draw":
        targetPalette = <DrawPalette />;
        break;
      case "Charts":
        targetPalette = <ChartsPalette />;
        break;
      case "Uploads":
        targetPalette = <UploadsPalette />;
        break;
    }

    return targetPalette;
  };

  return (
    <div className="bg-white min-w-[80%] h-[90%] flex flex-col justify-start items-start rounded-md p-5 gap-y-5 z-30">
      <button className="self-end" onClick={inactivePalette}>
        <IoClose size="20" />
      </button>
      {getTargetPalette()}
    </div>
  );
}

export default ActivedPalette;
