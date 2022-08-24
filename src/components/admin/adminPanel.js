import React, { useEffect, useState, useMemo } from "react";
import { Form, Input, Button, Typography } from "antd";
import { reactLocalStorage } from "reactjs-localstorage";
// import { Chart } from 'react-charts'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#ffffff",
      },
    },
    title: {
      display: true,
      text: "Production Vs Consumption",
      color: "#ffffff",
    },
  },
  scales: {
    yAxes: {
      ticks: {
        color: "#ffffff",
      },
    },
    xAxes: {
      ticks: {
        color: "#ffffff",
      },
    },
  },
};

const options2 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#ffffff",
      },
    },
    title: {
      display: true,
      text: "Buy back",
      color: "#ffffff",
    },
  },
  scales: {
    yAxes: {
      ticks: {
        color: "#ffffff",
      },
    },
    xAxes: {
      ticks: {
        color: "#ffffff",
      },
    },
  },
};

export default function Adminpanel() {
  const [prod, setProd] = useState(0);
  const [cons, setCons] = useState(0);
  const [profit, setProfit] = useState(0);

  const dataCons = [
    [0, 85],
    [1, 91],
    [2, 88],
    [3, 100],
    [4, 110],
    [5, 112],
    [6, 99],
    [7, 100],
    [9, 97],
    [10, 99],
    [11, 105],
  ];

  const dataProd = [
    [0, 15],
    [1, 22],
    [2, 10],
    [3, 0],
    [4, 50],
    [5, 30],
    [6, 25],
    [7, 23],
    [9, 10],
    [10, 5],
    [11, 19],
  ];

  const buyBackdata = [ '430.50',
  '424.35',
  '479.70',
  '615.00',
  '369.00',
  '504.30',
  '455.10',
  '473.55',
  '535.05',
  '578.10',
  '528.90' ]

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Consumption",
        data: dataCons.map((ele) => ele[1]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        color: "white",
      },
      {
        label: "Production",
        data: dataProd.map((ele) => ele[1]),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        color: "white",
      },      
    ],
  };

  const data2 = {
    labels,
    datasets: [      
      {
        label: "Buy Back",
        data: buyBackdata.map((ele) => ele),
        borderColor: "orange",
        backgroundColor: "rgba(53, 162, 235, 0.5)",        
      },
    ],
  };

  const getMyUsage = () => {
    let ans = JSON.parse(reactLocalStorage.get("user"));
    setProd(ans.monthlyProduce);
    setCons(ans.monthlyConsume);
    setProfit(((-ans.monthlyProduce + ans.monthlyConsume) * 6.15).toFixed(2));
    console.log(ans);
  };

  useEffect(() => {
    getMyUsage();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          color: "white",
          fontFamily: "monospace",
          fontSize: "70px",
        }}
      >
        Dashboard
      </h1>
      <h3 style={{ color: "whitesmoke", fontSize: "20px" }}>
        Your current month data:
      </h3>
      <h3 style={{ color: "whitesmoke", margin: "0", fontSize: "20px" }}>
        Consumption : {cons}kWh
      </h3>
      <h3 style={{ color: "whitesmoke", margin: "10px", fontSize: "20px" }}>
        Production : {prod}kWh
      </h3>
      <h3 style={{ color: "whitesmoke", margin: "10px", fontSize: "20px" }}>
        Buy back : {profit} ₹
      </h3>

      <div
        style={{
          width: "500px",
          height: "350px",
        }}
      >
        <Line options={options} data={data} />
      </div>
      <div
        style={{
          width: "500px",
          height: "350px",
        }}
      >
        <Line options={options2} data={data2} />
      </div>
    </div>
  );
}
