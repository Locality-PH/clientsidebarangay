import React, { useState } from "react";
import { Row, Col, Button, Card} from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import BarangayLinks from "./BarangayLinks";
import TrendingNews from "./TrendingNews";
import News from "./News";
import { 
  BarangayData, NewsReportData
} from './DefaultDashboardData';
import {withRouter} from 'react-router-dom';

export const DefaultDashboard = () => {
  const [barangayData] = useState(BarangayData);
  const [newsReportData] = useState(NewsReportData);

  return (
    <>
      <Row gutter={16} >
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
            <Card title="List of Barangay">
                    <div className="mt-3">
                      {
                        barangayData.map((elm, i) => (
                          <div key={i} className={`d-flex align-items-center justify-content-between mb-4`}>
                            <BarangayLinks id={i} src={elm.img} name={elm.name} subTitle={elm.title} />
                          </div>
                        ))
                      }
                    </div>
                  </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
          <Card title="Trending News">
            <TrendingNews title="Modified Enhanced Community Quaratine" newsType="Global Nation" like={109.9}></TrendingNews>
            <TrendingNews title="LOL World Championships" newsType="Sports" like={92.7}></TrendingNews>
            <TrendingNews title="Adele's new Album out Nov. 19" newsType="Entertainment" like={75.1}></TrendingNews>
            <TrendingNews title="First Youtube Video" newsType="Technology" like={56.4}></TrendingNews>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
            <Card title="List of Barangay">
                    <div className="mt-3">
                      {
                        barangayData.map((elm, i) => (
                          <div key={i} className={`d-flex align-items-center justify-content-between mb-4`}>
                            <BarangayLinks id={i} src={elm.img} name={elm.name} subTitle={elm.title} />
                          </div>
                        ))
                      }
                    </div>
                  </Card>
        </Col>

      </Row>

      <Row gutter={16} >
        <News newsReportData={newsReportData}></News>
      </Row>
    </>
  )
}


export default withRouter(DefaultDashboard);
