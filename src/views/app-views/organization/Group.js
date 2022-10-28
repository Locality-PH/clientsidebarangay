import React, { useState, useEffect } from "react";
import { Row, Col, Card, message } from "antd";
import Officials from "./other/Officials";
import Events from "./other/Events";
import About from "./about/About";
import MissionAndVision from "./other/MissionAndVision";
import Projects from "./other/Projects";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const Index = () => {
  const { currentOrganization, generateToken } = useAuth();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setData([]);
    setIsLoading(false);

    axios
      .get("/api/organization/get-all-organizations")
      .then((response) => {
        console.log("Organizations ", response.data);
      })
      .catch(() => {
        message.error("Could not fetch the data in the server!");
      });
  };

  return (
    <>
      <Row gutter="16">
        <Col xs={24} sm={24} md={8}>
          <Officials></Officials>
          <Events></Events>
          <About></About>
        </Col>

        <Col xs={24} sm={24} md={16}>
          <MissionAndVision></MissionAndVision>
          <Projects></Projects>
          <Card>
            <img
              width="100%"
              alt="logo"
              src="/img/barangay/caniogan/BarangayCover.jpg"
              style={{ borderRadius: "1rem 1rem" }}
            />
          </Card>
        </Col>
      </Row>
      {/* <Barangay name={match.params.name}></Barangay> */}
    </>
  );
};

export default Index;
