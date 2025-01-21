import { useState } from "react";
import { PaletteType } from "../../type/palette";
import ActivedPalette from "./ActivedPalette";
import Buttons from "./buttons/Buttons";

function Palette() {
  const [activeType, setActiveType] = useState<PaletteType>(null);

  const handleClickButton = (buttonType: PaletteType) => {
    if (!buttonType) return;
    if (activeType === buttonType) return;

    setActiveType(buttonType);
  };

  return (
    <section className="min-w-[10%] py-14 pl-14 flex flex-row justify-start items-start gap-x-10">
      <Buttons activeType={activeType} handleClickButton={handleClickButton} />
      <ActivedPalette activeType={activeType} />
    </section>
  );
}

export default Palette;
