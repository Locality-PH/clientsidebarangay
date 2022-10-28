import React, { useState, useEffect } from "react";
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
import { PROFILE_URL } from "redux/constants/Auth";
import { useHistory } from "react-router-dom";
import utils from "utils";
import { useAuth } from "contexts/AuthContext";
import { logOut } from "api/ComponentController/NavProfileController";

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
  const { currentUser, generateToken, currentPhoto } = useAuth();
  let history = useHistory();
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem(PROFILE_URL) || "[]")
  );
  const user =
    currentUser?.displayName != null ? currentUser.displayName : "N/A";
  const signOutNode = () => {
    logOut(signOut, generateToken);
  };

  const [timer, setTimer] = useState(false);
  useEffect(() => {
    let mount = true;
    if (!timer)
      setTimeout(() => {
        setTimer(true);
      }, 1500);
    return () => {
      setTimer(true);
      mount = false;
    };
  }, []);
  useEffect(() => {
    let mount = true;
    if (mount)
      setProfile(JSON.parse(localStorage.getItem(PROFILE_URL) || "[]"));

    return () => {
      mount = false;
    };
  }, [localStorage.getItem(PROFILE_URL)]);
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
          <Menu.Item key={menuItem.length + 1} onClick={(e) => signOutNode()}>
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
          {profile?.profile_data ? (
            <Avatar src={profile?.profile_data} size={45}>
              <b> {utils.getNameInitial(user)} </b>{" "}
            </Avatar>
          ) : (
            <Avatar
              src={profile?.profile_data}
              size={45}
              style={{ backgroundColor: profile?.profile_color }}
            >
              <b> {utils.getNameInitial(user)} </b>{" "}
            </Avatar>
          )}
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
};

export default connect(null, { signOut })(NavProfile);
