/* eslint-disable react-hooks/exhaustive-deps */
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
import uuid from "react-uuid";
import { useCanvasStore } from "../../../../store/canvas.store";
import {
  ChartElementType,
  ChartLabel,
  ChartType,
  Dataset,
} from "../../../../type/chart.type";
import ChartDataTable from "./ChartDataTable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale
);

const SAMPLE_LABELS = ["1", "2", "3", "4", "5"];
const SAMPLE_DATASETS = [
  {
    id: uuid(),
    label: "Dataset 1",
    data: [100, 300, 400, 600, 200],
    borderColor: "rgb(53, 162, 235)",
    backgroundColor: "rgba(53, 162, 235, 0.5)",
  },
];
const SAMPLE_DATAS = {
  datasets: SAMPLE_DATASETS,
  labels: SAMPLE_LABELS,
};
const SAMPLE_OPTIONS = {
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  responsive: true,
};
const SAMPLE_POLAR_OPTIONS = {
  aspectRatio: 2,
  scales: {
    r: {
      ticks: {
        display: false,
      },
      grid: {
        display: true,
      },
    },
  },
  responsive: true,
};

const position = {
  x: 100,
  y: 150,
};
const size = {
  width: 400,
  height: 150,
};
const options = {
  responsive: true,
};

function ChartsPalette() {
  const [currentChart, setCurrentChart] = useState<ChartElementType | null>(
    null
  );
  const addElement = useCanvasStore((state) => state.addElement);
  const currentElementId = useCanvasStore((state) => state.currentElementId);
  const currentPageId = useCanvasStore((state) => state.currentPageId);
  const getElementById = useCanvasStore((state) => state.getElementById);

  const handleClickAddChartByType = (chartType: ChartType) => {
    if (!currentPageId) return;

    const labels: ChartLabel[] = [
      { id: uuid(), label: "1월" },
      { id: uuid(), label: "2월" },
      { id: uuid(), label: "3월" },
      { id: uuid(), label: "4월" },
    ];

    const datasets: Dataset[] = [
      {
        id: uuid(),
        label: "Dataset 1",
        data: [
          { id: uuid(), data: 300 },
          { id: uuid(), data: 400 },
          { id: uuid(), data: 500 },
          { id: uuid(), data: 200 },
        ],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        id: uuid(),
        label: "Dataset 2",
        data: [
          { id: uuid(), data: 600 },
          { id: uuid(), data: 400 },
          { id: uuid(), data: 200 },
          { id: uuid(), data: 500 },
        ],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ];

    const chartData = {
      labels,
      datasets,
    };

    const chart: ChartElementType = {
      pageId: currentPageId,
      id: Date.now(),
      position,
      size,
      type: "chart",
      data: chartData,
      options,
      chartType,
    };
    addElement(chart);
  };

  useEffect(() => {
    if (!currentElementId) return;
    const currentElement = getElementById(currentElementId);

    if (!currentElement || currentElement.type !== "chart") return;

    setCurrentChart(currentElement as ChartElementType);
  }, [currentElementId]);

  return (
    <div className="w-full h-full flex flex-col gap-y-5 overflow-y-auto">
      {currentChart && <ChartDataTable chart={currentChart} />}
      <button
        className="w-full aspect-video border-gray-400 border"
        onClick={() => handleClickAddChartByType("line")}
      >
        <Line data={SAMPLE_DATAS} options={SAMPLE_OPTIONS} />
      </button>
      <button
        className="w-full aspect-video border-gray-400 border"
        onClick={() => handleClickAddChartByType("bar")}
      >
        <Bar data={SAMPLE_DATAS} options={SAMPLE_OPTIONS} />
      </button>
      <button
        className="w-full aspect-video border-gray-400 border"
        onClick={() => handleClickAddChartByType("bubble")}
      >
        <Bubble data={SAMPLE_DATAS} options={SAMPLE_OPTIONS} />
      </button>
      <div className="w-full min-h-[90px] flex flex-row gap-x-2 overflow-x-scroll">
        <button
          className="w-full flex justify-center items-center aspect-square p-2 border-gray-400 border"
          onClick={() => handleClickAddChartByType("doughnut")}
        >
          <Doughnut data={SAMPLE_DATAS} options={SAMPLE_OPTIONS} />
        </button>
        <button
          className="w-full flex justify-center items-center aspect-square p-2 border-gray-400 border"
          onClick={() => handleClickAddChartByType("pie")}
        >
          <Pie data={SAMPLE_DATAS} options={SAMPLE_OPTIONS} />
        </button>
      </div>
      <button
        className="w-full aspect-video border-gray-400 border flex justify-center items-center"
        onClick={() => handleClickAddChartByType("polar")}
      >
        <PolarArea data={SAMPLE_DATAS} options={SAMPLE_POLAR_OPTIONS} />
      </button>
    </div>
  );
}

export default ChartsPalette;
