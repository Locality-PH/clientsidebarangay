import React, { useState } from "react";
import { Row, Col, Card, Typography, Button} from 'antd';
import BarangayLinks from "../default/BarangayLinks";
import Header from "./Header";
import { 
  BarangayData, NewsReportData
} from '../default/DefaultDashboardData';

const { Text, Link } = Typography;

const Index = ({match}) => {
    const [barangayData] = useState(BarangayData);

  return (
    <> 
        <Header name={match.params.name} src="/img/barangay/caniogan/BarangayProfile.jpg" size={100} subTitle="011 Espiritu Street Caniogan Morong, Rizal" content="We rise and fall as one people, one nation."></Header>
        <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={16} xl={15} xxl={14}>
                <Card>
                    <img
                            width="100%"
                            alt="logo"
                            src="/img/barangay/caniogan/BarangayCover.jpg"
                            style={{borderRadius: "1rem 1rem"}}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={9} xxl={10}>
                <Card title="About">
                    <Text className="h4">The Philippines is one of the world’s largest archipelago nations. It is situated in Southeast Asia in the Western Pacific Ocean. Its islands are classified into three main geographical areas – Luzon, Visayas, and Mindanao. Because of its archipelagic nature, Philippines is a culturally diverse country. With its topography consisting of mountainous terrains, dense forests, plains, and coastal areas.</Text>
                    
                        <div className="mt-3">
                            <Button type="primary" shape="round" style={{width: "100%", height: "3rem"}}>Learn More</Button>
                        </div>
                </Card>
            </Col>
		</Row>
      
    </>
  )
}

export default Index
