import { React } from 'react'
import { Row, Col, Tag, Card, Empty, Button, Spin, Divider } from 'antd';
import ShowMoreText from "react-show-more-text";
import { LoadingOutlined, ClockCircleOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex';
import InfiniteScroll from "react-infinite-scroll-component";
import SuggestedCampaignList from 'components/shared-components/CampaignSuggestedList';

const CampaignRequested = (props) => {
	const { campaigns, loading, pageSetup, setPageSetup, hasMore } = props

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

	const handleLoadMore = () => {
		setPageSetup({ ...pageSetup, page: pageSetup.page + 1 })
	}

	return (
		<Row gutter={16} className="w-100">
			{campaigns.length <= 0 ?

				<Col span={24}>
					<Card loading={loading}>
						<Empty description="You currenlty don't have any suggestion" />
					</Card>
				</Col>

				:

				<Col span={24}>
					<Card title="Your suggested Campaigns">
						{campaigns.map((campaign, i) => {
							return (
								<div key={i}>
									<Divider
										className="divider-margin"
										style={{ margin: "0px !important" }}
									/>
									<SuggestedCampaignList
										startDate={new Date(campaign?.starting_date)}
										profile={
											campaign && campaign.images && campaign.images[0]
												? campaign.images[0].data
												: undefined
										}
										title={campaign?.title}
										address={campaign?.organization?.address}
										name={campaign?.organization?.organization_name}
										orgId={campaign?.organization?.organization_id}
										id={campaign?.organization?.organization_id}
										campaign_id={campaign?._id}
										status={campaign?.status}
									/>
								</div>
							);
						})}
					</Card>
				</Col>
			}




			<Col justify="center" className="text-center" sm={24} md={24}>
				{!loading ?
					<>
						{hasMore ?
							<Button onClick={handleLoadMore}>Load more</Button>
							:
							<h4>You have seen it all!!"</h4>
						}
					</>

					:

					<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
				}
			</Col>


		</Row>
	)
}

export default CampaignRequested
