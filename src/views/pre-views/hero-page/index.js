import React, { useEffect, useState } from "react";

import AboutUs from "./AboutUs";
import Planning from "./Planning";
import Schedule from "./Schedule";
import BlogNews from "./BlogNews";
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";

const DemoComponent = (props) => {
  const { redirect } = props;
  let history = useHistory();
  useEffect(() => {
    if (redirect === "/auth/login") {
      history.push(redirect);
    }
  }, []);
  return (
    <>
      <AboutUs />
      <Planning />
      <BlogNews />
      <Schedule />
    </>
  );
};
const mapStateToProps = ({ theme, auth }) => {
  const { redirect } = auth;
  return { redirect };
};

export default withRouter(connect(mapStateToProps)(DemoComponent));
