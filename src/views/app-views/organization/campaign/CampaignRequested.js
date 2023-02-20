import { React, useState, useEffect, createRef } from 'react'
import { Row, Col, Tag, message, Card, Empty } from 'antd';
import { CampaignListData } from '.././BarangayData';
import ShowMoreText from "react-show-more-text";
import { ClockCircleOutlined } from '@ant-design/icons';
import { useAuth } from "contexts/AuthContext";
import axios from 'axios'
import moment from 'moment'
import utils from 'utils';
import Flex from 'components/shared-components/Flex';

const ItemHeader = ({ name, type }) => (
	<div>
		<h4 className="mb-0">{name}</h4>
		<span className="text-muted">{type} - Pending</span>
	</div>
)

const ItemInfo = ({ starting_date }) => {
	return <Flex alignItems="center">
		<div className="mr-1">
			<span className="text-muted">Starting at</span>
		</div>

		<div>
			<ClockCircleOutlined />
			<span className="ml-2 font-weight-semibold">{new Date(starting_date).toLocaleDateString('en-US')}</span>
		</div>
	</Flex>
}


const CampaignRequested = ({ organizationId }) => {
	//for api
	const source = axios.CancelToken.source();
	const cancelToken = source.token;
	const { generateToken } = useAuth();


	//useState
	const [campaigns, setCampaigns] = useState([])
	const [loading, setLoading] = useState({})
	const [pageSetup, setPageSetup] = useState({ page: 1, pageSize: 2, landingPage: "suggestion", })
	const [list, setList] = useState(CampaignListData);

	//useEffect
	useEffect(() => {
		getLatestCampaign()
	}, [pageSetup])

	//axios
	const getLatestCampaign = async () => {
		const { page, pageSize, landingPage } = pageSetup

		await axios.get(
			`/api/campaign/latest?page=${page}&pageSize=${pageSize}&landingPage=${landingPage}&orgId=${organizationId}`,
			generateToken()[1],
			{ cancelToken })
			.then(
				(res) => {
					var data = res.data
					data.map((data) => data.starting_date = moment(new Date(data.starting_date)))
					setCampaigns([...campaigns, ...data])
					console.log("data", data)
					// if (data.length == 0) setHasMore(false)
				})
			.catch((error) => {
				handleError(error)
			})
	}

	const handleError = (error) => {
		message.error("There is a problem with uploading the data!!!")
		console.log("error", error)
	}
	const getColor = (status) => {
		switch (status) {
			case "Approved":
				return "success"
			case "Pending":
				return "processing"
			case "Rejected":
				return "error"
			default:
				break;
		}
	}

	return (
		<>
			<Row gutter={16}>
				{campaigns.length <= 0 &&

					<Col xs={24} sm={24} md={24}>
						<Card>
							<Empty description="You currenlty don't have any suggestion" />
						</Card>
					</Col>
				}

				{campaigns.map((campaign, i) => (
					<Col xs={24} sm={24} md={24} key={i}>
						<Card>
							<Flex alignItems="center" justifyContent="between">
								<div>
									<h1>Title: {campaign.title}</h1>
									<ItemInfo
										starting_date={campaign.starting_date}
									/>
									<span>Category: {campaign.category}</span>

								</div>
								<div>
									<Tag color={getColor(campaign.status)} style={{fontSize: 15}}>{campaign.status}</Tag>
								</div>
								
							</Flex>
							<div className="mt-2">
								<p style={{ fontWeight: "bolder" }}>
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
										{campaign.description}
									</ShowMoreText>
								</p>
							</div>
						</Card>
					</Col>
				))}
			</Row>
		</>
	)
}

export default CampaignRequested
