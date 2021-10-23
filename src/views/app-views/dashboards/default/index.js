import React, { useState } from "react";
import { Row, Col, Card} from 'antd';
import { Skeleton} from 'antd';
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
          <Card title="List of Barangay" extra={<a href="#" style={{fontSize: "1rem"}}>More</a>}>
                  <div className="mt-3">
                    {
                      barangayData.map((result, i) => (
                        <div key={i} className={`d-flex align-items-center justify-content-between mb-4`}>
                          <BarangayLinks id={i} src={result.img} name={result.name} subTitle={result.title} />
                        </div>
                      ))
                    }
                  </div>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
          <Card title="Trending Causes" extra={<a href="#" style={{fontSize: "1rem"}}>More</a>}>
            <TrendingNews title="Modified Enhanced Community Quaratine" newsType="Global Nation" like={109.9}></TrendingNews>
            <TrendingNews title="LOL World Championships" newsType="Sports" like={92.7}></TrendingNews>
            <TrendingNews title="Adele's new Album out Nov. 19" newsType="Entertainment" like={75.1}></TrendingNews>
            <TrendingNews title="First Youtube Video" newsType="Technology" like={56.4}></TrendingNews>
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

        {/* <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
          <Card>
            <Skeleton loading={true} avatar active>
              
            </Skeleton>
          </Card>
        </Col> */}

      </Row>

      <Row gutter={16} >
        {
          newsReportData.map((result, id) => 
            <News key={id} title={result.title} type={result.type} img={result.img} content={result.content}></News>
          )
        }
      </Row>
    </>
  )
}


export default withRouter(DefaultDashboard);
