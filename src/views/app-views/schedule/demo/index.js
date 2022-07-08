import React from "react";
import LazyHero from "react-lazy-hero";
import Campaign from "assets/img/campaign2.png";
import { Row, Col, Card, Carousel } from "antd";
import BlogNews from "./BlogNews";

const DemoComponent = () => {
  return (
    <>
      {" "}
      {/* <LazyHero imageSrc="https://unsplash.it/2000/1000">
        <h1>Generic Startup Hype Headline</h1>
      </LazyHero>
      <div className="position-relative fixed-top h-50 w-100 bg-primary bg-hero">
        tasdsadr
      </div>{" "}
      <div className="position-relative fixed-top h-50 w-100 bg-dark">
        tasdsadr
      </div> */}
      {/* <section id="welcome" className="welcome-area ptb-80 bg-gradient">
      
        <div className="container">
          <div className="section-title ">
            <h4>We are creative</h4>
            <h2>
              Welcome to <span>MitiveLane</span>
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <Row className="row" gutter={(10, 10)}>
            <Col lg={8} md={8}>
              <div className="single-box">
                <i className="fa fa-pencil-square-o icon"></i>
                <h3>Creative Design</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </p>
                <a title="Read More" className="link-btn" href="/home-seven">
                  <i className="fa fa-arrow-right"></i>
                </a>
              </div>
            </Col>
            <Col lg={8} md={8}>
              <div className="single-box">
                <i className="fa fa-pencil-square-o icon"></i>
                <h3>Creative Design</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </p>
                <a title="Read More" className="link-btn" href="/home-seven">
                  <i className="fa fa-arrow-right"></i>
                </a>
              </div>
            </Col>{" "}
            <Col lg={8} md={8}>
              <div className="single-box">
                <i className="fa fa-pencil-square-o icon"></i>
                <h3>Creative Design</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </p>
                <a title="Read More" className="link-btn" href="/home-seven">
                  <i className="fa fa-arrow-right"></i>
                </a>
              </div>
            </Col>{" "}
            {/* <Col lg={8} md={8} className="mt-2">
              <div className="single-box">
                <i className="fa fa-pencil-square-o icon"></i>
                <h3>Creative Design</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </p>
                <a title="Read More" className="link-btn" href="/home-seven">
                  <i className="fa fa-arrow-right"></i>
                </a>
              </div>
            </Col> 
          </Row>
        </div>
      </section>
  */}
      <section id="welcome" className="welcome-area ptb-80 bg-gradient-2">
        <div className="container">
          <div className="section-title ">
            <h2>
              Welcome to <span>MitiveLane</span>
            </h2>
            <p>
              Get started now by doing the following steps:{" "}
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
            </Col>{" "}
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
            </Col>{" "}
            {/* <Col lg={8} md={8} className="mt-2">
              <div className="single-box">
                <i className="fa fa-pencil-square-o icon"></i>
                <h3>Creative Design</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </p>
                <a title="Read More" className="link-btn" href="/home-seven">
                  <i className="fa fa-arrow-right"></i>
                </a>
              </div>
            </Col> */}
          </Row>
        </div>
      </section>
      <BlogNews />
      <section className="ctr-area ptb-80">
        <div className="container">
          <Row justify={"center"} className="row">
            <Col lg={12} md={12}>
              <div className="mb-0 text-center section-title-2">
                <h2>Get The Best For Your Business</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <a href="#contact" className="btn btn-primary">
                  Contact
                </a>
                <a href="#work" className="btn btn-primary view-work">
                  View Work
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default DemoComponent;
