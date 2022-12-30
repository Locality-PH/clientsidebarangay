import React, { useState, useEffect } from "react";
import {
  Form,
  Avatar,
  Button,
  Input,
  DatePicker,
  Row,
  Col,
  message,
  Upload,
  Card,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ROW_GUTTER } from "constants/ThemeConstant";
import Flex from "components/shared-components/Flex";
const EditPorfile = () => {
  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    setFormData({
      avatarUrl: "/img/avatars/thumb-6.jpg",
      name: "Charlie Howard",
      email: "charlie.howard@themenate.com",
      userName: "Charlie",
      dateOfBirth: null,
      phoneNumber: "+44 (1532) 135 7921",
      address1: "San Isidro St",
      city: "Morong",
      country: "Philippines",
      postcode: "1972",
    });
    form.setFieldsValue({
      avatarUrl: "/img/avatars/thumb-6.jpg",
      name: "Charlie Howard",
      email: "charlie.howard@themenate.com",
      userName: "Charlie",
      dateOfBirth: null,
      phoneNumber: "+44 (1532) 135 7921",
      website: "",
      address1: "San Isidro St",
      city: "Morong",
      country: "Philippines",

      postcode: "1972",
    });
  }, []);
  return (
    <>
      <Form
        name="basicInformation"
        layout="vertical"
        form={form}
        initialValues={formData}
      >
        <Card className="setting-content">
          <Flex
            alignItems="center"
            mobileFlex={false}
            className="text-center text-md-left"
          >
            <Avatar
              size={90}
              src={formData?.avatarUrl}
              icon={<UserOutlined />}
            />
            <div className="mt-3 ml-3 mt-md-0">
              <Button type="primary">Change Avatar</Button>

              <Button className="ml-2">Remove</Button>
            </div>
          </Flex>
          <div className="mt-4">
            <Row>
              <Col xs={24} sm={24} md={24} lg={24}>
                <Row gutter={ROW_GUTTER}>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your name!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "Please enter a valid email!",
                        },
                      ]}
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                </Row>
                <Button type="primary" htmlType="submit">
                  Save Change
                </Button>
              </Col>
            </Row>
          </div>
        </Card>
        <Card className="setting-content" title={"Billing Information"}>
          <Row gutter={ROW_GUTTER}>
            {" "}
            <Col xs={24} sm={24} md={24}>
              <Form.Item label="Address 1" name="address1">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item label="Address 2" name="address2">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Phone Number" name="phoneNumber">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="City" name="city">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Country" name="country">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Post code" name="postcode">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </>
  );
};

export default EditPorfile;
