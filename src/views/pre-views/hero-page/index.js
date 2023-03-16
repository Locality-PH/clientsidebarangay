import React, { useEffect, useState } from "react";

import AboutUs from "./AboutUs";
import Planning from "./Planning";
import Schedule from "./Schedule";
import BlogNews from "./BlogNews";
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signOutSuccess2 } from "redux/actions/Auth";
import store from "redux/store";
import redux, { createStore } from "redux";
const DemoComponent = (props) => {
  const { redirect } = props;
  let history = useHistory();
  // console.log(redirect);
  console.log();
  useEffect(() => {
    if (redirect === "/auth/login") {
      history.push(redirect);
    }
    store.dispatch(signOutSuccess2());
    // console.log(redirect);
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
