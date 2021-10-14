import React from 'react'
import LoginForm from '../../components/LoginForm'
import { Row, Col } from "antd";
import { useSelector } from 'react-redux';

const backgroundURL = '/img/others/office_bg.jpg'
const backgroundStyle = {
	backgroundImage: `url(${backgroundURL})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	height: '80%',
}

const LoginTwo = props => {
	const theme = useSelector(state => state.theme.currentTheme)

	return (
		<div className={`h-100 ${theme === 'light' ? 'bg-white' : ''}`}>

			<div className="" style={backgroundStyle}>
			</div>

			<Row style={{height: '80%', backgroundColor: 'black'}}>

			</Row>



		</div>
	)
}

export default LoginTwo
