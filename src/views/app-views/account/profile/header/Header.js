import React, { useState, useEffect } from "react";
import { Row, Col, Card, Avatar, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import { CloudDownloadOutlined, ToolOutlined } from "@ant-design/icons";
import { AUTH_TOKEN } from "redux/constants/Auth";
import { useAuth } from "contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { PROFILE_URL } from "redux/constants/Auth";
import utils from "utils";
import { UserOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";
const Header = () => {
  let history = useHistory();
  const { currentUser } = useAuth();

  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem(PROFILE_URL) || "[]")
  );
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(
    () => {
      const listener = window.addEventListener(
        "resize",
        updateWindowDimensions
      );
      updateWindowDimensions();

      return () => {
        listener, setHeight(), setWidth();
      };
    },
    [height],
    [width]
  );
  return (
    <>
      <Card className="borderless">
        <Row justify="center">
          <Col sm={24} md={23}>
            <div className="d-md-flex">
              <div
                style={{
                  marginTop: "-3.5rem",
                  textAlign: "center",
                }}
              >
                {currentUser?.photoURL ? (
                  <Avatar
                    shape="round"
                    size={150}
                    src={currentUser?.photoURL}
                  />
                ) : (
                  <Avatar
                    src={currentUser?.photoURL}
                    size={150}
                    style={{ backgroundColor: profile?.profile_color }}
                  >
                    <b style={{ fontSize: "50px" }}>
                      {currentUser?.displayName ? (
                        <>
                          {utils.getNameInitial(currentUser?.displayName || "")}
                        </>
                      ) : (
                        <>
                          <UserOutlined
                            className="home-tag-2"
                            style={{ fontSize: "60px" }}
                          />
                        </>
                      )}
                    </b>
                  </Avatar>
                )}
              </div>
              <div className="ml-md-4 w-100">
                <Flex
                  alignItems="center"
                  mobileFlex={false}
                  className="mb-3 text-center text-md-left"
                >
                  <h2 className="mt-2 mb-0 mt-md-0">{}</h2>
                </Flex>
                <Row align="middle" gutter="16">
                  <Col
                    xs={24}
                    sm={24}
                    md={12}
                    className={`${width < 776 ? `text-center` : `0px`}`}
                  >
                    <Col xs={24} sm={24} md={15}>
                      <span className="text-muted ">{currentUser?.email}</span>
                    </Col>

                    <Col xs={24} sm={24} md={24}>
                      <h2 className="pt-2 font-weight-semibold">
                        {currentUser?.displayName}
                      </h2>
                    </Col>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={12}
                    justify="end"
                    className="text-right "
                    style={{
                      borderTop: `${width < 776 ? `1px` : `0px`} solid gray`,
                    }}
                  >
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      className="pl-0 pr-0 ml-0 mr-0 text-muted"
                    >
                      <span className="pl-0 pr-0 ml-0 mr-0 ">
                        <Button
                          onClick={() => {
                            console.log;
                            history.push(`/home/account/settings/edit-profile`);
                          }}
                          icon={<ToolOutlined style={{ fontSize: 20 }} />}
                          type="text"
                        ></Button>
                      </span>
                      <span className="font-weight-semibold">
                        <Button
                          onClick={() => {
                            if (currentUser?.photoURL) {
                              saveAs(currentUser?.photoURL, "profile");
                            } else {
                              message.error("No profile picture");
                            }
                          }}
                          icon={
                            <CloudDownloadOutlined style={{ fontSize: 20 }} />
                          }
                          type="text"
                        ></Button>
                      </span>
                    </Col>
                  </Col>
                  {/* <Col xs={24} sm={24} md={12} className="text-right">
                    <Row className="mb-2">
                      <Col xs={12} sm={12} md={15}>
                        <span className="text-muted">rojhon@gmail.com</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={15}>
                        <h2 className="font-weight-semibold">Von Aralar</h2>
                      </Col>
                    </Row>
                  </Col> */}
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
