import React, { useState, useEffect } from "react";
import { Row, Col, Card, message } from "antd";
import Officials from "./officials/Officials";
import Events from "./events/Events";
import About from "./about/About";
import MissionAndVision from "./other/MissionAndVision";
import Projects from "./other/Projects";

const Organization = ({ organizationId }) => {
  return (
    <>
      <Row gutter="16">
        <Col xs={24} sm={24} md={8}>
          <Officials/>
          <Events organizationId={organizationId}></Events>
          <About/>
        </Col>

        <Col xs={24} sm={24} md={16}>
          <MissionAndVision/>
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

export default Organization;
