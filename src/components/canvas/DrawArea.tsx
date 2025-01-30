import { ChartType } from "../../type/chart.type";
import { TextBoxType } from "../../type/element.type";
import { PageType } from "../../type/page.type";
import Chart from "../elements/Chart/Chart";
import TextBox from "../elements/TextBox/TextBox";

interface DrawAreaProps {
  page: PageType;
}

function DrawArea({ page }: DrawAreaProps) {
  return (
    <div className="w-full aspect-video bg-white">
      {page.elements.map((element) => {
        if (!element) return null;

        if (element.type === "textBox")
          return <TextBox key={element.id} textBox={element as TextBoxType} />;
        else if (element.type === "chart")
          return <Chart key={element.id} chart={element as ChartType} />;

        return null;
      })}
    </div>
  );
}

export default DrawArea;
