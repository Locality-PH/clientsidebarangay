import React, { Component } from 'react'

//CSS
import './form-2.css'

//Icons
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

//Hooks
import { Row, Col, Card, Form, Input, Button, Checkbox, Select, DatePicker, InputNumber} from "antd";

const { Option } = Select;
const { TextArea } = Input;


export default class AdminRegisterForm2 extends Component {
    render() {
        return (
            <Card className="sign-up-card">
                <Form>
                    <h1>Personal Info</h1>
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="first-name"
                                rules={[{ required: true, message: 'Enter your first name!' }]}
                            >
                                <label className="form-label"> First name: </label>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="last-name"
                                rules={[{ required: true, message: 'Enter your last name!' }]}
                            >
                                <label className="form-label"> Last name: </label>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="middle-name"
                                rules={[{ required: true, message: 'Enter your middle name!' }]}
                            >
                                <label className="form-label"> Middle name: </label>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="birthday"
                                rules={[{ required: true, message: 'Enter your birthday!' }]}
                            >
                                <label className="form-label"> Birthday: </label><br />
                                <DatePicker style={{width: "100%"}}/>
                            </Form.Item>
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24} >
                            <Form.Item
                                className="form1-items"
                                name="gender"
                                rules={[{ required: true, message: 'Choose your gender!' }]}
                            >
                                <label className="form-label"> Gender: </label>
                                <Select defaultValue="Male">
                                    <Option value="Male">Male</Option>
                                    <Option value="Female">Female</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="civil-status"
                                rules={[{ required: true, message: 'Choose your civil status!' }]}
                            >
                                <label className="form-label"> Civil Status: </label>
                                <Select defaultValue="Single">
                                    <Option value="Single">Single</Option>
                                    <Option value="Married">Married</Option>
                                    <Option value="Divorced">Divorced</Option>
                                    <Option value="Widowed">Widowed </Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="municipality"
                                rules={[{ required: true, message: 'Need municipality!' }]}
                            >
                                <label className="form-label">Municipality: </label>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="province"
                                rules={[{ required: true, message: 'Need province!' }]}
                            >
                                <label className="form-label">Province: </label>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="country"
                                rules={[{ required: true, message: 'Need country!' }]}
                            >
                                <label className="form-label">Country: </label>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="mobile-number"
                                rules={[{ required: true, message: 'Need your mobile number!' }]}
                            >
                                <label className="form-label">Mobile number: </label>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="telephone-number"
                                rules={[{ required: true, message: 'telephone number!' }]}
                            >
                                <label className="form-label">Telephone number: </label>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="email"
                                rules={[{ required: true, message: 'Need your email!' }]}
                            >
                                <label className="form-label">Email: </label>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                className="form1-items"
                                name="address"
                                rules={[{ required: true, message: 'Enter your address!' }]}
                            >
                                <label className="form-label"> Address: </label>
                                <TextArea autoSize />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        )
    }
}
