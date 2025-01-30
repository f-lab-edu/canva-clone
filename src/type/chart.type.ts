import { Element } from "./element.type";

export interface ChartData {
  labels: string[];
  datasets: Dataset[];
}
export interface ChartOptions {
  responsive: boolean;
}

export interface Dataset {
  label: string;
  data: number[];
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
