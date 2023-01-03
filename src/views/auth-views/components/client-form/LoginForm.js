import React, { useEffect, useState } from "react";
import Loading from "components/shared-components/Loading";
import { Row, Col, Form, Input, Button, Checkbox, Alert } from "antd";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { AUTH_TOKEN, ACCESS_TOKEN } from "redux/constants/Auth";
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
import { authOrganization } from "redux/sagas/Auth";

import "./LoginForm.css";

export const LoginForm = (props) => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(1);

  const {
    hideAuthMessage,
    showLoading,
    signInWithGoogle,
    signInWithFacebook,
    signIn,
    token,
    loading,
    redirect,
    showMessage,
    message,
  } = props;

  const initialCredential = {
    email: "testuser@gmail.com",
    password: "123456",
  };

  const onLogin = (values) => {
    setCounter(counter + 1);

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
    let cancel = true;

    if (counter === 2)
      if (token !== null) {
        if (cancel)
          if (!localStorage.getItem(ACCESS_TOKEN)) {
            setIsLoading(true);
            authOrganization(token, "Login", history, redirect, setIsLoading);
          }
        if (localStorage.getItem(ACCESS_TOKEN) && token) history.push(redirect);

        //  if (localStorage.getItem(ACCESS_TOKEN)) history.push(redirect);
      }
    if (showMessage) {
      setTimeout(() => {
        hideAuthMessage();
        setIsLoading(false);
      }, 3000);
    }
    return () => {
      cancel = false;
    };
  }, [counter]);
  useEffect(() => {
    let cancel = true;

    if (token !== null) {
      if (cancel)
        if (!localStorage.getItem(ACCESS_TOKEN)) {
          setIsLoading(true);
          authOrganization(token, "Login", history, redirect, setIsLoading);
        }
      if (localStorage.getItem(ACCESS_TOKEN) && token) history.push(redirect);

      //  if (localStorage.getItem(ACCESS_TOKEN)) history.push(redirect);
    }
    if (showMessage) {
      setTimeout(() => {
        hideAuthMessage();
        setIsLoading(false);
      }, 3000);
    }
    return () => {
      cancel = false;
    };
  }, []);
  return (
    <>
      {/* {isLoading ? (
        <Row
          align="middle"
          justify="center"
          className="organization-register-container"
          style={{ height: "600px" }}
        >
          {" "}
          <Loading />
        </Row>
      ) : ( */}
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
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password: "
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                className="login-btn"
                block
                loading={loading || isLoading}
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
      {/* )} */}
    </>
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
