import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";

export const ChartJSCustomLegends = ({
  type,
  labels,
  datasets,
  options,
  width,
  height,
  legendClassName,
}) => {
  const chartRef = useRef(null);
  const [customLegends, setCustomLegends] = useState([]);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const context = chartRef.current.getContext("2d");

      const newChart = new Chart(context, {
        type: type,
        data: {
          labels: labels,
          datasets: datasets,
        },
        options: {
          responsive: true,
          ...options,
          plugins: {
            ...options.plugins,
            legend: {
              display: false, // Disable default legend
            },
          },
        },
      });

      chartRef.current.chart = newChart;

      // Generate custom legends and set state
      const generatedLabels =
        newChart.options.plugins.legend.labels.generateLabels(newChart);
      setCustomLegends(generatedLabels);
    }
  }, [type, labels, datasets, options]);

  return (
    <div className="flex-row w-full">
      <div className="flex align-center justify-center ">
        <div style={{ width: width, height: height }}>
          <canvas ref={chartRef} />
        </div>
      </div>
      <div className="py-9"></div>
      <div className={`relative w-full`}>
        <div className={`absolute ${legendClassName}`}>
          {customLegends.map((label, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  backgroundColor: label.fillStyle,
                  width: "20px",
                  height: "20px",
                  display: "inline-block",
                  marginRight: "8px",
                  borderRadius: "3px",
                }}
              ></span>
              <span>{label.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
