import React, { useEffect, useState } from "react";

//Components
import EditProfile from "./EditProfile";
import Billing from "./Billing";
import Notification from "./Notification";
import Deactivate from "./Removal";
import Security from "./Security/index";
import Invoice from "./Invoice";
import InvoiceSelect from "./Profile/invoice/Invoice";

//Hooks
import { Row, Col, Menu } from "antd";
import { Link, Redirect, Route, Switch } from "react-router-dom";

const AccountSettings = ({ match, location }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    const listener = window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();
    return () => window.removeEventListener("resize", listener);
  }, []);
  const matchUrl = "/home/account/settings";
  return (
    <Row className="h-100 w-100" gutter={14} justify={"center"}>
      <Col span={22}>
        <Menu
          defaultSelectedKeys={`${matchUrl}/edit-profile`}
          className="mb-3 setting-menu "
          title={"sad"}
          mode={width <= 722 ? "plain" : "horizontal"}
          selectedKeys={[location.pathname]}
        >
          <Menu.Item className="setting-center" key={"#"}>
            <h1 className="title setting-padding">Settings</h1>
          </Menu.Item>
          <Menu.Item
            className="setting-center"
            key={`${matchUrl}/edit-profile`}
          >
            <span>Edit Profile</span>
            <Link to={`${matchUrl}/edit-profile`} />
          </Menu.Item>
          <Menu.Item className="setting-center" key={`${matchUrl}/security`}>
            <span>Security</span>
            <Link to={`${matchUrl}/security`} />
          </Menu.Item>
          <Menu.Item className="setting-center" key={`${matchUrl}/billing`}>
            Billing
            <Link to={`${matchUrl}/billing`} />
          </Menu.Item>
          <Menu.Item className="setting-center" key={`${matchUrl}/invoice`}>
            Invoice
            <Link to={`${matchUrl}/invoice`} />
          </Menu.Item>
          {/* <Menu.Item
            className="setting-center"
            key={`${matchUrl}/notification`}
          >
            Notification
            <Link to={`${matchUrl}/notification`} />
          </Menu.Item> */}
          <Menu.Item className="setting-center" key={`${matchUrl}/removal`}>
            Removal
            <Link to={`${matchUrl}/removal`} />
          </Menu.Item>
        </Menu>
      </Col>
      <Col span={22}>
        <Switch>
          <Redirect
            exact
            from={`${matchUrl}`}
            to={`${matchUrl}/edit-profile`}
          />
          <Route path={`${matchUrl}/edit-profile`} component={EditProfile} />
          <Route path={`${matchUrl}/security`} component={Security} />
          <Route path={`${matchUrl}/billing`} component={Billing} />
          {/* <Route path={`${matchUrl}/invoice/:id`} component={InvoiceSelect} /> */}

          <Route path={`${matchUrl}/invoice`} component={Invoice} />

          <Route path={`${matchUrl}/notification`} component={Notification} />
          <Route path={`${matchUrl}/removal`} component={Deactivate} />
        </Switch>
      </Col>
    </Row>
  );
};

export default AccountSettings;
