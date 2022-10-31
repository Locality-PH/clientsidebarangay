import React, { useState, useEffect } from "react";
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

const Header = ({ organizationId, organization }) => {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")

  useEffect(() => {
    if (organization != null) {
      setName(organization.organization_name)
      setAddress(organization.address)

    }
  }, [organization])
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={`/home/group/${organizationId}/campaign`}>
          <FormOutlined /> <span className="ml-2">Campaign</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={`/home/group/${organizationId}/certificate-request`}>
          <FileOutlined /> <span className="ml-2">Certificate</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={`/home/group/${organizationId}/report-incident`}>
          <SendOutlined /> <span className="ml-2">Report Incident</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to={`/home/group/${organizationId}/about`}>
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
                  size={150}
                  src="/img/barangay/caniogan/BarangayProfile.jpg"
                />
              </div>
              <div className="ml-md-4 w-100">
                <Flex
                  alignItems="center"
                  mobileFlex={false}
                  className="mb-3 text-center text-md-left"
                >
                  <h2 className="mt-2 mb-0 mt-md-0">{name}</h2>
                  <div className="mt-3 ml-md-3 mt-md-0">
                    <Space>
                      <Link to={`/home/group/${organizationId}`}>
                        <Button size="small" type="primary">
                          <HomeOutlined />
                          Home
                        </Button>
                      </Link>
                      <Link to={`/home/group/${organizationId}/message`}>
                        <Button size="small"><MessageOutlined />Message</Button>
                      </Link>
                      <DropdownMenu></DropdownMenu>
                    </Space>
                  </div>
                </Flex>
                <Row gutter="16">
                  <Col sm={24} md={8}>
                    <p className="mt-0 mr-3 text-center text-muted text-md-left">
                      We rise and fall as one people, one nation.
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
                        <span className="font-weight-semibold">rojhon@gmail.com</span>
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
                          0923
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
                        <span className="font-weight-semibold">website ito</span>
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
