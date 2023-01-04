import React, { useState, useEffect, useMemo, useRef } from "react";
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
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { ROW_GUTTER } from "constants/ThemeConstant";
import Flex from "components/shared-components/Flex";
import countryList from "react-select-country-list";
import { formatPhoneNumber } from "helper/Formula";
import { useAuth } from "contexts/AuthContext";
import firebase from "firebase/app";
import "firebase/storage";
import { PROFILE_URL, AUTH_TOKEN } from "redux/constants/Auth";
import axios from "axios";

const EditPorfile = () => {
  const { currentUser, generateToken } = useAuth();
  const hiddenFileInput = useRef(null);
  const options = useMemo(() => countryList().getData(), []);
  const [formData, setFormData] = useState({});
  const [formData2, setFormData2] = useState({});
  const [formatPhoneData, setFormatPhoneData] = useState("");
  const [profileAvatar, setProfileAvatar] = useState(false);
  const [fileLarge, setFileLarge] = useState(false);
  const [country, setCountry] = useState("");
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const data = {
    auth_id: localStorage.getItem(AUTH_TOKEN),
  };

  const handleClick = (_) => {
    setFileLarge(false);
    hiddenFileInput.current.click();
  };

  const handleChange = async (event) => {
    const fileUploaded = event.target.files[0];
    // loadImg(fileUploaded);
    const base64 = await convertBase64(fileUploaded);
    setProfileAvatar(base64);
  };

  const convertBase64 = (file) => {
    try {
      console.log(file);
      if (file?.size > 25000) {
        // notification({
        //   message: "Warning",
        //   description: "File to large",
        //   duration: 4,
        // });
        setFileLarge(true);
        return profileAvatar;
        // alert("File is too big!");
      } else {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };

          fileReader.onerror = (error) => {
            reject(error);
            message.error(error.message);
          };
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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

  //get Details
  const getData = async (_) => {
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
  const getDataBilling = async (_) => {
    await axios
      .post("/api/app/user/details/all", data, generateToken()[1])
      .then((response) => {
        console.log(response.data);
      });
  };
  useEffect(() => {
    getData();
    getDataBilling();
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

  const handleUpload = (event) => {
    event.preventDefault();

    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`/avatar/file.name`);

    fileRef.put(file).then(function (_) {
      console.log("File uploaded!");
      fileRef.getDownloadURL().then(function (url) {
        setUrl(url);
        console.log(url);
      });
    });
  };

  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleFileChanges = async (event) => {
    let d = event.target.files[0];
    const base64 = await convertBase64(d);
    let data = {
      originalname: d.name,
      type: d.type,
      file: base64,
    };

    console.log(data);

    setFile(data);
  };
  const handleUploads = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    console.log(file);
    axios.post("/api/upload/test", file).then((response) => {
      setDownloadUrl(response.data.downloadUrl);
    });
  };

  return (
    <>
      <form onSubmit={handleUploads}>
        <input type="file" onChange={handleFileChanges} />
        <button type="submit">Upload</button>
        {downloadUrl && (
          <p>
            File: <a href={downloadUrl}>{file.name}</a>
          </p>
        )}
      </form>
      frontend
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
        {url && (
          <p>
            File: <a href={url}>{file.name}</a>
          </p>
        )}
      </form>
      <Form form={form} name="basicInformation" layout="vertical">
        <Card className="setting-content">
          <Flex
            alignItems="center"
            mobileFlex={false}
            className="text-center text-md-left"
          >
            <div className="mt-3 ml-3 mt-md-0">
              {/* <Button type="primary">Change Avatar</Button>

              <Button className="ml-2">Remove</Button> */}

              <Form.Item>
                <Avatar
                  size={90}
                  className="mt-2 mr-2 "
                  src={profileAvatar}
                  icon={<UserOutlined />}
                />
                <>
                  <Button
                    icon={<UploadOutlined />}
                    onClick={handleClick}
                    size="medium"
                  >
                    Upload image
                  </Button>
                  {fileLarge ? (
                    <span style={{ color: "red" }}>**File too large**</span>
                  ) : null}
                  <div className="custom-file-upload">
                    <input
                      ref={hiddenFileInput}
                      type="file"
                      onChange={handleChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </>
              </Form.Item>
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
