import React from "react";
import { Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const data = {
  labels: Array.from({ length: 20 }, (_, i) => (i + 1).toString()),
  datasets: [
    {
      label: "Units consumption",
      data: Array.from({ length: 0 }, () => Math.floor(Math.random() * 0)),
      backgroundColor: "rgba(247, 187, 187, .2)",
      borderColor: "#38E0CF",
      borderWidth: 2,
    },
    {
      label: "Battery SoC",
      data: Array.from({ length: 0 }, () => Math.floor(Math.random() * 0)),
      backgroundColor: "rgba(247, 187, 187, .2)",
      borderColor: "#1A1C67",
      borderWidth: 2,
    },
  ],
};

const customPlugin = {
  id: "customLabelPlugin",
  beforeDraw: (chart) => {
    const ctx = chart.ctx;
    const { top, bottom, left, right } = chart.chartArea;
    const text = "No. of charging time";
    const labelMargin = 50; // Margin space for labels
    ctx.save();
    // Draw custom text
    ctx.save();
    ctx.font = "bold 14px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.translate((left + right) / 2, top - 20);
    ctx.fillText(text, 0, 0);
    ctx.restore();

    // Draw left-side label ("Kilowatt")
    ctx.font = "bold 12px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.save();
    ctx.translate(left - labelMargin, (top + bottom) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Kilowatt", 0, 0);
    ctx.restore();

    // Draw bottom-side label ("Hour")
    ctx.save();
    ctx.translate((left + right) / 2, bottom + labelMargin);
    ctx.rotate(0);
    ctx.fillText("Hour", 0, 0);
    ctx.restore();
  },
};

const options = {
  layout: {
    padding: {
      left: 30,
      right: 0,
      top: 0,
      bottom: 25,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: "white", // Color of y-axis labels
      },
    },
    x: {
      beginAtZero: true,
      display: true,
      ticks: {
        color: "white", // Color of x-axis labels
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: "top",
      align: "end",
      labels: {
        pointStyle: "circle",
        usePointStyle: true,
        textAlign: "left",
        color: "#fff",
      },
    },
    tooltip: {
      enabled: true, // Show tooltips
    },
    // Register custom plugin
    customLabelPlugin: customPlugin,
  },
  interaction: {
    mode: "index",
    intersect: false,
  },
};

const Graph = () => {
  return (
    <Grid container>
      <Grid container mt={3} mb={4}>
        <Line
          data={data}
          height={80}
          options={options}
          plugins={[customPlugin]}
        />
      </Grid>
    </Grid>
  );
};

export default Graph;
