import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { ChartType } from "../../../type/chart.type";
import ElementWrapper from "../ElementWrapper/ElementWrapper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

interface ChartProps {
  chart: ChartType;
}

interface ChartDatasetType {
  label: string;
  data: number[];
  fill?: boolean;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
}
interface ChartDataType {
  labels: string[];
  datasets: ChartDatasetType[];
}

function Chart({ chart }: ChartProps) {
  const [chartData, setChartData] = useState<ChartDataType | null>(null);

  useEffect(() => {
    if (!chart.data) return;
    const labels = chart.data.labels.map((label) => label.label);
    const datasets = chart.data.datasets.map((dataset) => {
      const returnData: ChartDatasetType = {
        label: dataset.label,
        data: dataset.data.map((data) => data.data),
        fill: dataset.fill ? dataset.fill : undefined,
        borderWidth: dataset.borderWidth ? dataset.borderWidth : undefined,
        borderColor: dataset.borderColor ? dataset.borderColor : undefined,
        backgroundColor: dataset.backgroundColor
          ? dataset.backgroundColor
          : undefined,
      };
      return returnData;
    });
    const data = {
      labels,
      datasets,
    };

    setChartData(data);
  }, [chart]);

  return (
    <>
      {chartData && (
        <ElementWrapper element={chart}>
          {chart.chartType === "line" ? (
            <Line data={chartData} options={chart.options} />
          ) : (
            <Bar data={chartData} options={chart.options} />
          )}
        </ElementWrapper>
      )}
    </>
  );
}

export default Chart;
