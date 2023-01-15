import React, { useState } from "react";
import { signOut } from "redux/actions/Auth";
import { useAuth } from "contexts/AuthContext";
import { logOutDeactivate } from "api/ComponentController/NavProfileController";
import { Form, Button, Input, message, Tabs, Card } from "antd";
import { connect } from "react-redux";

const { TabPane } = Tabs;

const Removal = ({ signOut }) => {
  const { generateToken } = useAuth();

  const signOutNode = async () => {
    logOutDeactivate(signOut, generateToken);
  };

  return (
    <Card className="setting-content">
      <Tabs defaultActiveKey="1" size={"large"}>
        <TabPane tab="Deactivate" key="1">
          <h1>Deactivate Account</h1>
          <p>
            Your account will be temporarly deleted. You can activate your
            account again by loggging in.
          </p>
          <Form layout="vertical" onFinish={signOutNode}>
            <Form.Item
              name="action"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm  the deactivation key!",
                  onBlur: true,
                },
                ({}) => ({
                  validator(_, value) {
                    if (!value || "Deactivate Account" === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Deactivation key do not match!");
                  },
                }),
              ]}
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

export default connect(null, { signOut })(Removal);
