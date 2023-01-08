import React, { useState, useEffect, useRef } from "react";
import { Form, Avatar, Button, Input, Row, Col, message, Card } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { ROW_GUTTER } from "constants/ThemeConstant";
import Flex from "components/shared-components/Flex";
import { useAuth } from "contexts/AuthContext";
import { PROFILE_URL } from "redux/constants/Auth";
import axios from "axios";
import { updateAccount } from "api/AppController/AccountsController/AccountDetailsController";

const FormAvatar = (props) => {
  const data = props;
  const { currentUser, generateToken } = useAuth();
  // Form State & Ref
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const formRef = useRef();
  const [displayName, setDisplayName] = useState(null);

  // File Upload State
  const hiddenFileInput = useRef(null);
  const [fileLarge, setFileLarge] = useState(false);
  const [profileAvatar, setProfileAvatar] = useState(false);
  const [url, setUrl] = useState(null);
  const [file, setFile] = useState(null);

  // Loading State
  const [editOrganization, setEditOrganization] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  //Edit account
  const handleSubmitAccount = () => {
    setEditOrganization(!editOrganization);
  };

  // Upload image button show explorer to get file
  const handleClick = (_) => {
    setFileLarge(false);
    hiddenFileInput.current.click();
  };

  // Send image here after image button onChange
  const handleChange = async (event) => {
    const fileUploaded = event.target.files[0];
    let imageValidate = "image";

    if (fileUploaded.type.includes(imageValidate)) {
      setProfileAvatar(event.target.files[0]);
      const base64 = checkFileSize(event.target.files[0]);
      setFile(base64);
    } else {
      message.warning("Image not Found");
    }
  };
  //Check File size
  const checkFileSize = (f) => {
    try {
      // 2.5 kilobye
      if (f?.size > 25000) {
        // To be added
        // notification({
        //   message: "Warning",
        //   description: "File to large",
        //   duration: 4,
        // });
        setFileLarge(true);
        return file;
        // alert("File is too big!");
      } else {
        return URL.createObjectURL(f);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChangeName = (value) => {
    form.setFieldsValue({ name: value.target.value });
    setDisplayName(value.target.value);
  };

  const handleSubmit = () => {
    if (editOrganization) {
      setLoadingButton(true);
      form
        .validateFields()
        .then((values) => {
          updateAccount(
            values,
            profileAvatar,
            currentUser,
            setDisplayName,
            setProfileAvatar,
            setEditOrganization,
            setLoadingButton,
            generateToken,
            url
          );
        })
        .catch((errorInfo) => {
          console.error("Error submitting form:", errorInfo);
        });
    } else {
      setEditOrganization(true);
    }
  };

  // Get Data
  const getData = async (_) => {
    try {
      const config = generateToken()[1];
      await axios
        .post("/api/app/user/details", data, config)
        .then((response) => {
          form.setFieldsValue({
            email: currentUser?.email,
            name: response.data.full_name,
          });
          setDisplayName(response.data.full_name);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  // UseEffect Declaration
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem(PROFILE_URL));

    setProfileAvatar(data.profile_data);
    setUrl(data.profile_data);
    setFile(data.profile_data);
    getData();
  }, [isLoading]);

  useEffect(() => {
    form.resetFields();
  }, []);
  return (
    <>
      <Form
        form={form}
        initialValues={formData}
        name="basicInformation"
        ref={formRef}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Card className="setting-content" loading={isLoading}>
          <Flex
            alignItems="center"
            mobileFlex={false}
            className="text-center text-md-left "
          >
            <div className="mt-3 ml-3 mt-md-0">
              <Form.Item>
                <Avatar
                  size={90}
                  className="mt-2 mr-2 "
                  src={file}
                  icon={<UserOutlined />}
                />
                <>
                  {editOrganization ? (
                    <>
                      <Button
                        icon={<UploadOutlined />}
                        onClick={handleClick}
                        size="medium"
                      >
                        Upload image
                      </Button>
                    </>
                  ) : null}
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
                      {editOrganization ? (
                        <>
                          <Input
                            onChange={(e) => handleChangeName(e)}
                            value={displayName}
                          />
                        </>
                      ) : (
                        <div className="ml-2 font-size-md">
                          {currentUser?.displayName}
                        </div>
                      )}
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
                      {editOrganization ? (
                        <>
                          <Input value={form.getFieldValue("email")} disabled />
                        </>
                      ) : (
                        <div className="ml-2 font-size-md">
                          {form.getFieldValue("email")}
                        </div>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          {editOrganization ? (
            <>
              <Button
                loading={loadingButton}
                type="primary"
                className="mr-2"
                htmlType="submit"
              >
                Submit
              </Button>
              <Button
                loading={loadingButton}
                onClick={() => handleSubmitAccount()}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => handleSubmitAccount()} type="primary">
              Edit Information
            </Button>
          )}
        </Card>
      </Form>
    </>
  );
};

export default FormAvatar;
