import { useState } from "react";
import { PaletteType } from "../../type/palette.type";
import ActivedPalette from "./ActivedPalette";
import Buttons from "./buttons/Buttons";

function Palette() {
  const [activeType, setActiveType] = useState<PaletteType>(null);

  const handleClickButton = (buttonType: PaletteType) => {
    if (!buttonType) return;
    if (activeType === buttonType) return;

    setActiveType(buttonType);
  };

  const inactivePalette = () => setActiveType(null);

  return (
    <section className="min-w-[10%] max-h-[95vh] py-5 pl-5 flex flex-row justify-start items-start gap-x-10">
      <Buttons activeType={activeType} handleClickButton={handleClickButton} />
      <ActivedPalette
        activeType={activeType}
        inactivePalette={inactivePalette}
      />
    </section>
  );
}

export default Palette;
