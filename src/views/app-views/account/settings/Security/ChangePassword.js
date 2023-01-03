import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, message, Card } from "antd";
import { useAuth } from "contexts/AuthContext";

const ChangePassword = () => {
  const { currentUser, resetEmailPassword } = useAuth();

  const [editOrganization, setEditOrganization] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleSubmitAccount = () => {
    console.log(editOrganization);
    setEditOrganization(!editOrganization);
  };
  const handleResetPassword = async () => {
    await resetEmailPassword(currentUser?.email)
      .then((_) => {
        setShowResetPassword(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (showResetPassword) {
      const timeoutId = setTimeout(() => {
        setShowResetPassword(false);
        setEditOrganization(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [showResetPassword]);
  return (
    <Card className="setting-content">
      <h2 className="mb-4">Change Password</h2>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form
            name="changePasswordForm"
            layout="vertical"
            initialValues={{ currentPassword: "**********" }}
          >
            <Row>
              {editOrganization ? (
                <>
                  <Button
                    size="medium"
                    type="primary"
                    loading={showResetPassword}
                    onClick={() => {
                      handleResetPassword();
                    }}
                  >
                    Reset your password by email
                  </Button>{" "}
                  {showResetPassword ? (
                    <span style={{ paddingLeft: "2px", color: "green" }}>
                      **reset password sent**
                    </span>
                  ) : null}
                </>
              ) : (
                <>
                  <Col xs={24} sm={24} md={8} lg={8}>
                    <div className="mb-4 font-size-md">Current Password </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <div className=" font-size-md">*************</div>
                  </Col>
                </>
              )}
            </Row>
          </Form>
          <div className="mt-3 text-left">
            {editOrganization ? (
              <>
                <Button onClick={() => handleSubmitAccount()}>Cancel</Button>
              </>
            ) : (
              <Button onClick={() => handleSubmitAccount()} type="primary">
                Edit Information
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ChangePassword;
