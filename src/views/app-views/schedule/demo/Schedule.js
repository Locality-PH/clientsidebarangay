import React from "react";
import { Row, Col, Button } from "antd";

const Schedule = () => {
  return (
    <>
      <section className="ctr-area ptb-80">
        <div className="container">
          <Row justify={"center"} className="row">
            <Col lg={12} md={12}>
              <div className="mb-0 text-center section-title-2">
                <h1>Be part of something bigger than yourself</h1>

                <a href="#contact" className="btn btn-primary">
                  Claim your group
                </a>
                <a href="#work" className="btn btn-primary view-work">
                  Schedule a Demo
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default Schedule;
