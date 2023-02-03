import React, { useState } from "react";
import { Form, Button, Input, Row, Col, message, Card, Space } from "antd";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useAuth } from "contexts/AuthContext";

const EmailVerification = () => {
  const { currentUser, sendEmailVerification } = useAuth();
  const verification = !currentUser?.emailVerified;
  const [loading, setLoading] = useState(false);

  const handleSendEmailVerification = async () => {
    setLoading(true);

    await sendEmailVerification(currentUser.email)
      .then((_) => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Card className="setting-content">
      <h2 className="mb-4">Email Verification</h2>
      <Row style={{ height: "inherit" }}>
        <Col span={18} style={{ display: "flex", alignItems: "center" }}>
          <p style={{ margin: "0px", color: "black" }}>
            Verify your email address to protect your account and to help you
            recover your password if you forget it.
          </p>
        </Col>
        {verification ? (
          <div>
            <Col
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
              span={6}
            >
              <div className="text-right">
                <Button
                  loading={loading}
                  onClick={() => handleSendEmailVerification()}
                  type="primary"
                >
                  Verify Email
                </Button>
              </div>
            </Col>
          </div>
        ) : (
          <Col span={6}>
            <div className="text-right">
              <h4 style={{ color: "green" }}>
                Verified <AiOutlineCheckCircle />
              </h4>
            </div>
          </Col>
        )}
      </Row>
      {verification ? (
        <>
          <span style={{ color: "red" }}>
            ***reload page after verification ***
          </span>
        </>
      ) : null}
    </Card>
  );
};

export default EmailVerification;
