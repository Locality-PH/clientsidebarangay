import React, { useState } from "react";
import { Row, Col, Card, Typography, Button} from 'antd';
import BarangayLinks from "../default/BarangayLinks";
import Header from "./Header";
import Barangay from "./Barangay";
import { 
  BarangayData, NewsReportData
} from '../default/DefaultDashboardData';

const { Text, Link } = Typography;

const Index = ({match}) => {
    const [barangayData] = useState(BarangayData);

  return (
    <> 
        <Header name={match.params.name} avatarSize={150}
        quote="We rise and fall as one people, one nation."
        email="caniogan@gmail.com" phoneNumber="+12 123 1234" address="Caniogan Morong, Rizal"
        website="facebook.com"></Header>
        {/* <Barangay name={match.params.name}></Barangay> */}
    </>
  )
}

export default Index
