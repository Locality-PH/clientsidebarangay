import React, { useState, useEffect } from "react"
import axios from "axios";
import { useAuth } from "contexts/AuthContext";
import { Col, Row, Skeleton, Card, Modal, Button, message, Dropdown, Menu, Typography } from "antd";
const { Meta } = Card;
const { Text } = Typography;

import {
	EllipsisOutlined,
	DeleteOutlined,
	CloudDownloadOutlined,
	QuestionCircleOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";

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
							<Card title={
								<>
									<Text type="secondary">{val.incident_type}</Text>
									<br></br>
									<Text mark>{val.status}</Text>
								</>
							}
								style={{ margin: "5px 5px", height: "40rem" }} extra={<DropdownMenu _id={val._id} />}>
								<h4>Blotter report from {val.organization_id.organization_name}</h4>
								<p>Date of incident: {new Date(val.date_of_incident).toDateString()}</p>
								<p>Date of reported: {new Date(val.createdAt).toDateString()}</p>
								<br></br>
								<p>Narrative Report: </p>
								<div style={{ height: "22rem", overflow: "hidden", padding: "0.5rem" }}>
									{val.narrative != null ? val.narrative.blocks[0].text : ""}
								</div>
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
