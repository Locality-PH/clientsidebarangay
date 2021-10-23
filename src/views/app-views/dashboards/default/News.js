import React from 'react'
import { Typography, Col, Avatar, Card, Button, Space} from 'antd';
import { HeartOutlined, MessageOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
// import from '@ant-design/icons';
const { Text } = Typography;



const News = ({title, type, img, content}) => {
    const color = ["#E1F8DC", "#FEF8DD", "#FFE7C7", "#B7E9F7", "#ADF7B6"]
    const randomColor = Math.floor(Math.random() * color.length);
    // const IconText = ({ icon, text }) => (
    //     <Space>
    //       {React.createElement(icon)}
    //       {text}
    //     </Space>
    //   );

    return (
        <>
            {/* <List
                itemLayout="vertical"
                size="large"
                bordered={true}
                pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 3,
                }}
                dataSource={newsReportData}
                renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[
                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    ]}
                    extra={
                    <img
                        width={272}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                    }
                >
                    <List.Item.Meta
                    avatar={<Avatar src={item.img} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.type}
                    />
                    {item.content}
                </List.Item>
                )}
            /> */}
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
                                    <p>72</p>
                                    <MessageOutlined style={{fontSize: "1.8rem", color: "#3e79f7"}}/>
                                    <p>8</p>
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
