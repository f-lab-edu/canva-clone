import { useDrawStore } from "../../store/draw.store";
import { ChartType } from "../../type/chart.type";
import { DrawType } from "../../type/draw.type";
import { TextBoxType } from "../../type/element.type";
import { PageType } from "../../type/page.type";
import Chart from "../elements/Chart/Chart";
import Draw from "../elements/Draw/Draw";
import DrawArea from "../elements/Draw/DrawArea";
import TextBox from "../elements/TextBox/TextBox";

interface DrawAreaProps {
  page: PageType;
}

function PageBody({ page }: DrawAreaProps) {
  const isActive = useDrawStore((state) => state.isActive);

  return (
    <div className="w-full aspect-video bg-white relative">
      {isActive && <DrawArea />}
      {page.elements.map((element) => {
        if (!element) return null;
        console.log("==== element ====", element);
        if (element.type === "textBox")
          return <TextBox key={element.id} textBox={element as TextBoxType} />;
        else if (element.type === "chart")
          return <Chart key={element.id} chart={element as ChartType} />;
        else if (element.type === "draw")
          return <Draw key={element.id} draw={element as DrawType} />;
      })}
    </div>
  );
}

export default PageBody;
