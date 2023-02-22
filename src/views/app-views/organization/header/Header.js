import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  Button,
  Menu,
  Dropdown,
  Space,
  Typography, message
} from "antd";
const { Paragraph, Text } = Typography;
import { Icon } from "components/util-components/Icon";
import {
  GlobalOutlined,
  MailOutlined,
  HomeFilled,
  CloseOutlined,
  HeartFilled,
  MessageOutlined,
  PhoneOutlined,
  EllipsisOutlined,
  FormOutlined,
  FileOutlined,
  SendOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import utils from "utils";
import { COLORS } from "constants/ChartConstant";
import Flex from "components/shared-components/Flex";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const Header = ({ organizationId, organization, alreadyFollow }) => {
  const { currentUser, generateToken } = useAuth();
  const [ellipsis, setEllipsis] = useState(true);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");


  const [isFollow, setIsFollow] = useState(alreadyFollow);

  const [followLoading, setFollowLoading] = useState(false);
  const [unFollowLoading, setUnFollowLoading] = useState(false);

  useEffect(() => {
    if (organization != null) {
      setName(organization.organization_name);
      setAddress(organization.address);
    }
  }, [organization]);

  const follow = () => {
    setFollowLoading(true)

    setTimeout(() => {
      axios
        .post("/api/organization/follow", {
          organization_id: organizationId,
          uuid: currentUser.uid
        }, generateToken()[1])
        .then((response) => {
          message.destroy();
          if (response.data == "Success") {
            setIsFollow(true)
            setFollowLoading(false)

          } else {
            message.error("The action can't be completed, please try again.");
          }
        })
        .catch((error) => {
          message.error("The action can't be completed, please try again.");
        });

    }, 1000)

  }

  const unFollow = () => {
    setUnFollowLoading(true)

    setTimeout(() => {
      axios
        .post("/api/organization/unfollow", {
          organization_id: organizationId,
          uuid: currentUser.uid
        }, generateToken()[1])
        .then((response) => {
          message.destroy();
          if (response.data == "Success") {
            setIsFollow(false)
            setUnFollowLoading(false)

          } else {
            message.error("The action can't be completed, please try again.");
          }
        })
        .catch((error) => {
          message.error("The action can't be completed, please try again.");
        });

    }, 1000)

  }

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={`/home/organization/${organizationId}/campaign`}>
          <FormOutlined /> <span className="ml-2">Campaign</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={`/home/organization/${organizationId}/certificate-request`}>
          <FileOutlined /> <span className="ml-2">Certificate</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={`/home/organization/${organizationId}/report-incident`}>
          <SendOutlined /> <span className="ml-2">Report Incident</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to={`/home/organization/${organizationId}/about`}>
          <InfoCircleOutlined /> <span className="ml-2">About</span>
        </Link>
      </Menu.Item>
    </Menu>
  );

  const DropdownMenu = () => (
    <Dropdown key="more" overlay={menu} trigger={["click"]}>
      <Button shape="round" size="small">
        <EllipsisOutlined
          style={{
            marginTop: "-2px !important",
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
                {organization?.profile != null ? (
                  <Avatar
                    icon={<UserOutlined />}
                    size={150}
                    src={organization?.profile.fileUrl}
                  >
                    {utils.getNameInitial(organization.organization_name)}
                  </Avatar>
                ) : (
                  <Avatar
                    style={{
                      backgroundColor: organization?.profile_color,
                      fontSize: "3rem"
                    }}
                    size={150}
                  >
                    {utils.getNameInitial(organization.organization_name)}
                  </Avatar>
                )}
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
                      <Link to={`/home/organization/${organizationId}`}>
                        <Button
                          size="small"
                          style={{ backgroundColor: "#3e79f7", color: "white" }}
                        >
                          <HomeFilled />
                          Home
                        </Button>
                      </Link>

                      {
                        !isFollow ? <Button
                          size="small"
                          style={{ backgroundColor: "#fc6c85", color: "white" }}
                          onClick={() => follow()}
                          loading={followLoading}
                        >
                          <HeartFilled style={{ color: "white" }} />
                          Follow
                        </Button> :

                          <Button
                            size="small"
                            style={{ backgroundColor: "#D70040", color: "white" }}
                            onClick={() => unFollow()}
                            loading={unFollowLoading}
                          >
                            <CloseOutlined style={{ color: "white" }} />
                            Unfollow
                          </Button>
                      }


                      {/* <Button size="small" style={{backgroundColor: "	#D70040", color: "white"}}>
                        <CloseOutlined />
                        Unfollow
                      </Button> */}

                      {/* <Link to={`/home/organization/${organizationId}/message`}>
                        <Button size="small"><MessageOutlined />Message</Button>
                      </Link> */}
                      <DropdownMenu />
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
                        <Text
                          style={
                            ellipsis
                              ? {
                                width: 100,
                              }
                              : undefined
                          }
                          ellipsis={
                            ellipsis
                              ? {
                                tooltip: `${organization.organization_member[0].email !=
                                  null
                                  ? organization.organization_member[0]
                                    .email
                                  : ""
                                  }`,
                              }
                              : false
                          }
                        >
                          {organization.organization_member[0].email != null
                            ? organization.organization_member[0].email
                            : ""}
                        </Text>
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
                        <Text
                          style={
                            ellipsis
                              ? {
                                width: 100,
                              }
                              : undefined
                          }
                          ellipsis={
                            ellipsis
                              ? {
                                tooltip: `${organization.phone_number}`,
                              }
                              : false
                          }
                        >
                          {organization.phone_number}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <Row className="mt-2 mb-2 mt-md-0 ">
                      <Col xs={12} sm={12} md={9}>
                        <Icon
                          type={HomeFilled}
                          className="text-primary font-size-md"
                        />
                        <span className="ml-2 text-muted">Address:</span>
                      </Col>
                      <Col xs={12} sm={12} md={15}>
                        <Text
                          style={
                            ellipsis
                              ? {
                                width: 100,
                              }
                              : undefined
                          }
                          ellipsis={
                            ellipsis
                              ? {
                                tooltip: `${address}`,
                              }
                              : false
                          }
                        >
                          {address}
                        </Text>
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
                        <Text
                          style={
                            ellipsis
                              ? {
                                width: 100,
                              }
                              : undefined
                          }
                          ellipsis={
                            ellipsis
                              ? {
                                tooltip: `${organization.website}`,
                              }
                              : false
                          }
                        >
                          {organization.website}
                        </Text>
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
