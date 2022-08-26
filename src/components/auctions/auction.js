import React, { useEffect,useState } from 'react'
import {useParams, Link} from 'react-router-dom';
import { reactLocalStorage } from "reactjs-localstorage";

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
      text: "Bids",
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

export default function Auction() {

    const [details,setDetails]=useState({});
    const [chartData,setData]=useState([]);
    const [bidderLabels,setLabels]=useState([]);

    const { id } = useParams();

    useEffect(()=>{
      if(id){
        let obj=reactLocalStorage.getObject('auctions').filter(x => x.owner==id);        
        setDetails(obj[0]);
      }
    },[id])
    
    useEffect(()=>{
      console.log(details);
      if(details.owner){
        setData(details.bids);
        let temp=[];
        details.bids.forEach((element,i) => {
          temp.push(`bidder ${i+1}`);
        });
        console.log(temp)
        setLabels(temp)
      }
    },[details])
    
    const data = {   
      labels:bidderLabels.map(l =>(l)),   
      datasets: [
        {
          label: "Bid by users",
          data:  chartData.map((ele) => ele),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          color: "white",
        },             
      ],
    };

  return (
    <>
    {details.owner!==undefined ? (<div style={{
      display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        marginTop:"100px"
    }}>
      <h1
        style={{
          color: "white",
          fontFamily: "monospace",
          fontSize: "70px",
        }}
      >
        Auction
      </h1>
      <h3 style={{ color: "whitesmoke", fontSize: "20px" }}>
      Auction owner : {details && details.owner.substring(0,5)} ...
      </h3>
      <h3 style={{ color: "whitesmoke", fontSize: "20px" }}>
      Highest Bid : {details && details.highestbid} 
      </h3>
      <h3 style={{ color: "whitesmoke", fontSize: "20px" }}>
      Highest Bidder : {details && details.highestBidder.substring(0,5)} ...
      </h3>
      <h3 style={{ color: "whitesmoke", fontSize: "20px" }}>
      Bidding Details:
      </h3>
      <div
        style={{
          width: "500px",
          height: "350px",
        }}
      >
        <Line options={options} data={data} />
      </div>
    </div>):<></>}
    </>
    
  )
}
