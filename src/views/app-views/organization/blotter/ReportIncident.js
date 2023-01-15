import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, message, Col, Row, Tabs, Select, TimePicker, DatePicker, } from "antd";
import Flex from "components/shared-components/Flex";
import { Editor } from "react-draft-wysiwyg";
const { TabPane } = Tabs;
import moment from "moment";

import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const current = new Date();
const dateFormat = "YYYY/MM/DD";

const ReportIncident = () => {
  const { currentOrganization, generateToken } = useAuth();
  const authToken = localStorage.getItem("auth_token");

  const [selectVictim, setSelectVictim] = useState([]);
  const [selectSuspect, setSelectSuspect] = useState([]);
  const [selectRespondent, setSelectRespondent] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    console.log("Current Organization ", currentOrganization)
  }, []);

  const requestBlotter = (values) => {
    axios
      .post("/api/blotter_request/request-blotter", values, generateToken()[1])
      .then((response) => {
        message.destroy();
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
        values.organization_id = currentOrganization;
        values.uuid = authToken;
        values.settlement_status = "Unscheduled";
        values.status = "Pending";

        values.reporters = [];
        values.victims = [];
        values.suspects = [];
        values.respondents = [];

        values.victimsInvolve = selectVictim;
        values.suspectsInvolve = selectSuspect;
        values.respondentsInvolve = selectRespondent;

        console.log(values)

        requestBlotter(values);
      })
      .catch((info) => {
        message.error("Please enter all required field ");
      });
  };

  const onChangeVictim = (value) => {
    setSelectVictim(value);
  };

  const onChangeSuspect = (value) => {
    setSelectSuspect(value);
  };

  const onChangeRespondent = (value) => {
    setSelectRespondent(value);
  };

  const Involve = (name, data, onChangeData) => {
    return (
      <Card title={name}>
        <div>
          <span className="text-muted">
            You can have multiple victim separated by coma (,) after the name of the victim.
          </span>
        </div>

        <Col className="form-input-mb" xs={24} sm={24} md={13}>
          <Select
            defaultValue={data}
            onChange={onChangeData}
            tokenSeparators={[","]}
            mode="tags"
            className="mt-2 w-100"
          >
            {data.map((elm) => (
              <Option key={elm} value={elm}>
                {elm}
              </Option>
            ))}
          </Select>
        </Col>
      </Card>)
  }

  return (
    <Card>
      <Form form={form}>
        <Row gutter={16}>
          <Col>
            <div className="container">
              <Tabs defaultActiveKey="1">
                <TabPane tab="People Involve" key="1">
                  {/* <Card title="Reporter Information">
                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={12}>
                        <Form.Item
                          name="lastname"
                          label="Last Name"
                        >
                          <Input placeholder="Last Name" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12}>
                        <Form.Item
                          name="firstname"
                          label="First Name"
                        >
                          <Input placeholder="First Name" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12}>
                        <Form.Item
                          name="middlename"
                          label="Middle Name"
                        >
                          <Input placeholder="Middle Name" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12}>
                        <Form.Item name="alias" label="Alias">
                          <Input placeholder="Alias" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card> */}

                  <Card title="Victims">
                    <div>
                      <span className="text-muted">
                        You can have multiple victim separated by coma (,) after the name of the victim.
                      </span>
                    </div>

                    <Col className="form-input-mb" xs={24} sm={24} md={13}>
                      <Select
                        defaultValue={selectVictim}
                        onChange={onChangeVictim}
                        tokenSeparators={[","]}
                        mode="tags"
                        className="mt-2 w-100"
                      >
                        {selectVictim.map((elm) => (
                          <Option key={elm} value={elm}>
                            {elm}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                  </Card>

                  <Card title="Suspects">
                    <div>
                      <span className="text-muted">
                        You can have multiple suspect separated by coma (,) after the name of the suspect.
                      </span>
                    </div>

                    <Col className="form-input-mb" xs={24} sm={24} md={13}>
                      <Select
                        defaultValue={selectSuspect}
                        onChange={onChangeSuspect}
                        tokenSeparators={[","]}
                        mode="tags"
                        className="mt-2 w-100"
                      >
                        {selectSuspect.map((elm) => (
                          <Option key={elm} value={elm}>
                            {elm}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                  </Card>

                  <Card title="Respondents">
                    <div>
                      <span className="text-muted">
                        You can have multiple respondent separated by coma (,) after the name of the respondent.
                      </span>
                    </div>

                    <Col className="form-input-mb" xs={24} sm={24} md={13}>
                      <Select
                        defaultValue={selectRespondent}
                        onChange={onChangeRespondent}
                        tokenSeparators={[","]}
                        mode="tags"
                        className="mt-2 w-100"
                      >
                        {selectRespondent.map((elm) => (
                          <Option key={elm} value={elm}>
                            {elm}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                  </Card>

                  {/* <Involve name="Victims" data={selectVictim} onChangeData={onChangeVictim} /> */}
                  {/* <Involve name="Suspects" data={selectSuspect} onChangeData={onChangeSuspect} />
                  <Involve name="Respondents" data={selectRespondent} onChangeData={onChangeRespondent} /> */}

                </TabPane>
                <TabPane tab="Narrative Report" key="2">
                  <Card>
                    <Row>
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
                    </Row>

                    <Row>
                      <Form.Item
                        name="narrative"
                      >
                        <Input placeholder="Narrative" />
                      </Form.Item>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Item
                          name="incident_type"
                          label="Type of Incident"
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="Incident Type" />
                        </Form.Item>
                      </Col>

                      <Col>
                        <Form.Item
                          name="time_of_incident"
                          label="Time occured"
                          rules={[{ required: true }]}
                        >
                          <TimePicker
                            className="w-100"
                            values={moment("12:08:23", "HH:mm:ss")}

                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Form.Item
                          name="date_of_incident"
                          label="Date of Incident"
                          rules={[{ required: true }]}>
                          <DatePicker
                            className="w-100"
                            initialValues={moment(
                              `${current.getFullYear()}/${current.getMonth() + 1
                              }/${current.getDate()}`,
                              dateFormat
                            )}
                            format={dateFormat}
                          />
                        </Form.Item>
                      </Col>

                      <Col>
                        <Form.Item
                          name="place_incident"
                          label="Place of Incident"
                          rules={[{ required: true }]}>
                          <Input placeholder="Place of incident" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </TabPane>
              </Tabs>
            </div>
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
