import React, { useEffect } from "react";

import { Row, Col, Form, Input, Button, Checkbox, Alert } from "antd";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  signIn,
  showLoading,
  showAuthMessage,
  hideAuthMessage,
  signInWithGoogle,
  signInWithFacebook,
} from "redux/actions/Auth";

import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

import "./LoginForm.css";

export const LoginForm = (props) => {
  let history = useHistory();

  const {
    otherSignIn,
    showForgetPassword,
    hideAuthMessage,
    onForgetPasswordClick,
    showLoading,
    signInWithGoogle,
    signInWithFacebook,
    extra,
    signIn,
    token,
    loading,
    redirect,
    showMessage,
    message,
    allowRedirect,
  } = props;

  const initialCredential = {
    email: "testuser@gmail.com",
    password: "123456",
  };

  const onLogin = (values) => {
    console.log(values);
    showLoading();
    signIn(values);
  };

  const onGoogleLogin = () => {
    showLoading();
    signInWithGoogle();
  };

  const onFacebookLogin = () => {
    showLoading();
    signInWithFacebook();
  };

  useEffect(() => {
    console.log(redirect, token);
    if (token !== null) {
      history.push(redirect);
    }
    if (showMessage) {
      setTimeout(() => {
        hideAuthMessage();
      }, 3000);
    }
  });

  return (
    <div>
      <div style={{ alignSelf: "center" }}>
        <h1 className="form-title">Login now</h1>
        <motion.div
          initial={{ opacity: 0, marginBottom: 0 }}
          animate={{
            opacity: showMessage ? 1 : 0,
            marginBottom: showMessage ? 20 : 0,
          }}
        >
          <Alert type="error" showIcon message={message}></Alert>
        </motion.div>

        <Form
          name="login-form"
          initialValues={initialCredential}
          onFinish={onLogin}
        >
          <Form.Item
            name="email"
            label="Username: "
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password: "
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="login-btn"
              block
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>

          <Form.Item name="remember" wrapperCol={{ span: 24 }}>
            <Row justify="space-between">
              <Col>
                <Checkbox>Remember me</Checkbox>
              </Col>
              <Col>
                {" "}
                <a href="url">Forgot Password?</a>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row justify="center" gutter={10}>
              <Col>
                <Button onClick={onGoogleLogin}>
                  <FcGoogle style={{ marginRight: "10px" }} /> Sign in with
                  Google
                </Button>
              </Col>
              <Col>
                <Button>
                  <FaFacebook style={{ marginRight: "10px" }} />
                  Sign in with Facebook
                </Button>
              </Col>
            </Row>
          </Form.Item>

          <Row justify="center" style={{ marginBottom: "10px" }}>
            <Col>
              <a href="/auth/register">
                Don't have an account yet? Sign up now.
              </a>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  otherSignIn: PropTypes.bool,
  showForgetPassword: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

LoginForm.defaultProps = {
  otherSignIn: true,
  showForgetPassword: false,
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  signIn,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
  signInWithGoogle,
  signInWithFacebook,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
