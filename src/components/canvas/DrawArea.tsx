import { PageType } from "../../type/page.type";
import TextBox from "../palette/buttons/TextBox/TextBox";

interface DrawAreaProps {
  page: PageType;
}

function DrawArea({ page }: DrawAreaProps) {
  return (
    <div className="w-[80%] aspect-video bg-white">
      {page.textBoxs.map((textBox) => {
        console.log("textBox size: ", textBox.size);
        return <TextBox key={textBox.id} pageId={page.id} textBox={textBox} />;
      })}
    </div>
  );
}

export default DrawArea;
