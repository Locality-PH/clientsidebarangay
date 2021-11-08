import React from 'react';
import { Row, Col, Card, Form, Input, Button, Checkbox } from "antd";
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

import './RegisterForm.css';

function RegisterForm() {
    return (
        <div className="container">
            <div style={{ alignSelf: 'center' }}>
                <h1>Sign up</h1>

                <Form>
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
                        <Button htmlType="submit" className="w-100" style={{ backgroundColor: "#0033cc", color: "white", fontWeight: "bold" }} >
                            Login
                        </Button>
                    </Form.Item>

                    <Form.Item name="remember" wrapperCol={{ span: 24 }}>
                        <Row justify="space-between">

                            <Col><Checkbox>Remember me</Checkbox> </Col>
                            <Col> <a href="url">Forgot Password?</a></Col>
                        </Row>
                    </Form.Item>

                    <Form.Item >
                        <Row justify="center" gutter={10}>
                            <Col>
                                <Button ><FcGoogle style={{ marginRight: "10px" }} /> Sign in with Google</Button>
                            </Col>
                            <Col>
                                <Button><FaFacebook style={{ marginRight: "10px" }} />Sign in with Facebook</Button>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item >
                        <Row justify="center">
                            <Col>
                                <a>Don't have an account yet? Sign up now.</a>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>

            </div>

        </div >
    )
}

export default RegisterForm
