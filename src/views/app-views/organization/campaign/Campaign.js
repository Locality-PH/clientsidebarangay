import React from 'react'
import { Row, Col } from 'antd';
import CampaignForm from './CampaignForm';
import CampaignRequested from './CampaignRequested';

const Campaign = ({ organizationId }) => {
  return (
    <>
      <Row gutter={16} align="center">
        <Col
          xs={{ span: 24, order: 2 }}
          sm={{ span: 24, order: 2 }}
          md={{ span: 24, order: 2 }}
          lg={{ span: 20, order: 2 }}
          xl={{ span: 12, order: 1 }}
          xxl={{ span: 14, order: 1 }}
        >
          <CampaignRequested organizationId={organizationId} />
        </Col>

        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={{ span: 24, order: 1 }}
          lg={{ span: 20, order: 1 }}
          xl={{ span: 12, order: 2 }}
          xxl={{ span: 10, order: 2 }}
        >
          <CampaignForm organizationId={organizationId} />
        </Col>
      </Row>
    </>
  )
}

export default Campaign
