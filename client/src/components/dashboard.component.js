import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

export default function Dashboard({ history }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const labels = Array.from(Array(100).keys());
  const [options, setOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        suggestedMin: 0, // Minimum value for y-axis
        suggestedMax: 100, // Maximum value for y-axis
      },
    },
  });

  const [dataTable, setDataTable] = useState();
  const [dataFetch, setDataFetch] = useState();
  const [isLoading, setLoading] = useState(true);

  const initialData = {
    labels,
    datasets: [
      {
        label: "2 ตัวบน",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "2 ตัวล่าง",
        data: [],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const fetchData = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}api`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      setDataFetch(result.data);
    } catch (error) {}
  };

  const parseData = () => {
    const newDataTable = initialData;

    newDataTable.datasets[0].data = labels.map((index) =>
      dataFetch.items.filter((value) => value.price_upper === index) !== []
        ? dataFetch.items.filter((value) => value.price_upper === index).length
        : 0
    );

    newDataTable.datasets[1].data = labels.map((index) =>
      dataFetch.items.filter((value) => value.price_lower === index) !== []
        ? dataFetch.items.filter((value) => value.price_lower === index).length
        : 0
    );

    const maxPriceUpper = Math.max(newDataTable.datasets[0].data);
    const maxPriceLower = Math.max(newDataTable.datasets[1].data);

    setDataTable(newDataTable);
    setOptions((previousOptions) => {
      previousOptions.scales.y.suggestedMax =
        maxPriceUpper >= maxPriceLower ? maxPriceUpper : maxPriceLower;

      return previousOptions;
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (dataFetch) {
      parseData();
      setLoading(false);
    }
  }, [dataFetch]);

  return (
    <div className="container mt-4 w-100">
      <div className="card">
        <div className="card-header">ตารางสะสมงวดเช้าของวันนี้</div>
        <div className="card-body">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Bar data={dataTable} options={options} />
          )}
        </div>
      </div>
    </div>
  );
}
