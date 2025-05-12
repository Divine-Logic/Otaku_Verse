import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function StatusChart({ statusData }: { statusData: any }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF9F40", "#4BC0C0"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF9F40", "#4BC0C0"],
    }],
  });

  useEffect(() => {
    const data: number[] = [];
    const labels: string[] = [];

    statusData.forEach((item: any) => {
      data.push(item.amount);
      labels.push(item.label || "");
    });

    setChartData({
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF9F40", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF9F40", "#4BC0C0"],
      }],
    });
  }, [statusData]);

  return <Pie data={chartData} />;
}

export default StatusChart;
