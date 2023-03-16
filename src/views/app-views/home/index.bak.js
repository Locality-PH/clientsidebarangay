import React, { useState, useEffect } from "react";
import { Row, Col, Card, message, Button } from "antd";
import OrganizationList from "./organization-list";

import TrendingNews from "components/shared-components/TrendingNews";
import Campaign from "components/shared-components/Campaign";
import Announcement from "views/app-views/home/announcement";
import {
  BarangayData,
  CausesData,
  NewsReportData,
} from "./DefaultDashboardData";
import { withRouter } from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";

export const DefaultDashboard = () => {
  const { currentOrganization, generateToken } = useAuth();

  const [causesData] = useState(CausesData);
  const [newsReportData] = useState(NewsReportData);
  const [error, setError] = useState();

  return (
    <>
      <Row gutter={16}>
        {/* OrganizationList */}
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
          <OrganizationList/>
        </Col>

        {/* Trending Campaign */}
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
          <Card
            title="Trending Campaign"
            extra={<Link to="feeds/campaigns" style={{fontSize: "1rem"}}>More</Link>}
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

        {/* Trending News */}
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
      </Row>

      {/* Post */}
      <Row gutter={16}>
        {newsReportData.map((result, id) => (
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8} key={id}>
            <Announcement
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

export default withRouter(DefaultDashboard);
