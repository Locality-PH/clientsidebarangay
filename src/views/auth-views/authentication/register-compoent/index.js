import React from 'react';

//Components
import RegisterForm from 'views/auth-views/components/client-form/RegisterForm';
import LandingFooter from 'views/auth-views/authentication/footer';

//CSS
import './index.css';

//Hooks
import { Row, Col, Card, Space, Layout, Divider } from "antd";
import { useSelector } from 'react-redux';

const { Header, Content, Footer } = Layout;

//Const
const backgroundURL = '/img/others/office_bg.jpg'
const navbarBgURL = 'https://png.pngtree.com/thumb_back/fw800/background/20190220/ourmid/pngtree-blue-gradient-summer-creative-image_9270.jpg'

const loginImgURL = 'https://img.freepik.com/free-vector/users-working-laptops-with-data-entry-big-data-services-technology-information-entry-equipment-database-update-data-management-concept-vector-isolated-illustration_335657-2149.jpg?t=st=1658713076~exp=1658713676~hmac=3239ef15c01c471621e63962bb08a856214fdba375c39ff1a75cd9dfeb7ddde3&w=1380'

const navbarStyle = {
	backgroundImage: `url(${navbarBgURL})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	padding: "0px 300px"
}

const RegisterTwo = props => {
	const theme = useSelector(state => state.theme.currentTheme)

	return (

		<div style={{ height: "100vh" }}>
			<Row className="container" justify='center' align="middle" >

				<Card className="login-card">
					<Row >

						<Col xl={12} span={24} className="login_right">
							<RegisterForm />
						</Col>

						<Col xl={12} span={0} className="col-login-left" >
							<img src={loginImgURL} alt="picture" className="photo" />

						</Col>
					</Row>

				</Card>

			</Row>

			<LandingFooter/>
		</div>

	)
}

export default RegisterTwo
