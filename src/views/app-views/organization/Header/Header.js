import React from "react";
import { Row, Col, Card, Avatar, Button, Menu, Dropdown, Space } from "antd";
import { Icon } from "components/util-components/Icon";
import {
  GlobalOutlined,
  MailOutlined,
  HomeOutlined,
  MessageOutlined,
  PhoneOutlined,
  EllipsisOutlined,
  FormOutlined,
  FileOutlined,
  SendOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";

import { Link } from "react-router-dom";

const Header = ({
  name,
  avatarSize,
  quote,
  email,
  phoneNumber,
  address,
  website,
}) => {
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={`/app/dashboards/barangay/${name}/campaign`}>
          <FormOutlined /> <span className="ml-2">Campaign</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={`/app/dashboards/barangay/${name}/certificate-request`}>
          <FileOutlined /> <span className="ml-2">Certificate</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={`/app/dashboards/barangay/${name}/report-incident`}>
          <SendOutlined /> <span className="ml-2">Report Incident</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to={`/app/dashboards/barangay/${name}/about`}>
          <InfoCircleOutlined /> <span className="ml-2">About</span>
        </Link>
      </Menu.Item>
    </Menu>
  );

  const DropdownMenu = () => (
    <Dropdown key="more" overlay={menu}>
      <Button
        style={{
          border: "none",
          padding: 0,
        }}
      >
        <EllipsisOutlined
          style={{
            fontSize: 20,
            verticalAlign: "top",
          }}
        />
      </Button>
    </Dropdown>
  );

  return (
    <>
      <Card>
        <Row justify="center">
          <Col sm={24} md={23}>
            <div className="d-md-flex">
              {/* <div className="p-2 mx-auto bg-white rounded shadow-sm" style={{'marginTop': '-3.5rem', 'maxWidth': `${props.avatarSize + 16}px`}}>
									<Avatar shape="square" size={props.avatarSize} src="/img/barangay/caniogan/BarangayProfile.jpg" />
								</div> */}
              <div
                style={{
                  marginTop: "-3.5rem",
                  textAlign: "center",
                }}
              >
                <Avatar
                  shape="round"
                  size={avatarSize}
                  src="/img/barangay/caniogan/BarangayProfile.jpg"
                />
              </div>
              <div className="ml-md-4 w-100">
                <Flex
                  alignItems="center"
                  mobileFlex={false}
                  className="mb-3 text-center text-md-left"
                >
                  <h2 className="mt-2 mb-0 mt-md-0">Barangay {name}</h2>
                  <div className="mt-3 ml-md-3 mt-md-0">
                    <Space>
                      <Link to={`/app/dashboards/barangay/${name}`}>
                        <Button size="small" type="primary">
                          <HomeOutlined />
                          Home
                        </Button>
                      </Link>
                      <Button size="small">
                        <MessageOutlined />
                        Message
                      </Button>
                      <DropdownMenu></DropdownMenu>
                    </Space>
                  </div>
                </Flex>
                <Row gutter="16">
                  <Col sm={24} md={8}>
                    <p className="mt-0 mr-3 text-center text-muted text-md-left">
                      {quote}
                    </p>
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <Row className="mb-2">
                      <Col xs={12} sm={12} md={9}>
                        <Icon
                          type={MailOutlined}
                          className="text-primary font-size-md"
                        />
                        <span className="ml-2 text-muted">Email:</span>
                      </Col>
                      <Col xs={12} sm={12} md={15}>
                        <span className="font-weight-semibold">{email}</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={9}>
                        <Icon
                          type={PhoneOutlined}
                          className="text-primary font-size-md"
                        />
                        <span className="ml-2 text-muted">Phone:</span>
                      </Col>
                      <Col xs={12} sm={12} md={15}>
                        <span className="font-weight-semibold">
                          {phoneNumber}
                        </span>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <Row className="mt-2 mb-2 mt-md-0 ">
                      <Col xs={12} sm={12} md={9}>
                        <Icon
                          type={HomeOutlined}
                          className="text-primary font-size-md"
                        />
                        <span className="ml-2 text-muted">Address:</span>
                      </Col>
                      <Col xs={12} sm={12} md={15}>
                        <span className="font-weight-semibold">{address}</span>
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col xs={12} sm={12} md={9}>
                        <Icon
                          type={GlobalOutlined}
                          className="text-primary font-size-md"
                        />
                        <span className="ml-2 text-muted">Website:</span>
                      </Col>
                      <Col xs={12} sm={12} md={15}>
                        <span className="font-weight-semibold">{website}</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Header;
