import React from 'react'
import { Form, Input, InputNumber, Select, Button, Radio, Card } from 'antd';
const { Option } = Select;

const CertificateRequestForm = () => {
    const onFinish = values => {
        console.log('Received values of form: ', values);
      };

    return (
        <>
            <Card title="Certificate Request Form">
                <Form name="complex-form" onFinish={onFinish}>
                    <h4>Name</h4>
                    <Form.Item
                        name="name"
                        noStyle
                        rules={[{ required: true, message: 'Name is required' }]}
                        >
                        <Input placeholder="Enter Name" />
                    </Form.Item>
                    <h4 className="mt-2">Age</h4>
                    <Form.Item
                        name="age"
                        noStyle
                        rules={[{ type: 'number', min: 0, max: 99 }]}
                        >
                        <InputNumber style={{ width: "100%" }} placeholder="Enter Age" />
                    </Form.Item>
                    <h4 className="mt-2">Gender</h4>
                    <Form.Item
                        name="gender"
                        noStyle
                        rules={[{ required: true, message: 'Gender is required' }]}
                        >
                        <Radio.Group>
                            <Radio value="male">Male</Radio>
                            <Radio value="female">Female</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <h4 className="mt-2">Description</h4>
                    <Form.Item
                        name="description"
                        noStyle
                        rules={[{ required: true }]}
                        >
                        <Input.TextArea placeholder="Write Description" />
                    </Form.Item>
                    <h4 className="mt-2">Certificate Type</h4>
                    <Input.Group compact>
                        <Form.Item
                            name="type"
                            noStyle
                            rules={[{ required: true, message: 'Certificate Type is required' }]}
                        >
                            <Select placeholder="Select Certificate Type" style={{width: "100%"}}>
                                <Option value="barangay clearance">Barangay Clearance</Option>
                                <Option value="barangay clearance2">Barangay Clearance2</Option>
                            </Select>
                        </Form.Item>
                    </Input.Group>
                    <Button type="primary" htmlType="submit" className="mt-4">Send</Button>
                </Form>
            </Card>
        </>
    )
}

export default CertificateRequestForm
