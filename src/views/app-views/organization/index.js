import HeaderCover from "./Header/HeaderCover";
import Header from "./Header/Header";
import Barangay from "./Group";
import Campaign from "./Campaign/Campaign";
import CampaignPage from "./Campaign/CampaignPage";
import EditCampaign from "./Campaign/EditCampaign";
import CertificateRequestForm from "./certificate/CertificateRequestForm";
import ReportIncident from "./blotter/ReportIncident";
import AboutPage from "./About/AboutPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const Index = ({ match }) => {
  return (
    <>
      <BrowserRouter>
        <HeaderCover img="/img/others/img-12.jpg" />
        <div className="container my-4">
          <Header
            name={match.params.name}
            avatarSize={150}
            quote="We rise and fall as one people, one nation."
            email="caniogan@gmail.com"
            phoneNumber="+12 123 1234"
            address="Caniogan Morong, Rizal"
            website="facebook.com"
          />
          <Switch>
            <Route path={match.url} component={Barangay} exact />
            <Route
              path={`${match.url}/campaign`}
              render={() => <Campaign barangayUrl={match.url}></Campaign>}
              exact
            />
            <Route
              path={`${match.url}/campaign/:id`}
              render={(result) => (
                <CampaignPage
                  match={result.match}
                  barangayUrl={match.url}
                ></CampaignPage>
              )}
              exact
            />
            <Route
              path={`${match.url}/campaign/edit/:id`}
              render={() => (
                <EditCampaign barangayUrl={match.url}></EditCampaign>
              )}
              exact
            />
            <Route
              path={`${match.url}/certificate-request`}
              component={CertificateRequestForm}
              exact
            />
            <Route
              path={`${match.url}/report-incident`}
              component={ReportIncident}
              exact
            />
            <Route path={`${match.url}/about`} component={AboutPage} exact />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
};

export default Index;
