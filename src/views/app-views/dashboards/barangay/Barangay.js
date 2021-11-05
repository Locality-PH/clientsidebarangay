import React, { Component } from 'react'
import { Row, Col, Card, Avatar, Button, Typography } from 'antd';
import { Icon } from 'components/util-components/Icon'
import { employementList, interestedList, connectionList, groupList } from '../../pages/profile/profileData';
import { 
	GlobalOutlined,
	MailOutlined,
	HomeOutlined,
	PhoneOutlined
} from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'

const { Text, Link } = Typography;

const ProfileInfo = props => (
	<Card>
		<Row justify="center"> 
			<Col sm={24} md={23}>
				<div className="d-md-flex">
					{/* <div className="rounded p-2 bg-white shadow-sm mx-auto" style={{'marginTop': '-3.5rem', 'maxWidth': `${props.avatarSize + 16}px`}}>
						<Avatar shape="square" size={props.avatarSize} src="/img/barangay/caniogan/BarangayProfile.jpg" />
					</div> */}
                    <div style={{'marginTop': '-3.5rem', 'maxWidth': `${props.avatarSize + 16}px`}}>
						<Avatar shape="round" size={props.avatarSize} src="/img/barangay/caniogan/BarangayProfile.jpg" />
					</div>
					<div className="ml-md-4 w-100">
						<Flex alignItems="center" mobileFlex={false} className="mb-3 text-md-left text-center">
							<h2 className="mb-0 mt-md-0 mt-2">Barangay {props.name}</h2>
							<div className="ml-md-3 mt-3 mt-md-0">
								<Button size="small" type="primary">Recident</Button>
                                <Button size="small" type="primary" className="ml-2">Blotter</Button>
								<Button size="small" className="ml-2">Message</Button>
							</div>
						</Flex>
						<Row gutter="16"> 
							<Col sm={24} md={8}>
								<p className="mt-0 mr-3 text-muted text-md-left text-center">
                                    We rise and fall as one people, one nation.
								</p>
							</Col>
							<Col xs={24} sm={24} md={8}>
								<Row className="mb-2"> 
									<Col xs={12} sm={12} md={9}>
										<Icon type={MailOutlined} className="text-primary font-size-md"/>
										<span className="text-muted ml-2">Email:</span>
									</Col>
									<Col xs={12} sm={12} md={15}>
										<span className="font-weight-semibold">ellarbae@coolmail.io</span>
									</Col>
								</Row>
								<Row> 
									<Col xs={12} sm={12} md={9}>
										<Icon type={PhoneOutlined} className="text-primary font-size-md"/>
										<span className="text-muted ml-2">Phone:</span>
									</Col>
									<Col xs={12} sm={12} md={15}>
										<span className="font-weight-semibold">+12 123 1234</span>
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
										<span className="font-weight-semibold">Los Angeles, CA</span>
									</Col>
								</Row>
								<Row className="mb-2"> 
									<Col xs={12} sm={12} md={9}>
										<Icon type={GlobalOutlined} className="text-primary font-size-md"/>
										<span className="text-muted ml-2">Website:</span>
									</Col>
									<Col xs={12} sm={12} md={15}>
										<span className="font-weight-semibold">ellarbae.io</span>
									</Col>
								</Row>
							</Col>
						</Row>
					</div>
				</div>
			</Col>
		</Row>
	</Card>
)

const Experiences = () => (
	<Card title="Projects">
		<div className="mb-3">
			<Row>
				<Col sm={24} md={22}>
					{employementList.map((elm, i) => {
						return (
							<div className={`${i === (employementList.length - 1)? '' : 'mb-4'}`} key={`eduction-${i}`}>
								<AvatarStatus src={elm.img} name={elm.title} subTitle={elm.duration}/>
								<p className="pl-5 mt-2 mb-0">{elm.desc}</p>
							</div>
						)
					})}
				</Col>
			</Row>
		</div>
	</Card>
)

const Interested = () => (
	<Card title="Interested">
		<Row gutter={30}>
			<Col sm={24} md={12}>
				{interestedList.filter((_, i) => i < 4).map((elm, i) => {
					return (
						<div className="mb-3" key={`interested-${i}`}>
							<h4 className="font-weight-semibold">{elm.title}</h4>
							<p>{elm.desc}</p>
						</div>
					)
				})}
			</Col>
			<Col sm={24} md={12}>
				{interestedList.filter((_, i) => i >= 4).map((elm, i) => {
					return (
						<div className="mb-3" key={`interested-${i}`}>
							<h4 className="font-weight-semibold">{elm.title}</h4>
							<p>{elm.desc}</p>
						</div>
					)
				})}
			</Col>
		</Row>
	</Card>
)

const Connection = () => (
	<Card title="Barangay Officials 2019-2021">
		{
			connectionList.map((elm, i) => {
				return (
					<div className={`${i === (connectionList.length - 1)? '' : 'mb-4'}`} key={`connection-${i}`}>
						<AvatarStatus src={elm.img} name={elm.name} subTitle={elm.title}/>
					</div>
				)
			}) 
		}
	</Card>
)

const Group = () => (
	<Card title="Upcoming Events">
		{
			groupList.map((elm, i) => {
				return (
					<div className={`${i === (groupList.length - 1)? '' : 'mb-4'}`} key={`connection-${i}`}>
						<AvatarStatus src={elm.img} name={elm.name} subTitle={elm.desc}/>
					</div>
				)
			}) 
		}
	</Card>
)

export const Barangay = props => {
	const { name, suffix, subTitle, id, type, src, icon, size, shape, gap, text} = props
    const avatarSize = 150
	return (
			<>
				<PageHeaderAlt background="/img/others/img-12.jpg" cssClass="bg-primary" overlap>
					<div className="container text-center">
						<div className="py-5 my-md-5">
						</div>
					</div>
				</PageHeaderAlt>
				<div className="container my-4">
					<ProfileInfo avatarSize={avatarSize} name={name}/>
					<Row gutter="16">
						<Col xs={24} sm={24} md={8}>
							<Connection />
							<Group />
                            <Card title="About">
                                <Text className="h4">The Philippines is one of the world’s largest archipelago nations. It is situated in Southeast Asia in the Western Pacific Ocean. Its islands are classified into three main geographical areas – Luzon, Visayas, and Mindanao. Because of its archipelagic nature, Philippines is a culturally diverse country. With its topography consisting of mountainous terrains, dense forests, plains, and coastal areas.</Text>
                                <div className="mt-3">
                                    <Button type="primary" shape="round" style={{width: "100%", height: "3rem"}}>Learn More</Button>
                                </div>
                            </Card>
						</Col>
						<Col xs={24} sm={24} md={16}>
							<Experiences />
							<Interested />
                            <Card>
                                <img
                                        width="100%"
                                        alt="logo"
                                        src="/img/barangay/caniogan/BarangayCover.jpg"
                                        style={{borderRadius: "1rem 1rem"}}
                                />
                            </Card>
                            
						</Col>
					</Row> 
				</div>
			</>
		)
	}


export default Barangay
