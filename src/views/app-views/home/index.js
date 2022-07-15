import React, { useState, useEffect } from "react";
import { Row, Col, Card, message, Button } from "antd";
import GroupLink from "components/shared-components/GroupLink";
import TrendingNews from "components/shared-components/TrendingNews";
import Campaign from "components/shared-components/Campaign";
import News from "components/shared-components/News";
import {
  BarangayData,
  CausesData,
  NewsReportData,
} from "./DefaultDashboardData";
import { withRouter } from "react-router-dom";

export const DefaultDashboard = () => {
  const [barangayList, setBarangayList] = useState(BarangayData);
  const [causesData] = useState(CausesData);
  const [newsReportData] = useState(NewsReportData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setBarangayList(BarangayData);
    setIsLoading(false);
    setError("This is Error Message");
  }, [barangayList]);

  return (
    <>
      {error && message.error(error)}
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
          <Card
            title="List of Barangay"
            loading={isLoading}
            extra={
              <a href="#" style={{ fontSize: "1rem" }}>
                More
              </a>
            }
          >
            <div className="mt-3">
              {barangayList.map((result, i) => (
                <div
                  key={i}
                  className={`d-flex align-items-center justify-content-between mb-4`}
                >
                  <GroupLink
                    id={i}
                    src={result.img}
                    name={result.name}
                    subTitle={result.title}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
          <Card
            title="Trending Campaign"
            extra={
              <a href="#" style={{ fontSize: "1rem" }}>
                More
              </a>
            }
          >
            <div className="mt-3">
              {causesData.map((result, i) => (
                <div
                  key={i}
                  className={`d-flex align-items-center justify-content-between mb-4`}
                >
                  <Campaign
                    id={i}
                    src={result.img}
                    name={result.title}
                    subTitle={result.supporters}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
          <Card title="Trending News">
            <TrendingNews
              title="Modified Enhanced Community Quaratine"
              newsType="Global Nation"
              like={109.9}
            />
            <TrendingNews
              title="LOL World Championships"
              newsType="Sports"
              like={92.7}
            />
            <TrendingNews
              title="Adele's new Album out Nov. 19"
              newsType="Entertainment"
              like={75.1}
            />
            <TrendingNews
              title="First Youtube Video"
              newsType="Technology"
              like={56.4}
            />
          </Card>
        </Col>

        {/* <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
          <Card>
            <Skeleton loading={true} avatar active>
              
            </Skeleton>
          </Card>
        </Col> */}
      </Row>

      <Row gutter={16}>
        {newsReportData.map((result, id) => (
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
            <News
              margin={"5px 0px"}
              key={id}
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

export default withRouter(DefaultDashboard);
