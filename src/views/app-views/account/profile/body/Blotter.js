import React, { useState, useEffect } from "react"
import axios from "axios";
import { useAuth } from "contexts/AuthContext";
import CommentSection from "components/shared-components/CommentSection";
import { Col, Row, Skeleton, Card, Modal, Button, message, Dropdown, Menu, Typography, Avatar, Space } from "antd";
const { Meta } = Card;
const { Text, Title } = Typography;
import { COLORS } from "constants/ChartConstant";
const color = ["#E1F8DC", "#FEF8DD", "#FFE7C7", "#B7E9F7", "#ADF7B6"];
import ShowMoreText from "react-show-more-text";

import {
	EllipsisOutlined,
	DeleteOutlined,
	CloudDownloadOutlined,
	QuestionCircleOutlined,
	ExclamationCircleOutlined,
	HeartOutlined, MessageOutlined, UserOutlined
} from "@ant-design/icons";
import utils from "utils";

const Blotter = () => {
	const [blotterRequest, setBlotterRequest] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const { currentUser, generateToken } = useAuth();

	useEffect(() => {
		getBlotterRequestsClient()
	}, [])


	const getBlotterRequestsClient = async () => {
		await axios
			.get("/api/blotter_request/get-blotter-request-client/" + currentUser.uid, generateToken()[1])
			.then((response) => {
				setBlotterRequest(response.data)
				setIsLoading(false);
			})
			.catch((err) => {
				message.error("Could not fetch the data in the server!");
				console.log(err);
			});
	};

	const onDelete = async (_id) => {
		message.loading("Deleting...", 0)
		await axios
			.post("/api/blotter_request/delete-blotter-request", { _ids: [_id] }, generateToken()[1])
			.then((response) => {
				message.destroy()
				message.success("Successfully deleted!")
				getBlotterRequestsClient()
			})
			.catch((err) => {
				message.destroy()
				message.error("Error");
				console.log(err);
			});
	}

	const onView = async (_id) => {
		console.log("view")
	}

	const DropdownMenu = ({ _id }) => (
		<Dropdown key="more" overlay={
			<Menu>

				<Menu.Item key="1" onClick={() => onDelete(_id)}>
					<a to={`#`}>
						{" "}
						<DeleteOutlined /> <span className="ml-2">Delete</span>{" "}
					</a>
				</Menu.Item>


			</Menu>


		} trigger={["click"]} autoFocus={true}>
			<Button
				style={{
					border: "none",
					padding: 0,
				}}
			>
				<EllipsisOutlined
					style={{
						fontSize: 20,
						verticalAlign: "top",
					}}
				/>
			</Button>
		</Dropdown>
	);


	return (
		<>
			{
				isLoading ?
					<Row>
						<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
							<Card loading={true}>
								<Meta />
							</Card>
						</Col>
						<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
							<Card loading={true}>
								<Meta />
							</Card>
						</Col>
						<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
							<Card loading={true}>
								<Meta />
							</Card>
						</Col>
						<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
							<Card loading={true}>
								<Meta />
							</Card>
						</Col>
					</Row>
					: null

			}

			<Row>
				{
					blotterRequest.map((val, i) =>

						<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8} key={i}>
							<Card
								style={{ margin: "5px 5px" }}
								title={
									<>
										<div className="d-flex">
											{
												val.organization_id.profile != null
													?
													<Avatar
														className="font-size-sm"
														icon={<UserOutlined />}
														src={val.organization_id.profile.fileUrl}
													>
														{utils.getNameInitial(val.organization_id.organization_name)}
													</Avatar>
													:
													<Avatar
														className="font-size-sm"
														style={{ backgroundColor: val.profile_color }}
													>
														{utils.getNameInitial(val.organization_id.organization_name)}
													</Avatar>
											}

											<div>
												<div className="ml-1">
													{/* <Text type="Primary">{moment(createdAt).format("LL")} </Text> */}
													<Text type="Primary">{val.incident_type} </Text>
												</div>
												<div className="ml-1" type="Primary">
													<Title level={5}>
														<div
															style={{
																color: "rgb(69, 85, 96) !important",
																marginTop: -5,
															}}
														>
															{val.status}
														</div>
													</Title>
												</div>
											</div>
										</div>
									</>
								}
								extra={<DropdownMenu _id={val._id} />}
							>
								<div style={{ background: color[Math.floor(Math.random() * color.length)], borderRadius: "1rem" }}>
									<img
										width="100%"
										alt="logo"
										src={
											`/img/blotter/${val.incident_type.replace(/\s/g, '').toLowerCase()}.png`
										}

										style={{ borderRadius: "1rem 1rem 0 0" }}
									/>

									<div style={{ padding: "1rem" }}>

										<h3>Blotter report from {val.organization_id.organization_name}</h3>
										<h5>Date of incident: {new Date(val.date_of_incident).toDateString()}</h5>
										<h5>Date reported: {new Date(val.createdAt).toDateString()}</h5>
										<h5>Place of incident: {val.place_incident}</h5>

										<h4>
											<ShowMoreText
												/* Default options */
												lines={1}
												more="Show more"
												less="Show less"
												className="content-css"
												anchorClass="my-anchor-css-className"
												expanded={false}
												truncatedEndingComponent={"... "}
											>
												Subject: {val.subject}
											</ShowMoreText>
										</h4>

										<h4>
											<ShowMoreText
												/* Default options */
												lines={3}
												more="Show more"
												less="Show less"
												className="content-css"
												anchorClass="my-anchor-css-className"
												expanded={false}
												truncatedEndingComponent={"... "}
											>
												Narrative: {val.narrative != null ? val.narrative.blocks[0].text : ""}{" "}
											</ShowMoreText>
										</h4>
									</div>
								</div>
								<>
									<hr className="hr-style" />
									<CommentSection orgId={val?.organization_id?.organization_id} generalId={val?._id} />
								</>
							</Card>
						</Col>

					)
				}

				{
					blotterRequest.length == 0 && !isLoading ? <h2>No Blotter Report</h2> : null
				}
			</Row>
		</>
	);
}

export default Blotter
