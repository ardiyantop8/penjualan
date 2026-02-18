import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

export const ChartJS = ({ type, labels, datasets, options, width, height }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const context = chartRef.current.getContext("2d");
      // const chartOptions = type === "bar" ? options : {}; // Set options to an empty object if type is not "bar"

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
              position:
                /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                  window.navigator.userAgent
                )
                  ? "bottom"
                  : "right",
              display: options.plugins?.legend?.display ?? true,
              ...options.plugins?.legend,
            },
            ...(options?.plugins?.tooltip?.multipleLabel
              ? {
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const visibleDataIndex = context.dataIndex; // Index of hovered data point

                        // Access data and labels from both datasets
                        let modifiedLabel = "";

                        if (
                          /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                            window.navigator.userAgent
                          )
                        ) {
                          modifiedLabel += `${
                            context.dataset.label
                          }: ${context.dataset.data[
                            visibleDataIndex
                          ].toLocaleString()}`;
                        } else {
                          modifiedLabel += `${
                            context.dataset.label
                          }: ${context.dataset.data[
                            visibleDataIndex
                          ].toLocaleString()}`;
                          modifiedLabel += ` (${
                            newChart.data.datasets[1].label
                          }: ${newChart.data.datasets[1].data[
                            visibleDataIndex
                          ].toLocaleString()})`;
                        }

                        // Return formatted tooltip content with labels and data
                        return modifiedLabel;
                      },
                    },
                  },
                }
              : {}),
          },
        },
      });

      chartRef.current.chart = newChart;
    }
  }, [type, labels, datasets, options]);
  return (
    <div style={{ width: width, height: height }}>
      <canvas ref={chartRef} />
    </div>
  );
};
