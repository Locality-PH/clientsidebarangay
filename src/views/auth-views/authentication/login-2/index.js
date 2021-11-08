import React from 'react';

//Icons
import { FaFacebook, FaInstagram, FaTwitterSquare, FaFacebookMessenger } from 'react-icons/fa';

//Components
import LoginForm from 'views/auth-views/components/client-form/LoginForm';

//CSS
import './index.css';

//Hooks
import { Row, Col, Card, Space, Layout, Divider } from "antd";
import { useSelector } from 'react-redux';

const { Header, Content, Footer } = Layout;

//Const
const backgroundURL = '/img/others/office_bg.jpg'
const navbarBgURL = 'https://png.pngtree.com/thumb_back/fw800/background/20190220/ourmid/pngtree-blue-gradient-summer-creative-image_9270.jpg'
const loginImgURL = 'https://media.istockphoto.com/vectors/register-account-submit-access-login-password-username-internet-vector-id1281150061?b=1&k=20&m=1281150061&s=612x612&w=0&h=Wlus0AvwwVksa9X5w1RUyp1pu8_vbpVOdw25FLBEG_s='

const navbarStyle = {
	backgroundImage: `url(${navbarBgURL})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	padding: "0px 300px"
}

const loginStyle = {
	backgroundImage: `url(${loginImgURL})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
}

const LoginTwo = props => {
	const theme = useSelector(state => state.theme.currentTheme)

	return (

		<div style={{ height: "100vh" }}>
			<Row className="container" justify='center' align="middle" >

				<Card className="login-card">
					<Row >
						<Col xl={12} className="col-login-left" style={{ backgroundImage: `url(${loginImgURL})` }}>


						</Col>

						<Col xl={12} span={24} style={{ padding: "20px 20px 0px 20px" }} className="login_right">
							<LoginForm />
						</Col>
					</Row>

				</Card>

			</Row>

			<div className="footer">
				<Row className="w-100 h-100" justify='center' align="middle" style={{padding: "15px 10px"}}>
					<Space className="footer-content"direction="vertical" >
						<Space>
							<FaFacebook size="2em" color="black" />
							<FaInstagram size="2em" color="black" />
							<FaTwitterSquare size="2em" color="black" />
						</Space>
						<Space size={[0, 2]} split={<Divider type="vertical" />} wrap="true" style={{justifyContent: "center"}}>
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

	)
}

export default LoginTwo
