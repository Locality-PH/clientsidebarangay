import React from 'react'
import { PageHeader, Tag, Row, Card } from 'antd';

const content = (
    <>
        <h3>
            Ant Design interprets the color system into two levels: a system-level color system and a
            product-level color system.
        </h3>
    </>
);

const Content = ({ children, extraContent }) => (
    <Row>
        <div style={{ flex: 1 }}>{children}</div>
        <div className="image">{extraContent}</div>
    </Row>
);

const EventPage = ({ match, organizationId }) => {
    return (
        <>
            <div className="my-content-center">
                <Card style={{ width: "65rem" }}>
                    <PageHeader
                        title="Paliga"
                        className="site-page-header"
                        subTitle="Sport"
                        tags={<Tag color="blue">Live</Tag>}
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

export default EventPage
