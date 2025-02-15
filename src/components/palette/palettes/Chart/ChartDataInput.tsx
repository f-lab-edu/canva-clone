import { useState } from "react";
import useHistory from "../../../../hook/History.hook";
import { useCanvasStore } from "../../../../store/canvas.store";
import {
  ChartData,
  ChartDataOfDataset,
  ChartElementType,
  Dataset,
} from "../../../../type/chart.type";

interface ChartDataInputProp {
  text: string;
  chart: ChartElementType;
  labelId?: string;
  datasetId?: string;
  dataId?: string;
}

function ChartDataInput({
  text,
  chart,
  labelId,
  datasetId,
  dataId,
}: ChartDataInputProp) {
  const [value, setValue] = useState(text);

  const updateElement = useCanvasStore((state) => state.updateElement);

  const { buildHistory, addUndoHistory } = useHistory();

  const handleFocusOut = () => {
    addHistory();

    const labels = chart.data.labels.map((label) => {
      if (!labelId) return label;
      if (label.id === labelId) return { id: label.id, label: value };
      return label;
    });
    const datasets = chart.data.datasets.map((dataset) => {
      if (!datasetId) return dataset;

      if (dataset.id !== datasetId) return dataset;
      const dataOfDataset = dataset.data.map((data) => {
        if (data.id !== dataId) return data;

        const newData: ChartDataOfDataset = {
          id: data.id,
          data: Number(value),
        };
        return newData;
      });
      const returnData: Dataset = {
        ...dataset,
        data: dataOfDataset,
      };
      return returnData;
    });

    const data: ChartData = {
      datasets,
      labels,
    };
    const newChart: ChartElementType = {
      ...chart,
      data,
    };
    updateElement(newChart);
  };
  const addHistory = () => {
    const history = buildHistory("modify", null, chart);
    addUndoHistory(history);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    setValue(text);
  };

  return (
    <input
      className="w-full"
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={handleFocusOut}
    />
  );
}

export default ChartDataInput;
