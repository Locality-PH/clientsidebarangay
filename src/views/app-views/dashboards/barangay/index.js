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
        <Header name={match.params.name} src="/img/avatars/thumb-2.jpg" size={100} subTitle="Morong, Rizal" content="The Department of Health (DOH) reported 12,159 new coronavirus cases on Sunday, October 10. This brings the total confirmed cases in the Philippines to 2,666,562. "></Header>
        <Row gutter={16}>
				<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={7} >
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
