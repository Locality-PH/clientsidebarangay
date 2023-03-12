import { React, useState, useEffect, createRef } from "react";
import { Row, Col, Tag, message, Card, Empty, Form } from "antd";
import CampaignForm from "./CampaignForm";
import CampaignRequested from "./CampaignRequested";
import { useAuth } from "contexts/AuthContext";
import { multipleImageDelete, multipleImageUpload } from 'api/AppController/FileUploadController/CampaignFileUploadController';

import axios from "axios";
import moment from "moment";

const Campaign = ({ organizationId }) => {
  //for api
  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const { generateToken } = useAuth();

  //Ref
  const [form] = Form.useForm();

  //useState
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [removeUrlList, setRemoveUrlList] = useState([]);

  //axios
  const addSuggestedCampaign = async (values) => {

    await axios.post(
      `/api/campaign/add-suggestion`,
      { values },
      generateToken()[1],
      { cancelToken })
      .then(
        (res) => {
          var data = res.data
          data._id = data.campaign_id
          var newCampaignList = [data, ...campaigns]
          setCampaigns(newCampaignList)
        })
      .catch((error) => {
        handleError(error)
      })
  }

  const handleError = (error) => {
    message.error("There is a problem with uploading the data!!!");
    console.log("error", error);
  };

  const onFinish = async (values) => {

    await multipleImageUpload(imageList, "campaign")
      .then(async (res) => {
        values.images = res
        values.organization_id = organizationId
        values.status = "Pending"

        await addSuggestedCampaign(values)
        form.resetFields();
        setRemoveUrlList([])
        setImageList([])
        message.success("Successfully added new campaign.");

      }).catch(handleError)
  }

  return (
    <>
      <Row align="center">
        <Col span={24}>
          <CampaignForm
            form={form}
            setCampaigns={setCampaigns}
            organizationId={organizationId}
            campaigns={campaigns}
            loading={loading}
            imageList={imageList}
            setImageList={setImageList}
            removeUrlList={removeUrlList}
            setRemoveUrlList={setRemoveUrlList}
            onFinish={onFinish}
          />
        </Col>
      </Row>
    </>
  );
};

export default Campaign;
