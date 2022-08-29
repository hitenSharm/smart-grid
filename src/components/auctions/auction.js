import React, { useEffect,useState } from 'react'
import {useParams, Link} from 'react-router-dom';
import { Form, Input, Button, notification } from "antd";
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
    const [bid,setBid]=useState(0);

    const { id } = useParams();

    useEffect(()=>{
      if(id){
        let obj=reactLocalStorage.getObject('auctions').filter(x => x.owner==id);        
        setDetails(obj[0]);
      }
    },[id])

    const openNotificationWithIcon = (type) => {
      notification[type]({
        message: 'Needs to be higher than the highest bid!',
        description:
          'Input a value higher than the highest bid!',
      });
    };

    const onfinish = () =>{     
      if(bid<details.highestbid){
        openNotificationWithIcon('error');
        return ;
      }
      setData(prevState => [...prevState,bid]); 
      setLabels(prevState => [...prevState,`bidder ${chartData.length+1}`]);     
    }   
    
    useEffect(()=>{
      //console.log(details);
      if(details.owner){
        setData(details.bids);
        let temp=[];
        details.bids.forEach((element,i) => {
          temp.push(`bidder ${i+1}`);
        });
        //console.log(temp)
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
      Highest Bid : ₹{details && details.highestbid}/2KwH
      </h3>
      {/* <h3 style={{ color: "whitesmoke", fontSize: "20px" }}>
      Highest Bidder : {details && details.highestBidder.substring(0,5)} ...
      </h3> */}
      <h3 style={{ color: "whitesmoke", fontSize: "20px" }}>
      Quantity : {details && details.quantity}
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
        <div style={{
          marginTop:"25px",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }}>
        <Form
        style={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          flexDirection:"column"
        }}                
        >
          <Form.Item           
          label={<p style={{color:"white",fontSize:"15px",margin:"0px"}}>Bid</p>}
          value="bidValue"                  
          >
            <Input placeholder='bid value' onChange={(e)=>{setBid(e.target.value)}}/>
          </Form.Item>
        <Form.Item>
        <Button type='primary' onClick={()=>{onfinish()}}>Place Bid!</Button>
        </Form.Item>
        </Form>
        </div>
    </div>):<></>}
    </>
    
  )
}
