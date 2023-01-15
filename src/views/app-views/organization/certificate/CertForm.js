import React, { useEffect } from "react";
import { Form, Input, InputNumber, Select, Button, Radio, Card } from "antd";
import { AUTH_TOKEN } from "redux/constants/Auth";
import debounce from "lodash.debounce";
const { Option } = Select;
import { useAuth } from "contexts/AuthContext";

const CertificateRequestForm = (props) => {
  const { setParentData, parentData } = props;
  const { currentUser } = useAuth();
  const [form] = Form.useForm();

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
                style={{ width: "100%" }}
                onChange={(e) => {
                  onFinish(e, "certificate_type");
                }}
              >
                <Option value="barangay clearance">Barangay Clearance</Option>
                <Option value="barangay clearance2">Barangay Clearance2</Option>
              </Select>
            </Form.Item>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default CertificateRequestForm;
