import React, { Component } from 'react'
import { Form, Button, Input, Row, Col, message, Card } from 'antd';

export class ChangePassword extends Component {


	changePasswordFormRef = React.createRef();

	onFinish = () => {
		message.success({ content: 'Password Changed!', duration: 2 });
		this.onReset()
	};

	onReset = () => {
		this.changePasswordFormRef.current.resetFields();
	};

	render() {

		return (
			<Card className="setting-content">
				<h2 className="mb-4">Change Password</h2>
				<Row >
					<Col xs={24} sm={24} md={24} lg={24}>
						<Form
							name="changePasswordForm"
							layout="vertical"
							ref={this.changePasswordFormRef}
							onFinish={this.onFinish}
						>
							<Form.Item
								label="Current Password"
								name="currentPassword"
								rules={[{
									required: true,
									message: 'Please enter your currrent password!'
								}]}
							>
								<Input.Password />
							</Form.Item>
							<Form.Item
								label="New Password"
								name="newPassword"
								rules={[{
									required: true,
									message: 'Please enter your new password!'
								}]}
							>
								<Input.Password />
							</Form.Item>
							<Form.Item
								label="Confirm Password"
								name="confirmPassword"
								rules={
									[
										{
											required: true,
											message: 'Please confirm your password!'
										},
										({ getFieldValue }) => ({
											validator(rule, value) {
												if (!value || getFieldValue('newPassword') === value) {
													return Promise.resolve();
												}
												return Promise.reject('Password not matched!');
											},
										}),
									]
								}
							>
								<Input.Password />
							</Form.Item>
							<div class="text-right">
								<Button type="primary" htmlType="submit">
									Change password
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			</Card>
		)
	}
}

export default ChangePassword
