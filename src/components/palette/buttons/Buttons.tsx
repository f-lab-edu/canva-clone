import Button from "../../../cva/Button/Button";
import { PaletteType } from "../../../type/palette.type";

const BUTTONS: PaletteType[] = ["Elements", "Text", "Draw", "Charts"];

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
            key={buttonType}
            className={`flex flex-col items-center justify-center gap-1 ${
              buttonType === activeType && "bg-white rounded-lg"
            }`}
            font="default"
            imgSrc={`https://wbqryjgwbnmvgjsgksvg.supabase.co/storage/v1/object/public/images/paletteButtons/${buttonType}.icon.svg`}
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
