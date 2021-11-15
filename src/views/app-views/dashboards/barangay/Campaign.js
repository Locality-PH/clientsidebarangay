import React from 'react'
import { Form, Input, InputNumber, Select, Button, Radio, Card, Row, Col, Upload} from 'antd';
import CampaignRequested from './CampaignRequested';
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;

const Campaign = () => {
    const props = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange({ file, fileList }) {
          if (file.status !== 'uploading') {
            console.log(file, fileList);
          }
        },
        defaultFileList: [
          {
            uid: '1',
            name: 'xxx.png',
            status: 'done',
            response: 'Server Error 500', // custom error message to show
            url: 'http://www.baidu.com/xxx.png',
          },
          {
            uid: '2',
            name: 'yyy.png',
            status: 'done',
            url: 'http://www.baidu.com/yyy.png',
          },
          {
            uid: '3',
            name: 'zzz.png',
            status: 'error',
            response: 'Server Error 500', // custom error message to show
            url: 'http://www.baidu.com/zzz.png',
          },
        ],
      };

    const onFinish = values => {
        console.log('Received values of form: ', values);
      };

    return (
        <>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                <Card title="Suggestions Form">
                    <Form name="complex-form" onFinish={onFinish}>
                        <Form.Item>
                          <h4>Campaign Name</h4>
                          <Form.Item
                              name="name"
                              noStyle
                              rules={[{ required: true, message: 'Name is required' }]}
                              >
                              <Input placeholder="Enter Campaign Name" />
                          </Form.Item>
                        </Form.Item>

                        <Form.Item>
                          <h4>Campaign Type</h4>
                          <Input.Group compact>
                              <Form.Item
                                  name="type"
                                  noStyle
                                  rules={[{ required: true, message: 'Campaign Type is required' }]}
                              >
                                  <Select placeholder="Select Campaign Type" style={{width: "100%"}}>
                                      <Option value="barangay clearance">Health</Option>
                                      <Option value="barangay clearance2">Sport</Option>
                                  </Select>
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
                              <Input.TextArea placeholder="Write Description" />
                          </Form.Item> 
                        </Form.Item>

                        <Form.Item>
                          <h4>Cover</h4>
                          <Form.Item >
                          <Upload {...props}>
                              <Button>
                              <UploadOutlined /> Upload
                              </Button>
                          </Upload>
                          </Form.Item> 
                        </Form.Item>

                        <Form.Item>
                          <Button type="primary" htmlType="submit">Send</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
            {/* <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                <CampaignRequested></CampaignRequested>
                <CampaignRequested></CampaignRequested>
            </Col> */}
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={16}>
                <CampaignRequested></CampaignRequested>
            </Col>
        </Row>
        </>
    )
}

export default Campaign
