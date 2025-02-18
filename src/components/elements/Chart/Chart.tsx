import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Bubble, Doughnut, Line, Pie, PolarArea } from "react-chartjs-2";
import { ChartElementType } from "../../../type/chart.type";
import ElementWrapper from "../ElementWrapper/ElementWrapper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale
);

interface ChartProps {
  chart: ChartElementType;
}

interface ChartDatasetType {
  label: string;
  data: number[];
  fill?: boolean;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
}
interface ChartElementData {
  labels: string[];
  datasets: ChartDatasetType[];
}

function Chart({ chart }: ChartProps) {
  const [chartData, setChartData] = useState<ChartElementData | null>(null);

  const getChartElement = () => {
    if (!chartData) return;

    let chartElement = null;

    switch (chart.chartType) {
      case "bar":
        chartElement = <Bar data={chartData} options={chart.options} />;
        break;
      case "line":
        chartElement = <Line data={chartData} options={chart.options} />;
        break;
      case "bubble":
        chartElement = <Bubble data={chartData} options={chart.options} />;
        break;
      case "doughnut":
        chartElement = <Doughnut data={chartData} options={chart.options} />;
        break;
      case "pie":
        chartElement = <Pie data={chartData} options={chart.options} />;
        break;
      case "polar":
        chartElement = <PolarArea data={chartData} options={chart.options} />;
        break;
    }

    return chartElement;
  };

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
        <ElementWrapper element={chart}>{getChartElement()}</ElementWrapper>
      )}
    </>
  );
}

export default Chart;
