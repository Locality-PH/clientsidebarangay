import React, { Component } from 'react'

import { Form, Button, Input, Row, Col, message, Tabs, Card } from 'antd';
const { TabPane } = Tabs;

export class Removal extends Component {
    render() {
        return (

            <Card className="setting-content">
                <Tabs defaultActiveKey="1" size={'large'}>
                    <TabPane tab="Deactivate" key="1">
                        <h1>Deactivate Account</h1>
                        <p>Your account will be temporarly deleted. You can activate your account again by loggging in.</p>
                        <Form
                            layout="vertical">
                            <Form.Item
                                name="action"
                                rules={[{ required: true, message: 'Fill this up!' }]}
                                label="Type 'Deactivate Account'"

                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Type in your password!' }]}
                                label="Enter password to confirm action"
                            >
                                <label className="form-label">  </label>
                                <Input.Password />
                            </Form.Item>

                            <div className="text-right">
                                <Button type="primary" htmlType="submit">
                                    Deactivate Account
                                </Button>
                            </div>
                        </Form>
                    </TabPane>
                    <TabPane tab="Delete" key="2">
                        <h1>Delete Account</h1>
                        <p>Your account will permanently deleted. Your account cannot be recovered after deletion.</p>
                        <Form
                            layout="vertical">
                            <Form.Item
                                name="action"
                                rules={[{ required: true, message: 'Fill this up!' }]}
                                label="Type 'Delete Account':"

                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Type in your password!' }]}
                                label="Enter password to confirm action"
                            >
                                <Input.Password />
                            </Form.Item>

                            <div className="text-right">
                                <Button type="primary" htmlType="submit" >
                                    Delete Account
                                </Button>
                            </div>
                        </Form>
                    </TabPane>
                </Tabs>
            </Card>
        )
    }
}

export default Removal
