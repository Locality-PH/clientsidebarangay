import React, { useState } from "react";
import { Row, Col, Card, Typography, Button} from 'antd';
import HeaderCover from "./HeaderCover";
import Header from "./Header";
import About from "./About";
import Barangay from "./Barangay";
import { 
  BarangayData, NewsReportData
} from '../default/DefaultDashboardData';
import { BrowserRouter, Switch, Route } from "react-router-dom";

const Index = ({match}) => {
    const [barangayData] = useState(BarangayData);

  return (
    <>
      <BrowserRouter>
        <HeaderCover img="/img/others/img-12.jpg"></HeaderCover>
        <div className="container my-4">
          <Header name={match.params.name} avatarSize={150}
            quote="We rise and fall as one people, one nation."
            email="caniogan@gmail.com" phoneNumber="+12 123 1234" address="Caniogan Morong, Rizal"
            website="facebook.com"></Header>
          <Switch>
            <Route path={match.url} component={Barangay} exact></Route>
            <Route path={`${match.url}/about`} component={About} exact></Route>
          </Switch>
        </div>

    
      </BrowserRouter> 
    </>
  )
}

export default Index
