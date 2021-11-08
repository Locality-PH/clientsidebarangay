import React from 'react'
import { Row, Col, Card, Avatar, Button } from 'antd';
import { Icon } from 'components/util-components/Icon'
import { 
	GlobalOutlined,
	MailOutlined,
	HomeOutlined,
	PhoneOutlined
} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'

import {Link} from "react-router-dom";

const Header = ({name, avatarSize, quote, email, phoneNumber, address, website}) => {
	return (
			<>
				<Card>
					<Row justify="center"> 
						<Col sm={24} md={23}>
							<div className="d-md-flex">
								{/* <div className="rounded p-2 bg-white shadow-sm mx-auto" style={{'marginTop': '-3.5rem', 'maxWidth': `${props.avatarSize + 16}px`}}>
									<Avatar shape="square" size={props.avatarSize} src="/img/barangay/caniogan/BarangayProfile.jpg" />
								</div> */}
								<div style={{'marginTop': '-3.5rem', 'maxWidth': `${avatarSize + 16}px`}}>
									<Avatar shape="round" size={avatarSize} src="/img/barangay/caniogan/BarangayProfile.jpg" />
								</div>
								<div className="ml-md-4 w-100">
									<Flex alignItems="center" mobileFlex={false} className="mb-3 text-md-left text-center">
										<h2 className="mb-0 mt-md-0 mt-2">Barangay {name}</h2>
										<div className="ml-md-3 mt-3 mt-md-0">
											<Link to={`/app/dashboards/barangay/${name}`}>
												<Button size="small" type="primary">Home</Button>
											</Link>
											
											<Button size="small" type="primary" className="ml-2">Blotter</Button>
											<Button size="small" className="ml-2">Message</Button>
										</div>
									</Flex>
									<Row gutter="16"> 
										<Col sm={24} md={8}>
											<p className="mt-0 mr-3 text-muted text-md-left text-center">{quote}</p>
										</Col>
										<Col xs={24} sm={24} md={8}>
											<Row className="mb-2"> 
												<Col xs={12} sm={12} md={9}>
													<Icon type={MailOutlined} className="text-primary font-size-md"/>
													<span className="text-muted ml-2">Email:</span>
												</Col>
												<Col xs={12} sm={12} md={15}>
													<span className="font-weight-semibold">{email}</span>
												</Col>
											</Row>
											<Row> 
												<Col xs={12} sm={12} md={9}>
													<Icon type={PhoneOutlined} className="text-primary font-size-md"/>
													<span className="text-muted ml-2">Phone:</span>
												</Col>
												<Col xs={12} sm={12} md={15}>
													<span className="font-weight-semibold">{phoneNumber}</span>
												</Col>
											</Row>
										</Col>
										<Col xs={24} sm={24} md={8}>
											<Row className="mb-2 mt-2 mt-md-0 "> 
												<Col xs={12} sm={12} md={9}>
													<Icon type={HomeOutlined} className="text-primary font-size-md"/>
													<span className="text-muted ml-2">Address:</span>
												</Col>
												<Col xs={12} sm={12} md={15}>
													<span className="font-weight-semibold">{address}</span>
												</Col>
											</Row>
											<Row className="mb-2"> 
												<Col xs={12} sm={12} md={9}>
													<Icon type={GlobalOutlined} className="text-primary font-size-md"/>
													<span className="text-muted ml-2">Website:</span>
												</Col>
												<Col xs={12} sm={12} md={15}>
													<span className="font-weight-semibold">{website}</span>
												</Col>
											</Row>
										</Col>
									</Row>
								</div>
							</div>
						</Col>
					</Row>
				</Card>
			</>
		)
}

export default Header;
