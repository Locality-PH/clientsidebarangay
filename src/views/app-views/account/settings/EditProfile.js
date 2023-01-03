import React, { useState, useEffect, useMemo } from "react";
import {
  Form,
  Avatar,
  Button,
  Input,
  Row,
  Col,
  message,
  Select,
  Upload,
  Card,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ROW_GUTTER } from "constants/ThemeConstant";
import Flex from "components/shared-components/Flex";
import countryList from "react-select-country-list";
import { formatPhoneNumber } from "helper/Formula";
import { useAuth } from "contexts/AuthContext";
import { PROFILE_URL, AUTH_TOKEN } from "redux/constants/Auth";
import axios from "axios";

const EditPorfile = () => {
  const { currentUser, generateToken } = useAuth();
  console.log(currentUser);
  const options = useMemo(() => countryList().getData(), []);
  const [formData, setFormData] = useState({});
  const [formData2, setFormData2] = useState({});
  const [formatPhoneData, setFormatPhoneData] = useState("");
  const [country, setCountry] = useState("");
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  // Country Select
  const changeHandler = (value) => {
    setCountry(value);
  };

  // Format Phone to (xxx) xxx-xxxxx
  const handleInputPhone = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFormatPhoneData(formattedPhoneNumber);
  };

  //get Details
  const getData = async (_) => {
    const data = {
      auth_id: localStorage.getItem(AUTH_TOKEN),
    };
    await axios
      .post("/api/app/user/details", data, generateToken()[1])
      .then((response) => {
        // setIsLoading(false);
        // setDisplayName(response.data.full_name);
        console.log(response.data);
        // form.setFieldsValue({
        //   email: currentUser?.email,
        //   name: response.data.full_name,
        // });
      });
  };
  useEffect(() => {
    getData();
    setFormData({
      avatarUrl: "/img/avatars/thumb-6.jpg",
      name: currentUser?.displayName,
      email: currentUser?.email,
    });
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
    form2.setFieldsValue({
      avatarUrl: "/img/avatars/thumb-6.jpg",
      name: "Charlie Howard",
      email: "charlie.howard@themenate.com",
      userName: "Charlie",
      dateOfBirth: null,
      phoneNumber: formatPhoneData,
      website: "",
      address1: "San Isidro St",
      city: "Morong",
      country: "Philippines",

      postcode: "1972",
    });
    form.setFieldsValue({
      avatarUrl: "/img/avatars/thumb-6.jpg",
      name: currentUser?.displayName,
      email: currentUser?.email,
    });
  }, [formatPhoneData]);
  return (
    <>
      <Form form={form} name="basicInformation" layout="vertical">
        <Card className="setting-content">
          <Flex
            alignItems="center"
            mobileFlex={false}
            className="text-center text-md-left"
          >
            <Avatar
              size={90}
              src={formData?.avatarUrl}
              icon={<UserOutlined />}
            />
            <div className="mt-3 ml-3 mt-md-0">
              <Button type="primary">Change Avatar</Button>

              <Button className="ml-2">Remove</Button>
            </div>
          </Flex>
          <div className="mt-4">
            <Row>
              <Col xs={24} sm={24} md={24} lg={24}>
                <Row gutter={ROW_GUTTER}>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your name!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "Please enter a valid email!",
                        },
                      ]}
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                </Row>
                <Button type="primary" htmlType="submit">
                  Save Change
                </Button>
              </Col>
            </Row>
          </div>
        </Card>
      </Form>
      <Form
        name="billingInfo"
        layout="vertical"
        form={form2}
        initialValues={formData2}
      >
        <Card className="setting-content" title={"Billing Information"}>
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

export default EditPorfile;
