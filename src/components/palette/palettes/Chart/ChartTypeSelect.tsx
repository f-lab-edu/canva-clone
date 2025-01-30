import { ChangeEvent } from "react";
import useHistory from "../../../../hook/History.hook";
import { useCanvasStore } from "../../../../store/canvas.store";
import { ChartType } from "../../../../type/chart.type";

interface ChartTypeSelectProps {
  chart: ChartType;
}

function ChartTypeSelect({ chart }: ChartTypeSelectProps) {
  const updateElement = useCanvasStore((state) => state.updateElement);

  const { addUndoHistory, buildHistory } = useHistory();

  const handleChangeChartType = (e: ChangeEvent<HTMLSelectElement>) => {
    addHistory();

    const selectedType = e.target.value as "line" | "bar";

    const newChart: ChartType = {
      ...chart,
      chartType: selectedType,
    };
    updateElement(newChart);
  };

  const addHistory = () => {
    const history = buildHistory("modify", null, chart);
    addUndoHistory(history);
  };

  return (
    <select name="table-type" id="table-type" onChange={handleChangeChartType}>
      <option value={chart.chartType}>{chart.chartType}</option>
      <option value={chart.chartType === "bar" ? "line" : "bar"}>
        {chart.chartType === "bar" ? "line" : "bar"}
      </option>
    </select>
  );
}

export default ChartTypeSelect;
