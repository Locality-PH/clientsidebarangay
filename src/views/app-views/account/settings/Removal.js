import React from "react";

import { Form, Button, Input, message, Tabs, Card } from "antd";
const { TabPane } = Tabs;

const Removal = () => {
  return (
    <Card className="setting-content">
      <Tabs defaultActiveKey="1" size={"large"}>
        <TabPane tab="Deactivate" key="1">
          <h1>Deactivate Account</h1>
          <p>
            Your account will be temporarly deleted. You can activate your
            account again by loggging in.
          </p>
          <Form layout="vertical">
            <Form.Item
              name="action"
              rules={[{ required: true, message: "Fill this up!" }]}
              label="Type 'Deactivate Account'"
            >
              <Input />
            </Form.Item>

            <div className="text-right">
              <Button type="primary" htmlType="submit">
                Deactivate Account
              </Button>
            </div>
          </Form>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default Removal;
