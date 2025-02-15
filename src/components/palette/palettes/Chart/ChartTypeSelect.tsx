import { ChangeEvent } from "react";
import useHistory from "../../../../hook/History.hook";
import { useCanvasStore } from "../../../../store/canvas.store";
import { ChartElementType, ChartType } from "../../../../type/chart.type";

const CHART_TYPES = ["bar", "line", "polar", "pie", "doughnut", "bubble"];

interface ChartTypeSelectProps {
  chart: ChartElementType;
}

function ChartTypeSelect({ chart }: ChartTypeSelectProps) {
  const updateElement = useCanvasStore((state) => state.updateElement);

  const { addUndoHistory, buildHistory } = useHistory();

  const handleChangeChartType = (e: ChangeEvent<HTMLSelectElement>) => {
    addHistory();

    const selectedType = e.target.value as ChartType;

    const newChart: ChartElementType = {
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
      <option value={chart.chartType}>
        {chart.chartType.toLocaleUpperCase()}
      </option>
      {CHART_TYPES.map((chartType) => {
        if (chartType === chart.chartType) return;
        return (
          <option key={chartType} value={chartType}>
            {chartType.toLocaleUpperCase()}
          </option>
        );
      })}
    </select>
  );
}

export default ChartTypeSelect;
