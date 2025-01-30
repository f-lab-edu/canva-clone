import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
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

function Chart({ chart }: ChartProps) {
  return (
    <ElementWrapper element={chart}>
      {chart.chartType === "line" ? (
        <Line data={chart.data} options={chart.options} />
      ) : (
        <Bar data={chart.data} options={chart.options} />
      )}
    </ElementWrapper>
  );
}

export default Chart;
