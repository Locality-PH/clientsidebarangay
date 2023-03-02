import React, { useState, useEffect } from "react";
// Ant Design
import { Row, Col, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
// Components
import CertForm from "./CertForm";
import FormBillingInfo from "views/app-views/account/settings/Profile/billing/FormBillingInfo";
import BillingTable from "views/app-views/account/settings/Profile/billing/BillingTable";
import notification from "components/shared-components/Notification";
// Middleware
import { AUTH_TOKEN } from "redux/constants/Auth";
import { useAuth } from "contexts/AuthContext";
// API
import { sendDocument } from "api/AppController/CertificatesController/CertificatesController";

const CertificateRequestForm = (props) => {
  const { organizationId } = props;
  const { currentUser, generateToken } = useAuth();
  const [parentData, setParentData] = useState({
    email: currentUser?.email,
    name: currentUser?.displayName,
    organizationId: organizationId,
  });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const listener = window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();
    return () => window.removeEventListener("resize", listener);
  }, []);
  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
  };
  const [loading, setLoading] = useState(false);
  const handleSendDataCallBack = (res) => {
    console.log(res);
    if (res === "saved") {
      notification({
        message: "Success",
        description:
          "Request sent please wait for the instruction on your profile page",
        duration: 10,
        type: "success",
      });
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  const data = { auth_id: localStorage.getItem(AUTH_TOKEN) };
  console.log(parentData);
  let description = "Please fill up the form: ";
  let show = false;
  const handleSendData = async () => {
    // Certificate Request
    if (!parentData.email) {
      show = true;
      description += " email, ";
    }
    console.log(parentData.name);
    if (!parentData.name) {
      show = true;
      description += " name, ";
    }
    if (!parentData.description) {
      show = true;
      description += " description, ";
    }
    if (!parentData.certificate_type) {
      show = true;
      description += " certificate type, ";
    }
    if (!parentData.address) {
      show = true;
      description += " address, ";
    }

    if (!parentData.phoneNumber) {
      show = true;
      description += " phone number, ";
    }
    if (!parentData.postcode) {
      show = true;
      description += " postal code, ";
    }
    if (!parentData.city) {
      show = true;
      description += " city, ";
    }
    if (!parentData.city) {
      show = true;
      description += " country, ";
    }
    // if (!parentData.country) {
    //   show = true;
    //   description += " country, ";
    // }
    console.log(show);
    if (show) {
      notification({
        message: "Warning",
        description: description.slice(0, description.length - 2),
        duration: 10,
        type: "warning",
      });
      show = false;
      description = "Please fill up the form: ";
    } else {
      setLoading(!loading);
      await sendDocument(
        handleSendDataCallBack,
        parentData,
        generateToken()[1]
      );

      show = false;
    }
    // Billing Information
    console.log(parentData);
  };
  useEffect(() => {
    console.log(parentData);
  }, [parentData]);
  return (
    <>
      <div>
        <Row className={`${width > 991 ? null : `borderless`}`} gutter={14}>
          <Col xs={24} sm={24} md={24} lg={15} xl={15} xxl={15}>
            <CertForm
              parentData={parentData}
              organizationId={organizationId}
              setParentData={setParentData}
            />
            <FormBillingInfo
              {...data}
              type="request"
              parentData={parentData}
              width={width}
              setParentData={setParentData}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={9} xl={9} xxl={9}>
            <BillingTable
              type="request"
              parentData={parentData}
              setParentData={setParentData}
              width={width}
            />{" "}
            <Button
              icon={<SendOutlined />}
              type="primary"
              className="ml-1"
              onClick={handleSendData}
              htmlType="submit"
              loading={loading}
            >
              Send Request
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CertificateRequestForm;
