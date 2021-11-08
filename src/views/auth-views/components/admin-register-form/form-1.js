import React, { Component } from 'react'

//CSS
import './form-1.css'

//Icons
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

//Hooks
import { Row, Col, Card, Form, Input, Button, Checkbox, Select, DatePicker, InputNumber } from "antd";

const { Option } = Select;
const { TextArea } = Input;


export default class AdminRegisterForm1 extends Component {
    render() {
        return (
            <Card className="sign-up-card">
                <Form>
                    <h1>Create Account</h1>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Enter username!' }]}
                    >
                        <label className="form-label"> Username: </label>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Enter password!' }]}
                    >
                        <label className="form-label"> Password: </label>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm-password"
                        rules={[{ required: true, message: 'Confirm your new password!' }]}
                    >
                        <label className="form-label"> Confirm Password: </label>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item >
                        <Row justify="center" gutter={10}>
                            <Col>
                                <Button ><FcGoogle style={{ marginRight: "10px" }} /> Sign up with Google</Button>
                            </Col>
                            <Col>
                                <Button><FaFacebook style={{ marginRight: "10px" }} />Sign up with Facebook</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
