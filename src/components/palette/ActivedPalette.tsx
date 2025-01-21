import { PaletteType } from "../../type/palette";

interface ActivedPalette {
  activeType: PaletteType;
}

function ActivedPalette({ activeType }: ActivedPalette) {
  return (
    <>
      {activeType && (
        <div className="bg-white w-[30rem] h-[90%] flex flex-col justify-center items-center rounded-md"></div>
      )}
    </>
  );
}

export default ActivedPalette;
