import React from "react";

//Components
import EditProfile from "./EditProfile";
import Billing from "./Billing";
import Notification from "./Notification";
import Deactivate from "./Removal";
import Security from "./Security/index";

//Hooks
import { Row, Col, Menu } from "antd";
import { Link, Redirect, Route, Switch } from "react-router-dom";

const AccountSettings = ({ match, location }) => {
  return (
    <Row className="h-100 w-100" gutter={14} justify={"center"}>
      <Col span={18}>
        <Menu
          defaultSelectedKeys={`${match.url}/edit-profile`}
          className="mb-3 setting-menu "
          title={"sad"}
          mode="horizontal"
          selectedKeys={[location.pathname]}
        >
          <Menu.Item className="setting-center" key={"#"}>
            <h1 className="title setting-padding">Settings</h1>
          </Menu.Item>
          <Menu.Item
            className="setting-center"
            key={`${match.url}/edit-profile`}
          >
            <span>Edit Profile</span>
            <Link to={"edit-profile"} />
          </Menu.Item>
          <Menu.Item className="setting-center" key={`${match.url}/security`}>
            <span>Security</span>
            <Link to={"security"} />
          </Menu.Item>
          <Menu.Item className="setting-center" key={`${match.url}/billing`}>
            Billing
            <Link to={"billing"} />
          </Menu.Item>
          <Menu.Item
            className="setting-center"
            key={`${match.url}/notification`}
          >
            Notification
            <Link to={"notification"} />
          </Menu.Item>
          <Menu.Item className="setting-center" key={`${match.url}/removal`}>
            Removal
            <Link to={"removal"} />
          </Menu.Item>
        </Menu>
      </Col>
      <Col span={18}>
        <Switch>
          <Redirect
            exact
            from={`${match.url}`}
            to={`${match.url}/edit-profile`}
          />
          <Route path={`${match.url}/edit-profile`} component={EditProfile} />
          <Route path={`${match.url}/security`} component={Security} />
          <Route path={`${match.url}/billing`} component={Billing} />
          <Route path={`${match.url}/notification`} component={Notification} />
          <Route path={`${match.url}/removal`} component={Deactivate} />
        </Switch>
      </Col>
    </Row>
  );
};

export default AccountSettings;
