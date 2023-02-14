import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, Button, Radio, Card } from "antd";
import axios from "axios";
import debounce from "lodash.debounce";
import { useAuth } from "contexts/AuthContext";
const { Option } = Select;

const CertificateRequestForm = (props) => {
  const { setParentData, parentData, organizationId } = props;
  const { currentUser } = useAuth();

  const [form] = Form.useForm();
  console.log(organizationId);

  const onFinish = debounce((value, title) => {
    try {
      form.setFieldsValue({
        [title]: value,
      });
      let data = parentData;
      console.log(data);
      data[`${title}`] = value;
      return setParentData(data);
    } catch (error) {
      console.log(error.message);
    }
  }, 100);
  useEffect(() => {
    form.setFieldsValue({
      email: currentUser?.email,
      name: currentUser?.displayName,
    });
  }, []);
  return (
    <>
      <Card title="Certificate Request">
        <Form name="complex-form" form={form}>
          <Form.Item>
            <h4>Email</h4>
            <Form.Item
              name="email"
              hasFeedback
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input disabled placeholder="Enter Email" />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <h4>Name</h4>
            <Form.Item
              name="name"
              hasFeedback
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input
                onChange={(e) => onFinish(e.target.value, "name")}
                placeholder="Enter Name"
              />
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <h4>Description</h4>
            <Form.Item
              name="description"
              hasFeedback
              rules={[{ required: true, message: "Description is required" }]}
            >
              <Input.TextArea
                onChange={(e) => onFinish(e.target.value, "description")}
                placeholder="Write Description"
              />
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <h4>Certificate Type</h4>

            <Form.Item
              name="type"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Certificate Type is required",
                },
              ]}
            >
              <Select
                placeholder="Select Certificate Type"
                onChange={(e) => {
                  onFinish(e, "certificate_type");
                }}
              >
                <Option key={1} value="indigency">
                  Barangay Indigency
                </Option>
                <Option key={2} value="certificate">
                  Barangay Clearance
                </Option>
                <Option key={3} value="business">
                  Business Permit
                </Option>
              </Select>
            </Form.Item>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default CertificateRequestForm;
