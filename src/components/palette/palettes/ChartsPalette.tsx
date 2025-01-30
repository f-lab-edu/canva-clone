import { useCanvasStore } from "../../../store/canvas.store";
import { ChartType, Dataset } from "../../../type/chart.type";

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const datasets: Dataset[] = [
  {
    label: "Dataset 1",
    data: [1, 21, 21, 2, 1],
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
  {
    label: "Dataset 2",
    data: [12121212, 12121, 2, 11],
    borderColor: "rgb(53, 162, 235)",
    backgroundColor: "rgba(53, 162, 235, 0.5)",
  },
];

function ChartsPalette() {
  const addElement = useCanvasStore((state) => state.addElement);

  const handleClickAddChart = () => {
    const pageId = 123;

    const chartData = {
      labels,
      datasets,
    };

    const chart: ChartType = {
      pageId,
      id: Date.now(),
      position: {
        x: 100,
        y: 150,
      },
      size: {
        width: 900,
        height: 350,
      },
      type: "chart",
      data: chartData,
      chartType: "line",
      options: {
        responsive: true,
      },
    };
    addElement(chart);
  };

  return (
    <div>
      <button onClick={handleClickAddChart}>add Chart</button>
    </div>
  );
}

export default ChartsPalette;
