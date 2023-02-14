import React, { useState } from "react";
import { message, Tabs, Card } from "antd";
import Likes from "./Likes";
import Document from "./Document";
const { TabPane } = Tabs;

const ContentBody = () => {
  const [active, setActive] = useState(1);
  return (
    <div className="tabs-cards">
      <Tabs
        onChange={(e) => {
          console.log(e);
          setActive(e);
        }}
        defaultActiveKey="1"
        size={"large"}
      >
        <TabPane tab="Likes" key="1">
          <Likes />
        </TabPane>
        <TabPane tab="Follows" key="3"></TabPane>
        <TabPane tab="Blotter" key="4">
          <h1>Deactivate Account</h1>
          <p>
            Your account will be temporarly deleted. You can activate your
            account again by loggging in.
          </p>
        </TabPane>
        {/* <TabPane tab="Supply" key="4">
          <h1>Deactivate Account</h1>
          <p>
            Your account will be temporarly deleted. You can activate your
            account again by loggging in.
          </p>
        </TabPane> */}
        <TabPane tab="Documents" key="6">
          <Document active={active} />
        </TabPane>{" "}
        <TabPane tab="Joins" key="2">
          <h1>Deactivate Account</h1>
          <p>
            Your account will be temporarly deleted. You can activate your
            account again by loggging in.
          </p>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ContentBody;
