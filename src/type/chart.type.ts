import { Element } from "./element.type";

export interface ChartLabel {
  id: string;
  label: string;
}

export interface ChartData {
  labels: ChartLabel[];
  datasets: Dataset[];
}
export interface ChartOptions {
  responsive: boolean;
}
export interface ChartDataOfDataset {
  id: string;
  data: number;
}
export interface Dataset {
  id: string;
  label: string;
  data: ChartDataOfDataset[];
  fill?: boolean;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
}
export interface ChartType extends Element {
  data: ChartData;
  options: ChartOptions;
  chartType: "line" | "bar";
}
