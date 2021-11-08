import React from 'react'

//Icons
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaInstagram, FaTwitterSquare, FaFacebookMessenger } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';

//Components
import LoginFormTest from '../../components/LoginForm.js';

//CSS
import './index.css';

//Hooks
import { Row, Col, Card, Space, Layout, Menu, Breadcrumb, Button, Divider } from "antd";
import { useSelector } from 'react-redux';

const { Header, Content, Footer } = Layout;

function admin_login() {
	return (

		<div style={{ height: "100vh" }}>
			<Row className="container h-100" justify='center' align="middle" >
				<Card className="login-card" 
					cover={
						<img
							alt="example"
							src="https://xrc.bomboradyo.com/iloilo/2021/05/official-1.jpg"

							style={{ height: "200px" }}

						/>
					}

				>
					<LoginFormTest />
				</Card>
			</Row>

		</div>

	)
}

export default admin_login
