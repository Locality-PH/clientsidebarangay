import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "antd";
import { AUTH_TOKEN } from "redux/constants/Auth";
import CertForm from "./CertForm";
import { SendOutlined } from "@ant-design/icons";
import FormBillingInfo from "views/app-views/account/settings/Profile/billing/FormBillingInfo";
import BillingTable from "views/app-views/account/settings/Profile/billing/BillingTable";
import { useAuth } from "contexts/AuthContext";
import notification from "components/shared-components/Notification";

const CertificateRequestForm = () => {
  const { currentUser } = useAuth();
  const [parentData, setParentData] = useState({
    email: currentUser?.email,
    name: currentUser?.displayName,
  });

  const data = { auth_id: localStorage.getItem(AUTH_TOKEN) };
  console.log(parentData);
  let description = "Please fill up the form: ";
  let show = false;
  const handleSendData = () => {
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
      notification({
        message: "Success",
        description:
          "Request sent please wait for the instruction on your profile page",
        duration: 10,
        type: "success",
      });
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
      <div className="">
        <Row gutter={14}>
          <Col xs={24} sm={24} md={24} lg={15} xl={15} xxl={15}>
            <CertForm parentData={parentData} setParentData={setParentData} />
            <FormBillingInfo
              {...data}
              type="request"
              parentData={parentData}
              setParentData={setParentData}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={9} xl={9} xxl={9}>
            <BillingTable
              type="request"
              parentData={parentData}
              setParentData={setParentData}
            />{" "}
            <Button
              icon={<SendOutlined />}
              type="primary"
              className="ml-1"
              onClick={handleSendData}
              htmlType="submit"
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
