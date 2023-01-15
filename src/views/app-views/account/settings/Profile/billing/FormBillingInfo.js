import React, { useState, useEffect, useMemo, useRef } from "react";
import { Form, Button, Input, Row, Col, message, Select, Card } from "antd";
import { ROW_GUTTER } from "constants/ThemeConstant";
// Contanst & Formula
import countryList from "react-select-country-list";
import { formatPhoneNumber } from "helper/Formula";
import { useAuth } from "contexts/AuthContext";
import debounce from "lodash.debounce";
import "firebase/storage";
import axios from "axios";

const FormBillingInfo = (props) => {
  const { setParentData, parentData } = props;
  const data = props;
  let type = props.type;
  const { generateToken } = useAuth();
  const options = useMemo(() => countryList().getData(), []);
  const [formData2, setFormData2] = useState({});
  const [formatPhoneData, setFormatPhoneData] = useState("");
  const [country, setCountry] = useState("");
  const [form2] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  // get Details Billing
  const getDataBilling = async (props) => {
    try {
      const response = await axios.post(
        "/api/app/user/details/all",
        data,
        generateToken()[1]
      );
      const res = response.data;
      let childData = parentData;
      childData.phoneNumber = res.phone_number;
      childData.address = res.address;
      childData.address2 = res.address2;
      childData.city = res.city;
      childData.country = res.country;
      childData.postcode = res.postal;
      const finalData = {
        phoneNumber: res.phone_number,
        address: res.address,
        address2: res.address2,
        city: res.city,
        country: res.country,
        postcode: res.postal,
      };
      form2.setFieldsValue(finalData);
      setParentData(childData);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const onHandleData = (value, title) => {
    console.log(value);
    form2.setFieldsValue({
      [title]: value,
    });
    let data = parentData;
    console.log(data);
    data[`${title}`] = value;
    return setParentData(data);
  };

  // get Details Billing
  const updateBilling = async () => {
    try {
      const response = await axios.post(
        "/api/user/update/all",
        data,
        generateToken()[1]
      );
      const res = response.data;

      form2.setFieldsValue({
        phoneNumber: res.phone_number,
        address: res.address,
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
    onHandleData(value, "country");
    setCountry(value);
  };

  // Format Phone to (xxx) xxx-xxxxx
  const handleInputPhone = (e) => {
    try {
      const formattedPhoneNumber = formatPhoneNumber(e.target.value);
      onHandleData(e.target.value, "phoneNumber");
      setFormatPhoneData(formattedPhoneNumber);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values) => {
    setIsButtonLoading(true);
    console.log(values);
    const data = {
      address: values.address,
      city: values.city,
      phone_number: values.phoneNumber,
      country: values.country,
      postal: values.postcode,
      address2: values.address2,
    };
    try {
      const response = await axios.post(
        "/api/app/user/update/all",
        data,
        generateToken()[1]
      );
      console.log();
      message.success(response.data);
    } catch (error) {
      console.error(error);
      message.error(error.message);
    } finally {
      setIsButtonLoading(false);
    }
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
      address: "San Isidro St",
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
        onFinish={onFinish}
      >
        <Card
          className={`${type == "request" ? null : `setting-content`}`}
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
                hasFeedback
                label="Address 1"
                name="address"
              >
                <Input
                  onChange={(e) => onHandleData(e.target.value, "address")}
                  placeholder="4199 Roberts Loop"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item label="Address 2" name="address2" hasFeedback>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Phone Number"
                hasFeedback
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
                hasFeedback
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Please enter a city!",
                  },
                ]}
              >
                <Input
                  placeholder="New York"
                  onChange={(e) => onHandleData(e.target.value, "city")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                hasFeedback
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
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please enter a postal code!",
                  },
                ]}
                name="postcode"
              >
                <Input
                  placeholder="1234"
                  onChange={(e) => onHandleData(e.target.value, "postcode")}
                />
              </Form.Item>
            </Col>
          </Row>
          {type == "request" ? null : (
            <Button type="primary" htmlType="submit" loading={isButtonLoading}>
              Save Change
            </Button>
          )}
        </Card>
      </Form>
    </>
  );
};

export default React.memo(FormBillingInfo);
