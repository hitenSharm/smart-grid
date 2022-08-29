import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  notification,
  Modal,
  Col,
  Row,
  Typography,
  Image,  
} from "antd";
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
  const [details, setDetails] = useState({});
  const [chartData, setData] = useState([]);
  const [bidderLabels, setLabels] = useState([]);
  const [bid, setBid] = useState(0);
  const [highestBidding,setHighest]=useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      let obj = reactLocalStorage
        .getObject("auctions")
        .filter((x) => x.owner == id);
      setDetails(obj[0]);
    }
  }, [id]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const successNotifier = (type) => {
    notification[type]({
      message: "Payment confirmed!",
      description: "Changes will be reflected in the blockchain soon!",
    });
  };

  const handleOk = () => {
    setData((prevState) => [...prevState, bid]);
    setHighest(bid)
    setLabels((prevState) => [...prevState, `bidder ${chartData.length + 1}`]);
    successNotifier('success')
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Needs to be higher than the highest bid!",
      description: "Input a value higher than the highest bid!",
    });
  };

  const onfinish = () => {
    if (bid < details.highestbid) {
      openNotificationWithIcon("error");
      return;
    }    
    showModal();
  };

  useEffect(() => {
    //console.log(details);
    if (details.owner) {
      setData(details.bids);
      setHighest(details.highestbid)
      let temp = [];
      details.bids.forEach((element, i) => {
        temp.push(`bidder ${i + 1}`);
      });
      //console.log(temp)
      setLabels(temp);
    }
  }, [details]);

  const data = {
    labels: bidderLabels.map((l) => l),
    datasets: [
      {
        label: "Bid by users",
        data: chartData.map((ele) => ele),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        color: "white",
      },
    ],
  };

  var formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <>
      {details.owner !== undefined ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "100px",
          }}
        >
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
            Auction owner : {details && details.owner.substring(0, 5)} ...
          </h3>
          <h3 style={{ color: "whitesmoke", fontSize: "20px" }}>
            Highest Bid : ₹{highestBidding}/2KwH
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
          <div
            style={{
              marginTop: "25px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Form
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Form.Item
                label={
                  <p
                    style={{ color: "white", fontSize: "15px", margin: "0px" }}
                  >
                    Bid
                  </p>
                }
                value="bidValue"
              >
                <Input
                  placeholder="bid value"
                  onChange={(e) => {
                    setBid(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  onClick={() => {
                    onfinish();
                  }}
                >
                  Place Bid!
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      ) : (
        <></>
      )}

      <Modal
        title={
          <div>
            <img
              src="https://logos-world.net/wp-content/uploads/2020/11/Paytm-Symbol.png"
              alt="Paytm"
              width={"100px"}
              height={"50px"}
            ></img>
          </div>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ backgroundColor: "" }}>
          <Col style={{ backgroundColor: "white" }}>
            <Row>
              <Typography.Text style={{ color: "blue", fontSize: "1.2em" }}>
                Order Details
              </Typography.Text>
            </Row>
            <Typography.Title style={{ marginTop: "15px" }}>
              {formatter.format(521)}
            </Typography.Title>

            <Row justify="space-evenly">
              <Typography.Title level={5} style={{ marginTop: "15px" }}>
                Enter UPI id below
              </Typography.Title>
              <Image
                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/upi-icon.png"
                alt="UPI logo"
                width={"60px"}
                height={"60px"}
              ></Image>
            </Row>
            <Input placeholder="8611238057@paytm"></Input>
          </Col>
        </div>
      </Modal>
    </>
  );
}
