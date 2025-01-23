import { PageType } from "../../type/page";
import { TextBoxType } from "../../type/textBox";
import TextBox from "../palette/palettes/TextBox/TextBox";

interface DrawAreaProps {
  page: PageType;
  updateTextBox: (pageId: number, textBox: TextBoxType) => void;
}

function DrawArea({ page, updateTextBox }: DrawAreaProps) {
  return (
    <div className="w-[80%] aspect-video bg-white">
      {page.textBoxs.map((textBox) => (
        <TextBox
          pageId={page.id}
          textBox={textBox}
          updateTextBox={updateTextBox}
        />
      ))}
    </div>
  );
}

export default DrawArea;
