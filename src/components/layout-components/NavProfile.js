import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { connect } from "react-redux";
import {
  EditOutlined,
  SettingOutlined,
  ShopOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Icon from "components/util-components/Icon";
import { signOut } from "redux/actions/Auth";

const menuItem = [
  {
    title: "Edit Profile",
    icon: EditOutlined,
    path: "/home/account",
  },
  {
    title: "Profile Pages",
    icon: EditOutlined,
    path: "/home/account",
  },
  {
    title: "Account Setting",
    icon: SettingOutlined,
    path: "/home/account/settings/security",
  },
  {
    title: "Billing",
    icon: ShopOutlined,
    path: "/",
  },
];
const menuItem2 = [
  {
    title: "FAQ & Support",
    icon: QuestionCircleOutlined,
    path: "/",
  },
  {
    title: "Create Organization",
    icon: QuestionCircleOutlined,
    path: "/home/schedule/demo",
  },
  {
    title: "Help Center",
    icon: QuestionCircleOutlined,
    path: "/",
  },
];
export const NavProfile = ({ signOut, match }) => {
  const profileImg = "/img/avatars/thumb-1.jpg";
  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header" />
      <div className="nav-profile-body">
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <a href={el.path}>
                  <Icon className="mr-3" type={el.icon} />
                  <span className="font-weight-normal">{el.title}</span>
                </a>
              </Menu.Item>
            );
          })}{" "}
          <Menu.Item key={menuItem.length + 1} onClick={(e) => signOut()}>
            <span>
              <LogoutOutlined className="mr-3" />
              <span className="font-weight-normal">Sign Out</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>{" "}
      <div className="nav-profile-body-2">
        <Menu>
          {menuItem2.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <a href={el.path}>
                  <Icon className="mr-3" type={el.icon} />
                  <span className="font-weight-normal">{el.title}</span>
                </a>
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center avatar-top" mode="horizontal">
        <Menu.Item key="profile">
          <Avatar size={53} src={profileImg} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
};

export default connect(null, { signOut })(NavProfile);
