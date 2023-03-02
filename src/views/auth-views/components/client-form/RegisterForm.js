import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form, Input, Button, Checkbox, Alert } from "antd";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import {
  signUp,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
  signInWithGoogle,
  signInWithFacebook,
} from "redux/actions/Auth";
import "./RegisterForm.css";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { authOrganization } from "redux/sagas/Auth";
import { AUTH_TOKEN, ACCESS_TOKEN } from "redux/constants/Auth";

function RegisterForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [initialData, setInitialData] = useState({});

  const {
    signUp,
    showLoading,
    token,
    loading,
    redirect,
    message,
    showMessage,
    hideAuthMessage,
    otherSignIn,
    signInWithGoogle,
    signInWithFacebook,
    extra,
  } = props;

  const [form] = Form.useForm();
  let history = useHistory();

  const onGoogleLogin = () => {
    showLoading();
    signInWithGoogle();
  };

  const onFacebookLogin = () => {
    showLoading();
    signInWithFacebook();
  };
  const onSignUp = (values) => {
    // const datas = values.code;
    form.validateFields().then((values) => {
      showLoading();

      // signUp(values);
    });
  };

  const handleRegister = (value) => {
    form.validateFields().then((values) => {
      showLoading();
      //   console.log(form.getFieldValue("email"));
      // setInitialData({
      //   email: form.getFieldValue("email"),
      //   password: form.getFieldValue("password"),
      //   [`confirm-password`]: form.getFieldValue("confirm-password"),
      // });
      // localStorage.setItem("register-form", JSON.stringify(memberArray))

      signUp(values);
    });
  };

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
  useEffect(() => {
    let cancel = true;

    if (token !== null) {
      if (cancel)
        if (!localStorage.getItem(ACCESS_TOKEN)) {
          setIsLoading(true);
          authOrganization(token, "Register", history, redirect);
        }
      if (localStorage.getItem(ACCESS_TOKEN) && token) history.push(redirect);
    }

    if (showMessage) {
      setTimeout(() => {
        hideAuthMessage();
      }, 3000);
    }
    return () => {
      cancel = false;
    };
  }, [token]);
  return (
    <div className="container">
      <div style={{ alignSelf: "center" }}>
        <h1>Sign up</h1>
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
          form={form}
          name="register_form"
          onFinish={handleRegister}
          layout="vertical"
          initialValues={initialData}
        >
          <Form.Item
            name="email"
            rules={rules.email}
            label="Email Address :"
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            hasFeedback
            rules={rules.password}
            label="Password :"
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm-password"
            rules={rules.confirm_password}
            label="Confirm Password :"
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading || isLoading}
              htmlType="submit"
              className="w-100"
              block
              style={{
                backgroundColor: "#0033cc",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Register
            </Button>
          </Form.Item>

          <Form.Item name="remember" wrapperCol={{ span: 24 }}>
            <Row justify="space-between">
              <Col>
                <Checkbox>Remember me</Checkbox>
              </Col>
              <Col>
                <Checkbox>
                  I agree to the{" "}
                  <a href={"/support/term-condition"}> terms and conditions</a>{" "}
                  and
                  <a href={"/support/privacy-policy"}> privacy policy </a>
                </Checkbox>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row justify="center" gutter={10}>
              <Col>
                <Button
                  onClick={() => onGoogleLogin()}
                  className="mr-2"
                  disabled={loading}
                >
                  <FcGoogle style={{ marginRight: "10px" }} /> Sign up with
                  Google
                </Button>
              </Col>
              <Col>
                <Button
                  className="mr-2"
                  onClick={() => onFacebookLogin()}
                  disabled={loading}
                >
                  <FaFacebook style={{ marginRight: "10px" }} />
                  Sign up with Facebook
                </Button>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row justify="center">
              <Col>
                <a href="/auth/login">Already have an account? Sign in now.</a>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

RegisterForm.propTypes = {
  otherSignIn: PropTypes.bool,
  showForgetPassword: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
RegisterForm.defaultProps = {
  otherSignIn: true,
  showForgetPassword: true,
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  signUp,
  showAuthMessage,
  hideAuthMessage,
  showLoading,
  signInWithGoogle,
  signInWithFacebook,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
