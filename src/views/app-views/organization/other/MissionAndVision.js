import React from "react";
import { Card, Row, Col } from "antd";

const MissionAndVision = ({ mission, vision, width }) => {
  return (
    <>
      <Card className={`${width > 991 ? null : `borderless`}`} title="Purpose">
        <Row gutter={30}>
          <Col sm={24} md={12}>
            <h3>Mission</h3>
            <h4 className="text-muted">{mission}</h4>
          </Col>
          <Col sm={24} md={12}>
            <h3>Vision</h3>
            <h4 className="text-muted">{vision}</h4>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default MissionAndVision;
