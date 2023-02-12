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
const registerIMG = 'https://firebasestorage.googleapis.com/v0/b/barangay-dev.appspot.com/o/img%2Fregister_background.jpg?alt=media&token=253cdd37-4a4c-4acb-ba8d-dfb6edbf36d6'

const RegisterTwo = props => {
	const theme = useSelector(state => state.theme.currentTheme)

	return (

		<div style={{ height: "100vh" }}>
			<Row className="container" justify='center' align="middle" >

				<Card className="auth-register-card">
					<Row >

						<Col xl={12} span={24} className="auth-register-right">
							<RegisterForm />
						</Col>

						<Col xl={12} span={0} className="auth-register-left" >
							<img src={registerIMG} alt="picture" className="photo" />

						</Col>
					</Row>

				</Card>

			</Row>

			<LandingFooter/>
		</div>

	)
}

export default RegisterTwo
