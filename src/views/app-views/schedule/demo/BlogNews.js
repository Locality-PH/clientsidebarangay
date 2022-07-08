import React, { useState, useEffect } from "react";
import { Carousel } from "@trendyol-js/react-carousel";
import { Row, Col, Card } from "antd";
import News from "components/shared-components/News";
import {
  BarangayData,
  CausesData,
  NewsReportData,
} from "./DefaultDashboardData";
const BlogComponent = () => {
  const [data, setData] = useState(false);
  const newsReportData = NewsReportData;

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setData(!data);
  //     }, 1000);
  //   }, []);
  return (
    <div>
      <section id="blog" className="blog-area ptb-80">
        <div className="container">
          <div className="section-title">
            <h2>
              Latest Blog <span>Posts</span>
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <>
            <Col lg={24} md={24}>
              <Carousel show={2} slide={4} transition={0.5}>
                {newsReportData.map((result, id) => (
                  <News
                    key={id}
                    title={result.title}
                    type={result.type}
                    img={result.img}
                    content={result.content}
                  />
                ))}
              </Carousel>
            </Col>
            <Carousel show={5} slide={5} transition={0.5}>
              <div style={{ height: 150, width: 300, background: "red" }} />
              <div style={{ height: 150, width: 300, background: "blue" }} />
              <div style={{ height: 150, width: 300, background: "green" }} />
              <div style={{ height: 150, width: 300, background: "yellow" }} />
              <div style={{ height: 150, width: 300, background: "orange" }} />
              <div style={{ height: 150, width: 300, background: "cian" }} />
              <div style={{ height: 150, width: 300, background: "purple" }} />
              <div style={{ height: 150, width: 300, background: "brown" }} />
              <div style={{ height: 150, width: 300, background: "black" }} />
              <div style={{ height: 150, width: 300, background: "orange" }} />
            </Carousel>
          </>
        </div>
      </section>
    </div>
  );
};

export default BlogComponent;
