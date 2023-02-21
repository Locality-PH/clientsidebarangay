import React from "react";
import LazyHero from "react-lazy-hero";
import { Row, Col } from "antd";

import AboutUs from "./AboutUs";
import Planning from "./Planning";
import Schedule from "./Schedule";

import BlogNews from "./BlogNews";

const DemoComponent = () => {
  return (
    <>
      <AboutUs />
      <Planning />
      <BlogNews />
      <Schedule />
    </>
  );
};

export default DemoComponent;
