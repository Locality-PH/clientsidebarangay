import React from 'react';
import { Row, Col, Card, Space } from "antd";
import { useSelector } from 'react-redux';
import { PrinterOutlined, TeamOutlined, BellOutlined } from '@ant-design/icons'
import { Parallax } from 'react-parallax';

import LoginFormTest from '../../components/LoginForm.js';
import './login.css';

const backgroundURL = '/img/others/office_bg.jpg'
const backgroundDevURL = '/img/others/bg-developer.jpg'

const backgroundStyle = {
	// backgroundImage: `url(${backgroundURL})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
}

const backgroundStyle2 = {
	backgroundImage: `url(${backgroundDevURL})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	height: '100vh',
}


const cardText = {
	fontSize: '24px',
	color: 'black',
	textAlign: 'justify',
}

const image1 =
	"https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D";

const LoginTwo = props => {
	const theme = useSelector(state => state.theme.currentTheme)

	return (
		<div className={`h-100 ${theme === 'light' ? 'bg-white' : ''}`}>
			<div style={{ height: "100vh" }}>
				<Row className="container" justify='center' align="middle" >

					<Card className="login-card">
						<Row >
							<Col xl={12} className="col-login-left" style={{ backgroundImage: `url(${loginImgURL})` }}>


							</Col>

							<Col xl={12} span={24} style={{ padding: "20px 20px 0px 20px" }} className="login_right">
								<LoginFormTest />
							</Col>
						</Row>

					</Card>

				</Row>

				<div className="footer">
					<Row className="w-100" justify='center' align="middle">
						<Space direction="vertical">
							<Space>
								<FaFacebook size="2em" color="black" />
								<FaInstagram size="2em" color="black" />
								<FaTwitterSquare size="2em" color="black" />
							</Space>
							<Space split={<Divider type="vertical" />}>
								<a>About Us</a>
								<a>Contact Us</a>
								<a>Terms &#38; Condition</a>
								<a>Privacy Policy</a>
								<a>Cookie Policy</a>

							</Space>
							©2021 Barangay App | All Rights Reserve.
						</Space>
					</Row>
				</div>
			</div>
		</div>
	)
}

export default LoginTwoOld
