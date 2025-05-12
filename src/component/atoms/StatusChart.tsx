import type { ChartOptions } from "chart.js";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

import type { StatusDataProps } from "../../lib/types/AnimeTypes.ts";

ChartJS.register(ArcElement, Tooltip, Legend);

function StatusChart({ statusData }: StatusDataProps) {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF9F40", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF9F40", "#4BC0C0"],
      },
    ],
  });

  useEffect(() => {
    if (!statusData || statusData.length === 0)
      return;

    const labels = Array.isArray(statusData) ? statusData.map(item => item.status || "") : [];
    const data = Array.isArray(statusData) ? statusData.map(item => item.amount || 0) : [];

    setChartData({
      labels,
      datasets: [
        {
          data,
          backgroundColor: ["#FF6384", "#36A2EB", "#008000", "#FF9F40", "#4BC0C0"],
          hoverBackgroundColor: ["#FF0000", "#FF0000", "#FF0000", "#FF0000", "#FF0000"],
        },
      ],
    });
  }, [statusData]);

  const options: ChartOptions<"pie"> = {
    plugins: {
      legend: {
        position: "left",
        labels: {
          color: "#fff",
          font: {
            size: 12,
          },
          padding: 10,
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
}

export default StatusChart;
