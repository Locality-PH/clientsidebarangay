import HeaderCover from "./HeaderCover";
import Header from "./Header";
import Barangay from "./Barangay";
import Resident from "./Resident";
import Certificate from "./Certificate";
import ReportIncident from "./ReportIncident";
import AboutPage from "./AboutPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const Index = ({match}) => {
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
            <Route path={`${match.url}/resident`} component={Resident} exact></Route>
            <Route path={`${match.url}/certificate-request`} component={Certificate} exact></Route>
            <Route path={`${match.url}/report-incident`} component={ReportIncident} exact></Route>
            <Route path={`${match.url}/about`} component={AboutPage} exact></Route>
          </Switch>
        </div>

    
      </BrowserRouter> 
    </>
  )
}

export default Index
