import { React } from 'react'
import { Row, Col, Tag, Card, Empty } from 'antd';
import ShowMoreText from "react-show-more-text";
import { ClockCircleOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex';
import InfiniteScroll from "react-infinite-scroll-component";

const CampaignRequested = (props) => {
	const { campaigns, loading, pageSetup, setPageSetup, hasMore} = props

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
		<InfiniteScroll
			dataLength={campaigns.length - 1} 
			next={() => handleLoadMore()}
			hasMore={hasMore}
			loader={
				<Row gutter={16} align="center" className="w-100">
					<Col xs={22} sm={22} md={22} lg={18} xl={18} xxl={14}>
						<Card loading={true} />
					</Col>
				</Row>

			}
			endMessage={
				<p style={{ textAlign: 'center' }}>
					<b>Yay! You have seen it all</b>
				</p>
			}
		>
			<Row gutter={16} className="w-100">
				{campaigns.length <= 0 &&

					<Col xs={24} sm={24} md={24}>
						<Card loading={loading}>
							<Empty description="You currenlty don't have any suggestion" />
						</Card>
					</Col>
				}

				{campaigns.map((campaign, i) => (
					<Col xs={24} sm={24} md={24} key={i}>
						<Card>
							<Flex alignItems="center" justifyContent="between">
								<div>
									<h1>{campaign.title}</h1>
									<ItemInfo
										starting_date={campaign.starting_date}
									/>
									<span>Category: {campaign.category}</span>

								</div>
								<div>
									<Tag color={getColor(campaign.status)} style={{ fontSize: 15 }}>{campaign.status}</Tag>
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
		</InfiniteScroll>
	)
}

export default CampaignRequested
