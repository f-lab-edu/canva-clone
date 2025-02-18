import { useState } from "react";
import { useDrawStore } from "../../store/draw.store";
import { PaletteType } from "../../type/palette.type";
import ActivedPalette from "./ActivedPalette";
import Buttons from "./buttons/Buttons";

function Palette() {
  const [activeType, setActiveType] = useState<PaletteType | null>(null);

  const inActiveTool = useDrawStore((state) => state.inActiveTool);

  const handleClickButton = (buttonType: PaletteType) => {
    if (!buttonType) return;
    if (activeType === buttonType) return;

    if (buttonType !== "Draw") inActiveTool();
    setActiveType(buttonType);
  };

  const inactivePalette = () => setActiveType(null);

  return (
    <section
      className={`min-w-[25%] ${
        !activeType && "min-w-[9%]"
      } max-w-[30%] max-h-[95vh] py-5 pl-5 flex flex-row justify-start items-center gap-x-10`}
    >
      <Buttons activeType={activeType} handleClickButton={handleClickButton} />
      {activeType && (
        <ActivedPalette
          activeType={activeType}
          inactivePalette={inactivePalette}
        />
      )}
    </section>
  );
}

export default Palette;
