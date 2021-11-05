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
        <Barangay name={match.params.name}></Barangay>
    </>
  )
}

export default Index
