import React, { useEffect, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { Row, Col, Button, Typography } from "antd";

import auctionlist from "../../api/server/auctions.json";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function Auctions() {
  const [allAcutions, setAuctions] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    setAuctions(reactLocalStorage.getObject("auctions", auctionlist, true));
  }, []);

  const goToBid = (value) => {
    navigate(`/auction/${value}`);
  }

  useEffect(() => {
    reactLocalStorage.setObject("auctions", auctionlist);
  }, [allAcutions]);

  return (
    <div>
      <Row
        justify="space-evenly"
        style={{
          marginTop: "70px",
        }}
      >
        <Col>
          <Title
            style={{
              fontFamily: "monospace",
              color: "white",
            }}
          >
            Auctions
          </Title>
        </Col>
      </Row>
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Row justify="space-evenly" style={{
            marginBottom:"45px"
        }}>
          <Col>
            <Typography.Text
              style={{
                color: "beige",
              }}
            >
              Owner
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text
              style={{
                color: "beige",
              }}
            >
              Highest Bid
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text
              style={{
                color: "beige",
              }}
            >
              Highest Bidder
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text
              style={{
                color: "beige",
              }}
            >
              Go to auction!
            </Typography.Text>
          </Col>
        </Row>
        {auctionlist && auctionlist.map((item)=>{
            return(
                <Row justify="space-evenly" style={{
                    marginBottom:"45px"
                }}>
            <Col>
              <Typography.Text
                style={{
                  color: "beige",
                }}
              >
                {item.owner.substring(0,5)}...
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text
                style={{
                  color: "beige",
                }}
              >
                {item.highestbid}
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text
                style={{
                  color: "beige",
                }}
              >
                {item.highestBidder.substring(0,5)}...
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text
                style={{
                  color: "beige",
                }}
              >
                <Button type="primary" onClick={()=>{
                  goToBid(item.owner)
                }}>Bid!</Button>
              </Typography.Text>
            </Col>
          </Row>
            );
        })}
      </div>
    </div>
  );
}
