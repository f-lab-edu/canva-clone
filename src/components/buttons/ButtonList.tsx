function ButtonList() {
  return (
    <section className="w-[10%] flex flex-col justify-start items-center py-14 gap-y-10">
      <button className="flex flex-col items-center  gap-1">
        <img
          className="w-6 h-6 aspect-square"
          src="/src/assets/design.icon.svg"
          alt="design icon"
        />
        <span className="text-xs">Design</span>
      </button>
      <button className="flex flex-col items-center justify-center gap-1">
        <img
          className="w-6 h-6 aspect-square"
          src="/src/assets/elements.icon.svg"
          alt="elements icon"
        />
        <span className="text-xs">Elements</span>
      </button>
      <button className="flex flex-col items-center justify-center gap-1">
        <img
          className="w-6 h-6 aspect-square"
          src="/src/assets/text.icon.svg"
          alt="text icon"
        />
        <span className="text-xs">Text</span>
      </button>
      <button className="flex flex-col items-center justify-center gap-1">
        <img
          className="w-6 h-6 aspect-square"
          src="/src/assets/uploads.icon.svg"
          alt="uploads icon"
        />
        <span className="text-xs">Uploads</span>
      </button>
      <button className="flex flex-col items-center justify-center gap-1">
        <img
          className="w-6 h-6 aspect-square"
          src="/src/assets/draw.icon.svg"
          alt="draw icon"
        />
        <span className="text-xs">Draw</span>
      </button>
      <button className="flex flex-col items-center justify-center gap-1">
        <img
          className="w-6 h-6 aspect-square"
          src="/src/assets/charts.icon.svg"
          alt="charts icon"
        />
        <span className="text-xs">Charts</span>
      </button>
    </section>
  );
}

export default ButtonList;
