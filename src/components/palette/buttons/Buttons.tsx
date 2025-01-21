import Button from "../../../cva/Button/Button";
import { PaletteType } from "../../../type/palette";

const BUTTONS: PaletteType[] = [
  "Design",
  "Elements",
  "Text",
  "Draw",
  "Uploads",
  "Charts",
];

interface ButtonsProps {
  activeType: PaletteType;
  handleClickButton: (buttonType: PaletteType) => void;
}

function Buttons({ activeType, handleClickButton }: ButtonsProps) {
  return (
    <section className=" flex flex-col justify-center items-center gap-y-10">
      {BUTTONS.map((buttonType: PaletteType) => {
        if (!buttonType) return;

        return (
          <Button
            className={`flex flex-col items-center justify-center gap-1 ${
              buttonType === activeType && "bg-white rounded-lg"
            }`}
            font="default"
            imgSrc={`/src/assets/${buttonType}.icon.svg`}
            imgAlt={`${buttonType} icon`}
            label={buttonType}
            onClick={() => handleClickButton(buttonType)}
          />
        );
      })}
    </section>
  );
}

export default Buttons;
