import React, { useState, useEffect } from "react";
import { Row, Col, Card, message, Button, Skeleton } from "antd";

import HeaderCover from "./header/HeaderCover";
import Header from "./header/Header";
import Barangay from "./organization";
import Message from "./message/Message";

import Campaign from "./campaign/Campaign";
import CampaignPage from "./campaign/CampaignPage";
import CampaignAnalytics from "./campaign/CampaignAnalytics";
import EditCampaign from "./campaign/EditCampaign";

import CertificateRequestForm from "./certificate/CertificateRequestForm";
import ReportIncident from "./blotter/ReportIncident";
import AboutPage from "./about/AboutPage";

import EventPage from "./events/EventPage";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const Index = ({ match }) => {
  const { generateToken } = useAuth();
  const [organization, setOrganization] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOrganization();
  }, []);

  const getOrganization = async () => {
    await axios
      .get(
        "/api/organization/get-organization/" + match.params.organization_id,
        generateToken()[1]
      )
      .then((response) => {
        setOrganization(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        message.error("Could not fetch the data in the server!");
        console.log(err);
      });
  };

  return (
    <>
      {!isLoading ? (
        <BrowserRouter>
          <HeaderCover img="/img/others/img-12.jpg" />
          <div className="container my-4">
            <Header
              organizationId={match.params.organization_id}
              organization={organization}
            />
            <Switch>
              <Route
                path={`${match.url}`}
                render={() => (
                  <Barangay
                    organizationId={match.params.organization_id}
                  ></Barangay>
                )}
                exact
              ></Route>

              <Route
                path={`${match.url}/campaign/analytics`}
                render={() => (
                  <CampaignAnalytics
                    organizationId={match.params.organization_id}
                  ></CampaignAnalytics>
                )}
                exact
              ></Route>
              <Route
                path={`${match.url}/campaign`}
                render={() => (
                  <Campaign
                    organizationId={match.params.organization_id}
                  ></Campaign>
                )}
                exact
              ></Route>
              <Route
                path={`${match.url}/campaign/:id`}
                render={(result) => (
                  <CampaignPage
                    match={result.match}
                    organizationId={match.params.organization_id}
                  ></CampaignPage>
                )}
                exact
              ></Route>
              <Route
                path={`${match.url}/campaign/edit/:id`}
                render={() => (
                  <EditCampaign
                    organizationId={match.params.organization_id}
                  ></EditCampaign>
                )}
                exact
              ></Route>

              <Route
                path={`${match.url}/certificate-request`}
                component={CertificateRequestForm}
                exact
              />
              <Route
                path={`${match.url}/report-incident`}
                render={() => (
                  <ReportIncident
                    organizationId={match.params.organization_id}
                  ></ReportIncident>
                )}
                exact
              ></Route>
              <Route path={`${match.url}/about`} component={AboutPage} exact />

              <Route
                path={`${match.url}/event`}
                render={() => (
                  <EventPage
                    organizationId={match.params.organization_id}
                  ></EventPage>
                )}
                exact
              ></Route>

              <Route path={`${match.url}/message`} component={Message}></Route>
            </Switch>
          </div>
        </BrowserRouter>
      ) : (
        <Card>
          <Skeleton loading={isLoading} avatar active></Skeleton>
          <Skeleton loading={isLoading} avatar active></Skeleton>
          <Skeleton loading={isLoading} avatar active></Skeleton>
        </Card>
      )}
    </>
  );
};

export default Index;
