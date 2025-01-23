import { useState } from "react";
import { PaletteType } from "../../type/palette";
import { TextBoxType } from "../../type/textBox";
import ActivedPalette from "./ActivedPalette";
import Buttons from "./buttons/Buttons";

interface PaletteProps {
  addTextBox: (pageId: number, textBox: TextBoxType) => void;
}

function Palette({ addTextBox }: PaletteProps) {
  const [activeType, setActiveType] = useState<PaletteType>(null);

  const handleClickButton = (buttonType: PaletteType) => {
    if (!buttonType) return;
    if (activeType === buttonType) return;

    setActiveType(buttonType);
  };

  const inactivePalette = () => setActiveType(null);

  return (
    <section className="min-w-[10%] py-14 pl-5 flex flex-row justify-start items-start gap-x-10">
      <Buttons activeType={activeType} handleClickButton={handleClickButton} />
      <ActivedPalette
        addTextBox={addTextBox}
        activeType={activeType}
        inactivePalette={inactivePalette}
      />
    </section>
  );
}

export default Palette;
