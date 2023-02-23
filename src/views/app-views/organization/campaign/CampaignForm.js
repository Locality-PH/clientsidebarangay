import { React, useState, useEffect, createRef } from 'react'
import { Form, Input, Select, Button, Card, Upload, message, DatePicker } from 'antd';
import { list as campaignType } from "../../../../constants/CampaignType"
import { useAuth } from "contexts/AuthContext";
import axios from 'axios'
const { Option } = Select;

const CampaignForm = (props) => {
    const {organizationId, loading, setCampaigns, campaigns} = props
    //for api
    const source = axios.CancelToken.source();
    const cancelToken = source.token;
    const { generateToken } = useAuth();

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
        message.error("There is a problem with uploading the data!!!")
        console.log("error", error)
    }

    const onFinish = async (values) => {

        values.organization_id = organizationId
        values.status = "Pending"
        console.log('Received values of form: ', values);
        await addSuggestedCampaign(values)
        message.success("Your campaign suggestion has been recorded!! Reload to see changes.")
    };

    return (
        <>
            <Card title="Suggestions Form">
                <Form name="complex-form" onFinish={onFinish}>
                    <Form.Item>
                        <h4>Campaign Title</h4>
                        <Form.Item
                            name="title"
                            noStyle
                            rules={[{ required: true, message: 'Title is required' }]}
                            
                        >
                            <Input placeholder="Enter Campaign title" disabled={loading} />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <h4>Campaign Type</h4>
                        <Input.Group compact>
                            <Form.Item
                                name="category"
                                noStyle
                                rules={[{ required: true, message: 'Campaign Type is required' }]}
                            >
                                <Select placeholder="Select Campaign Type" style={{ width: "100%" }}
                                disabled={loading}
                                >
                                    {campaignType.map((type, i) => {
                                        return <Option value={type} key={i}>{type}</Option>
                                    })}
                                </Select>
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>

                    <Form.Item>
                        <h4>Staring Date</h4>
                        <Input.Group compact>
                            <Form.Item
                                name="starting_date"
                                noStyle
                                rules={[{ required: true, message: 'Staring Date is required' }]}
                            >
                                <DatePicker className="w-100"
                                    format={"YYYY/MM/DD"} 
                                    disabled={loading}
                                    />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>

                    <Form.Item>
                        <h4>Description</h4>
                        <Form.Item
                            name="description"
                            noStyle
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea placeholder="Write Description" disabled={loading}/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>Send</Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}

export default CampaignForm