import React from 'react';
import { Row, Col, Card, Form, Input, Button, Checkbox } from "antd";
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

import './RegisterForm.css';


function RegisterForm() {
    const handleRegister = (value) => {
        console.log("value", value)
    }

    const rules = {
        email: [
          {
            required: true,
            message: "Please input your email address",
          },
          {
            type: "email",
            message: "Please enter a validate email!",
          },
        ],
        password: [
          {
            required: true,
            message: "Please input your password",
          },
        ],
        confirm_password: [
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("Passwords do not match!");
            },
          }),
        ],
      };

    return (
        <div className="container">
            <div style={{ alignSelf: 'center' }}>
                <h1>Sign up</h1>

                <Form
                    name="register_form"
                    onFinish={handleRegister}
                    layout="vertical"
                    labelWrap
                >
                    <Form.Item
                        name="email"
                        rules={rules.email}
                        label="Email Address :"
                    >

                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={rules.password}
                        label="Password :"
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm-password"
                        rules={rules.confirm_password}
                        label="Confirm Password :"
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item >
                        <Button htmlType="submit" className="w-100" style={{ backgroundColor: "#0033cc", color: "white", fontWeight: "bold" }} >
                            Register
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
                                <Button ><FcGoogle style={{ marginRight: "10px" }} /> Sign up with Google</Button>
                            </Col>
                            <Col>
                                <Button><FaFacebook style={{ marginRight: "10px" }} />Sign up with Facebook</Button>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item >
                        <Row justify="center">
                            <Col>
                                <a href="/auth/login">Already have an account? Sign in now.</a>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>

            </div>

        </div >
    )
}

export default RegisterForm
