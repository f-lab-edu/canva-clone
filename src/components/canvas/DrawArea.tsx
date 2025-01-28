import { TextBoxType } from "../../type/element.type";
import { PageType } from "../../type/page.type";
import TextBox from "../palette/buttons/TextBox/TextBox";

interface DrawAreaProps {
  page: PageType;
}

function DrawArea({ page }: DrawAreaProps) {
  return (
    <div className="w-[80%] aspect-video bg-white">
      {page.elements.map((element) => {
        if (!element) return null;

        if (element.type === "textBox")
          return <TextBox key={element.id} textBox={element as TextBoxType} />;

        return null;
      })}
    </div>
  );
}

export default DrawArea;
