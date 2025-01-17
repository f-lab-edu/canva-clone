import Button from "../../cva/Button/Button";

function ButtonList() {
  return (
    <section className="w-[10%] flex flex-col justify-start items-center py-14 gap-y-10">
      <Button
        className="flex flex-col items-center justify-center gap-1"
        imgSrc="/src/assets/design.icon.svg"
        imgAlt="design icon"
        label="Design"
        font="default"
      />
      <Button
        className="flex flex-col items-center justify-center gap-1"
        imgSrc="/src/assets/elements.icon.svg"
        imgAlt="elements icon"
        label="Elements"
        font="default"
      />
      <Button
        className="flex flex-col items-center justify-center gap-1"
        imgSrc="/src/assets/text.icon.svg"
        imgAlt="text icon"
        label="Text"
        font="default"
      />
      <Button
        className="flex flex-col items-center justify-center gap-1"
        imgSrc="/src/assets/draw.icon.svg"
        imgAlt="draw icon"
        label="Draw"
        font="default"
      />
      <Button
        className="flex flex-col items-center justify-center gap-1"
        imgSrc="/src/assets/uploads.icon.svg"
        imgAlt="uploads icon"
        label="Uploads"
        font="default"
      />
      <Button
        className="flex flex-col items-center justify-center gap-1"
        imgSrc="/src/assets/charts.icon.svg"
        imgAlt="charts icon"
        label="Charts"
        font="default"
      />
    </section>
  );
}

export default ButtonList;
