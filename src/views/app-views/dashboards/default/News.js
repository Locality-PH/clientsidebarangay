import React from 'react'
import { Typography, Col, Avatar, Card, Button, Space} from 'antd';
import { HeartOutlined, MessageOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
const { Text } = Typography;

const News = ({title, type, img, content}) => {
    const color = ["#E1F8DC", "#FEF8DD", "#FFE7C7", "#B7E9F7", "#ADF7B6"]
    const randomColor = Math.floor(Math.random() * color.length);

    return (
        <>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                <Card title={
                    <>
                        <Text type="secondary">Picked for you in</Text>
                        <br></br>
                        <Text mark>{type}</Text>
                    </>} extra={
                    <Avatar src={img} shape="circle"></Avatar>
                }>
                    <div style={{background: color[randomColor], borderRadius: "1rem"}}>
                        <img
                            width="100%"
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            style={{borderRadius: "1rem 1rem 0 0"}}
                        />
                        <div style={{padding: "1rem"}}>
                            <h2><strong>{title}</strong></h2>
                            <h4 className="text-muted">Morong, Rizal</h4>
                            <h4>{content}</h4>
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <div className="d-flex align-items-center">
                                <Space>
                                    <HeartOutlined style={{fontSize: "1.8rem", color: "#3e79f7"}}/>
                                    <p style={{color: "#3e79f7"}}>72</p>
                                    <MessageOutlined style={{fontSize: "1.8rem", color: "#3e79f7"}}/>
                                    <p style={{color: "#3e79f7"}}>8</p>
                                </Space>
                            </div>
                            <div>
                                    <Link to="/test">
                                        <Button type="primary" shape="round">Visit</Button>
                                    </Link>
                            </div>
                        </div>
                    </div>
                </Card>
            </Col>
        </>
    )
}

export default News;
