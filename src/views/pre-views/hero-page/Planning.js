import React from "react";
import { Row, Col } from "antd";
import { useAuth } from "contexts/AuthContext";

const Planning = () => {
  const { welcome } = useAuth();
  return (
    <>
      <section
        ref={welcome}
        id="welcome"
        className="welcome-area ptb-80 bg-gradient-2"
      >
        <div className="container">
          <div className="section-title ">
            <h2>
              Welcome to <span>MitiveLane</span>
            </h2>
            <p>
              Get started now to be help people in neeed by doing the following
              steps:
              <b>schedule, talk and launch your organization.</b>
            </p>
          </div>
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={24} lg={8} md={8}>
              <div className="single-box">
                <i className="fa fa-pencil-square-o icon"></i>
                <h3>Planning</h3>
                <p>
                  Setting a schedule for your organization to be discussed on
                  the date
                </p>
                <a title="Read More" className="link-btn" href="/home-seven">
                  <i className="fa fa-arrow-right"></i>
                </a>
              </div>
            </Col>
            <Col xs={24} sm={24} lg={8} md={8}>
              <div className="single-box">
                <i className="fa fa-pencil-square-o icon"></i>
                <h3>Discussing</h3>
                <p>
                  Discussing the purpose of the group and benefit for the
                  community.
                </p>
                <a title="Read More" className="link-btn" href="/home-seven">
                  <i className="fa fa-arrow-right"></i>
                </a>
              </div>
            </Col>
            <Col xs={24} sm={24} lg={8} md={8}>
              <div className="single-box">
                <i className="fa fa-pencil-square-o icon"></i>
                <h3>Launching</h3>
                <p>
                  Getting approval and launching the organization on the
                  website.
                </p>
                <a title="Read More" className="link-btn" href="/home-seven">
                  <i className="fa fa-arrow-right"></i>
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default Planning;
