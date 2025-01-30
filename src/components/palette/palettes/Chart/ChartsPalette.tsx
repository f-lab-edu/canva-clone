/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import { useCanvasStore } from "../../../../store/canvas.store";
import { ChartLabel, ChartType, Dataset } from "../../../../type/chart.type";
import ChartDataTable from "./ChartDataTable";

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
  const [currentChart, setCurrentChart] = useState<ChartType | null>(null);
  const addElement = useCanvasStore((state) => state.addElement);
  const currentElementId = useCanvasStore((state) => state.currentElementId);
  const currentPageId = useCanvasStore((state) => state.currentPageId);
  const getElementById = useCanvasStore((state) => state.getElementById);

  const handleClickAddChartByType = (chartType: "line" | "bar") => {
    const pageId = 123;

    const labels: ChartLabel[] = [
      { id: uuid(), label: "1월" },
      { id: uuid(), label: "2월" },
      { id: uuid(), label: "3월" },
      { id: uuid(), label: "4월" },
      { id: uuid(), label: "5월" },
      { id: uuid(), label: "6월" },
    ];

    const datasets: Dataset[] = [
      {
        id: uuid(),
        label: "Dataset 1",
        data: [
          { id: uuid(), data: 1213 },
          { id: uuid(), data: 1213 },
          { id: uuid(), data: 1213 },
          { id: uuid(), data: 1213 },
        ],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        id: uuid(),
        label: "Dataset 2",
        data: [
          { id: uuid(), data: 1213 },
          { id: uuid(), data: 1213 },
          { id: uuid(), data: 1213 },
          { id: uuid(), data: 1213 },
        ],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ];

    const chartData = {
      labels,
      datasets,
    };

    const chart: ChartType = {
      pageId,
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
    if (!currentElementId || !currentPageId) return;
    const currentElement = getElementById(currentPageId, currentElementId);

    if (!currentElement || currentElement.type !== "chart") return;

    setCurrentChart(currentElement as ChartType);
  }, [currentElementId]);

  return (
    <div className="w-full">
      <button onClick={() => handleClickAddChartByType("line")}>
        add Line Chart
      </button>
      <button onClick={() => handleClickAddChartByType("bar")}>
        add Bar Chart
      </button>
      {currentChart && <ChartDataTable chart={currentChart} />}
    </div>
  );
}

export default ChartsPalette;
