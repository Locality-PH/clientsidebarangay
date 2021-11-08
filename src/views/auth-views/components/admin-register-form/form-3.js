import React, { Component } from 'react'

//CSS
import './form-3.css'

//Hooks
import { Row, Col, Card, Form, Input, Tabs } from "antd";

const { TabPane } = Tabs;
const { TextArea } = Input;

function callback(key) {
    console.log(key);
}

export default class AdminRegisterForm3 extends Component {
    render() {
        return (
            <Card className="sign-up-card">
                <Tabs defaultActiveKey="1" size={'large'} onChange={callback}>
                    <TabPane tab="Join Barangay" key="1">
                        <h1>Barangay link</h1>
                        <Form>
                            <Form.Item
                                name="barangay-link"
                                rules={[{ required: true, message: 'Need barangay link!' }]}
                            >
                                <label className="form-label"> Enter barangay link: </label>
                                <Input />
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane tab="Register Barangay" key="2">
                        <h1>Fill up</h1>
                        <Form>
                            <Row>
                                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                    <Form.Item
                                        className="form2-items"
                                        name="official-name"
                                        rules={[{ required: true, message: 'Need official name!' }]}
                                    >
                                        <label className="form-label">Official name: </label>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                    <Form.Item
                                        className="form2-items"
                                        name="barangay"
                                        rules={[{ required: true, message: 'Need barangay!' }]}
                                    >
                                        <label className="form-label">Barangay: </label>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                                    <Form.Item
                                        className="form2-items"
                                        name="municipality"
                                        rules={[{ required: true, message: 'Need municipality!' }]}
                                    >
                                        <label className="form-label">Municipality: </label>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                                    <Form.Item
                                        className="form2-items"
                                        name="province"
                                        rules={[{ required: true, message: 'Need province!' }]}
                                    >
                                        <label className="form-label">Province: </label>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                                    <Form.Item
                                        className="form2-items"
                                        name="country"
                                        rules={[{ required: true, message: 'Need country!' }]}
                                    >
                                        <label className="form-label">Country: </label>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        className="form2-items"
                                        name="barangay-address"
                                        rules={[{ required: true, message: 'Need barangay address!' }]}
                                    >
                                        <label className="form-label">Barangay address: </label>
                                        <TextArea autoSize />
                                    </Form.Item>
                                </Col>

                            </Row>
                        </Form>
                    </TabPane>
                </Tabs>

            </Card>
        )
    }
}
