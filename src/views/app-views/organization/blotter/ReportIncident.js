import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, message, Col, Row } from "antd";
import Flex from "components/shared-components/Flex";
import { Editor } from "react-draft-wysiwyg";

import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const ReportIncident = () => {
  const { currentOrganization, generateToken } = useAuth();
  const authToken = localStorage.getItem("auth_token");
  const [residentlists, setResidentlist] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
  }, []);

  const requestBlotter = (values) => {
    axios
      .post("/api/blotter_request/request-blotter", values, generateToken()[1])
      .then((response) => {
        message.destroy();
        console.log(response.data);
        if (response.data == "Success") {
          return message.success("Create Request Blotter");
        } else {
          return message.error("Error, please try again.");
        }
      })
      .catch((error) => {
        console.log(error);
        message.destroy();
        message.error("The action can't be completed, please try again.");
      });
  };

  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values)
        // values.organization_id = currentOrganization;
        // values.reporters = [values.reporters_id];
        // values.uuid = authToken;
        // values.status = "Pending";
        // values.settlement_status = "Unscheduled";
        // requestBlotter(values);
      })
      .catch((info) => {
        message.error("Please enter all required field ");
      });
  };
  return (
    <Card>
      <Form form={form}>
        <Row gutter={16}>
          <Col>
            <Card title="Details">
              <div className="mb-2 text-justify text-justify-content-center">
                <i>
                  {" "}
                  <label>
                    ENTER IN DETAIL THE NARRATIVE OF THE INCIDENT OR EVENT,
                    ANSWERING THE WHO, WHAT, WHEN, WHERE, WHY, AND HOW OF REPORTING.
                  </label>
                </i>
              </div>
              <Form.Item
                name="subject"
                labelCol={{ span: 24 }}
              >
                <Input placeholder="Subject (Optional)" />
              </Form.Item>
              <Form.Item
                name="narrative"
              >
                <Input placeholder="Narrative Report" />
              </Form.Item>
            </Card>
          </Col>
        </Row>

        <Button type="primary" onClick={() => onFinish()} htmlType="submit">
          Request Blotter
        </Button>
      </Form>
    </Card>
  );
};

export default ReportIncident;
