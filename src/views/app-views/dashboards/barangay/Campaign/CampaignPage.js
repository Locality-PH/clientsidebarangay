import React from 'react'
import { PageHeader, Button, Tag, Row, Card } from 'antd';
import { 
	ArrowLeftOutlined, 
	EditOutlined,
	DeleteOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";

const content = (
    <>
        <h3>
        Ant Design interprets the color system into two levels: a system-level color system and a
        product-level color system.
        </h3>
        <h4 className="text-muted">
        Ant Design&#x27;s design team preferred to design with the HSB color model, which makes it
        easier for designers to have a clear psychological expectation of color when adjusting colors,
        as well as facilitate communication in teams.  Ant Design&#x27;s design team preferred to design with the HSB color model, which makes it
        easier for designers to have a clear psychological expectation of color when adjusting colors,
        as well as facilitate communication in teams. Ant Design&#x27;s design team preferred to design with the HSB color model, which makes it
        easier for designers to have a clear psychological expectation of color when adjusting colors,
        as well as facilitate communication in teams.
        </h4>
    </>
    );
      
    const Content = ({ children, extraContent }) => (
    <Row>
        <div style={{ flex: 1 }}>{children}</div>
        <div className="image">{extraContent}</div>
    </Row>
);

const CampaignPage = ({match, barangayUrl}) => {
    return (
        <>
            <div className="my-content-center">
                <Card style={{width: "65rem"}}>
                    <PageHeader
                        title="Title"
                        className="site-page-header"
                        subTitle="Health"
                        tags={<Tag color="blue">Pending</Tag>}
                        extra={[
                        <Link to={`${barangayUrl}/campaign`}>
                            <Button key="3" type="primary"><ArrowLeftOutlined />Back</Button>
                        </Link>,
                        <Link to={`${barangayUrl}/campaign/edit/${match.params.id}`}>
                            <Button key="2" type="primary"><EditOutlined />Edit</Button>
                        </Link>,
                        <Link to="/">
                            <Button key="1" type="primary" danger><DeleteOutlined />Delete</Button>
                        </Link>,
                        ]}
                        avatar={{ src: "/img/avatars/thumb-1.jpg" }}
                    >
                        <Content
                        extraContent={
                            <img
                            src="/img/barangay/caniogan/BarangayCover.jpg"
                            alt="content"
                            width="100%"
                            />
                        }
                        >
                        {content}
                        </Content>
                    </PageHeader>
                </Card>
            </div>
        </>
    )
}

export default CampaignPage
