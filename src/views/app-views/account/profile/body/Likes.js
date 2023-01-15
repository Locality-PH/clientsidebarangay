import React, { useState, useEffect } from "react";
import News from "components/shared-components/News";
import { Row, Col, Card, message, Button } from "antd";

import {
  BarangayData,
  CausesData,
  NewsReportData,
} from "./DefaultDashboardData";

const Likes = () => {
  const [newsReportData] = useState(NewsReportData);

  return (
    <>
      {" "}
      <Row gutter={16}>
        {newsReportData.map((result, id) => (
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8} key={id}>
            <News
              margin={"5px 0px"}
              title={result.title}
              type={result.type}
              img={result.img}
              content={result.content}
              href={result.href}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Likes;
