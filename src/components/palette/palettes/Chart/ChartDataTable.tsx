import { ChartElementType } from "../../../../type/chart.type";
import ChartDataInput from "./ChartDataInput";
import ChartTypeSelect from "./ChartTypeSelect";

interface ChartDataTableProps {
  chart: ChartElementType;
}

function ChartDataTable({ chart }: ChartDataTableProps) {
  return (
    <div className="w-full">
      <ChartTypeSelect chart={chart} />
      <table className="">
        <tbody>
          <tr className="border">
            {chart.data.labels.map((label, index) => (
              <th key={index} className="border">
                <ChartDataInput
                  text={label.label}
                  chart={chart}
                  labelId={label.id}
                />
              </th>
            ))}
          </tr>
          {chart.data.datasets.map((dataset, index) => (
            <tr key={index} className="border">
              {dataset.data.map((data, index) => (
                <td className="border" key={index}>
                  <ChartDataInput
                    text={data.data.toString()}
                    chart={chart}
                    datasetId={dataset.id}
                    dataId={data.id}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ChartDataTable;
