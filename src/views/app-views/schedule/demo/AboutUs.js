import React from "react";
import { Row, Col, Carousel } from "antd";
import Campaign from "assets/img/campaign2.png";
const AboutUs = () => {
  const contentStyle = {
    height: "300px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    backgroundImage: `url(${Campaign})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    width: "auto",
  };
  return (
    <>
      <section id="about" className="about-area ptb-80 bg-f6f6f6">
        <div className="container">
          <div className="section-title">
            <h2>
              About <span>MitiveLane</span>
            </h2>
            <p>
              MitiveLane is a nonprofit organization for solepurpose is to
              <strong>
                {" "}
                mitigate, help, manage and improve community development{" "}
              </strong>
              to make life more easier as possible.
            </p>
          </div>
          <Row className="row">
            <Col lg={12} md={24} justify="left" align="left">
              <div className="about-mitivelane">
                <div className="section-title-3">
                  <h2>
                    We Are a Nonprofit <span>Organization </span>
                  </h2>
                  <p>
                    Here are the list of the Benefits that you may have with us
                    for your future endeavor by launching your very own
                    organization based on your interest.
                  </p>
                </div>
                <ul className="pull-left">
                  <li>
                    <i className="fa fa-check"></i>Management Dashboard
                  </li>
                  <li>
                    <i className="fa fa-check"></i>Automated receipting
                  </li>
                  <li>
                    <i className="fa fa-check"></i>Customer support for your
                    organization
                  </li>
                </ul>
                <ul>
                  <li>
                    <i className="fa fa-check"></i>Fundraiser
                  </li>
                  <li>
                    <i className="fa fa-check"></i>Government Certificate
                    request
                  </li>
                  <li>
                    <i className="fa fa-check"></i>Government or group
                    organization
                  </li>
                </ul>
                <div className="mb-2 d-flex">
                  <a className="btn btn-primary" href="/home-seven">
                    Schedule a Demo
                  </a>
                </div>
              </div>
            </Col>
            <Col lg={12} md={24}>
              <div className="about-video">
                <Carousel autoplay>
                  <div>
                    <h3 style={contentStyle}></h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}></h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}></h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}></h3>
                  </div>
                </Carousel>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
