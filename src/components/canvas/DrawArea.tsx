import { PageType } from "../../type/page.type";
import TextBox from "../palette/buttons/TextBox/TextBox";

interface DrawAreaProps {
  page: PageType;
}

function DrawArea({ page }: DrawAreaProps) {
  return (
    <div className="w-[80%] aspect-video bg-white">
      {page.textBoxs.map((textBox) => {
        if (!textBox) return null;

        return <TextBox key={textBox.id} pageId={page.id} textBox={textBox} />;
      })}
    </div>
  );
}

export default DrawArea;
