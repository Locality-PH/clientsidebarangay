import React, { useState } from "react";
import { Row, Col, Card} from 'antd';
import { Skeleton} from 'antd';
import BarangayLinks from "../default/BarangayLinks";
import TrendingNews from "../default/TrendingNews";
import News from "../default/News";
import { 
  BarangayData, NewsReportData
} from '../default/DefaultDashboardData';

const Index = ({match}) => {
    const [barangayData] = useState(BarangayData);
    const [newsReportData] = useState(NewsReportData);

  return (
    <>
        <h1>{match.params.name}</h1>
        <Row gutter={16} >
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                <Card>
                    <Skeleton loading={true} avatar active>
                    
                    </Skeleton>
                </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                <Card>
                    <Skeleton loading={true} avatar active>
                    
                    </Skeleton>
                </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                <Card>
                    <Skeleton loading={true} avatar active>
                    
                    </Skeleton>
                </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                <Card>
                    <Skeleton loading={true} avatar active>
                    
                    </Skeleton>
                </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                <Card>
                    <Skeleton loading={true} avatar active>
                    
                    </Skeleton>
                </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                <Card>
                    <Skeleton loading={true} avatar active>
                    
                    </Skeleton>
                </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                <Card>
                    <Skeleton loading={true} avatar active>
                    
                    </Skeleton>
                </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                <Card>
                    <Skeleton loading={true} avatar active>
                    
                    </Skeleton>
                </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                <Card>
                    <Skeleton loading={true} avatar active>
                    
                    </Skeleton>
                </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                <Card>
                    <Skeleton loading={true} avatar active>
                    
                    </Skeleton>
                </Card>
            </Col>
        </Row>
      
    </>
  )
}

export default Index
