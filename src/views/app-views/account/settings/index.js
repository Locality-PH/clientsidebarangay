import React from "react";

//CSS
import "./index.css";

//Components
import EditProfile from "./EditProfile";
import ChangePassword from "./Security/ChangePassword";
import Billing from "./Billing";
import Notification from "./Notification";
import Deactivate from "./Removal";
import Security from "./Security/index";

//Hooks
import {
  Button,
  message,
  Row,
  Col,
  Form,
  Card,
  Space,
  Layout,
  Menu,
  Breadcrumb,
  Divider,
} from "antd";
import { Link, Redirect, Route, Switch } from "react-router-dom";

const { SubMenu } = Menu;

const AccountSettings = ({ match, location }) => {
  return (
    <Row className="h-100 w-100" gutter={14}>
      <Col span={6}>
        <Menu
          defaultSelectedKeys={`${match.url}/edit-profile`}
          className="setting-menu"
          title={"sad"}
          mode="inline"
          selectedKeys={[location.pathname]}
        >
          <Menu.Item key={"#"}>
            <h1 className="title setting-padding">Settings</h1>
          </Menu.Item>
          <Menu.Item key={`${match.url}/edit-profile`}>
            <span>Edit Profile</span>
            <Link to={"edit-profile"} />
          </Menu.Item>
          <Menu.Item key={`${match.url}/security`}>
            <span>Security</span>
            <Link to={"security"} />
          </Menu.Item>
          <Menu.Item key={`${match.url}/billing`}>
            Billing
            <Link to={"billing"} />
          </Menu.Item>
          <Menu.Item key={`${match.url}/notification`}>
            Notification
            <Link to={"notification"} />
          </Menu.Item>
          <Menu.Item key={`${match.url}/removal`}>
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
