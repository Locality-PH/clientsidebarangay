import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import Logo from "./Logo";
import { toggleCollapsedNav, onMobileNavToggle } from "redux/actions/Theme";

import utils from "utils";

const { Header } = Layout;

export const HeaderNavRegister = (props) => {
  const { headerNavColor, isMobile, currentTheme } = props;
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
      return listener;
    },
    [height],
    [width]
  );
  const mode = () => {
    if (!headerNavColor) {
      return utils.getColorContrast(
        currentTheme === "dark" ? "#00000" : "#ffffff"
      );
    }
    return utils.getColorContrast(headerNavColor);
  };
  const navMode = mode();

  return (
    <Header
      className={`app-header ${navMode}`}
      style={{ backgroundColor: "rgb(54 75 101)", height: "5rem" }}
    >
      <div className="nav" style={{ width: `calc(100%)` }}>
        <div className={`app-header-wrapper  layout-top-nav`}>
          <Logo logoType={navMode} width={width} />
        </div>
      </div>
    </Header>
  );
};

const mapStateToProps = ({ theme }) => {
  const { headerNavColor, isMobile, currentTheme } = theme;
  return {
    headerNavColor,
    isMobile,
    currentTheme,
  };
};

export default connect(mapStateToProps, {
  toggleCollapsedNav,
  onMobileNavToggle,
})(HeaderNavRegister);
