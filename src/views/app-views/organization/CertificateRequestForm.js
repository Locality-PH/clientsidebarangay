import React from "react";
import { Form, Input, InputNumber, Select, Button, Radio, Card } from "antd";
const { Option } = Select;

const CertificateRequestForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <div className="my-content-center">
        <Card title="Certificate Request Form" style={{ width: "35rem" }}>
          <Form name="complex-form" onFinish={onFinish}>
            <Form.Item>
              <h4>Name</h4>
              <Form.Item
                name="name"
                noStyle
                rules={[{ required: true, message: "Name is required" }]}
              >
                <Input placeholder="Enter Name" />
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <h4>Age</h4>
              <Form.Item
                name="age"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Age is required",
                    type: "number",
                    min: 0,
                    max: 99,
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Enter Age"
                />
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <h4>Gender</h4>
              <Form.Item
                name="gender"
                noStyle
                rules={[{ required: true, message: "Gender is required" }]}
              >
                <Radio.Group>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Radio.Group>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <h4>Description</h4>
              <Form.Item
                name="description"
                noStyle
                rules={[{ required: true, message: "Description is required" }]}
              >
                <Input.TextArea placeholder="Write Description" />
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <h4>Certificate Type</h4>
              <Input.Group compact>
                <Form.Item
                  name="type"
                  noStyle
                  rules={[
                    { required: true, message: "Certificate Type is required" },
                  ]}
                >
                  <Select
                    placeholder="Select Certificate Type"
                    style={{ width: "100%" }}
                  >
                    <Option value="barangay clearance">
                      Barangay Clearance
                    </Option>
                    <Option value="barangay clearance2">
                      Barangay Clearance2
                    </Option>
                  </Select>
                </Form.Item>
              </Input.Group>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Send
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default CertificateRequestForm;
