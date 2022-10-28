import React from "react";
import { Card, Row, Col } from "antd";
import { Icon } from "components/util-components/Icon";
import {
  GlobalOutlined,
  MailOutlined,
  HomeOutlined,
  PhoneOutlined,
  RightSquareOutlined,
} from "@ant-design/icons";

const AboutPage = () => {
  return (
    <>
      <Row gutter="16">
        <Col xs={24} sm={24} md={8}>
          <Card title="Message from us :)">
            <h4 className="text-muted">
              Thank you for entering my life. I strongly believe in having "a
              person," and there is no better person to fit that description
              than you. For the last two years of my life, I have been through
              so many different stages, like graduating, falling out with
              friends, a new school, and through all of the good and bad times,
              you have been with me. I couldn't thank you enough for that. To
              me, it is so important for your friends to be proud of you when
              you get a new job, learn something new, or just accomplish big
              things. But it's also really important for your friends to just be
              proud that you got out of bed that day, so today, January 7, I am
              so proud of you for waking up and just having a day!
            </h4>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <Card title="Who we are?">
            <h4 className="text-muted">
              The Philippines is one of the world’s largest archipelago nations.
              It is situated in Southeast Asia in the Western Pacific Ocean. Its
              islands are classified into three main geographical areas – Luzon,
              Visayas, and Mindanao. Because of its archipelagic nature,
              Philippines is a culturally diverse country. With its topography
              consisting of mountainous terrains, dense forests, plains, and
              coastal areas.
            </h4>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <Card title="Approach us">
            <div className="mb-3">
              <h4>Contact</h4>
              <Row className="mb-2">
                <Col xs={12} sm={12} md={9}>
                  <Icon
                    type={MailOutlined}
                    className="text-primary font-size-md"
                  />
                  <span className="ml-2 text-muted">Email:</span>
                </Col>
                <Col xs={12} sm={12} md={15}>
                  <span className="font-weight-semibold">
                    caniogan@gmail.com
                  </span>
                </Col>
              </Row>

              <Row className="mb-2">
                <Col xs={12} sm={12} md={9}>
                  <Icon
                    type={PhoneOutlined}
                    className="text-primary font-size-md"
                  />
                  <span className="ml-2 text-muted">Phone:</span>
                </Col>
                <Col xs={12} sm={12} md={15}>
                  <span className="font-weight-semibold">+12 123 1234</span>
                </Col>
              </Row>

              <Row className="mb-2">
                <Col xs={12} sm={12} md={9}>
                  <Icon
                    type={HomeOutlined}
                    className="text-primary font-size-md"
                  />
                  <span className="ml-2 text-muted">Address:</span>
                </Col>
                <Col xs={12} sm={12} md={15}>
                  <span className="font-weight-semibold">
                    Caniogan Morong, Rizal
                  </span>
                </Col>
              </Row>

              <Row>
                <Col xs={12} sm={12} md={9}>
                  <Icon
                    type={GlobalOutlined}
                    className="text-primary font-size-md"
                  />
                  <span className="ml-2 text-muted">Website:</span>
                </Col>
                <Col xs={12} sm={12} md={15}>
                  <span className="font-weight-semibold">facebook.com</span>
                </Col>
              </Row>
            </div>

            <div>
              <h4>Other Government Hotlines</h4>
              <Row className="mb-2">
                <Col>
                  <Icon
                    type={RightSquareOutlined}
                    className="text-primary font-size-md"
                  />
                  <span className="ml-2 text-muted">
                    National Emergency Hotline in the Philippines: 911
                  </span>
                </Col>
              </Row>

              <Row className="mb-2">
                <Col>
                  <Icon
                    type={RightSquareOutlined}
                    className="text-primary font-size-md"
                  />
                  <span className="ml-2 text-muted">
                    Philippine National Police Hotline: 117 or (02) 8772-0650
                  </span>
                </Col>
              </Row>

              <Row className="mb-2">
                <Col>
                  <Icon
                    type={RightSquareOutlined}
                    className="text-primary font-size-md"
                  />
                  <span className="ml-2 text-muted">
                    Philippine Red Cross: 143 or (02) 8527-8385 to 95
                  </span>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AboutPage;
