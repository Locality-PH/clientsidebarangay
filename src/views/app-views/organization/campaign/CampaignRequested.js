import React, { useState } from 'react'
import { Row, Col, Tooltip, Tag, Progress, Avatar, Menu, Card } from 'antd';
import { CampaignListData } from '.././BarangayData';
import { ClockCircleOutlined} from '@ant-design/icons';
import utils from 'utils';
import Flex from 'components/shared-components/Flex';

const ItemHeader = ({ name, type }) => (
	<div>
		<h4 className="mb-0">{name}</h4>
		<span className="text-muted">{type} - Pending</span>
	</div>
)

const ItemInfo = ({ statusColor, dayAgo }) => (
	<Flex alignItems="center">
		<div className="mr-3">
			<span className="text-muted">Created</span>
		</div>

		<div>
			<Tag className={statusColor === "none" ? 'bg-gray-lightest' : ''} color={statusColor !== "none" ? statusColor : ''}>
				<ClockCircleOutlined />
				<span className="ml-2 font-weight-semibold">{dayAgo} days ago</span>
			</Tag>
		</div>
	</Flex>
)


const CampaignRequested = () => {

	const [list, setList] = useState(CampaignListData);

	return (
		<>
			<Row gutter={16}>
				{list.map(result => (
					<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} key={result.id}>
						<Card>
							<Flex alignItems="center" justifyContent="between">
								<ItemHeader name={result.name} type={result.type} />
							</Flex>
							<div className="mt-2">
								<ItemInfo
									statusColor={result.statusColor}
									dayAgo={result.dayAgo}
								/>
							</div>
						</Card>
					</Col>
				))}
			</Row>
		</>
	)
}

export default CampaignRequested
