import React from "react";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import "./ChartCurriencesComponent.css";

const ChartCurriencesComponent = ({ dataCurience }) => {
    if (dataCurience && dataCurience.length > 0) {
      const chartData = {
        labels: dataCurience.map((object) => object.effectiveDate),
        datasets: [
          {
            label: "Sprzedaż (Bid)",
            data: dataCurience.map((object) => object.bid),
            borderColor: "#e74c3c",
            backgroundColor: "rgba(231, 76, 60, 0.2)",
            borderWidth: 2,
            pointBackgroundColor: "#e74c3c",
            pointBorderWidth: 0,
            pointRadius: 3,
            pointHoverRadius: 4,
          },
          {
            label: "Kupno (Ask)",
            data: dataCurience.map((object) => object.ask),
            borderColor: "#3498db",
            backgroundColor: "rgba(52, 152, 219, 0.2)",
            borderWidth: 2,
            pointBackgroundColor: "#3498db",
            pointBorderWidth: 0,
            pointRadius: 3,
            pointHoverRadius: 4,
          },
        ],
      };
  
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "#333",
              font: {
                size: 14,
                weight: "bold",
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Data",
              color: "#2c3e50",
              font: {
                size: 16,
                weight: "bold",
              },
            },
            ticks: {
              color: "#2c3e50",
              font: {
                size: 12,
              },
            },
            grid: {
              display: false,
            },
          },
          y: {
            title: {
              display: true,
              text: "Kurs wymiany",
              color: "#2c3e50",
              font: {
                size: 16,
                weight: "bold",
              },
            },
            ticks: {
              color: "#2c3e50",
              font: {
                size: 12,
              },
            },
            grid: {
              color: "rgba(0,0,0,0.1)",
            },
          },
        },
        elements: {
          point: {
            radius: 4,
          },
          line: {
            tension: 0.4, // Wygładzenie linii
          },
        },
      };
  
      return (
        <div className="chart-container">
          <Line data={chartData} options={chartOptions} />
        </div>
      );
    } else {
      return <h1 className="detailsCurriencesh1">Brak danych do wyświetlenia!</h1>;
    }
  };
  
  export default ChartCurriencesComponent;