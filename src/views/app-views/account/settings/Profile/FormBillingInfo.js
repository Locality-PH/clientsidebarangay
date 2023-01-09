import React, { useState, useEffect, useMemo, useRef } from "react";
import { Form, Button, Input, Row, Col, message, Select, Card } from "antd";
import { ROW_GUTTER } from "constants/ThemeConstant";
import countryList from "react-select-country-list";
import { formatPhoneNumber } from "helper/Formula";
import { useAuth } from "contexts/AuthContext";
import "firebase/storage";
import axios from "axios";

const FormBillingInfo = (props) => {
  const data = props;
  const { generateToken } = useAuth();
  const options = useMemo(() => countryList().getData(), []);
  const [formData2, setFormData2] = useState({});
  const [formatPhoneData, setFormatPhoneData] = useState("");
  const [country, setCountry] = useState("");
  const [form2] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);

  // get Details Billing
  const getDataBilling = async () => {
    try {
      const response = await axios.post(
        "/api/app/user/details/all",
        data,
        generateToken()[1]
      );
      const res = response.data;

      form2.setFieldsValue({
        phoneNumber: res.phone_number,
        address1: res.address,
        address2: res.address2,
        city: res.city,
        country: res.country,
        postcode: res.postal,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
  // Country Select
  const changeHandler = (value) => {
    setCountry(value);
  };

  // Format Phone to (xxx) xxx-xxxxx
  const handleInputPhone = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFormatPhoneData(formattedPhoneNumber);
  };

  useEffect(() => {
    form2.resetFields();
    getDataBilling();
    setFormData2({
      avatarUrl: "/img/avatars/thumb-6.jpg",
      name: "Charlie Howard",
      email: "charlie.howard@themenate.com",
      userName: "Charlie",
      dateOfBirth: null,
      phoneNumber: formatPhoneData,
      address1: "San Isidro St",
      city: "Morong",
      country: "Philippines",
      postcode: "1972",
    });
  }, []);
  useEffect(() => {
    setFormData2({
      phoneNumber: formatPhoneData,
    });
    form2.setFieldsValue({
      phoneNumber: formatPhoneData,
    });
  }, [formatPhoneData]);
  return (
    <>
      <Form
        name="billingInfo"
        layout="vertical"
        form={form2}
        initialValues={formData2}
      >
        <Card
          className="setting-content"
          title={"Billing Information"}
          loading={isLoading}
        >
          <Row gutter={ROW_GUTTER}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please enter an address",
                  },
                ]}
                label="Address 1"
                name="address1"
              >
                <Input placeholder="4199 Roberts Loop" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item label="Address 2" name="address2">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter a phone number!",
                  },
                ]}
                //    validateTrigger="onBlur"
              >
                <Input
                  onChange={(e) => handleInputPhone(e)}
                  value={formatPhoneData}
                  placeholder="(915) xxx xxxx"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="City"
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Please enter a city!",
                  },
                ]}
              >
                <Input placeholder="New York" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Country"
                name="country"
                rules={[
                  {
                    required: true,
                    message: "Please enter a country!",
                  },
                ]}
              >
                <Select
                  options={options}
                  value={country}
                  placeholder="United States"
                  onChange={changeHandler}
                  showSearch
                ></Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Post code"
                rules={[
                  {
                    required: true,
                    message: "Please enter a postal code!",
                  },
                ]}
                name="postcode"
              >
                <Input placeholder="1234" />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit">
            Save Change
          </Button>
        </Card>
      </Form>
    </>
  );
};

export default FormBillingInfo;
