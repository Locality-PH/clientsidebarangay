import { React } from 'react'
import { Form, Input, Select, Button, Card, Upload, message, DatePicker, Tooltip, Carousel, Empty, Row, Col } from 'antd';
import { list as campaignType } from "../../../../constants/CampaignType"
import { UploadOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const CampaignForm = (props) => {
    const { organizationId, loading, setCampaigns, campaigns, imageList, setImageList, removeUrlList, setRemoveUrlList, onFinish, form} = props

    const beforeImageUpload = (file) => {
        const isFileTypeValid = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg';

        if (!isFileTypeValid) {
            message.error(`Wrong file!! Valid image are png, jpeg, or jpg.`);
        }

        else {
            file.status = "new"
            setImageList([...imageList, file])
        }


        return false || Upload.LIST_IGNORE;
    }

    const handleRemove = (file) => {
        var removeUid = file.uid
        setImageList(imageList.filter(img => img.uid !== removeUid))

        if (file.status == "old") {
            setRemoveUrlList([...removeUrlList, file.data])
        }
    }

    const imageCardHelp = () => {
        return <Tooltip title="Drag to left or right to navigate images" placement='topRight' arrowContent={false}>
            <span>
                <QuestionCircleOutlined style={{ fontSize: 20, marginRight: 10 }} />
            </span>
        </Tooltip>

    }

    const imgStyle = {
        width: "80%",
        maxHeight: "360px",
        margin: "auto",
        objectFit: "cover"
    }

    return (
        <Row gutter={14}>
            <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={16}
                xxl={16}
            >
                <Card title="Suggestions Form">
                    <Form name="complex-form" onFinish={onFinish} form={form}>
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
                            <h4>Starting Date</h4>
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
                                <Input.TextArea placeholder="Write Description" disabled={loading} />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>Send</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>

            <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={8}
                xxl={8}
            >
                <Card title="Image" loading={loading}>
                    <Form.Item>
                        <Upload
                            accept='.png,.jpeg,.jpg'
                            listType='picture'
                            beforeUpload={beforeImageUpload}
                            fileList={imageList}
                            onRemove={handleRemove}
                        >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>

                </Card>

                <Card title="Image Preview" extra={imageCardHelp()} loading={loading}>
                    <Carousel draggable dots={false} adaptiveHeight>
                        {imageList.length <= 0 && <Empty />}
                        {imageList.map(
                            (img, i) => {
                                let status = img.status
                                return <div key={i}>
                                    {status != "old" ?
                                        <img style={imgStyle} src={URL.createObjectURL(img)} />
                                        :
                                        <img style={imgStyle} src={img.data} />
                                    }
                                    <p style={{ textAlign: "center" }}>{img.name}</p>
                                </div>
                            }
                        )}
                    </Carousel>

                </Card>
            </Col>


        </Row >
    )
}

export default CampaignForm