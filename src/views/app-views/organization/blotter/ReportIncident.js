import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, message, Col, Row, Tabs, Select, TimePicker, DatePicker, Space } from "antd";
const { Option } = Select;
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;
import Flex from "components/shared-components/Flex";
import { Editor } from "react-draft-wysiwyg";
const { TabPane } = Tabs;
import moment from "moment";

import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const current = new Date();
const dateFormat = "YYYY/MM/DD";

const ReportIncident = ({ organizationId }) => {
	const { currentOrganization, generateToken } = useAuth();
	const authToken = localStorage.getItem("auth_token");

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
					message.destroy();
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
				message.loading("Requesting...")

				values.organization_id = organizationId;
				values.uuid = authToken;
				values.settlement_status = "Unscheduled";
				values.status = "Pending";

				values.reporters = [];
				values.victims = [];
				values.suspects = [];
				values.respondents = [];

				console.log(values)
				requestBlotter(values);
			})
			.catch((info) => {
				message.error("Please enter all required field ");
			});
	};

	const Involve = ({ title, itemName }) => {
		return (
			<Card title={title}>
				<Form.List name={itemName}>
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }) => (
								<div
									style={{ marginBottom: "2rem" }}
									key={key}
								>

									<Card title="Resident Information">
										<Row gutter="16">
											<Col xs={24} sm={24} md={12}>
												<Form.Item
													{...restField}
													name={[name, 'lastname']}
													rules={[
														{
															required: true,
															message: 'Missing last name',
														},
													]}
												>
													<Input placeholder="Last Name" />
												</Form.Item>
											</Col>

											<Col xs={24} sm={24} md={12}>
												<Form.Item
													{...restField}
													name={[name, 'firstname']}
													rules={[
														{
															required: true,
															message: 'Missing first name',
														},
													]}
												>
													<Input placeholder="First Name" />
												</Form.Item>
											</Col>

											<Col xs={24} sm={24} md={12}>
												<Form.Item
													{...restField}
													name={[name, 'middlename']}
													rules={[
														{
															required: true,
															message: 'Missing middle name',
														},
													]}
												>
													<Input placeholder="Middle Name" />
												</Form.Item>
											</Col>

											<Col xs={24} sm={24} md={12}>
												<Form.Item
													{...restField}
													name={[name, 'alias']}
													rules={[
														{
															required: true,
															message: 'Missing alias',
														},
													]}
												>
													<Input placeholder="Alias" />
												</Form.Item>
											</Col>

										</Row>
									</Card>

									<Card title="Address">
										<Row>
											<Col span="24">
												<Form.Item
													{...restField}
													name={[name, 'address_1']}
													rules={[
														{
															required: true,
															message: 'Missing address_1',
														},
													]}
												>
													<Input placeholder="Address 1" />
												</Form.Item>
											</Col>
										</Row>

										<Row>
											<Col span="24">
												<Form.Item
													{...restField}
													name={[name, 'address_2']}
												// rules={[
												// {
												// required: true,
												// message: 'Missing address_2',
												// },
												// ]}
												>
													<Input placeholder="Address 2" />
												</Form.Item>
											</Col>
										</Row>

										<Row>
											<Col span="24">
												<Form.Item
													{...restField}
													name={[name, 'area']}
													rules={[
														{
															required: true,
															message: 'Missing area',
														},
													]}
												>
													<Select className="w-100" placeholder="Area/Purok">
														<Option key="1" value="Purok 1">Purok 1</Option>
														<Option key="2" value="Purok 2">Purok 2</Option>
														<Option key="3" value="Purok 3">Purok 3</Option>
													</Select>
												</Form.Item>
											</Col>
										</Row>
									</Card>


									<Button type="primary" onClick={() => remove(name)} >Remove</Button>
								</div>
							))}
							<Form.Item>
								<Button onClick={() => add()} block icon={<PlusOutlined />}>
									Add field
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
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
									<Involve title="Victims" itemName="victimsInvolve" />
									<Involve title="Suspects" itemName="suspectsInvolve" />
									<Involve title="Respondents" itemName="respondentsInvolve" />
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
											<Col span="24">
												<Form.Item
													name="subject"
												>
													<TextArea placeholder="Subject (Optional)" />
												</Form.Item>
											</Col>
										</Row>

										<Row>
											<Col span="24">
												<Form.Item
													name="narrative"
												>
													<TextArea placeholder="Narrative" />
												</Form.Item>
											</Col>
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

									<Button type="primary" onClick={() => onFinish()} htmlType="submit">
										Request Blotter
									</Button>
								</TabPane>
							</Tabs>
						</div>
					</Col>
				</Row>


			</Form>
		</Card>
	);
};

export default ReportIncident;
