import { Row, Col, Card } from "antd";
import Officials from "./Officials";
import Events from "./Events";
import About from "./About/About";
import MissionAndVision from "./MissionAndVision";
import Projects from "./Projects";

const Index = () => {
  return (
    <>
      <Row gutter="16">
        <Col xs={24} sm={24} md={8}>
          <Officials></Officials>
          <Events></Events>
          <About></About>
        </Col>

        <Col xs={24} sm={24} md={16}>
          <MissionAndVision></MissionAndVision>
          <Projects></Projects>
          <Card>
            <img
              width="100%"
              alt="logo"
              src="/img/barangay/caniogan/BarangayCover.jpg"
              style={{ borderRadius: "1rem 1rem" }}
            />
          </Card>
        </Col>
      </Row>
      {/* <Barangay name={match.params.name}></Barangay> */}
    </>
  );
};

export default Index;
